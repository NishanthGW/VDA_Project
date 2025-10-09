import React from 'react';
import logo from '/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Brand Section - Full width on mobile, 1st column on desktop */}
          <div className="md:col-span-1">
            <div className="text-center md:text-left">
              <div className="py-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  <p>Bringing out</p> 
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-1 mt-1">
                    <span>the</span>
                    <span className="text-yellow-400 italic">Vibe</span>
                    <span>in yourself</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links - 2nd column on desktop */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Services</li>
              <li className="hover:text-white cursor-pointer transition-colors">Classes</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          {/* Contact Info - 3rd column on desktop */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm sm:text-base">
              <p>Phone: +91 9566619974</p>
              <p>Email: vdacoimbatore@gmail.com</p>
              <p>Address: Above CSB Bank, Sathy road, Ganapathy - 641006</p>
            </div>
          </div>

          {/* Logo Section - 4th column on desktop */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center py-4">
              <img 
                src={logo} 
                alt="Vibe Dance Academy logo" 
                className="w-48 sm:w-60 h-auto max-w-full" 
              />
            </div>          
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-700 text-xs sm:text-sm">
          © 2025 Dance Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;