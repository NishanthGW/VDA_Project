import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedCounter = ({ target, duration = 2000, prefix = '', suffix = '' }: { target: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.ceil(start));
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <motion.span 
      className="block text-2xl md:text-4xl lg:text-5xl font-bold text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

const Slideshow = () => {
  const slides = [
    {
      image: '/assets/ss1.png',
      title: 'Discover Your Rhythm',
      description: 'Join our world-class dance academy and unleash your potential through movement and expression.',
      buttonText: 'Start Dancing Today'
    },
    {
      image: '/assets/ss2.png',
      title: 'Master Your Moves',
      description: 'Learn from professional instructors and take your dance skills to the next level.',
      buttonText: 'Join Our Classes'
    },
    {
      image: '/assets/ss3.png',
      title: 'Express Through Dance',
      description: 'Find your unique style and build confidence through the art of dance.',
      buttonText: 'Explore Programs'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');

  const nextSlide = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] overflow-hidden bg-black pt-14">
      {/* Image Slideshow */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={`image-${currentSlide}`}
          custom={direction}
          initial={{ x: direction === 'right' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: direction === 'right' ? '-100%' : '100%' }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
          className="absolute w-full h-full"
        >
          <div className="w-full h-full relative">
            <img 
              src={slides[currentSlide].image} 
              alt={`Slide ${currentSlide + 1}`} 
              className="w-full h-full object-cover"
              // Add error handling for broken images
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.backgroundColor = '#1f2937'; // Fallback background color
                target.alt = 'Image not available';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-black/55"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
          className="absolute inset-0 flex items-end justify-start z-10 px-4 sm:px-6 md:px-8 lg:px-[10%] pb-6 sm:pb-12 md:pb-16"
        >
          <div className="max-w-full sm:max-w-xl md:max-w-2xl w-full">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-6 text-gray-100 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-8 text-white/90 leading-relaxed max-w-full sm:max-w-lg">
              {slides[currentSlide].description}
            </p>
            {/* <motion.button 
              className="bg-yellow-400 text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg sm:rounded-xl hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slides[currentSlide].buttonText}
            </motion.button> */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - Responsive sizing */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators - Responsive positioning and sizing */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-1 sm:gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-yellow-400 w-6 sm:w-8' 
                : 'bg-white/50 w-3 sm:w-4'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;