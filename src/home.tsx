import Slideshow from "./components/Slideshow";
import Batch from './components/batch';
import Services from './components/services';
import Space from './components/space';
import Feedback from './components/feedback';
import Join from './components/join';
import Footer from './components/footer';
import Videos from './components/videos';
import Counters from './components/counters';
import Founder from './components/founder';
import SEO from './components/SEO';

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // Video plays for 5 seconds before loading the page
  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-[#0B1119]">
  //       {/* <video autoPlay muted src="/src/assets/loading.mp4" onEnded={() => setIsLoading(false)} className="w-[100%] h-[100%]">
  //         Your browser does not support the video tag.
  //       </video> */}
  //     </div>
  //   );
  // }

  return (
    <>
      <SEO 
        title="Vibe Dance Academy - Premier Dance Classes in Coimbatore, Palladam & Tiruppur"
        description="Join Vibe Dance Academy for professional dance training in Coimbatore, Palladam, and Tiruppur. Expert instructors, modern facilities, and multiple dance styles. Book your trial class today!"
        keywords="dance academy, dance classes, Coimbatore dance, Palladam dance, Tiruppur dance, hip hop, contemporary, classical dance, dance training, dance studio"
      />
      <div className="bg-black min-h-screen">
        <div className="w-full h-[2px] bg-yellow-400"></div>
        <Slideshow />
        <Counters />
        <Videos />
        {/* <FounderSection /> */}
        <Founder />
        <Services />
        <Batch />
        <Space />
        <Feedback />
        <Join />
        <Footer />
      </div>
    </>
  );
}