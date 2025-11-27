export interface PdddResult {
  disease_name: string;
  disease_confidence: number; // 0.0 to 1.0
  health_status: "Healthy" | "Unhealthy";
}

const PDDD_API_URL = import.meta.env.VITE_PDDD_API_URL || "http://localhost:8000";

/**
 * Call your PDDD backend.
 * It expects JSON:
 *  { mimeType: string, data: string }  // base64 image data
 */
export async function runPdddAnalysis(imageData: {
  mimeType: string;
  data: string;
}): Promise<PdddResult> {
  const res = await fetch(`${PDDD_API_URL}/pddd/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageData),
  });

  if (!res.ok) {
    throw new Error(`PDDD API error: ${res.status}`);
  }

  const json = await res.json();
  return json as PdddResult;
}
