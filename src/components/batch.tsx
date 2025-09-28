import React from 'react';

const Batch = () => {
  return (
    <div className="relative w-full h-[60vh] bg-gray-800">
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-10">
        <div className="text-center w-full px-4">
          <h2 className="text-4xl font-bold mb-6 text-white">Choose Your Batch</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full max-w-6xl mx-auto">
            {/* Coimbatore Branch */}
            <div className="group relative h-60 w-full md:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-[url('/src/assets/covai.png')] bg-cover bg-center 
                          transition-all duration-500 ease-in-out transform group-hover:scale-110"
              />
              <div className="flex flex-col p-4 items-start justify-end rounded-lg shadow-lg h-60 bg-black/50 relative z-10">
                <p className='text-white text-xl font-bold'>Coimbatore</p>
                <p className='text-white text-sm'>123 Dance Street, Coimbatore</p>
                <p className='text-white text-sm'>Hours: 6 AM - 9 PM</p>
                <button className="mt-2 bg-black/40 hover:bg-gray-700 backdrop-blur-sm text-white py-2 px-4 rounded border-[1px] border-white transition-colors duration-300">
                  Select Branch
                </button>
              </div>
            </div>
            
            {/* Palladam Branch */}
            <div className="group relative h-60 w-full md:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-[url('/src/assets/palladam.png')] bg-cover bg-center 
                          transition-all duration-500 ease-in-out transform group-hover:scale-110"
              />
              <div className="flex flex-col p-4 items-start justify-end rounded-lg shadow-lg h-60 bg-black/50 relative z-10">
                <p className='text-white text-xl font-bold'>Palladam</p>
                <p className='text-white text-sm'>123 Dance Street, Palladam</p>
                <p className='text-white text-sm'>Hours: 6 AM - 9 PM</p>
                <button className="mt-2 bg-black/40 hover:bg-gray-700 backdrop-blur-sm text-white py-2 px-4 rounded border-[1px] border-white transition-colors duration-300">
                  Select Branch
                </button>
              </div>
            </div>
            
            {/* Tiruppur Branch */}
            <div className="group relative h-60 w-full md:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-[url('/src/assets/tiruppur.png')] bg-cover bg-center 
                          transition-all duration-500 ease-in-out transform group-hover:scale-110"
              />
              <div className="flex flex-col p-4 items-start justify-end rounded-lg shadow-lg h-60 bg-black/50 relative z-10">
                <p className='text-white text-xl font-bold'>Tiruppur</p>
                <p className='text-white text-sm'>123 Dance Street, Tiruppur</p>
                <p className='text-white text-sm'>Hours: 6 AM - 9 PM</p>
                <button className="mt-2 bg-black/40 hover:bg-gray-700 backdrop-blur-sm text-white py-2 px-4 rounded border-[1px] border-white transition-colors duration-300">
                  Select Branch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;