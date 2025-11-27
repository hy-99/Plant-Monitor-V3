import React from 'react';

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25c-2.429 0-4.825.215-7.143.633A.75.75 0 0 0 4.25 3.75v16.5a.75.75 0 0 0 .607.743c2.318.418 4.714.632 7.143.632s4.825-.215 7.143-.633a.75.75 0 0 0 .607-.743V3.75a.75.75 0 0 0-.607-.867C16.825 2.465 14.429 2.25 12 2.25Z" />
        <path d="M9 9a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" />
        <path d="M9.75 12.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Z" />
    </svg>
);

export default BrainIcon;