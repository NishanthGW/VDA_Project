import React, { useState, useEffect, useRef } from 'react';
import TopBar from './TopBar';
import { useLocation } from 'react-router-dom';

// Event data type
interface Event {
  id: number;
  title: string;
  description: string;
  images: string[];
}

// Sample event data - updated with all services from Services.tsx
const eventsData: Event[] = [
  {
    id: 1,
    title: "Regular Classes",
    description: "Daily dance training sessions with our expert instructors",
    images: [
      "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhbmNlJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRhbmNlJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRhbmNlJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 2,
    title: "Wedding Events",
    description: "Elegant dance performances for your special day",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2VkZGluZyUyMGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmclMjBkYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 3,
    title: "Corporate Events",
    description: "Professional performances for corporate gatherings and functions",
    images: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29rpG9yYXRlJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29ycG9yYXRlJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcnBvcmF0ZSUyMGV2ZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 4,
    title: "Sangeet Events",
    description: "Vibrant dance performances for pre-wedding celebrations",
    images: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FuZ2VldCUyMGNlcmVtb255fGVufDB8fDB8fHww&auto=format&fit=c crop&w=600&q=60",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbmdlZXQlMjBjZXJlbW9ueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 5,
    title: "Puberty Functions",
    description: "Traditional celebrations for coming-of-age ceremonies",
    images: [
      "assets/sangeet.jpg",
      "assets/pube.jpg",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWRpdGlvbmFsJTIwY2VyZW1vbnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 6,
    title: "Flash Mobs",
    description: "Surprise performances that captivate audiences",
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZsYXNoJTIwbW9ifGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZsYXNoJTIwbW9ifGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 7,
    title: "School Choreographies",
    description: "Creative dance routines for school events and competitions",
    images: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNjaG9vbCUyMGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNjaG9vbCU20MGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 8,
    title: "Home Tuitions",
    description: "Personalized dance training in the comfort of your home",
    images: [
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWUlMjB0dWl0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvbWUlMjB0dWl0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 9,
    title: "Online Classes",
    description: "Virtual dance training sessions from anywhere",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9ubGluZSUyMGNsYXNzZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG9ubGluZSUyMGNsYXNzZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 10,
    title: "Apartment Classes",
    description: "Community-based dance lessons for residents",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwYXJ0bWVudCUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1574362848142-4dde301d6c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFwYXJ0bWVudCUyMGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 11,
    title: "Competition Jury",
    description: "Professional judging services for dance competitions",
    images: [
      "https://images.unsplash.com/photo-1545102168-9a41492d8532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhbmNlJTIwY29tcGV0aXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1511632765481-2b35c53b8a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRhbmNlJTIwY29tcGV0aXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    ]
  },
  {
    id: 12,
    title: "Video Productions",
    description: "Professional dance videos and choreography recordings",
    images: [
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBwcm9kdWN0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      "https://images.unsplash.com/photo-1562949566-2c296963e685?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwcHJvZHVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ]
  }
];

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    // Get the service from navigation state if available
    if (location.state && location.state.service) {
      setSelectedService(location.state.service);
    }

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setActiveImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleNextImage = () => {
    if (selectedEvent) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === selectedEvent.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedEvent) {
      setActiveImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedEvent.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Filter events if a specific service was selected
  const filteredEvents = selectedService 
    ? eventsData.filter(event => event.title === selectedService)
    : eventsData;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 mt-2 pb-20">
      <TopBar />
      <div className="relative h-96 overflow-hidden m-6 py-6 px-4">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 flex items-center justify-center pb-12"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-yellow-400 animate-pulse">
              Our Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Capturing the rhythm and energy of every performance
            </p>
            {selectedService && (
              <p className="text-lg text-yellow-300 mt-4">
                Showing events for: {selectedService}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
          Event Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              onClick={() => handleEventClick(event)}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={event.images[0]} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold bg-yellow-500 bg-opacity-80 px-4 py-2 rounded-lg">
                    View Gallery
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{event.title}</h3>
                <p className="text-gray-300">{event.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-400">{event.images.length} photos</span>
                  </div>
                  <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                    View All →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing event photos */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-hidden">
            <div className="relative">
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 text-white bg-gray-900 rounded-full p-2 hover:bg-yellow-500 hover:text-black transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="h-96 md:h-[500px] relative overflow-hidden bg-black">
                <img 
                  src={selectedEvent.images[activeImageIndex]} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-contain"
                />
                
                {selectedEvent.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
                
                <div className="flex space-x-2 overflow-x-auto py-2">
                  {selectedEvent.images.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className={`h-16 w-16 object-cover rounded cursor-pointer transition-all duration-200 ${index === activeImageIndex ? 'ring-2 ring-yellow-400 transform scale-105' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setActiveImageIndex(index)}
                    />
                  ))}
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-400">
                  {activeImageIndex + 1} of {selectedEvent.images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;