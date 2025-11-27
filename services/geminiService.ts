import { GoogleGenAI, Type } from "@google/genai";
import { runPdddAnalysis, PdddResult } from "./pdddService";
import { AnalysisResult } from "../types";

// Initialize the Gemini client once
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Schema for the model's JSON output
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description:
        "A concise paragraph explaining the plant analysis (observations and conclusions).",
    },
    isPlant: {
      type: Type.BOOLEAN,
      description: "Is there a plant in the image?",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score from 0.0 to 1.0 for the analysis.",
    },
    species: {
      type: Type.STRING,
      description:
        "The scientific species name of the plant. Null if unknown.",
    },
    commonName: {
      type: Type.STRING,
      description:
        "The common or popular name of the plant. Null if unknown.",
    },
    health: {
      type: Type.STRING,
      description: "Health status of the plant.",
      enum: ["Healthy", "Stressed", "Unhealthy", "Unknown"],
    },
    height: {
      type: Type.STRING,
      description:
        'Estimated height in cm, e.g., "15 cm". Null if not measurable.',
    },
    width: {
      type: Type.STRING,
      description:
        'Estimated width in cm, e.g., "10 cm". Null if not measurable.',
    },
    disease: {
      type: Type.OBJECT,
      description: "Information about any detected disease. Null if healthy.",
      properties: {
        name: {
          type: Type.STRING,
          description: "Name of the disease.",
        },
        severity: {
          type: Type.STRING,
          description: "Severity of the disease (e.g., Mild, Moderate, Severe).",
        },
        recommendations: {
          type: Type.ARRAY,
          description: "List of recommendations to treat the disease.",
          items: { type: Type.STRING },
        },
      },
    },
    advice: {
      type: Type.ARRAY,
      description: "A list of care advice for the plant.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Title of the advice (e.g., Watering, Sunlight).",
          },
          description: {
            type: Type.STRING,
            description: "Detailed description of the care advice.",
          },
        },
        required: ["title", "description"],
      },
    },
  },
  required: [
    "summary",
    "isPlant",
    "confidence",
    "species",
    "commonName",
    "health",
    "advice",
  ],
};

// Main analysis function used by the app
export const analyzePlantImage = async (
  imageData: { mimeType: string; data: string }
): Promise<{ analysis: AnalysisResult; summary: string }> => {
  // Prepare image for Gemini
  const imagePart = {
    inlineData: {
      mimeType: imageData.mimeType,
      data: imageData.data,
    },
  };

  const prompt = `You are an expert botanist AI. Your task is to analyze the provided image of a plant with high accuracy.

Provide your final conclusions in a single, clean JSON object that strictly adheres to the provided schema.

Step 1: Internally, think through a detailed, step-by-step analysis of the plant in the image (observations, reasoning, then conclusions).

Step 2: Output only the final JSON object, following the schema exactly. Do NOT include your chain-of-thought or any extra text.

If a field like "disease" is not applicable, set its value to null.
For the "advice" array, provide exactly 3 concise, actionable care commands. Title them appropriately (e.g., "Watering", "Sunlight"). Frame the description as a direct instruction (e.g., "Water thoroughly when top inch of soil is dry.", "Provide 6+ hours of direct sun.").`;

  const textPart = { text: prompt };

  // ---- 1) Call Gemini once ----
  let result: any;
  try {
    result = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: { parts: [imagePart, textPart] },
      config: {
        temperature: 0.5,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });
  } catch (err) {
    console.error("Gemini API call failed:", err);
    throw new Error("Gemini API call failed");
  }

  // ---- 2) Parse Gemini JSON into AnalysisResult + summary ----
  // ---- 2) Parse Gemini JSON into AnalysisResult + summary ----
let analysis: AnalysisResult;
let summary: string;

try {
  let raw: unknown;

  // Support both possible response shapes:
  // - result.text()          (AI Studio starter style)
  // - result.response.text() (newer SDK style)
  if (typeof (result as any).text === "function") {
    raw = (result as any).text();
  } else if (
    (result as any).response &&
    typeof (result as any).response.text === "function"
  ) {
    raw = (result as any).response.text();
  } else if (typeof (result as any).text === "string") {
    raw = (result as any).text;
  } else {
    console.error("Unexpected Gemini response shape:", result);
    throw new Error("Unexpected Gemini response format from AI.");
  }

  const jsonString = (raw as string).trim();

  if (!jsonString) {
    throw new Error("Received an empty response from the AI.");
  }

  const parsed = JSON.parse(jsonString);
  const { summary: s, ...analysisData } = parsed;

  if (typeof s !== "string") {
    throw new Error("Parsed JSON does not contain a valid 'summary' field.");
  }

  analysis = analysisData as AnalysisResult;
  summary = s;
} catch (e) {
  console.error("Failed to parse Gemini response JSON:", e, result);
  throw new Error("Failed to parse Gemini response JSON");
}


  // ---- 3) Refine with PDDD backend if available ----
  try {
    const pdddResult: PdddResult = await runPdddAnalysis(imageData);

    if (pdddResult && typeof pdddResult.disease_confidence === "number") {
      const pConf = pdddResult.disease_confidence;

      // If PDDD is reasonably confident, let it influence disease
      if (pConf >= 0.6 && pdddResult.disease_name) {
        analysis = {
          ...analysis,
          disease: {
            name: pdddResult.disease_name,
            severity: analysis.disease?.severity ?? "Unknown",
            recommendations: analysis.disease?.recommendations ?? [],
          },
        };
      }

      // Adjust health if Gemini is unsure or low-confidence
      if (
        pConf >= 0.6 &&
        (analysis.health === "Unknown" || analysis.confidence < 0.6)
      ) {
        analysis = {
          ...analysis,
          health:
            pdddResult.health_status === "Healthy" ? "Healthy" : "Unhealthy",
        };
      }
    }
  } catch (err) {
    console.error(
      "PDDD backend unavailable or failed, using Gemini-only analysis:",
      err
    );
    // silently fall back to Gemini-only analysis
  }

  // Final unified result for the UI
  return { analysis, summary };
};
