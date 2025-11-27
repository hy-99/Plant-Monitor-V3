import React from 'react';

const TagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 3.75a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-1.5 0v-15a.75.75 0 0 1 .75-.75ZM19.5 3.75a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-1.5 0v-15a.75.75 0 0 1 .75-.75ZM15.334 3.425a.75.75 0 0 1 .666 0l2.25 1.125a.75.75 0 0 1 0 1.33l-2.25 1.125a.75.75 0 0 1-.666 0L13.084 5.88a.75.75 0 0 1 0-1.33l2.25-1.125Zm-6 0a.75.75 0 0 1 .666 0l2.25 1.125a.75.75 0 0 1 0 1.33l-2.25 1.125a.75.75 0 0 1-.666 0L7.084 5.88a.75.75 0 0 1 0-1.33L9.334 3.425Z" clipRule="evenodd" />
    </svg>
);

export default TagIcon;