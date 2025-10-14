import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Founder: React.FC = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  // Reduced parallax effect for mobile
  const yMobile = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yTextMobile = useTransform(scrollYProgress, [0, 1], [0, -15]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1] 
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.5,
        ease: "easeOut" 
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, scale }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 md:py-20 overflow-hidden"
    >
      {/* Background decorative elements with parallax */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-soft-light filter blur-3xl"
        ></motion.div>
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"
        ></motion.div>
      </div>
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-10 md:mb-16"
        >
          Meet Our <span className="text-yellow-400">Visionary</span>
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-12">
          {/* Image with reduced parallax on mobile */}
          <motion.div
            style={{ 
              y: typeof window !== 'undefined' && window.innerWidth < 768 ? yMobile : y 
            }}
            variants={imageVariants}
            className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group mb-6 lg:mb-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-600/10 z-10"></div>
            <img
              src="/assets/founder.png"
              alt="Founder"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Decorative frame */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/30 transition-all duration-500 rounded-2xl"></div>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </motion.div>
          
          <motion.div 
            variants={childVariants} 
            className="flex-1 text-center lg:text-left"
          >
            <motion.h3 
              style={{ 
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? yTextMobile : useTransform(scrollYProgress, [0, 1], [0, -30])
              }}
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4"
            >
              Darwin E S
            </motion.h3>
            
            <motion.p 
              style={{ 
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? yTextMobile : useTransform(scrollYProgress, [0, 1], [0, -15])
              }}
              className="text-xl text-yellow-400 mb-6"
            >
              Founder & Artistic Director
            </motion.p>
            
            <div className="relative">
              <div className="absolute -left-4 top-0 h-12 w-1 bg-yellow-400 rounded-full hidden lg:block"></div>
              <motion.p 
                style={{ 
                  y: typeof window !== 'undefined' && window.innerWidth < 768 ? yTextMobile : useTransform(scrollYProgress, [0, 1], [0, -10])
                }}
                className="text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-lg"
              >
                Darwin is a passionate choreographer and dance educator with over 8 years of experience 
                in the dance industry. His vision to create a vibrant community for dancers of all levels 
                led to the founding of our studio. Darwin's innovative choreography and dedication to 
                fostering creativity have earned him numerous accolades and a loyal following.
              </motion.p>
            </div>
            
            <motion.div 
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                variants={buttonVariants}
                onClick={() => navigate('/about')}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg"
              >
                Learn More About Our Mission
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                onClick={() => navigate('/')}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 border-2 border-yellow-400/30 text-yellow-400 font-semibold rounded-xl backdrop-blur-sm"
              >
                View Achievements
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Founder;