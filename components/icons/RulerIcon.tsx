import React from 'react';

const RulerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 8.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Z" />
        <path fillRule="evenodd" d="M2.25 3A1.5 1.5 0 0 0 .75 4.5v15A1.5 1.5 0 0 0 2.25 21h19.5A1.5 1.5 0 0 0 23.25 19.5v-15A1.5 1.5 0 0 0 21.75 3H2.25Zm1.503 1.503a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.25-2.25Zm3 3a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.25-2.25Zm3 3a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.25-2.25Zm3 3a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.25-2.25Zm3 3a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.25-2.25Z" clipRule="evenodd" />
    </svg>
);

export default RulerIcon;
