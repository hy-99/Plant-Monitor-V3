import React from 'react';
import { PlantSnapshot } from '../types';

interface GrowthChartProps {
  snapshots: PlantSnapshot[];
}

const parseMeasurement = (value: string | null): number => {
    if (!value) return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

const GrowthChart: React.FC<GrowthChartProps> = ({ snapshots }) => {
    if (snapshots.length < 2) {
        return (
            <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg">
                <p className="text-text-secondary">
                    Add another snapshot to see a growth chart.
                </p>
            </div>
        );
    }
    
    const data = snapshots.map(s => ({
        date: new Date(s.timestamp),
        height: parseMeasurement(s.analysis.height),
        width: parseMeasurement(s.analysis.width),
    })).sort((a,b) => a.date.getTime() - b.date.getTime()); // Ensure data is sorted by date

    const width = 500;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const minDate = data[0].date.getTime();
    const maxDate = data[data.length - 1].date.getTime();
    const rangeDate = maxDate - minDate || 1;

    const allValues = data.flatMap(d => [d.height, d.width]);
    const maxValue = Math.max(...allValues, 1); // Use 1 as minimum to avoid division by zero

    const getX = (date: Date) => margin.left + (date.getTime() - minDate) / rangeDate * (width - margin.left - margin.right);
    const getY = (value: number) => height - margin.bottom - (value / maxValue) * (height - margin.top - margin.bottom);

    const heightPath = data.map(d => `${getX(d.date)},${getY(d.height)}`).join(' L');
    const widthPath = data.map(d => `${getX(d.date)},${getY(d.width)}`).join(' L');

    const yAxisLabels = Array.from({ length: 4 }, (_, i) => {
        const value = (maxValue / 3) * i;
        return { value: value.toFixed(0), y: getY(value) };
    });
    
    const xAxisLabels = data.length > 5 
        ? [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]]
        : data;

    return (
        <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-label="Plant growth chart over time">
                <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#cbd5e1" />

                {/* Y Axis Labels */}
                {yAxisLabels.map(label => (
                    <g key={`y-${label.value}`}>
                        <text x={margin.left - 8} y={label.y + 4} textAnchor="end" fontSize="10" fill="#64748b">{label.value} cm</text>
                    </g>
                ))}
                
                {/* X Axis Labels */}
                {xAxisLabels.map(d => (
                     <text key={d.date.toISOString()} x={getX(d.date)} y={height - margin.bottom + 15} textAnchor="middle" fontSize="10" fill="#64748b">{d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</text>
                ))}
                
                {/* Height Path */}
                <path d={`M${heightPath}`} fill="none" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((d, i) => (
                    <circle key={`h-${i}`} cx={getX(d.date)} cy={getY(d.height)} r="4" fill="#fff" stroke="#4a7c59" strokeWidth="2" />
                ))}

                {/* Width Path */}
                <path d={`M${widthPath}`} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((d, i) => (
                    <circle key={`w-${i}`} cx={getX(d.date)} cy={getY(d.width)} r="4" fill="#fff" stroke="#f97316" strokeWidth="2" />
                ))}
            </svg>
            <div className="flex justify-center items-center space-x-4 mt-2 text-sm text-text-secondary">
                <div className="flex items-center">
                    <span className="h-2 w-4 rounded-full bg-primary mr-2"></span> Height
                </div>
                <div className="flex items-center">
                    <span className="h-2 w-4 rounded-full bg-orange-500 mr-2"></span> Width
                </div>
            </div>
        </div>
    );
};

export default GrowthChart;