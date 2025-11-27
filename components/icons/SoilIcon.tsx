import React from 'react';

const SoilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.25 5.25a3 3 0 0 1 3-3h1.5a3 3 0 0 1 3 3v.75A3.75 3.75 0 0 1 19.5 9.75v6.75a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3v-6.75A3.75 3.75 0 0 1 8.25 6v-.75ZM11.25 6v.75a2.25 2.25 0 0 0 2.25 2.25H15v-3A1.5 1.5 0 0 0 13.5 4.5h-1.5A1.5 1.5 0 0 0 10.5 6v3h1.5a2.25 2.25 0 0 0 2.25-2.25V6h-3Z" clipRule="evenodd" />
        <path d="M6.75 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.75Z" />
    </svg>
);

export default SoilIcon;