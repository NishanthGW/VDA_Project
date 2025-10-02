import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Import images
import cbe1 from '/src/assets/cbeBat_1.jpg';
import cbe2 from '/src/assets/cbeBat_2.jpg';
import cbe3 from '/src/assets/cbeBat_3.jpg';
import pdm1 from '/src/assets/pdmBat_1.jpg';
import pdm2 from '/src/assets/pdmBat_2.jpg';
import pdm3 from '/src/assets/pdmBat_3.jpg';
import tpr1 from '/src/assets/tprBat_1.jpg';
import tpr2 from '/src/assets/tprBat_2.jpg';
import tpr3 from '/src/assets/tprBat_3.jpg';

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

  // Find the initial branch index based on URL parameter
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
    navigate(`/branches?branch=${branchData[newIndex].slug}`, { replace: true });
  };

  const prevBranch = () => {
    const newIndex = currentIndex === 0 ? branchData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    // Update URL when navigating
    navigate(`/branches?branch=${branchData[newIndex].slug}`, { replace: true });
  };

  const goToBranch = (index: number) => {
    setCurrentIndex(index);
    // Update URL when changing branches via dots
    navigate(`/branches?branch=${branchData[index].slug}`, { replace: true });
  };

  const currentBranch = branchData[currentIndex];

  // Filter branches based on URL parameter
  const displayBranches = branchParam 
    ? branchData.filter(branch => branch.slug === branchParam.toLowerCase())
    : branchData;

  const displayBranch = displayBranches[0] || currentBranch;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-48">
      <div className="max-w-6xl mx-auto">
        {/* Back button when viewing specific branch */}
        {branchParam && (
          <div className="mb-6">
            <button
              onClick={() => navigate('/floor')}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Back to All Branches
            </button>
          </div>
        )}

        {/* Navigation Arrows and Title - Only show if viewing all branches */}
        {!branchParam && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevBranch}
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Previous branch"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <h1 className="text-4xl font-bold text-center text-gray-100">
              {displayBranch.title}
            </h1>
            
            <button
              onClick={nextBranch}
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Next branch"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Single branch view */}
        {branchParam && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-100 mb-2">
              {displayBranch.title} Branch
            </h1>
            <p className="text-gray-400">Gallery & Facilities</p>
          </div>
        )}

        {/* Images Container */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {displayBranch.images.map((image, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center"
            >
              <div className="w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`${displayBranch.title} ${index + 1}`}
                  className="w-full h-auto max-w-full object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator - Only show if viewing all branches */}
        {!branchParam && (
          <div className="flex justify-center mt-8 space-x-2">
            {branchData.map((branch, index) => (
              <button
                key={branch.slug}
                onClick={() => goToBranch(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-yellow-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to ${branch.title}`}
              />
            ))}
          </div>
        )}

        {/* Branch Information */}
        {/* <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            Batch Timings & Availability
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Explore our state-of-the-art facilities at {displayBranch.title} branch. 
            Contact us for detailed batch timings, class schedules, and membership information.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Contact for Timings
            </button>
            <button 
              onClick={() => navigate('/trial-class')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 border border-gray-600"
            >
              Book Trial Class
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Branch;