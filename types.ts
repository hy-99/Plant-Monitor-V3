export interface Plant {
  id: string;
  name: string;
  snapshots: PlantSnapshot[];
}

export interface PlantSnapshot {
  id: string;
  imageUrl: string;
  analysis: AnalysisResult;
  timestamp: string; // ISO date string
  summary?: string;
}

export interface CareAdvice {
  title: string;
  description: string;
}

export interface AnalysisResult {
  isPlant: boolean;
  confidence: number;
  species: string | null;
  commonName: string | null;
  health: 'Healthy' | 'Stressed' | 'Unhealthy' | 'Unknown';
  height: string | null; // e.g., "15 cm"
  width: string | null; // e.g., "10 cm"
  disease: DiseaseInfo | null;
  advice: CareAdvice[];
  feedback?: {
    rating: 'correct' | 'incorrect';
    comment?: string;
  };
}

export interface DiseaseInfo {
  name: string;
  severity: string;
  recommendations: string[];
}