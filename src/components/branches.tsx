import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Import images
import cbe1 from '/assets/cbeBat_1.jpg';
import cbe2 from '/assets/cbeBat_2.jpg';
import cbe3 from '/assets/cbeBat_3.jpg';
import pdm1 from '/assets/pdmBat_1.jpg';
import pdm2 from '/assets/pdmBat_2.jpg';
import pdm3 from '/assets/pdmBat_3.jpg';
import tpr1 from '/assets/tprBat_1.jpg';
import tpr2 from '/assets/tprBat_2.jpg';
import tpr3 from '/assets/tprBat_3.jpg';

interface BranchData {
  title: string;
  slug: string;
  images: string[];
}

const branchData: BranchData[] = [
  {
    title: 'Coimbatore',
    slug: 'coimbatore',
    images: [cbe1, cbe2, cbe3]
  },
  {
    title: 'Palladam',
    slug: 'palladam',
    images: [pdm1, pdm2, pdm3]
  },
  {
    title: 'Tirupur',
    slug: 'tirupur',
    images: [tpr1, tpr2, tpr3]
  }
];

const Branch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the branch parameter from URL
  const branchParam = searchParams.get('branch');

  // Find the branch based on URL parameter
  useEffect(() => {
    if (branchParam) {
      const branchIndex = branchData.findIndex(branch => 
        branch.slug === branchParam.toLowerCase()
      );
      if (branchIndex !== -1) {
        setCurrentIndex(branchIndex);
      }
    }
  }, [branchParam]);

  const nextBranch = () => {
    const newIndex = (currentIndex + 1) % branchData.length;
    setCurrentIndex(newIndex);
    // Update URL when navigating
    navigate(`/branches?branch=${branchData[newIndex].slug}`);
  };

  const prevBranch = () => {
    const newIndex = currentIndex === 0 ? branchData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    // Update URL when navigating
    navigate(`/branches?branch=${branchData[newIndex].slug}`);
  };

  const goToBranch = (index: number) => {
    setCurrentIndex(index);
    // Update URL when changing branches via dots
    navigate(`/branches?branch=${branchData[index].slug}`);
  };

  const currentBranch = branchData[currentIndex];

  // Filter branches based on URL parameter
  const displayBranches = branchParam 
    ? branchData.filter(branch => branch.slug === branchParam.toLowerCase())
    : branchData;

  const displayBranch = displayBranches[0] || currentBranch;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-24 md:p-8 md:pt-48">
      <div className="mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => {
              // Go back to floor with the same branch parameter if it exists
              if (branchParam) {
                navigate(`/floor?branch=${branchParam}`);
              } else {
                navigate('/floor');
              }
            }}
            className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200 mb-4 text-sm md:text-base"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Branches
          </button>
        </div>

        {/* Navigation Arrows and Title - Show navigation when viewing all branches */}
        {!branchParam && (
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <button
              onClick={prevBranch}
              className="p-2 md:p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Previous branch"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-100 px-2">
              {displayBranch.title}
            </h1>
            
            <button
              onClick={nextBranch}
              className="p-2 md:p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Next branch"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Single branch view */}
        {branchParam && (
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-100 mb-2">
              {displayBranch.title} Branch
            </h1>
            <p className="text-gray-400 text-sm md:text-base">Gallery & Facilities</p>
          </div>
        )}

        {/* Images Container */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch">
          {displayBranch.images.map((image, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center mb-4 md:mb-0"
            >
              <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${displayBranch.title} ${index + 1}`}
                  className="w-full h-auto max-w-full object-contain"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator - Only show if viewing all branches */}
        {!branchParam && (
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {branchData.map((branch, index) => (
              <button
                key={branch.slug}
                onClick={() => goToBranch(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-yellow-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to ${branch.title}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Branch;