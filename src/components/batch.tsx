import React from 'react';
import { useNavigate } from 'react-router-dom';

const Batch = () => {
  const navigate = useNavigate();

  const handleBranchSelect = (branchSlug: string) => {
    navigate(`/branches?branch=${branchSlug}`);
  };

  const branches = [
    {
      id: 1,
      name: 'Coimbatore',
      address: 'Above CSB Bank, Sathy road, Ganapathy - 641006',
      hours: 'Hours: 6 AM - 9 PM',
      image: '/assets/covai.png',
      slug: 'coimbatore'
    },
    {
      id: 2,
      name: 'Palladam',
      address: 'Near SV Clinic, Kosavampalayam road, Palladam - 641664',
      hours: 'Hours: 6 AM - 9 PM',
      image: '/assets/palladam.png',
      slug: 'palladam'
    },
    {
      id: 3,
      name: 'Tiruppur',
      address: '15, Velampalayam, Avinashi road, Tirupur - 641652',
      hours: 'Hours: 6 AM - 9 PM',
      image: '/assets/tiruppur.png',
      slug: 'tirupur'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-black via-gray-800 to-black overflow-hidden w-full">
      <div className="bg-black/40 flex items-start justify-center z-10 py-4 sm:py-8">
        <div className="text-center w-full px-4 py-4">
          {/* Header - Fixed for mobile */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sm:mb-12 md:mb-16 text-white px-2 py-4">
            Choose Your <span className="text-yellow-400">Branch</span>
          </h2>
          
          {/* Branches Grid - Mobile optimized */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-6xl mx-auto pb-4">
            {branches.map((branch) => (
              <div 
                key={branch.id}
                className="group relative h-56 sm:h-60 md:h-60 w-full max-w-sm sm:max-w-md bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => handleBranchSelect(branch.slug)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out transform group-hover:scale-110"
                  style={{ backgroundImage: `url(${branch.image})` }}
                />
                
                {/* Content Overlay */}
                <div 
                  className="flex flex-col p-4 items-start justify-end rounded-xl shadow-lg h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent relative z-10"
                >
                  <div className="w-full">
                    <p className='text-white text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-left'>{branch.name}</p>
                    <p className='text-gray-200 text-xs sm:text-sm mb-1 sm:mb-2 text-left leading-tight'>{branch.address}</p>
                    <p className='text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 text-left'>{branch.hours}</p>
                    
                    {/* Button Container */}
                    <div className="flex justify-start">
                      <button 
                        className="bg-black/60 hover:bg-gray-700 backdrop-blur-sm text-white py-2 px-4 rounded-lg border border-white/30 transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBranchSelect(branch.slug);
                        }}
                      >
                        Select Branch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;