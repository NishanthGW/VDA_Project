import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const About = () => {
  const navigate = useNavigate();
  
  // Parallax effect for header
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        headerRef.current.style.transform = `translate3d(0px, ${rate}px, 0px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const coreValues = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in dance education and performance."
    },
    {
      title: "Creativity",
      description: "We encourage artistic expression and innovation in all dance forms."
    },
    {
      title: "Community",
      description: "We build a supportive and inclusive environment for all dancers."
    },
    {
      title: "Passion",
      description: "We share our love for dance and inspire it in others."
    },
    {
      title: "Growth",
      description: "We foster personal and artistic development at every level."
    },
    {
      title: "Respect",
      description: "We honor the traditions of dance while embracing its evolution."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-20 mt-12">

      <TopBar />
      <div 
        ref={headerRef}
        className="h-96 relative overflow-hidden bg-black flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            transform: "translate3d(0px, 0px, 0px)"
          }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About Vibe Dance Academy</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Where passion meets movement and dreams take center stage
          </p>
        </div>
      </div>

      {/* Our Vision Section */}
      <section 
        ref={visionRef}
        className={`py-16 px-4 md:px-8 transition-all duration-700 ${visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="assets/d_img.jpg" 
                alt="Dance vision" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-gray-300 text-lg mb-4">
                At Vibe Dance Academy, we envision a world where dance is a universal language that connects people, 
                transcends boundaries, and empowers individuals to express their authentic selves.
              </p>
              <p className="text-gray-300 text-lg">
                We strive to be a catalyst for artistic innovation, nurturing the next generation of dancers 
                who will shape the future of performing arts with creativity, technical excellence, and passion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section 
        ref={missionRef}
        className={`py-16 px-4 md:px-8 bg-gray-800 transition-all duration-700 ${missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-4">
                Our mission is to provide exceptional dance education that inspires creativity, builds confidence, 
                and develops technical proficiency in a supportive and inclusive environment.
              </p>
              <p className="text-gray-300 text-lg">
                We are committed to offering diverse dance styles, experienced instruction, and performance 
                opportunities that allow every student to discover their unique artistic voice and thrive as dancers.
              </p>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0 order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Dance mission" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section 
        ref={valuesRef}
        className={`py-16 px-4 md:px-8 transition-all duration-700 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-yellow-500 transform transition-transform duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Rhythm?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join the Vibe Dance Academy family and experience the joy of movement, the power of expression, 
            and the warmth of our dance community.
          </p>
          <button 
            onClick={() => navigate('/trial-class', { state: { formType: 'trial' } })}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;