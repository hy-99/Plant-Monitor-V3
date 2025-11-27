import React from 'react';

const BugIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.825.215-7.143.633A.75.75 0 0 0 4.25 3.75v16.5a.75.75 0 0 0 .607.743c2.318.418 4.714.632 7.143.632s4.825-.215 7.143-.633a.75.75 0 0 0 .607-.743V3.75a.75.75 0 0 0-.607-.867C16.825 2.465 14.429 2.25 12 2.25ZM8.25 9a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM8.25 13.5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z" clipRule="evenodd" />
    </svg>
);

export default BugIcon;
