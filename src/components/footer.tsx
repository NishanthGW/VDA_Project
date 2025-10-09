import React from 'react';
import logo from '/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className='h-full flex-row items-center justify-center'>
          <div className="flex-row justify-center items-center py-8 text-4xl font-extrabold text-white leading-tigh ">
            <p>Bringing out</p> 
            <p className='flex text'>the <p className='text-yellow-400 indent-4 italic'> Vibe</p><p className='indent-4 '> in yourself</p></p>
             
          </div>
        </div>
        <div className="flex flex-col justify-start items-center mb-4 md:mb-0">
          <h4 className="text-white text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Services</li>
            <li>Classes</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <h4 className="text-white text-lg mb-2">Contact Us</h4>
          <p>Phone: +91 9566619974</p>
          <p>Email: vdacoimbatore@gmail.com</p>
          <p>Address: Above CSB Bank, Sathy road, Ganapathy - 641006
          </p>
        </div>
        <div className="mb-4 md:mb-0">
          {/* <h3 className="text-white text-xl font-bold mb-2">VIBE DANCE ACADEMY</h3> */}
          <div className='flex justify-center items-center py-4'><img src={logo} alt="Vibe Dance Academy logo" className="w-60 h-26" /></div>          
          {/* <div className="flex space-x-2">
            <span>🇫🇧</span>
            <span>🇮🇳</span>
            <span>🇹🇼</span>
          </div> */}
        </div>
      </div>
      <div className="text-center mt-12 text-sm">
        © 2025 Dance Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;