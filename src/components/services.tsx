import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const services = [
    { icon: '👥', title: 'Regular Classes', desc: 'Daily dance classes for all skill levels' },
    { icon: '💖', title: 'Wedding Events', desc: 'Choreography for your special day' },
    { icon: '🏢', title: 'Corporate Events', desc: 'Team building through dance' },
    { icon: '⭐', title: 'Sangeet Events', desc: 'Traditional celebration choreography' },
    { icon: '🎁', title: 'Puberty Functions', desc: 'Special celebration dances' },
    { icon: '⚡', title: 'Flash Mobs', desc: 'Flash performance visualization' },
    { icon: '🎓', title: 'School Choreographies', desc: 'Educational institution performances' },
    { icon: '🏠', title: 'Home Tuitions', desc: 'Personalized training at home' },
    { icon: '💻', title: 'Online Classes', desc: 'Virtual dance training sessions' },
    { icon: '🏘️', title: 'Apartment Classes', desc: 'Community-based dance lessons' },
    { icon: '🏆', title: 'Competition Jury', desc: 'Professional judging services' },
    { icon: '🎥', title: 'Video Productions', desc: 'Professional dance videos' },
  ];

  const handleServiceClick = (serviceTitle: string) => {
    // Navigate to Events page with the service title as a parameter
    navigate('/events', { state: { service: serviceTitle } });
  };

  return (
    <div className="relative bg-[url('/src/assets/bg1.png')] bg-cover bg-center text-white z-0">
      <div className=' bg-black/85 text-white py-10 px-4 z-10'>
        <h2 className="z-100 text-5xl font-bold text-center text-white mb-16">Our <span className="text-yellow-400">Services</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative bg-gray-900 rounded-lg border border-yellow-400 shadow-lg text-center group transition-all duration-300
                        hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] hover:hover:scale-105 cursor-pointer"
              onClick={() => handleServiceClick(service.title)}
            >
              {/* Animated border overlay */}
              <div className="absolute -inset-[2px] rounded-lg overflow-hidden z-0">
                <div className="absolute inset-0 bg-[conic-gradient(from_var(--angle),transparent,white,transparent)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_1.5s_linear_infinite] transition-opacity duration-300"></div>
              </div>
              <div className="relative z-10 p-6 bg-gray-900 rounded-[calc(0.5rem-2px)] h-full transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;