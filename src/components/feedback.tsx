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

    const itemsPerSlide = 3;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % datas.length);
      }, 5000); // Slide every 5 seconds
      return () => clearInterval(interval);
    }, [datas.length]);

    // Duplicate datas for seamless looping
    const extendeddatas = [...datas, ...datas.slice(0, itemsPerSlide)];

    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-10 px-4">
        <h2 className="text-5xl font-bold text-center mb-8">What Our <span className="text-yellow-400">Clients Say</span></h2>
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex % datas.length) * (100 / itemsPerSlide)}%)` }}
          >
            {extendeddatas.map((data, index: number) => (
              <div
                key={index}
                className="w-1/3 p-4 flex-shrink-0"
              >
                <div className="bg-black p-4 rounded-lg border border-yellow-400 shadow-lg text-center min-h-44">
                  <div className='flex flex-row justify-start items-center'>
                    <div className="flex justify-center mb-2 mr-3">
                      <div className="bg-yellow-400 rounded-full">
                        <img 
                          src={`/assets/${data.image}`} 
                          alt={data.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className='flex-row items-start justify-start'>
                      <h3 className="text-lg font-semibold mb-1">{data.name}</h3>
                      <div className="flex justify-start mb-1">
                        <span>⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-start items-start'>
                    <p
                      className="text-gray-400 line-clamp-3 text-left"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
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
      </div>
    );
  };

  export default Feedback;