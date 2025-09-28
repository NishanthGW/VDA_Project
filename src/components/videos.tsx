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
    <div className="bg-gray-900 pt-20 pb-28">
      <div className="container mx-auto px-4">
        <h1 className="text-white text-4xl font-bold ml-24 mb-16 text-center">Featured Videos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayedVideos.map((videoId, index) => (
            <div 
              key={index} 
              className="w-full aspect-video cursor-pointer"
              onClick={() => handleVideoClick(videoId)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg hover:scale-105 transition-all duration-300">
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

        {/* Modal for the selected video (75% height, maintaining 16:9 aspect ratio) */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="relative"
              style={{ 
                height: '75vh', // 75% of viewport height
                width: 'calc(75vh * (16 / 9))', // Maintain 16:9 aspect ratio
                maxWidth: '100vw', // Ensure it doesn't exceed screen width
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
                onClick={closeModal}
              >
                &times;
              </button>
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
        )}
      </div>
    </div>
  );
};

export default Videos;