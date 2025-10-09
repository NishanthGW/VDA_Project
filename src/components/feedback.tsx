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

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) { // lg breakpoint
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % datas.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [datas.length]);

  // Duplicate datas for seamless looping
  const extendeddatas = [...datas, ...datas.slice(0, itemsPerSlide)];

  // Calculate visible items for different screen sizes
  const getVisibleItems = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 px-4 sm:py-10 sm:px-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8">
        What Our <span className="text-yellow-400">Clients Say</span>
      </h2>
      
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ 
            transform: `translateX(-${(currentIndex % datas.length) * (100 / itemsPerSlide)}%)` 
          }}
        >
          {extendeddatas.map((data, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-4 flex-shrink-0"
            >
              <div className="bg-black p-4 sm:p-6 rounded-lg border border-yellow-400 shadow-lg h-full flex flex-col">
                {/* Header with avatar and name */}
                <div className='flex items-start mb-3 sm:mb-4'>
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div className="bg-yellow-400 rounded-full p-0.5">
                      <img 
                        src={`/assets/${data.image}`} 
                        alt={data.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className="text-base sm:text-lg font-semibold mb-1 truncate">{data.name}</h3>
                    <div className="flex">
                      <span className="text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                </div>

                {/* Feedback text */}
                <div className='flex-1'>
                  <p
                    className="text-gray-400 text-sm sm:text-base leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textAlign: 'left'
                    }}
                  >
                    {data.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile dots indicator */}
      <div className="flex justify-center mt-6 sm:hidden">
        <div className="flex space-x-2">
          {datas.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex % datas.length ? 'bg-yellow-400' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;