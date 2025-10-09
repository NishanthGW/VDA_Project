import { FaPhoneAlt, FaFacebookF, FaInstagram, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '/assets/logo.png';


const TopBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrialClick = () => {
  navigate('/trial-class', { state: { formType: 'trial' } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className={`w-full fixed top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0f0e11] shadow-xl py-0' : 'bg-gradient-to-b from-[#1a191d] to-[#232225] py-1'}`}>
      {/* Animated decorative element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 opacity-80"></div>
      
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 bg-gradient-to-r from-[#2d2b30] to-[#1f1e22] relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-0 w-28 h-28 bg-yellow-400 rounded-full filter blur-xl opacity-10 animate-pulse-slow"></div>
          <div className="absolute right-10 bottom-0 w-24 h-24 bg-purple-500 rounded-full filter blur-xl opacity-10 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="flex items-center space-x-6 z-10">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-gray-500 rounded-full group-hover:scale-110 group-hover:bg-yellow-400 transition-all duration-300">
              <FaPhoneAlt className="text-sm text-black" />
            </div>
            <span className="text-gray-300 text-base font-medium group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-105">9566619974</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-gray-500 rounded-full group-hover:scale-110 group-hover:bg-yellow-400 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-300 text-base font-medium group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-105">vdacoimbatore@gmail.com</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 z-10">
          <div className="flex items-center space-x-3">
            <a href="https://www.facebook.com/share/1H8MCdEwPe/?mibextid=wwXIfr" className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1 p-2 bg-gray-800 rounded-full">
              <FaFacebookF size={14} />
            </a>
            <a href="https://www.instagram.com/vibe_dance_academy__?igsh=MTI4NXZqdm9sdmV5cQ==" className="text-gray-300 hover:text-pink-500 transition-all duration-300 transform hover:-translate-y-1 p-2 bg-gray-800 rounded-full">
              <FaInstagram size={16} />
            </a>
            <a href="https://youtube.com/@vibe_dance_academy?si=fVWvQHTok5bAKM7P" className="text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:-translate-y-1 p-2 bg-gray-800 rounded-full">
              <FaYoutube size={16} />
            </a>
          </div>
          <div className="h-4 w-px bg-gray-600"></div>
          <button 
            onClick={handleTrialClick} 
            className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl group"
          >
            <span className="relative z-10">Join Our Class</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow">
              <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-6 py-3 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute right-0 top-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <div className="relative group">
              <Link to="/">
                <img src={logo} alt="Vibe Dance Academy logo" className="h-10 md:h-12 transition-all duration-500 group-hover:scale-105" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link 
              to="/"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              Home
            </Link>
            <Link 
              to="/achievements"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              Achievements
            </Link>
            <Link 
              to="/about"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              About Us
            </Link>
            <Link 
              to="/career"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              Career
            </Link>
            <Link 
              to="/events"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              Events
            </Link>
            <Link 
              to="/floor"
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-white hover:text-yellow-400 hover:bg-gray-800"
            >
              Branches
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-3 rounded-md bg-gray-800/90 hover:bg-yellow-500 hover:text-black transition-all duration-300 relative group z-50"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            <span className="absolute -inset-1 bg-yellow-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out relative z-40 ${isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col space-y-2 pt-4 bg-black/90 backdrop-blur-sm rounded-lg border border-gray-700">
            <Link 
              to="/"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/achievements"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Achievements
            </Link>
            <Link 
              to="/about"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/career"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Career
            </Link>
            <Link 
              to="/events"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/branches"
              className="text-white hover:text-yellow-400 transition-all duration-300 py-4 px-6 rounded-md hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Branches
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;