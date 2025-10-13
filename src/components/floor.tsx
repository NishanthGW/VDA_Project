import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    branchSections.map(() => 0)
  );

  // Get branch parameter from URL
  const branchParam = searchParams.get('branch');

  // Filter branches if specific branch is selected
  const displayBranches = branchParam 
    ? branchSections.filter(branch => branch.slug === branchParam.toLowerCase())
    : branchSections;

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
    // Navigate to branch with the specific branch parameter
    navigate(`/branches?branch=${slug}`);
  };  

  const goToImage = (branchIndex: number, imageIndex: number) => {
    setCurrentImageIndexes(prevIndexes => 
      prevIndexes.map((index, i) => 
        i === branchIndex ? imageIndex : index
      )
    );
  };

  // Handle back to all branches
  const handleBackToAllBranches = () => {
    navigate('/floor');
  };

  // Handle back to batch selection
  const handleBackToBatch = () => {
    navigate('/batch');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-24 md:p-8 md:pt-48">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-yellow-500">
          {branchParam ? `${displayBranches[0]?.title} Branch` : 'Our Branches'}
        </h1>
        
        <div className={`grid gap-6 md:gap-8 ${
          branchParam ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {displayBranches.map((branch, branchIndex) => {
            // Find the original index for image tracking
            const originalIndex = branchSections.findIndex(b => b.slug === branch.slug);
            
            return (
              <div
                key={branch.slug}
                className="bg-gray-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden hover:shadow-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                onClick={() => handleBranchClick(branch.slug)}
              >
                {/* Branch Title */}
                <div className="bg-gray-900 py-3 md:py-4 px-4 md:px-6 border-b border-gray-700">
                  <h2 className="text-xl md:text-2xl font-bold text-white text-center group-hover:scale-125 transition-scale duration-300">
                    {branch.title}
                  </h2>
                </div>

                {/* Image Slideshow */}
                <div className="relative h-48 sm:h-56 md:h-64 bg-black overflow-hidden">
                  <img
                    src={branch.images[currentImageIndexes[originalIndex]]}
                    alt={`${branch.title} ${currentImageIndexes[originalIndex] + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Image Dots Indicator */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 md:space-x-2">
                    {branch.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(originalIndex, imageIndex);
                        }}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${
                          imageIndex === currentImageIndexes[originalIndex] 
                            ? 'bg-yellow-500 scale-125' 
                            : 'bg-gray-500 hover:bg-gray-400'
                        }`}
                        aria-label={`Show image ${imageIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Branch Info */}
                <div className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-lg">
                      View Batch Schedule & Timings
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBranchClick(branch.slug);
                      }}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm md:text-base"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-gray-400 text-sm md:text-lg px-4">
            {branchParam 
              ? 'Click to view detailed batch timings and availability' 
              : 'Click on any branch to view detailed batch timings and availability'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Floor;