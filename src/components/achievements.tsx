import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, type Variants } from 'framer-motion';
import { Parallax } from 'react-parallax';

interface Achievement {
  title: string;
  description: string;
  year: string;
}

const achievements: Achievement[] = [
  {
    title: 'National Dance Championship',
    description: 'Won first place in the National Hip-Hop Dance Competition',
    year: '2024',
  },
  {
    title: 'International Recognition',
    description: "Featured in Global Dance Magazine's Top 10 Academies",
    year: '2023',
  },
  {
    title: 'Community Impact Award',
    description: 'Recognized for outstanding contribution to local youth through dance',
    year: '2022',
  },
  {
    title: 'Best Choreography',
    description: 'Received award for innovative choreography at DanceFest',
    year: '2021',
  },
];

const Achievements: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <Parallax
      bgImage="/assets/bg_ach.jpg"
      strength={300}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="flex bg-black bg-opacity-70 py-8 md:py-16 min-h-screen md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 tracking-tight my-6 md:my-10 px-4 pt-20">
              Vibe Dance Academy Achievements
            </h2>
            <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-300 px-4">
              Celebrating our journey of excellence in dance
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2 sm:px-0"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-yellow-400 flex flex-col h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-1 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 line-clamp-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <span className="inline-block bg-yellow-400 text-black font-bold py-1 md:py-2 px-3 md:px-4 rounded-full text-sm md:text-base">
                      {achievement.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Parallax>
  );
};

export default Achievements;