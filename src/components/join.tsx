import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    branch: ''
  });

  const branches = [
    { value: '', label: 'Select Branch' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'palladam', label: 'Palladam' },
    { value: 'tirupur', label: 'Tirupur' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJoinClick = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/trial-class', { state: { formType: 'join', formData } });
  };

  return (
    <div 
      className="min-h-screen py-16 px-4 flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("/src/assets/join.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="inset-0 bg-black/50"></div>
      
      <div className="max-w-4xl w-full mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Join Our Dance Family
          </h2>
          <p className="text-gray-200 text-xl">
            Begin your dance journey with us today
          </p>
        </div>

        {/* Glass Effect Form Container */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20"></div>
          
          <form className="relative z-10" onSubmit={handleJoinClick}>
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Parent Name Field */}
                <div className="space-y-2">
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-200">
                    Parent/Guardian Name *
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter parent or guardian name"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>

                {/* Student Name Field */}
                <div className="space-y-2">
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-200">
                    Student Name *
                  </label>
                  <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student's full name"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-200">
                    Student Age *
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="3"
                    max="99"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter student's age"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Branch Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-200">
                    Preferred Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    {branches.map((branch) => (
                      <option key={branch.value} value={branch.value} className="bg-gray-800 text-white">
                        {branch.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Address Field - Full Width */}
            <div className="mb-8">
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-200">
                  Address *
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Centered Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-2/3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 relative overflow-hidden group"
              >
                <span className="flex items-center justify-center relative z-10 text-lg">
                  Start Your Dance Journey
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;