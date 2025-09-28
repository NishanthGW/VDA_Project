import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Founder1 {
  name: string;
  role: string;
  bio: string;
  image: string;
  danceStyle: string;
  achievements: string[];
}

const FounderSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const founder: Founder1 = {
    name: "Darwin E S",
    role: "Artistic Director & Founder",
    bio: "With over 20 years of professional dance experience, Darwin has performed on world stages from Broadway to Paris. His passion for blending traditional and contemporary dance forms led to the creation of RhythmMotion.",
    image: "/src/assets/founder.png",
    danceStyle: "Werstern Dance",
    achievements: [
      "Former principal dancer at New York Dance Theatre",
      "Choreography Award winner 2019",
      "Certified Dance Instructor (IDTA)"
    ]
  };

  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Founder</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            A visionary dancer who turned passion into a thriving dance community
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative max-w-2xl"
          >
            {/* Main card */}
            <div className="bg-gray-800 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-500">
              {/* Image container */}
              <motion.div 
                className="relative -mt-16 mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </motion.div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                <p className="text-yellow-400 font-medium mb-4">{founder.role}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-900/30 text-yellow-300 text-sm mb-6">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                  {founder.danceStyle}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">{founder.bio}</p>
                
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="font-semibold mb-3 text-yellow-300">Notable Achievements</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-300">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 -left-4 w-28 h-28 rounded-full bg-yellow-500/10 blur-xl"></div>
            <div className="absolute -z-10 bottom-8 -right-4 w-24 h-24 rounded-full bg-gray-600/10 blur-xl"></div>
          </motion.div>
        </div>

        {/* Animated decorative elements */}
        <motion.div 
          className="absolute left-10 bottom-20 w-6 h-6 rounded-full bg-yellow-500/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-1/4 top-40 w-10 h-10 rounded-full bg-gray-500/20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default FounderSection;