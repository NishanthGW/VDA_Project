import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Career = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleApplicationAlert = () => {
    toast.error("Applications are currently closed. Please contact our admin at 9566619974 for more information.", {
      duration: 5000,
      position: 'top-center',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #ef4444',
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElement = parallaxRef.current;
      if (parallaxElement) {
        const rate = scrolled * -0.5;
        parallaxElement.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const careerOpportunities = [
    {
      title: "Dance Instructor",
      department: "Instruction",
      type: "Full-time",
      location: "New York, NY",
      description: "We're looking for experienced dance instructors specializing in hip-hop, contemporary, or ballet to join our team."
    },
    {
      title: "Front Desk Associate",
      department: "Administration",
      type: "Part-time",
      location: "New York, NY",
      description: "Join our front desk team to provide exceptional service to our students and manage studio operations."
    },
    {
      title: "Choreographer",
      department: "Creative",
      type: "Contract",
      location: "Remote Possible",
      description: "Create innovative dance routines for our performance teams and competitive dancers."
    },
    {
      title: "Studio Manager",
      department: "Management",
      type: "Full-time",
      location: "New York, NY",
      description: "Oversee daily operations, staff management, and studio programming at our flagship location."
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      icon: "💵",
      description: "We offer industry-leading compensation packages for all positions."
    },
    {
      title: "Flexible Schedule",
      icon: "🕒",
      description: "Balance your work and personal life with our flexible scheduling options."
    },
    {
      title: "Professional Development",
      icon: "📚",
      description: "Continuous learning opportunities with workshops and training sessions."
    },
    {
      title: "Performance Opportunities",
      icon: "🌟",
      description: "Showcase your talent in our regular studio performances and events."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 mt-12">
      <TopBar />
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-96 overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Join Our Team</h1>
              <p className="text-xl md:text-2xl text-white">Build your career at Vibe Dance Academy</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Why Work With Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8"
          >
            At Vibe Dance Academy, we believe that our team is our greatest asset. We're committed to creating 
            an environment where passionate dance professionals can thrive, grow, and inspire the next generation 
            of dancers.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onClick={() => navigate('/about')}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full inline-block hover:bg-yellow-500 transition-colors duration-300"
          >
            Our Mission
          </motion.button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-800 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-700 p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Current Openings
          </motion.h2>
          
          <div className="space-y-6">
            {careerOpportunities.map((job, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-4 border-yellow-400 bg-gray-800 p-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 mb-3">
                  <span className="bg-gray-600 text-gray-200 py-1 px-3 rounded-full text-sm">{job.department}</span>
                  <span className="bg-gray-600 text-gray-200 py-1 px-3 rounded-full text-sm">{job.type}</span>
                  <span className="bg-gray-600 text-gray-200 py-1 px-3 rounded-full text-sm">{job.location}</span>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <button 
                  onClick={handleApplicationAlert}
                  className="bg-white text-black py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-4 md:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-lg mb-8">
            Send us your resume and cover letter, and let us know why you'd be a great fit for Vibe Dance Academy.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleApplicationAlert}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full"
          >
            Submit General Application
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Vibe Dance Academy</h3>
            <p className="text-gray-400">Inspiring dancers since 2015</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">vdacoimbatore@gmail.com</p>
            <p className="text-gray-400">+91 9566619974</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vibe_dance_academy__?igsh=MTI4NXZqdm9sdmV5cQ==" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">Instagram</a>
              <a href="https://www.facebook.com/share/1H8MCdEwPe/?mibextid=wwXIfr" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">Facebook</a>
              <a href="https://youtube.com/@vibe_dance_academy?si=fVWvQHTok5bAKM7P" className="text-gray-400 hover:text-red-600 transition-colors duration-300">Youtube</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Vibe Dance Academy. All rights reserved.</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Career;