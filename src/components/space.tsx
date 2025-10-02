import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface BookingFormModalProps {
  onClose: () => void;
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
  ];

  // Image paths
  const images: string[] = [
    '/src/assets/cv1.png',
    '/src/assets/cv2.png',
    '/src/assets/cv3.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);
  const [transitionDirection, setTransitionDirection] = useState<string>('next');

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionDirection('next');
      setNextImageIndex((currentImageIndex + 1) % images.length);
      
      // Wait for animation to complete before updating current index
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      }, 500);
    }, 4000); // Change image every 4 seconds (including animation time)

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  const goToSlide = (index: number) => {
    if (index === currentImageIndex) return;
    
    const direction = index > currentImageIndex ? 'next' : 'prev';
    setTransitionDirection(direction);
    setNextImageIndex(index);
    
    // Wait for animation to complete before updating current index
    setTimeout(() => {
      setCurrentImageIndex(index);
    }, 500);
  };

  const handleBookForRent = () => {
    navigate('/trial-class', { state: { formType: 'rental' } });
  };

  return (
    <div className="bg-[url('/src/assets/bg5.png')] bg-cover bg-center bg-black text-white py-16 px-4">
      <h2 className="text-5xl font-bold text-center mb-16">Our <span className="text-yellow-400">Vibe</span>, Your <span className="text-yellow-400">Vibe</span></h2>
      <div className="max-w-6xl mx-auto">
        {/* Slideshow Container - Increased height */}
        <div className="w-full h-96 md:h-[500px] rounded-lg mb-8 overflow-hidden relative">
          {/* Slides with enhanced animation */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{ 
              backgroundImage: `url(${images[currentImageIndex]})`,
              transform: transitionDirection === 'next' 
                ? 'translateX(0)' 
                : 'translateX(0)'
            }}
          />
          
          {/* Next slide (for animation) */}
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
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-500 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => goToSlide(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            onClick={() => goToSlide((currentImageIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            →
          </button>
          
          {/* Book for Rent Button - positioned on image */}
          <div className="absolute bottom-8 right-8">
            <button 
              onClick={handleBookForRent}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-xl text-base md:text-lg transition-all duration-300 shadow-lg hover:scale-105 border-2 border-yellow-300"
            >
              Book for Rent
            </button>
          </div>
        </div>
        
        {/* Features Grid - First row with 6 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {features.slice(0, 6).map((feature, index) => (
            <div key={index} className="bg-gray-900 p-2 rounded-lg border border-gray-700 text-center hover:bg-gray-800 transition-colors duration-300">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-semibold">{feature.title}</h3>
              <p className="text-white text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Features Grid - Second row with 5 items (centered) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-0 sm:px-12 lg:px-24">
          {features.slice(6).map((feature, index) => (
            <div key={index+6} className="bg-gray-900 p-2 rounded-lg border border-gray-700 text-center hover:bg-gray-800 transition-colors duration-300">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-semibold">{feature.title}</h3>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Space;