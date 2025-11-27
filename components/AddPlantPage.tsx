import React, { useState, useRef } from 'react';
import { Plant, PlantSnapshot } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { analyzePlantImage } from '../services/geminiService';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import CameraIcon from './icons/CameraIcon';
import SparklesIcon from './icons/SparklesIcon';
import PhotoTipsModal from './PhotoTipsModal';

interface AddPlantPageProps {
  onSave: (plant: Plant) => void;
  onCancel: () => void;
}

const AddPlantPage: React.FC<AddPlantPageProps> = ({ onSave, onCancel }) => {
  const [plantName, setPlantName] = useState('');
  const [image, setImage] = useState<{ file: File; url: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage({ file, url: URL.createObjectURL(file) });
      setError(null);
    }
  };

  const handleSave = async () => {
    if (!plantName.trim() || !image) {
      setError('Please provide a name and an image for your plant.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { mimeType, data } = await fileToBase64(image.file);
      const { analysis, summary } = await analyzePlantImage({ mimeType, data });

      const newSnapshot: PlantSnapshot = {
        id: new Date().toISOString(),
        imageUrl: image.url,
        analysis,
        summary,
        timestamp: new Date().toISOString(),
      };
      
      const newPlant: Plant = {
        id: new Date().toISOString() + Math.random(),
        name: plantName,
        snapshots: [newSnapshot],
      };

      onSave(newPlant);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze the plant image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      {showTips && <PhotoTipsModal onClose={() => setShowTips(false)} />}
      <div className="flex items-center mb-6">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100 mr-2">
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold text-text-primary">Add a New Plant</h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div>
            <label htmlFor="plant-name" className="block text-sm font-medium text-text-secondary mb-1">Plant's Name</label>
            <input
                type="text"
                id="plant-name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="e.g., My Fiddle Leaf Fig"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Photo</label>
            <div 
                className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary group"
                onClick={triggerFileInput}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                {image ? (
                    <img src={image.url} alt="Plant preview" className="w-full h-full object-cover rounded-lg"/>
                ) : (
                    <>
                        <CameraIcon className="h-12 w-12 text-gray-400 group-hover:text-primary" />
                        <p className="mt-2 text-sm text-text-secondary">Click to upload an image</p>
                    </>
                )}
            </div>
             <button onClick={() => setShowTips(true)} className="text-sm text-primary hover:underline mt-2">
                Photo tips for best results
             </button>
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-6 py-2 rounded-lg text-text-secondary font-medium hover:bg-gray-100">Cancel</button>
            <button
                onClick={handleSave}
                disabled={isLoading || !plantName || !image}
                className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Analyze & Save
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlantPage;