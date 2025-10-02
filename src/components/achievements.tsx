import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, type Variants } from 'framer-motion';
import { Parallax } from 'react-parallax';
import TopBar from './TopBar';

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

const Achievement: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      className="bg-cover bg-center h-[100vh] pt-20"
    >
      {/* <TopBar /> */}
      <div className="flex bg-black bg-opacity-70 py-16 h-[90vh] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-yellow-400 tracking-tight my-10">
              Vibe Dance Academy Achievements
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Celebrating our journey of excellence in dance
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className=" bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-yellow-400"
              >
                <div className="flex flex-col items-around justify-between text-center h-full">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{achievement.description}</p>
                  </div>
                  <div className='flex justify-center items-end'>
                    <span className="inline-block bg-yellow-400 text-black font-bold py-1 px-3 rounded-full text-sm">
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

export default Achievement;