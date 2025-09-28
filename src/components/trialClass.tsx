import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaChild, FaPaperPlane } from 'react-icons/fa';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_un5fj0h',
  TEMPLATE_ID_TRIAL: 'template_n47fgqi',
  TEMPLATE_ID_RENTAL: 'template_x20a2kn',
  USER_ID: 'fl1hHKZQgJE0r7YUA'
};

const TrialClass = () => {
  const location = useLocation();
  const formType = location.state?.formType || 'trial';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    phone: '',
    message: '',
    
    // Trial class fields
    childName: '',
    childAge: '',
    experience: 'beginner',
    preferredDate: '',
    location: '',
    
    // Rental fields
    eventType: '',
    rentalDate: '',
    startTime: '',
    endTime: '',
    guests: '',
    rentalPurpose: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Send via EmailJS (Email) - Only method now
  const sendViaEmail = async () => {
    console.log('=== Starting Actual Email Send ===');
    
    const templateId = formType === 'rental' 
      ? EMAILJS_CONFIG.TEMPLATE_ID_RENTAL 
      : EMAILJS_CONFIG.TEMPLATE_ID_TRIAL;

    // Use the standard EmailJS parameter structure
    const templateParams = {
      to_name: 'Vibe Dance Academy',
      from_name: formData.name || 'Not provided',
      from_email: formData.email || 'Not provided',
      phone: formData.phone,
      
      // Rental specific data
      event_type: formData.eventType,
      rental_date: formData.rentalDate || 'Not specified',
      start_time: formData.startTime || 'Not specified',
      end_time: formData.endTime || 'Not specified',
      guests: formData.guests || 'Not specified',
      rental_purpose: formData.rentalPurpose || 'Not specified',
      
      message: formData.message || 'No additional notes provided',
      date: new Date().toLocaleString(),
      
      // Additional fields
      subject: 'New Space Rental Inquiry',
      reply_to: formData.email || 'Not provided'
    };

    console.log('Actual form data being sent:', templateParams);

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        templateId,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );
      console.log('✅ EmailJS sent successfully:', result);
      return true;
    } catch (error) {
      console.error('❌ EmailJS error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Form submitted with data:', formData);
    console.log('📋 Form type:', formType);
    
    // Validate required fields
    let requiredFields = ['phone', 'name', 'email']; // Common required fields
    
    if (formType === 'rental') {
      requiredFields = [...requiredFields, 'eventType', 'rentalDate', 'startTime', 'endTime', 'guests'];
    } else {
      requiredFields = [...requiredFields, 'childName', 'childAge'];
    }
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send the actual form data
      console.log('=== Sending Form Data ===');
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
            preferredDate: '',
            location: '',
            eventType: '',
            rentalDate: '',
            startTime: '',
            endTime: '',
            guests: '',
            rentalPurpose: ''
          });
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic content based on form type
  const getHeaderContent = () => {
    if (formType === 'rental') {
      return {
        title: "Book Our Space for Rent",
        subtitle: "Perfect for photoshoots, events, workshops, and more.",
        buttonText: "Send Rental Inquiry",
        successMessage: "Rental inquiry sent successfully! We'll contact you within 24 hours."
      };
    } else {
      return {
        title: "Register for a Free Trial Class",
        subtitle: "Experience the Vibe Dance Academy difference.",
        buttonText: "Register for Free Trial",
        successMessage: "Registration sent successfully! We'll contact you to confirm your trial class."
      };
    }
  };

  const getFeatures = () => {
    if (formType === 'rental') {
      return [
        {
          icon: FaUser,
          title: "Professional Space",
          description: "Perfectly equipped for all types of events"
        },
        {
          icon: FaPaperPlane,
          title: "Quick Response",
          description: "We'll get back to you within hours"
        },
        {
          icon: FaMapMarkerAlt,
          title: "Prime Location",
          description: "Easy to access with ample parking"
        }
      ];
    } else {
      return [
        {
          icon: FaUser,
          title: "Expert Instructors",
          description: "Learn from certified dance professionals"
        },
        {
          icon: FaChild,
          title: "Age-Appropriate Classes",
          description: "Programs designed for different age groups"
        },
        {
          icon: FaPaperPlane,
          title: "Flexible Scheduling",
          description: "Choose timings that work for you"
        }
      ];
    }
  };

  const { title, subtitle, buttonText, successMessage } = getHeaderContent();
  const features = getFeatures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500">
            {title}
          </h1>
          <p className="text-gray-300 text-lg">
            {subtitle}
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
          <div className="md:flex">
            {/* Left Side - Information */}
            <div className={`md:w-2/5 p-8 ${
              formType === 'rental' 
                ? 'bg-gradient-to-b from-purple-500 to-purple-600 text-white' 
                : 'bg-gradient-to-b from-yellow-500 to-yellow-600 text-black'
            }`}>
              <h2 className="text-2xl font-bold mb-6">
                {formType === 'rental' ? 'Space Features' : 'Why Choose Vibe?'}
              </h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 ${
                      formType === 'rental' ? 'bg-black text-purple-400' : 'bg-black text-yellow-500'
                    }`}>
                      <feature.icon className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-10 p-4 rounded-lg ${
                formType === 'rental' ? 'bg-black text-purple-400' : 'bg-black text-yellow-500'
              }`}>
                <h3 className="font-bold mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-blue-400" />
                    <span>info@vibedance.com</span>
                  </div>
                  <div className="flex items-center">
                    <FaPaperPlane className="mr-2 text-green-400" />
                    <span>We'll respond within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information FIRST (for trial class) */}
                {formType === 'trial' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="childName" className="block text-sm font-medium text-gray-300 mb-1">
                          Student's Name *
                        </label>
                        <input
                          type="text"
                          id="childName"
                          name="childName"
                          value={formData.childName}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter child's name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="childAge" className="block text-sm font-medium text-gray-300 mb-1">
                          Student's Age *
                        </label>
                        <input
                          type="number"
                          id="childAge"
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleChange}
                          min="3"
                          max="18"
                          required
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Age from 3 years"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                          Dance Experience
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-1">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                          <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                        Preferred Location
                      </label>
                      <div className="relative">
                        <select
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select a location</option>
                          <option value="coimbatore">Coimbatore Studio</option>
                          <option value="palladam">Palladam Studio</option>
                          <option value="tirupur">Tirupur Studio</option>
                        </select>
                        <FaMapMarkerAlt className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </>
                )}

                {/* Parent/Guardian Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {formType === 'rental' ? 'Your Name *' : 'Parent/Guardian Name *'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder={formType === 'rental' ? 'Enter your full name' : 'Enter parent/guardian name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                {/* Phone Number (Mandatory) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="+91 12345 67890"
                  />
                </div>

                {/* Rental Information */}
                {formType === 'rental' && (
                  <>
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Select event type</option>
                        <option value="photoshoot">Photoshoot</option>
                        <option value="video-shoot">Video Shoot</option>
                        <option value="workshop">Workshop</option>
                        <option value="meeting">Meeting</option>
                        <option value="party">Party</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="rentalDate" className="block text-sm font-medium text-gray-300 mb-1">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="rentalDate"
                            name="rentalDate"
                            value={formData.rentalDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                          <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-1">
                          Number of Guests *
                        </label>
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          min="1"
                          max="50"
                          required
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="1-50 guests"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-300 mb-1">
                          Start Time *
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-300 mb-1">
                          End Time *
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rentalPurpose" className="block text-sm font-medium text-gray-300 mb-1">
                        Purpose of Rental
                      </label>
                      <textarea
                        id="rentalPurpose"
                        name="rentalPurpose"
                        value={formData.rentalPurpose}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Describe the purpose of your rental..."
                      />
                    </div>
                  </>
                )}
                
                {/* Additional Notes (for both forms) */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Any special requirements or notes..."
                  />
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        {buttonText}
                      </>
                    )}
                  </button>
                </div>
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-900 border border-green-600 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                      <div className="bg-green-500 rounded-full p-2 mr-3">
                        <FaPaperPlane className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400">Success!</h4>
                        <p className="text-green-300 text-sm">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900 border border-red-600 rounded-lg p-4 mt-4">
                    <div className="flex items-center">
                      <div className="bg-red-500 rounded-full p-2 mr-3">
                        <FaPaperPlane className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400">Delivery Failed</h4>
                        <p className="text-red-300 text-sm">
                          There was an error sending your {formType === 'rental' ? 'inquiry' : 'registration'}. 
                          Please try again or contact us directly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Your information will be sent securely via email
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialClass;