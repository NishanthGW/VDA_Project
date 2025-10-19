import React, { useState } from 'react';

const Videos = () => {
  const videos = [
    '239oQ6Xig20',
    'Api4IUAk7rU',
    'sUPfXfqe5KY',
    'or624UFzh6o'
  ];

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const displayedVideos = videos.slice(0, 3);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="relative bg-[url('/assets/bg_celeb.png')] bg-contain bg-center">
      <div className="bg-black/85 w-full container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 pt-12 sm:pt-16 lg:pt-20">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          Featured <span className="text-yellow-400">Videos</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {displayedVideos.map((videoId, index) => (
            <div 
              key={index} 
              className="w-full aspect-video cursor-pointer px-2 sm:px-0"
              onClick={() => handleVideoClick(videoId)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg hover:scale-105 transition-all duration-300 transform hover:shadow-2xl hover:shadow-yellow-400/20">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for the selected video - Responsive */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={closeModal}
          >
            <div 
              className="relative bg-black rounded-lg overflow-hidden"
              style={{ 
                height: '60vh', // Smaller on mobile
                width: 'calc(60vh * (16 / 9))', // Maintain 16:9 aspect ratio
                maxWidth: '95vw', // Ensure it doesn't exceed screen width
                maxHeight: '80vh', // Max height on mobile
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-8 sm:-top-10 right-0 text-white text-3xl sm:text-4xl hover:text-gray-300 bg-black/50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-10"
                onClick={closeModal}
                aria-label="Close video"
              >
                &times;
              </button>
              <div className="w-full h-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;