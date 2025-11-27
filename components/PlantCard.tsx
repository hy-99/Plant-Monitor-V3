import React from 'react';
import { Plant } from '../types';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  style?: React.CSSProperties;
}

const HealthIndicator: React.FC<{ health: 'Healthy' | 'Stressed' | 'Unhealthy' | 'Unknown' }> = ({ health }) => {
    const healthInfo = {
        Healthy: { color: 'bg-green-500', text: 'Healthy' },
        Stressed: { color: 'bg-yellow-500', text: 'Stressed' },
        Unhealthy: { color: 'bg-red-500', text: 'Unhealthy' },
        Unknown: { color: 'bg-gray-400', text: 'Unknown' },
    };
    const { color, text } = healthInfo[health] || healthInfo.Unknown;

    return (
        <div className="absolute top-3 right-3 flex items-center bg-black bg-opacity-40 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
            <span className={`h-2 w-2 rounded-full ${color} mr-1.5`}></span>
            {text}
        </div>
    );
};

const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick, style }) => {
  if (!plant.snapshots || plant.snapshots.length === 0) {
    return null;
  }
  const latestSnapshot = plant.snapshots[plant.snapshots.length - 1];
  if (!latestSnapshot) return null;

  return (
    <div 
      style={style}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img className="h-56 w-full object-cover" src={latestSnapshot.imageUrl} alt={plant.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {latestSnapshot.analysis && <HealthIndicator health={latestSnapshot.analysis.health} />}
        <div className="absolute bottom-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white tracking-wide">{plant.name}</h3>
            <p className="text-sm text-slate-200 mt-1">{latestSnapshot.analysis?.species || 'Analysis pending'}</p>
            {latestSnapshot.summary && (
                <p className="text-xs text-slate-100 mt-2 p-2 bg-white/20 rounded-md backdrop-blur-sm">
                    {latestSnapshot.summary}
                </p>
            )}
        </div>
      </div>
      <div className="p-4 bg-slate-50 text-center text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors">
          View Details & History
      </div>
    </div>
  );
};

export default PlantCard;