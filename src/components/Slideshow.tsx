import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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
      className="block text-5xl font-bold text-white"
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
    <div className="relative w-full h-[85vh] overflow-hidden bg-black pt-14">
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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
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
          className="absolute inset-0 flex items-end justify-start z-10 px-[10%] py-16"
        >
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-6 text-gray-100 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              {slides[currentSlide].description}
            </p>
            {/* <motion.button 
              className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-xl hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slides[currentSlide].buttonText}
            </motion.button> */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-yellow-400 w-8' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;