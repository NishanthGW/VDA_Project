import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import cv1 from '/assets/cv1.png';
import cv2 from '/assets/cv2.png';
import cv3 from '/assets/cv3.png';
import pdm1 from '/assets/pdm_1.png';
import pdm2 from '/assets/pdm_2.png';
import pdm3 from '/assets/pdm_3.png';
import tpr2 from '/assets/tpr_2.png';
import tpr3 from '/assets/tpr_3.png';

interface BranchSection {
  title: string;
  images: string[];
  slug: string;
}

const branchSections: BranchSection[] = [
  {
    title: 'Coimbatore',
    images: [cv1, cv2, cv3],
    slug: 'coimbatore'
  },
  {
    title: 'Palladam',
    images: [pdm1, pdm2, pdm3],
    slug: 'palladam'
  },
  {
    title: 'Tirupur',
    images: [tpr2, tpr3],
    slug: 'tirupur'
  }
];

const Floor: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    branchSections.map(() => 0)
  );

  // Auto-advance slideshow for each branch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes => 
        prevIndexes.map((index, i) => 
          (index + 1) % branchSections[i].images.length
        )
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

    const handleBranchClick = (slug: string) => {
    navigate(`/branches?branch=${slug}`);
    };  

  const goToImage = (branchIndex: number, imageIndex: number) => {
    setCurrentImageIndexes(prevIndexes => 
      prevIndexes.map((index, i) => 
        i === branchIndex ? imageIndex : index
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-48">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Our Branches
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchSections.map((branch, branchIndex) => (
            <div
              key={branch.slug}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden hover:shadow-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              onClick={() => handleBranchClick(branch.slug)}
            >
              {/* Branch Title */}
              <div className="bg-gray-900 py-4 px-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-yellow-500 text-center group-hover:text-yellow-400 transition-colors duration-300">
                  {branch.title}
                </h2>
              </div>

              {/* Image Slideshow */}
              <div className="relative h-64 bg-black overflow-hidden">
                <img
                  src={branch.images[currentImageIndexes[branchIndex]]}
                  alt={`${branch.title} ${currentImageIndexes[branchIndex] + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                
                {/* Image Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {branch.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(branchIndex, imageIndex);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        imageIndex === currentImageIndexes[branchIndex] 
                          ? 'bg-yellow-500 scale-125' 
                          : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                      aria-label={`Show image ${imageIndex + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Branch Info */}
              <div className="p-6">
                <div className="text-center">
                  <p className="text-gray-300 mb-4 text-lg">
                    View Batch Schedule & Timings
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBranchClick(branch.slug);
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">
            Click on any branch to view detailed batch timings and availability
          </p>
        </div>
      </div>
    </div>
  );
};

export default Floor;