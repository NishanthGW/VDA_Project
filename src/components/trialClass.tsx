import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaMapMarkerAlt, FaUser, FaChild, FaPaperPlane, FaClock, FaCalendar, FaUsers } from 'react-icons/fa';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID_TRIAL: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TRIAL,
  TEMPLATE_ID_RENTAL: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RENTAL,
  USER_ID: import.meta.env.VITE_EMAILJS_USER_ID
};

// Type guard to check if environment variables are defined
if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.USER_ID) {
  console.error('Missing required EmailJS configuration. Please check your environment variables.');
}

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
    
    // Join class fields (replacing trial class fields)
    childName: '',
    childAge: '',
    experience: 'beginner',
    preferredClass: '',
    preferredTiming: '',
    location: '',
    
    // Rental fields - updated to match EmailJS template
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
      
      // Join class specific data
      child_name: formData.childName || 'Not provided',
      child_age: formData.childAge || 'Not provided',
      experience: formData.experience || 'Not specified',
      preferred_class: formData.preferredClass || 'Not specified',
      preferred_timing: formData.preferredTiming || 'Not specified',
      location: formData.location || 'Not specified',
      
      // Rental specific data - updated to match template
      event_type: formData.eventType || 'Not specified',
      rental_date: formData.rentalDate || 'Not specified',
      start_time: formData.startTime || 'Not specified',
      end_time: formData.endTime || 'Not specified',
      guests: formData.guests || 'Not specified',
      rental_purpose: formData.rentalPurpose || 'Not specified',
      
      message: formData.message || 'No additional notes provided',
      date: new Date().toLocaleString(),
      
      // Additional fields
      subject: formType === 'rental' ? 'New Space Rental Inquiry' : 'New Class Registration',
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
    
    // Validate required fields - Only Event Type, Preferred Date, and Phone for rental
    let requiredFields = ['phone']; // Phone is mandatory for both forms
    
    if (formType === 'rental') {
      requiredFields = [...requiredFields, 'eventType', 'rentalDate'];
    } else {
      requiredFields = [...requiredFields, 'childName']; // Only childName is mandatory for join class
    }
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => {
        if (field === 'childName') return "Student's Name";
        if (field === 'phone') return "Phone Number";
        if (field === 'eventType') return "Event Type";
        if (field === 'rentalDate') return "Preferred Date";
        return field;
      });
      alert(`Please fill in all mandatory fields: ${fieldNames.join(', ')}`);
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
            preferredClass: '',
            preferredTiming: '',
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
        title: "Join Our Dance Class",
        subtitle: "Start your dance journey with Vibe Dance Academy.",
        buttonText: "Join Class",
        successMessage: "Registration sent successfully! We'll contact you to confirm your class details."
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
          title: "All Skill Levels",
          description: "Classes for beginners to advanced dancers"
        },
        {
          icon: FaClock,
          title: "Flexible Timings",
          description: "Multiple class schedules available"
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
          {formType === 'rental' && (
            <p className="text-gray-400 text-sm mt-2">
              * Only Event Type, Preferred Date, and Phone Number are mandatory fields
            </p>
          )}
          {formType !== 'rental' && (
            <p className="text-gray-400 text-sm mt-2">
              * Only Student's Name and Phone Number are mandatory fields
            </p>
          )}
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
          <div className="md:flex">
            {/* Left Side - Information */}
            <div className={`md:w-2/5 p-8 ${
              formType === 'rental' 
                ? 'bg-gradient-to-b from-yellow-500 to-yellow-600 text-white' 
                : 'bg-gradient-to-b from-yellow-500 to-yellow-600 text-black'
            }`}>
              <h2 className="text-2xl font-bold mb-6">
                {formType === 'rental' ? 'Space Features' : 'Why Join Vibe?'}
              </h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 ${
                      formType === 'rental' ? 'bg-black text-yellow-400' : 'bg-black text-yellow-500'
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
                formType === 'rental' ? 'bg-black text-yellow-400' : 'bg-black text-yellow-500'
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
                {/* Rental Form Fields */}
                {formType === 'rental' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">
                          Event Type <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="eventType"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
                          >
                            <option value="">Select event type</option>
                            <option value="photoshoot">Photoshoot</option>
                            <option value="workshop">Workshop</option>
                            <option value="rehearsal">Rehearsal</option>
                            <option value="film-shoot">Film Shoot</option>
                            <option value="corporate-event">Corporate Event</option>
                            <option value="birthday-party">Birthday Party</option>
                            <option value="other">Other</option>
                          </select>
                          <FaUser className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-1">
                          Number of Guests
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            min="1"
                            max="100"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder="Number of guests"
                          />
                          <FaUsers className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="rentalDate" className="block text-sm font-medium text-gray-300 mb-1">
                        Preferred Date <span className="text-red-400">*</span>
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
                        <FaCalendar className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-300 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-300 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
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
                        placeholder="Brief description of your event purpose..."
                      />
                    </div>
                  </>
                )}

                {/* Student Information FIRST (for join class) */}
                {formType === 'trial' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="childName" className="block text-sm font-medium text-gray-300 mb-1">
                          Student's Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="childName"
                          name="childName"
                          value={formData.childName}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter student's name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="childAge" className="block text-sm font-medium text-gray-300 mb-1">
                          Student's Age
                        </label>
                        <input
                          type="number"
                          id="childAge"
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleChange}
                          min="3"
                          max="18"
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
                        <label htmlFor="preferredClass" className="block text-sm font-medium text-gray-300 mb-1">
                          Preferred Class
                        </label>
                        <select
                          id="preferredClass"
                          name="preferredClass"
                          value={formData.preferredClass}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Select a class</option>
                          <option value="hiphop">Hip Hop</option>
                          <option value="contemporary">Contemporary</option>
                          <option value="ballet">Ballet</option>
                          <option value="jazz">Jazz</option>
                          <option value="bollywood">Bollywood</option>
                          <option value="breakdance">Breakdance</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredTiming" className="block text-sm font-medium text-gray-300 mb-1">
                          Preferred Timing
                        </label>
                        <select
                          id="preferredTiming"
                          name="preferredTiming"
                          value={formData.preferredTiming}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Select timing</option>
                          <option value="morning">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (3 PM - 6 PM)</option>
                          <option value="evening">Evening (6 PM - 9 PM)</option>
                          <option value="weekend">Weekend</option>
                        </select>
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
                    </div>
                  </>
                )}

                {/* Contact Information (for both forms) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {formType === 'rental' ? 'Your Name' : 'Parent/Guardian Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder={formType === 'rental' ? 'Enter your full name' : 'Enter parent/guardian name'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                {/* Phone Number (Mandatory) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number <span className="text-red-400">*</span>
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
                    className={`w-full font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                      formType === 'rental' 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500' 
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black focus:ring-yellow-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                          formType === 'rental' ? 'border-white' : 'border-black'
                        } mr-2`}></div>
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

                {/* Success/Error Messages - Moved beneath the submit button */}
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