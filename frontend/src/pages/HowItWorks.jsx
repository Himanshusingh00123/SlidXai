import Lightfall from "@/components/Lightfall";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";

const HowItWorks = () => {
  return (
    <div className="relative min-h-screen w-full ">
      <div className="fixed inset-0 -z-10 h-screen pointer-events-none">
        <Lightfall />
      </div>
      <div className="relative z-10 ">
        {/* Navbar */}

        <Navbar />
        {/* Section */}
        <section className="sm:px-10 px-2 mt-28 ">
          <div className="bg-black rounded-2xl">
            <HowItWorksSection />
          </div>

          {/* Footer */}
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default HowItWorks;
