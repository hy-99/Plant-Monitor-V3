import React from 'react';

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        <path fillRule="evenodd" d="M4.5 4.5a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V7.5a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L15 1.5a.75.75 0 0 0-1.06 0l-1.72 1.72a.75.75 0 0 1-.53.22H9a.75.75 0 0 0 0 1.5h.75l.22-.22a2.25 2.25 0 0 1 1.591-.659h1.878l1.06-1.06a2.25 2.25 0 0 1 1.591-.659H19.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5V7.5a1.5 1.5 0 0 1 1.5-1.5H7.5a.75.75 0 0 0 0-1.5H4.5Z" clipRule="evenodd" />
    </svg>
);

export default CameraIcon;