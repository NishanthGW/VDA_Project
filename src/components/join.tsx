import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_un5fj0h',
  TEMPLATE_ID_TRIAL: 'template_n47fgqi',
  USER_ID: 'fl1hHKZQgJE0r7YUA'
};

const Join = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    phone: '',
    message: '',
    
    // Join class fields
    childName: '',
    childAge: '',
    experience: 'beginner',
    preferredClass: '',
    preferredTiming: '',
    location: '',
    address: ''
  });

  const branches = [
    { value: '', label: 'Select Branch' },
    { value: 'coimbatore', label: 'Coimbatore Studio' },
    { value: 'palladam', label: 'Palladam Studio' },
    { value: 'tirupur', label: 'Tirupur Studio' }
  ];

  const danceClasses = [
    { value: '', label: 'Select a class' },
    { value: 'western', label: 'Western' },
    { value: 'classical', label: 'Classical' },
    // { value: 'ballet', label: 'Ballet' },
    // { value: 'jazz', label: 'Jazz' },
    // { value: 'folk', label: 'Folk' },
    // { value: 'breakdance', label: 'Breakdance' }
  ];

  const timings = [
    { value: '', label: 'Select timing' },
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (3 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 9 PM)' },
    { value: 'weekend', label: 'Weekend' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send via EmailJS
  const sendViaEmail = async () => {
    console.log('=== Starting Email Send from Join Page ===');
    
    const templateParams = {
      to_name: 'Vibe Dance Academy',
      from_name: formData.name || 'Not provided',
      from_email: formData.email || 'Not provided',
      phone: formData.phone,
      
      // Join class specific data
      child_name: formData.childName || 'Not provided',
      child_age: formData.childAge || 'Not provided',
      experience: formData.experience || 'Not specified',
      preferred_class: formData.preferredClass || 'Not specified',
      preferred_timing: formData.preferredTiming || 'Not specified',
      location: formData.location || 'Not specified',
      address: formData.address || 'Not provided',
      
      message: formData.message || 'No additional notes provided',
      date: new Date().toLocaleString(),
      
      // Additional fields
      subject: 'New Class Registration',
      reply_to: formData.email || 'Not provided'
    };

    console.log('Join form data being sent:', templateParams);

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_TRIAL,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );
      console.log('✅ EmailJS sent successfully from Join:', result);
      return true;
    } catch (error) {
      console.error('❌ EmailJS error from Join:', error);
      return false;
    }
  };

  const handleJoinClick = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate only mandatory fields for join class
    const mandatoryFields = ['childName', 'phone'];
    const missingFields = mandatoryFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all mandatory fields: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      console.log('=== Sending Form Data from Join Page ===');
      const success = await sendViaEmail();
      
      if (success) {
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            childName: '',
            childAge: '',
            experience: 'beginner',
            preferredClass: '',
            preferredTiming: '',
            location: '',
            address: ''
          });
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Submission error from Join:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            <span className="text-white text-6xl">Join</span> Our Dance Family
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
            {/* Student Information Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Student Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Student Name Field */}
                <div className="space-y-2">
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-200">
                    Student's Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="childName"
                    name="childName"
                    type="text"
                    required
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter student's full name"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>

                {/* Student Age Field */}
                <div className="space-y-2">
                  <label htmlFor="childAge" className="block text-sm font-medium text-gray-200">
                    Student's Age
                  </label>
                  <input
                    id="childAge"
                    name="childAge"
                    type="number"
                    min="3"
                    max="18"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    placeholder="Enter student's age"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience Level */}
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-200">
                    Dance Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value} className="bg-gray-800 text-white">
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Class */}
                <div className="space-y-2">
                  <label htmlFor="preferredClass" className="block text-sm font-medium text-gray-200">
                    Preferred Class
                  </label>
                  <select
                    id="preferredClass"
                    name="preferredClass"
                    value={formData.preferredClass}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    {danceClasses.map((danceClass) => (
                      <option key={danceClass.value} value={danceClass.value} className="bg-gray-800 text-white">
                        {danceClass.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Preferred Timing */}
                <div className="space-y-2">
                  <label htmlFor="preferredTiming" className="block text-sm font-medium text-gray-200">
                    Preferred Timing
                  </label>
                  <select
                    id="preferredTiming"
                    name="preferredTiming"
                    value={formData.preferredTiming}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm appearance-none"
                  >
                    {timings.map((timing) => (
                      <option key={timing.value} value={timing.value} className="bg-gray-800 text-white">
                        {timing.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Location */}
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-200">
                    Preferred Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
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
              </div>
            </div>

            {/* Parent/Guardian Information Section */}
            <div className="mb-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Parent Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                    Parent/Guardian Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter parent or guardian name"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Phone Number Field - Mandatory */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
                    Phone Number <span className="text-red-400">*</span>
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

              {/* Address Field */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-200">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any special requirements or notes..."
                    className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 placeholder-gray-300 backdrop-blur-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-900 border border-green-600 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400">Success!</h4>
                    <p className="text-green-300 text-sm">Registration sent successfully! We'll contact you to confirm your class details.</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900 border border-red-600 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-red-500 rounded-full p-2 mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Delivery Failed</h4>
                    <p className="text-red-300 text-sm">
                      There was an error sending your registration. Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Centered Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-2/3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center relative z-10 text-lg">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center relative z-10 text-lg">
                    Start Your Dance Journey
                    <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>

            <div className="text-center mt-4">
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;