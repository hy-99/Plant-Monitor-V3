import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';

interface PhotoTipsModalProps {
  onClose: () => void;
}

const PhotoTipsModal: React.FC<PhotoTipsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Photo Tips for Best Analysis</h2>
        <p className="text-text-secondary mb-6">Follow these tips to help our AI give you the most accurate results.</p>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary">Use Good Lighting</h3>
              <p className="text-sm text-text-secondary">Take photos in bright, natural light. Avoid harsh shadows or direct sunlight.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary">Clear Focus</h3>
              <p className="text-sm text-text-secondary">Ensure the plant, especially any affected areas, is in sharp focus.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary">Simple Background</h3>
              <p className="text-sm text-text-secondary">Place your plant against a plain, uncluttered background.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary">Avoid Blurry Photos</h3>
              <p className="text-sm text-text-secondary">Blurry images make it difficult to identify details.</p>
            </div>
          </div>
           <div className="flex items-start space-x-3">
            <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary">Avoid Multiple Plants</h3>
              <p className="text-sm text-text-secondary">Focus on one plant per photo for an accurate analysis.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-all"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};

export default PhotoTipsModal;
