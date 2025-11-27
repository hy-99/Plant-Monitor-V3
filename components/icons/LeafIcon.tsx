import React from 'react';

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.25 5.337a4.5 4.5 0 0 0-8.25 2.163v1.618a4.5 4.5 0 0 0 2.39 3.978.75.75 0 0 1 .53 1.292A3 3 0 0 0 8.25 18H9a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 1 12 18h.75a3 3 0 0 0 2.33-1.06a.75.75 0 0 1 .53-1.292 4.5 4.5 0 0 0 2.39-3.978v-1.618a4.5 4.5 0 0 0-8.25-2.163Z"
      clipRule="evenodd"
    />
  </svg>
);

export default LeafIcon;