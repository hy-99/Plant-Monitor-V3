import React from 'react';
import { CareAdvice } from '../types';
import WaterIcon from './icons/WaterIcon';
import SunIcon from './icons/SunIcon';
import SoilIcon from './icons/SoilIcon';
import InfoIcon from './icons/InfoIcon';

const getIcon = (title: string): React.FC<{ className?: string }> => {
    const lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.includes('water')) return WaterIcon;
    if (lowerCaseTitle.includes('sun') || lowerCaseTitle.includes('light')) return SunIcon;
    if (lowerCaseTitle.includes('soil') || lowerCaseTitle.includes('pot') || lowerCaseTitle.includes('fertiliz')) return SoilIcon;
    return InfoIcon;
};

const ActionPlan: React.FC<{ advice: CareAdvice[] }> = ({ advice }) => {
    return (
        <div className="space-y-3">
            {advice.map((item, index) => {
                const Icon = getIcon(item.title);
                return (
                    <div key={index} className="flex items-start p-3 bg-slate-50 border-l-4 border-primary rounded-r-lg">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center mr-4">
                           <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-text-primary">{item.title}</p>
                            <p className="text-sm text-text-secondary">{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ActionPlan;