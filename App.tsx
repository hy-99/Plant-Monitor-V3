import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Plant, PlantSnapshot } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AddPlantPage from './components/AddPlantPage';
import DetailPage from './components/DetailPage';

type Page = 'home' | 'add' | 'detail';

function App() {
  const [plants, setPlants] = useLocalStorage<Plant[]>('plants', []);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const handleAddPlant = (newPlant: Plant) => {
    setPlants(prevPlants => [...prevPlants, newPlant]);
    setCurrentPage('home');
  };
  
  const handleSelectPlant = (plantId: string) => {
    setSelectedPlantId(plantId);
    setCurrentPage('detail');
  };

  const handleUpdatePlant = (plantId: string, newSnapshot: PlantSnapshot) => {
     setPlants(prevPlants => 
        prevPlants.map(p => 
            p.id === plantId 
                ? { ...p, snapshots: [...p.snapshots, newSnapshot] }
                : p
        )
     );
  };

  const handleUpdatePlantName = (plantId: string, newName: string) => {
    setPlants(prevPlants => 
      prevPlants.map(p => p.id === plantId ? { ...p, name: newName } : p)
    );
  };

  const handleDeleteSnapshot = (plantId: string, snapshotId: string) => {
    setPlants(prevPlants =>
      prevPlants.map(p => {
        if (p.id === plantId) {
          const newSnapshots = p.snapshots.filter(s => s.id !== snapshotId);
          // If all snapshots are deleted, should we delete the plant?
          // For now, let's keep the plant, it can have new snapshots added later.
          return { ...p, snapshots: newSnapshots };
        }
        return p;
      }).filter(p => p.snapshots.length > 0) // Or, remove plants with no snapshots
    );
    // After deleting a snapshot, it's good practice to navigate home 
    // if the plant is now empty, or select the latest snapshot.
    // The filter above handles removal. We can stay on the page.
  };


  const handleUpdateFeedback = (plantId: string, snapshotId: string, feedback: { rating: 'correct' | 'incorrect', comment?: string }) => {
    setPlants(prevPlants =>
      prevPlants.map(p => {
        if (p.id === plantId) {
          return {
            ...p,
            snapshots: p.snapshots.map(s => {
              if (s.id === snapshotId) {
                return { ...s, analysis: { ...s.analysis, feedback } };
              }
              return s;
            }),
          };
        }
        return p;
      })
    );
  };

  const navigateHome = () => {
    setSelectedPlantId(null);
    setCurrentPage('home');
  }

  const selectedPlant = plants.find(p => p.id === selectedPlantId);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage plants={plants} onAddPlant={() => setCurrentPage('add')} onSelectPlant={handleSelectPlant} />;
      case 'add':
        return <AddPlantPage onSave={handleAddPlant} onCancel={navigateHome} />;
      case 'detail':
        return selectedPlant ? <DetailPage 
                                  plant={selectedPlant} 
                                  onBack={navigateHome} 
                                  onUpdate={handleUpdatePlant} 
                                  onUpdateFeedback={handleUpdateFeedback}
                                  onUpdatePlantName={handleUpdatePlantName}
                                  onDeleteSnapshot={handleDeleteSnapshot}
                                /> : <HomePage plants={plants} onAddPlant={() => setCurrentPage('add')} onSelectPlant={handleSelectPlant} />;
      default:
        return <HomePage plants={plants} onAddPlant={() => setCurrentPage('add')} onSelectPlant={handleSelectPlant} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary">
      <Header />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;