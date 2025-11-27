from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
import base64
import io
from PIL import Image

# ---- Data models ----

class ImageData(BaseModel):
    mimeType: str
    data: str  # base64-encoded image data (no data: prefix)

class PdddResponse(BaseModel):
    disease_name: str
    disease_confidence: float  # 0.0 - 1.0
    health_status: Literal["Healthy", "Unhealthy"]


app = FastAPI()

# Allow local dev from Vite + any future frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def run_pddd_model(img: Image.Image) -> PdddResponse:
    """
    TODO: Replace this stub with the real PDDD pre-trained model inference.

    For now, this function just returns a fake 'healthy' output so that
    your app works end-to-end while you set up the real model.
    """
    # Example placeholder logic:
    return PdddResponse(
        disease_name="Unknown",
        disease_confidence=0.0,
        health_status="Healthy",
    )


@app.post("/pddd/analyze", response_model=PdddResponse)
async def analyze(image: ImageData) -> PdddResponse:
    # Decode base64 into bytes
    try:
        img_bytes = base64.b64decode(image.data)
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    except Exception as e:
        # If decode fails, still return a safe default object
        print("Failed to decode image for PDDD:", e)
        return PdddResponse(
            disease_name="Unknown",
            disease_confidence=0.0,
            health_status="Healthy",
        )

    # Run PDDD model (currently stubbed)
    result = run_pddd_model(pil_img)
    return result
