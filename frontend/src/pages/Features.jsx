import Lightfall from "@/components/Lightfall";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Features = () => {
  return (
    <div className="relative min-h-screen w-full ">
      <div className="fixed inset-0 -z-10 h-screen pointer-events-none">
        <Lightfall />
      </div>
      <div className="relative z-10 ">
        <Navbar />
        <Footer />
      </div>
    </div>
  );
};

export default Features;
