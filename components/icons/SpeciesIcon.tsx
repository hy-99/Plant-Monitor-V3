import React from 'react';

const SpeciesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.25 5.337a4.5 4.5 0 0 0-8.25 2.163v1.618a4.5 4.5 0 0 0 2.39 3.978.75.75 0 0 1 .53 1.292A3 3 0 0 0 8.25 18H9a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 1 12 18h.75a3 3 0 0 0 2.33-1.06.75.75 0 0 1 .53-1.292 4.5 4.5 0 0 0 2.39-3.978v-1.618a4.5 4.5 0 0 0-8.25-2.163Z" />
        <path fillRule="evenodd" d="M15.75 18a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm4.5-2.625a.75.75 0 0 1 .75.75v.625h.625a.75.75 0 0 1 0 1.5h-.625v.625a.75.75 0 0 1-1.5 0v-.625h-.625a.75.75 0 0 1 0-1.5h.625v-.625a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

export default SpeciesIcon;