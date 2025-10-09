import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CounterItem {
  target: number;
  suffix: string;
  label: string;
}

const AnimatedCounter = ({ 
  target, 
  duration = 2000, 
  prefix = '', 
  suffix = '' 
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
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
        }
      },
      {
        threshold: 0.3, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px', // Trigger slightly earlier
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [target, duration, hasStarted]);

  return (
    <motion.span 
      ref={counterRef}
      className="block font-bold text-yellow-400 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{hasStarted ? count.toLocaleString() : 0}{suffix}
    </motion.span>
  );
};

const Counters = () => {
  const counterData: CounterItem[] = [
    { target: 300, suffix: "K+", label: "YouTube Subscribers" },
    { target: 150, suffix: "K+", label: "Instagram Followers" },
    { target: 70, suffix: "K+", label: "Facebook Followers" },
    { target: 10000, suffix: "+", label: "Students Trained" }
  ];

  return (
    <div className="w-full bg-black px-4 sm:px-[5%] py-6 sm:py-8 lg:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
        {counterData.map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center p-3 sm:p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          >
            <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            <span className="text-xs xs:text-sm sm:text-base md:text-lg text-white mt-2 sm:mt-3 block leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Counters;