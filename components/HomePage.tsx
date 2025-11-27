import React, { useState, useEffect } from 'react';
import { Plant } from '../types';
import PlantCard from './PlantCard';
import PlusIcon from './icons/PlusIcon';
import CameraIcon from './icons/CameraIcon';

interface HomePageProps {
  plants: Plant[];
  onAddPlant: () => void;
  onSelectPlant: (plantId: string) => void;
}

const greetings = [
    "Your plants are looking happy today!",
    "Welcome to your vibrant digital greenhouse.",
    "Time to see how your green friends are doing!",
    "Your digital garden awaits.",
    "Let's check on your leafy family!",
];

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
};

const HomePage: React.FC<HomePageProps> = ({ plants, onAddPlant, onSelectPlant }) => {
    const width = useWindowWidth();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, []);

    const getColumnCount = () => {
        if (width >= 1024) return 3; // lg
        if (width >= 640) return 2;  // sm
        return 1;
    };

    const columnCount = getColumnCount();
    const columns: Plant[][] = Array.from({ length: columnCount }, () => []);
    plants.forEach((plant, i) => {
        columns[i % columnCount].push(plant);
    });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative">
       <div className="mb-8 text-left animate-fade-in-up">
            <h1 className="text-4xl font-bold text-primary tracking-tight">Welcome to PlantGuard!</h1>
            <p className="mt-2 text-2xl font-semibold text-text-primary">Hello, User</p>
            <p className="mt-1 text-2xl font-semibold text-text-secondary">{greeting}</p>
        </div>
        
        <hr className="border-t-2 border-primary/10 mb-8" />

        <h2 className="text-3xl font-bold text-text-primary mb-6">Your Plant Collection</h2>

      {plants.length > 0 ? (
        <div className="flex justify-center items-start gap-6">
        {columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-6 w-full">
            {column.map((plant) => (
                <PlantCard 
                    key={plant.id} 
                    plant={plant} 
                    onClick={() => onSelectPlant(plant.id)}
                />
            ))}
            </div>
        ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-slate-200">
            <CameraIcon className="h-24 w-24 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-text-primary">Your Greenhouse is Empty</h2>
          <p className="mt-2 text-text-secondary">Let's add your first plant to begin its journey.</p>
          <button
            onClick={onAddPlant}
            className="mt-6 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl transition-all"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add First Plant
          </button>
        </div>
      )}

      {plants.length > 0 && (
        <button
          onClick={onAddPlant}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-20"
          aria-label="Add new plant"
        >
          <PlusIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default HomePage;