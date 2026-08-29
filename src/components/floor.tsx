import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Import images
import cv1 from '/assets/cv1.png';
import cv2 from '/assets/cv2.png';
import cv3 from '/assets/cv3.png';
import pdm1 from '/assets/pdm_1.png';
import pdm2 from '/assets/pdm_2.png';
import pdm3 from '/assets/pdm_3.png';
import srpt1 from '/assets/srpt_1.jpg';
import srpt2 from '/assets/srpt_2.jpg';
import srpt3 from '/assets/srpt_3.jpg';
import srpt4 from '/assets/srpt_4.jpg';

interface BranchSection {
  title: string;
  images: string[];
  slug: string;
}

const branchSections: BranchSection[] = [
  {
    title: 'Ganapathy',
    images: [cv1, cv2, cv3],
    slug: 'coimbatore',
  },
  {
    title: 'Palladam',
    images: [pdm1, pdm2, pdm3],
    slug: 'palladam',
  },
  {
    title: 'Saravanampatti',
    images: [srpt1, srpt2, srpt3, srpt4],
    slug: 'saravanampatti',
  },
  // {
  //   title: 'Tirupur',
  //   images: [tpr2, tpr3],
  //   slug: 'tirupur'
  // }
];

const Floor: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    branchSections.map(() => 0)
  );
  const [currentBranchIndex, setCurrentBranchIndex] = useState<number>(0);

  // Get branch parameter from URL
  const branchParam = searchParams.get('branch');

  // Find initial branch index when branchParam changes
  useEffect(() => {
    if (branchParam) {
      const initialIndex = branchSections.findIndex(
        (branch) => branch.slug === branchParam.toLowerCase()
      );
      if (initialIndex !== -1) {
        setCurrentBranchIndex(initialIndex);
      }
    }
  }, [branchParam]);

  // Filter branches if specific branch is selected
  const displayBranches = branchParam
    ? [branchSections[currentBranchIndex]] // Show only current branch
    : branchSections;

  // Auto-advance slideshow for each branch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map(
          (index, i) => (index + 1) % branchSections[i].images.length
        )
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBranchClick = (slug: string) => {
    navigate(`/branches?branch=${slug}`);
  };

  const goToImage = (branchIndex: number, imageIndex: number) => {
    setCurrentImageIndexes((prevIndexes) =>
      prevIndexes.map((index, i) => (i === branchIndex ? imageIndex : index))
    );
  };

  // Navigation between branches
  const goToNextBranch = () => {
    setCurrentBranchIndex((prevIndex) =>
      prevIndex === branchSections.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevBranch = () => {
    setCurrentBranchIndex((prevIndex) =>
      prevIndex === 0 ? branchSections.length - 1 : prevIndex - 1
    );
  };

  // Return to the previous page the user came from, or fall back to the floor overview.
  const handleBackToAllBranches = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/floor');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(12,28,45,0.96),_rgba(5,15,28,1)_34%,_rgba(2,9,17,1)_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.14),transparent_30%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.10),transparent_45%)]" />
      <div className="relative w-full mx-auto px-3 pt-[132px] pb-0 md:px-6 md:pt-[150px] md:pb-0 flex flex-col justify-center gap-6 md:gap-8 min-h-[calc(100vh-150px)]">
        {/* Header */}
        <div className="relative flex items-center justify-center pt-2">
          {/* Back Button - Only show when single branch is selected */}
          {branchParam && (
            <button
              onClick={handleBackToAllBranches}
              className="absolute left-4 md:left-8 flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200 text-sm md:text-base font-medium"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-500">
            Our Branches
          </h1>
        </div>

        {branchParam ? (
          (() => {
            const selectedBranch =
              branchSections[currentBranchIndex] || branchSections[0];
            const selectedIndex = branchSections.findIndex(
              (b) => b.slug === selectedBranch.slug
            );

            const currentImageIndex = currentImageIndexes[selectedIndex];
            const prevImageIndex =
              (currentImageIndex - 1 + selectedBranch.images.length) %
              selectedBranch.images.length;
            const nextImageIndex =
              (currentImageIndex + 1) % selectedBranch.images.length;

            return (
              <div className="max-w-6xl mx-auto space-y-5 md:space-y-7">
                <style>{`
                @keyframes galleryZoom {
                  0% { transform: scale(1.02); filter: brightness(0.8); }
                  50% { transform: scale(1.08); filter: brightness(1); }
                  100% { transform: scale(1.02); filter: brightness(0.9); }
                }
              `}</style>

                <div className="relative overflow-visible bg-transparent">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.06),transparent_40%)]" />

                  <div className="relative py-2 md:py-3 px-0 md:px-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevBranch();
                      }}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-20 border border-white/10 backdrop-blur-sm"
                      aria-label="Previous branch"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextBranch();
                      }}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-20 border border-white/10 backdrop-blur-sm"
                      aria-label="Next branch"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <h2 className="text-lg md:text-xl font-bold text-white text-center px-8 tracking-wide">
                      {selectedBranch.title}
                    </h2>
                  </div>

                  <div className="relative px-0 md:px-0 pb-3 md:pb-4">
                    <div className="flex flex-col gap-2 md:gap-3">
                      <div className="relative overflow-hidden bg-transparent">
                        <div className="relative h-[24rem] sm:h-[29rem] md:h-[34rem] lg:h-[38rem] xl:h-[42rem] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                          <img
                            key={selectedBranch.images[currentImageIndex]}
                            src={selectedBranch.images[currentImageIndex]}
                            alt={`${selectedBranch.title} ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-700 ease-out"
                            style={{
                              animation:
                                'galleryZoom 8s ease-in-out infinite alternate',
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

                          <button
                            onClick={() =>
                              goToImage(selectedIndex, prevImageIndex)
                            }
                            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full border border-white/15 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                            aria-label="Previous image"
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={() =>
                              goToImage(selectedIndex, nextImageIndex)
                            }
                            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 md:p-3 rounded-full border border-white/15 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                            aria-label="Next image"
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>

                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-sm">
                            {selectedBranch.images.map((_, imageIndex) => (
                              <button
                                key={imageIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToImage(selectedIndex, imageIndex);
                                }}
                                className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-200 ${
                                  imageIndex === currentImageIndex
                                    ? 'bg-yellow-500 scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                                aria-label={`Show image ${imageIndex + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 px-2 md:px-4 pb-1 overflow-x-auto scrollbar-hide">
                        {selectedBranch.images.map((image, imageIndex) => (
                          <button
                            key={imageIndex}
                            onClick={() => goToImage(selectedIndex, imageIndex)}
                            className={`group relative overflow-hidden rounded-md transition-all duration-300 flex-shrink-0 ${
                              imageIndex === currentImageIndex
                                ? 'w-20 sm:w-24 md:w-28 ring-2 ring-yellow-400/90 shadow-[0_0_0_2px_rgba(250,204,21,0.25)]'
                                : 'w-16 sm:w-20 md:w-24 opacity-80 hover:opacity-100'
                            }`}
                            aria-label={`Show image ${imageIndex + 1}`}
                          >
                            <img
                              src={image}
                              alt={`${selectedBranch.title} image ${imageIndex + 1}`}
                              className="h-12 sm:h-16 md:h-20 w-full object-cover rounded-md"
                            />
                            {imageIndex === currentImageIndex && (
                              <div className="absolute inset-0 ring-2 ring-inset ring-yellow-400/80 rounded-md" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-2 md:px-6 md:pb-3 pt-2 md:pt-3 text-center">
                    <button
                      onClick={() => handleBranchClick(selectedBranch.slug)}
                      className="group relative w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-2 px-5 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
                      title="Click to view detailed batch timings and availability"
                    >
                      <span className="relative z-10">Check Availability</span>
                      <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-gray-900/95 px-2.5 py-1 text-[10px] md:text-xs text-gray-100 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1">
                        Click to view detailed batch timings and availability
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full px-2 md:px-3 lg:px-4">
            {displayBranches.map((branch) => {
              const originalIndex = branchSections.findIndex(
                (b) => b.slug === branch.slug
              );

              return (
                <div
                  key={branch.slug}
                  className="bg-gray-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden hover:shadow-gray-700/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group relative z-10"
                  onClick={() => navigate(`/floor?branch=${branch.slug}`)}
                >
                  <div className="bg-gray-900 py-3 md:py-4 px-4 md:px-6 border-b border-gray-700 relative">
                    <h2 className="text-xl md:text-2xl font-bold text-white text-center group-hover:text-yellow-400 transition-colors duration-300 px-8">
                      {branch.title}
                    </h2>
                  </div>

                  <div className="relative h-[14rem] sm:h-[17rem] md:h-[19rem] lg:h-[21rem] xl:h-[23rem] bg-black overflow-hidden">
                    <img
                      src={branch.images[currentImageIndexes[originalIndex]]}
                      alt={`${branch.title} ${currentImageIndexes[originalIndex] + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />

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

                  <div className="p-4 md:p-6">
                    <div className="text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/branches?branch=${branch.slug}`);
                        }}
                        className="group relative w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm md:text-base"
                        title="Click to view detailed batch timings and availability"
                      >
                        <span className="relative z-10">
                          Check Availability
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-gray-900/95 px-2.5 py-1 text-[10px] md:text-xs text-gray-100 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-1">
                          Click to view detailed batch timings and availability
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Floor;
