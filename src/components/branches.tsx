import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Import images (you'll need to adjust these paths based on your actual file structure)
import cbe1 from '/src/assets/cbe_1.jpg';
import cbe2 from '/src/assets/cbe_2.jpg';
import cbe3 from '/src/assets/cbe_3.jpg';
import pdm1 from '/src/assets/pdm_1.jpg';
import pdm2 from '/src/assets/pdm_2.jpg';
import pdm3 from '/src/assets/pdm_3.jpg';
import tpr1 from '/src/assets/tpr_1.jpg';
import tpr2 from '/src/assets/tpr_2.jpg';
import tpr3 from '/src/assets/tpr_3.jpg';

interface BranchData {
  title: string;
  images: string[];
}

const branchData: BranchData[] = [
  {
    title: 'Coimbatore',
    images: [cbe1, cbe2, cbe3]
  },
  {
    title: 'Palladam',
    images: [pdm1, pdm2, pdm3]
  },
  {
    title: 'Tirupur',
    images: [tpr1, tpr2, tpr3]
  }
];

const Branch: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBranch = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % branchData.length);
  };

  const prevBranch = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? branchData.length - 1 : prevIndex - 1
    );
  };

  const currentBranch = branchData[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-48">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Arrows and Title */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevBranch}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Previous branch"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <h1 className="text-4xl font-bold text-center text-gray-100">
            {currentBranch.title}
          </h1>
          
          <button
            onClick={nextBranch}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Next branch"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Images Container - Complete images shown without cropping */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {currentBranch.images.map((image, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center"
            >
              <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${currentBranch.title} ${index + 1}`}
                  className="w-full h-auto max-w-full object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Grid Layout with equal height containers */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {currentBranch.images.map((image, index) => (
            <div
              key={index}
              className="flex justify-center"
            >
              <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${currentBranch.title} ${index + 1}`}
                  className="w-full h-auto max-w-full object-contain mx-auto"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          ))}
        </div> */}

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {branchData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-yellow-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to ${branchData[index].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branch;