import React from 'react';
import { AnalysisResult } from '../types';
import SpeciesIcon from './icons/SpeciesIcon';
import ShieldIcon from './icons/ShieldIcon';
import BrainIcon from './icons/BrainIcon';
import RulerIcon from './icons/RulerIcon';
import BugIcon from './icons/BugIcon';
import TagIcon from './icons/TagIcon';

interface AnalysisDetailsListProps {
  analysis: AnalysisResult;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode | null }> = ({ icon, label, value }) => {
    if (value === null || value === undefined) return null;
    return (
        <li className="flex items-center justify-between py-3">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full mr-3">
                    {icon}
                </div>
                <span className="text-sm font-medium text-text-secondary">{label}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary text-right">{value}</span>
        </li>
    );
};

const HealthIndicator: React.FC<{ health: AnalysisResult['health'] }> = ({ health }) => {
    const healthInfo = {
        Healthy: { color: 'bg-green-500', text: 'Healthy' },
        Stressed: { color: 'bg-yellow-500', text: 'Stressed' },
        Unhealthy: { color: 'bg-red-500', text: 'Unhealthy' },
        Unknown: { color: 'bg-gray-400', text: 'Unknown' },
    };
    const { color, text } = healthInfo[health] || healthInfo.Unknown;

    return (
        <div className="flex items-center">
            <span className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></span>
            <span>{text}</span>
        </div>
    );
};

const AnalysisDetailsList: React.FC<AnalysisDetailsListProps> = ({ analysis }) => {
  return (
    <ul className="divide-y divide-slate-100">
        <DetailItem 
            icon={<TagIcon className="h-5 w-5 text-primary" />} 
            label="Common Name"
            value={analysis.commonName || 'Unknown'}
        />
        <DetailItem 
            icon={<SpeciesIcon className="h-5 w-5 text-primary" />} 
            label="Species"
            value={analysis.species || 'Unknown'}
        />
        <DetailItem 
            icon={<ShieldIcon className="h-5 w-5 text-primary" />} 
            label="Health Status"
            value={<HealthIndicator health={analysis.health} />}
        />
        <DetailItem 
            icon={<BrainIcon className="h-5 w-5 text-primary" />} 
            label="Confidence"
            value={`${(analysis.confidence * 100).toFixed(0)}%`}
        />
        <DetailItem 
            icon={<RulerIcon className="h-5 w-5 text-primary" />} 
            label="Est. Height"
            value={analysis.height || 'N/A'}
        />
        <DetailItem 
            icon={<RulerIcon className="h-5 w-5 text-primary" />} 
            label="Est. Width"
            value={analysis.width || 'N/A'}
        />
        {analysis.disease && (
             <DetailItem 
                icon={<BugIcon className="h-5 w-5 text-primary" />} 
                label="Disease"
                value={`${analysis.disease.name} (${analysis.disease.severity})`}
            />
        )}
    </ul>
  );
};

export default AnalysisDetailsList;