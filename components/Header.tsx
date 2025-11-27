import React from 'react';
import LeafIcon from './icons/LeafIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-2">
            <LeafIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-text-primary">PlantGuard</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;