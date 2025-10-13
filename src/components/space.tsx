import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const Space = () => {
  const navigate = useNavigate();
  const features: Feature[] = [
    { icon: '📐', title: 'Room Measurement', desc: '1500 sq. ft.' },
    { icon: '❄️', title: 'Fully Air Conditioned', desc: '' },
    { icon: '👕', title: 'Trial Room', desc: '' },
    { icon: '🚻', title: 'Attached Rest Rooms', desc: '' },
    { icon: '💧', title: 'RO Water', desc: '' },
    { icon: '🖼️', title: 'Multiple Video Backgrounds', desc: '' },
    { icon: '🎨', title: 'Vibrant Ambiance', desc: '' }, 
    { icon: '🎵', title: 'Rhythmic Sound System', desc: '' },
    { icon: '📹', title: '24/7 CCTV Surveillance', desc: '' },
    { icon: '📶', title: 'Unlimited WiFi', desc: '' },
    { icon: '🔋', title: 'UPS Facility', desc: '' },
    { icon: '🏍️', title: 'Parking Facility', desc: '' }, // Added parking facility
  ];

  // Image paths
  const images: string[] = [
    '/assets/cv1.png',
    '/assets/cv2.png',
    '/assets/cv3.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);
  const [transitionDirection, setTransitionDirection] = useState<string>('next');

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionDirection('next');
      setNextImageIndex((currentImageIndex + 1) % images.length);
      
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const goToSlide = (index: number) => {
    if (index === currentImageIndex) return;
    
    const direction = index > currentImageIndex ? 'next' : 'prev';
    setTransitionDirection(direction);
    setNextImageIndex(index);
    
    setTimeout(() => {
      setCurrentImageIndex(index);
    }, 500);
  };

  const handleBookForRent = () => {
    navigate('/trial-class', { state: { formType: 'rental' } });
  };

  return (
    <div className="bg-[url('/assets/bg5.png')] bg-cover bg-center bg-black text-white py-8 md:py-16 px-4">
      {/* Header */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 px-2">
        Our <span className="text-yellow-400">Vibe</span>, Your <span className="text-yellow-400">Vibe</span>
      </h2>
      
      <div className="max-w-6xl mx-auto">
        {/* Slideshow Container - Mobile Optimized */}
        <div className="w-full h-64 md:h-96 lg:h-[500px] rounded-xl md:rounded-lg mb-6 md:mb-8 overflow-hidden relative shadow-2xl">
          {/* Current Slide */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{ 
              backgroundImage: `url(${images[currentImageIndex]})`,
              transform: transitionDirection === 'next' 
                ? 'translateX(0)' 
                : 'translateX(0)'
            }}
          />
          
          {/* Next Slide (for animation) */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
              transitionDirection === 'next' 
                ? 'translate-x-full' 
                : '-translate-x-full'
            }`}
            style={{ 
              backgroundImage: `url(${images[nextImageIndex]})`,
              transform: transitionDirection === 'next' 
                ? 'translateX(100%)' 
                : 'translateX(-100%)'
            }}
          />
          
          {/* Dots Indicator - Mobile Optimized */}
          <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex justify-center gap-1.5 md:gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-500 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows - Mobile Optimized */}
          <button 
            onClick={() => goToSlide(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 md:p-2 rounded-full transition-all duration-300 text-lg md:text-base"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            onClick={() => goToSlide((currentImageIndex + 1) % images.length)}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 md:p-2 rounded-full transition-all duration-300 text-lg md:text-base"
            aria-label="Next slide"
          >
            →
          </button>
          
          {/* Book for Rent Button - Mobile Optimized */}
          <div className="absolute bottom-3 md:bottom-8 right-3 md:right-8">
            <button 
              onClick={handleBookForRent}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 md:py-3 md:px-8 rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg hover:scale-105 border-2 border-yellow-300 whitespace-nowrap"
            >
              Book for Rent
            </button>
          </div>
        </div>
        
        {/* Features Grid - Mobile Optimized */}
        <div className="space-y-4 md:space-y-8">
          {/* First row - Responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {features.slice(0, 6).map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-700 text-center hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg h-28 md:h-32 flex flex-col justify-center"
              >
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{feature.icon}</div>
                <h3 className="text-xs md:text-sm font-semibold leading-tight md:leading-normal">
                  {feature.title}
                </h3>
                {feature.desc && (
                  <p className="text-white text-xs mt-1">{feature.desc}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Second row - Centered with responsive padding */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 px-0 sm:px-4 lg:px-12">
            {features.slice(6).map((feature, index) => (
              <div 
                key={index+6} 
                className="bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-700 text-center hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg h-28 md:h-32 flex flex-col justify-center"
              >
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{feature.icon}</div>
                <h3 className="text-xs md:text-sm font-semibold leading-tight md:leading-normal">
                  {feature.title}
                </h3>
                {feature.desc && (
                  <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Space;