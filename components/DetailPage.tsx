import React, { useState, useRef, useEffect } from 'react';
import { Plant, PlantSnapshot } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import PlusIcon from './icons/PlusIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import BrainIcon from './icons/BrainIcon';
import ThumbUpIcon from './icons/ThumbUpIcon';
import ThumbDownIcon from './icons/ThumbDownIcon';
import { analyzePlantImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import GrowthChart from './GrowthChart';
import ActionPlan from './ActionPlan';
import AnalysisDetailsList from './AnalysisDetailsList';
import SparklesIcon from './icons/SparklesIcon';

interface DetailPageProps {
  plant: Plant;
  onBack: () => void;
  onUpdate: (plantId: string, newSnapshot: PlantSnapshot) => void;
  onUpdateFeedback: (plantId: string, snapshotId: string, feedback: { rating: 'correct' | 'incorrect', comment?: string }) => void;
  onUpdatePlantName: (plantId: string, newName: string) => void;
  onDeleteSnapshot: (plantId: string, snapshotId: string) => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ plant, onBack, onUpdate, onUpdateFeedback, onUpdatePlantName, onDeleteSnapshot }) => {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(plant.snapshots.length > 0 ? plant.snapshots[plant.snapshots.length - 1].id : null);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(plant.name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const selectedSnapshot = plant.snapshots.find(s => s.id === selectedSnapshotId);

  useEffect(() => {
    if (!selectedSnapshot && plant.snapshots.length > 0) {
      setSelectedSnapshotId(plant.snapshots[plant.snapshots.length - 1].id);
    } else if (plant.snapshots.length === 0) {
      onBack();
    }
  }, [plant.snapshots, selectedSnapshot, onBack]);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  const handleNameSave = () => {
    if (editedName.trim() && editedName !== plant.name) {
      onUpdatePlantName(plant.id, editedName.trim());
    }
    setIsEditingName(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = URL.createObjectURL(file);
      const { mimeType, data } = await fileToBase64(file);
      const { analysis, summary } = await analyzePlantImage({ mimeType, data });

      const newSnapshot: PlantSnapshot = {
        id: new Date().toISOString(),
        imageUrl: imageUrl,
        analysis,
        summary,
        timestamp: new Date().toISOString(),
      };
      
      onUpdate(plant.id, newSnapshot);
      setSelectedSnapshotId(newSnapshot.id);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze the new image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (selectedSnapshot && window.confirm("Are you sure you want to delete this snapshot? This action cannot be undone.")) {
        onDeleteSnapshot(plant.id, selectedSnapshot.id);
    }
  };


  if (!selectedSnapshot) {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
            <h1 className="text-2xl font-bold">No snapshots available for this plant.</h1>
             <button onClick={triggerFileInput} className="mt-4 flex items-center justify-center mx-auto px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl transition-all">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Snapshot
            </button>
        </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="flex items-center text-sm font-semibold text-text-secondary hover:text-primary transition-colors p-2 -ml-2">
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to Collection
            </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
            {isEditingName ? (
                <input
                    ref={nameInputRef}
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleNameSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                    className="text-4xl font-bold text-primary tracking-tight border-b-2 border-primary/50 focus:outline-none bg-transparent"
                />
            ) : (
                <h1 className="text-4xl font-bold text-primary tracking-tight">{plant.name}</h1>
            )}
            <button onClick={() => setIsEditingName(!isEditingName)} className="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-slate-100">
                <PencilIcon className="h-5 w-5" />
            </button>
        </div>

        <div className="mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-3">History</h2>
            <div className="flex items-center gap-4 pb-2 overflow-x-auto">
                {plant.snapshots.slice().reverse().map(snapshot => (
                    <div key={snapshot.id} onClick={() => setSelectedSnapshotId(snapshot.id)} className={`relative flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${selectedSnapshotId === snapshot.id ? 'ring-4 ring-primary ring-offset-2' : 'hover:scale-105'}`}>
                        <img src={snapshot.imageUrl} alt={`Snapshot from ${new Date(snapshot.timestamp).toLocaleDateString()}`} className="w-24 h-24 object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <p className="absolute bottom-1 right-1 text-white text-[10px] font-bold bg-black/50 px-1 rounded">
                            {new Date(snapshot.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                    </div>
                ))}
                <button onClick={triggerFileInput} className="flex-shrink-0 w-24 h-24 bg-slate-100 hover:bg-slate-200 rounded-lg flex flex-col items-center justify-center text-primary transition-colors">
                    <PlusIcon className="h-8 w-8" />
                    <span className="text-xs font-semibold mt-1">Add New</span>
                </button>
            </div>
        </div>
        
        {isLoading && (
            <div className="w-full text-center p-8 bg-white rounded-lg shadow-md my-6 flex flex-col items-center justify-center">
                <SparklesIcon className="h-12 w-12 text-primary mx-auto animate-pulse" />
                <p className="mt-4 font-semibold text-lg text-primary">Analyzing new image...</p>
                <p className="text-text-secondary">This might take a moment.</p>
            </div>
        )}
        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg my-4 text-center">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
                 <h3 className="text-2xl font-bold text-text-primary mb-4">Snapshot Details</h3>
                 <img src={selectedSnapshot.imageUrl} alt={plant.name} className="w-full rounded-lg mb-6 shadow-md"/>

                 <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                        <BrainIcon className="h-6 w-6"/>
                        <h4 className="text-lg">AI Summary</h4>
                    </div>
                    <p className="text-text-secondary bg-slate-50 p-4 rounded-lg border border-slate-200">{selectedSnapshot.summary || "No summary available."}</p>
                 </div>
                 
                 <AnalysisDetailsList analysis={selectedSnapshot.analysis} />
            </div>

            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-4">Care Action Plan</h3>
                    <ActionPlan advice={selectedSnapshot.analysis.advice} />
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-4">Growth Chart</h3>
                    <GrowthChart snapshots={plant.snapshots} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-3">Was this analysis helpful?</h3>
                    <div className="flex items-center gap-4">
                        <button onClick={() => onUpdateFeedback(plant.id, selectedSnapshot.id, { rating: 'correct'})} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedSnapshot.analysis.feedback?.rating === 'correct' ? 'bg-green-100 text-green-700' : 'bg-slate-100 hover:bg-green-100 text-slate-600'}`}>
                            <ThumbUpIcon className="h-5 w-5" /> Yes
                        </button>
                         <button onClick={() => onUpdateFeedback(plant.id, selectedSnapshot.id, { rating: 'incorrect'})} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${selectedSnapshot.analysis.feedback?.rating === 'incorrect' ? 'bg-red-100 text-red-700' : 'bg-slate-100 hover:bg-red-100 text-slate-600'}`}>
                            <ThumbDownIcon className="h-5 w-5" /> No
                        </button>
                    </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-red-300 bg-red-50">
                    <h3 className="text-lg font-bold text-red-800">Danger Zone</h3>
                    <p className="text-sm text-red-700 mt-1 mb-3">Deleting a snapshot is permanent and cannot be recovered.</p>
                     <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-white border border-red-300 hover:bg-red-100 transition-colors">
                        <TrashIcon className="h-5 w-5" /> Delete This Snapshot
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DetailPage;