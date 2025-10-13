import React, { useEffect, useState } from 'react';

const Feedback = () => {
  const datas = [
    { 
      name: 'Ragul Selvaraj', 
      image: 'rahulS.png',
      text: 'The best dance academy in Coimbatore! Amazing instructors, vibrant energy, and a perfect place to learn and grow as a dancer. Whether you\'re a beginner or a pro, this studio brings out the best in you. Highly recommend it for anyone looking to groove with passion! Step in, dance out, and shine! ✨ The best vibes in Coimbatore!' 
    },
    { 
      name: 'Swaroob S S', 
      image: 'swaroobSS.png',
      text: 'I\'m so glad I found the best dance academy in Coimbatore. Instructors are fantastic passionate, knowledgeable, and always ready to offer personalized tips to help you improve. The atmosphere is super friendly, making it a great place to not only learn but also feel comfortable and encouraged.' 
    },
    { 
      name: 'Hariharan Chandrasekaran', 
      image: 'hariharanC.png',
      text: 'I absolutely love Vibe Dance Academy!@Coimbatore. The instructors Darwin, Prakash, Chan and remaining all are so talented, friendly, and make each class enjoyable. My skills have improved so much since joining, and I always look forward to coming back. Highly recommend for dancers of all levels!' 
    },
    { 
      name: 'Srinidhi Sridhar', 
      image: 'srinidhiS.png',
      text: 'The dance instructor was exceptionally kind and patient with us, creating a welcoming and supportive environment. The academy\'s atmosphere was vibrant and energetic, making each session enjoyable and motivating. The studio was well-equipped, and the staff were friendly and professional, contributing to a positive learning environment. Overall, the academy offered a holistic and enriching dance education that nurtured both technical skills and a passion for dance.' 
    },
    { 
      name: 'Vishnupriya P', 
      image: 'vishnupriyaP.png',
      text: 'I am having a great experience with Vibe Dance Academy in Coimbatore. The master here focus on each student individually, so even if you are a beginner youll feel comfortable and supported. The classes are well-structured, and the studio itself has a vibe!! If you are looking to learn dance, Vibe Dance Academy is the place to go!!!!' 
    },
    { 
      name: 'Sathya R', 
      image: 'sathyaR.png',
      text: 'Vibe dance academy is one of the best dance academy in coimbatore. They are teaching dance very properly and starting with basic warmup that\'s very useful for beginners. And their dance class atmosphere looking like ah comfortable place to us and their approaches being like our family. We can learn morething and feel fun at the time of dance practicing. Literally Vibe dance academy is ah fantastic one💙✨️' 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= datas.length - itemsPerSlide) {
          return 0; // Loop back to start
        }
        return prevIndex + 1;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [datas.length, isPaused, itemsPerSlide]);

  // Navigation functions
  const nextSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= datas.length - itemsPerSlide) {
        return 0;
      }
      return prevIndex + 1;
    });
    
    // Resume auto-slide after manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return datas.length - itemsPerSlide;
      }
      return prevIndex - 1;
    });
    
    // Resume auto-slide after manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setIsPaused(true);
    setCurrentIndex(index);
    
    // Resume auto-slide after manual interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Calculate the maximum index to prevent empty spaces
  const maxIndex = Math.max(0, datas.length - itemsPerSlide);

  return (
    <div 
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 px-4 sm:py-10 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8">
        What Our <span className="text-yellow-400">Clients Say</span>
      </h2>
      
      <div className="max-w-6xl mx-auto relative">
        {/* Navigation Arrows - Show only when there are more items */}
        {datas.length > itemsPerSlide && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous feedback"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next feedback"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden px-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` 
            }}
          >
            {datas.map((data, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-4 flex-shrink-0"
              >
                <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-yellow-400/50 shadow-lg h-full flex flex-col hover:shadow-yellow-400/30 hover:border-yellow-400 transition-all duration-300 group">
                  {/* Header with avatar and name */}
                  <div className='flex items-start mb-3 sm:mb-4'>
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-0.5 group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-gray-800 rounded-full p-0.5">
                          <img 
                            src={`/assets/${data.image}`} 
                            alt={data.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className="text-base sm:text-lg font-semibold mb-1 text-white truncate">
                        {data.name}
                      </h3>
                      <div className="flex">
                        <span className="text-yellow-400 text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback text */}
                  <div className='flex-1'>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-4 text-left">
                      {data.text}
                    </p>
                  </div>

                  {/* Read More Indicator */}
                  <div className="mt-3 pt-3 border-t border-gray-600/50">
                    <span className="text-yellow-400/70 text-xs font-medium">
                      💫 Verified Student
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {datas.length > 1 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex space-x-2 bg-gray-800/50 rounded-full p-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to feedback ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto mt-4 px-2">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
            style={{ 
              width: isPaused ? '100%' : `${(currentIndex / maxIndex) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Controls Info */}
      {/* <div className="text-center mt-4 text-sm text-gray-400">
        <p>Auto-sliding {isPaused ? 'paused' : 'active'} • Use arrows or dots to navigate</p>
      </div> */}
    </div>
  );
};

export default Feedback;