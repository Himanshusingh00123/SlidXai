import Lightfall from "@/components/Lightfall";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardSwap, { Card } from "@/components/CardSwap";
import Idea from "../assets/Idea.png";
import Intelligence from "../assets/Intelligence.png";
import Story from "../assets/Story.png";
import PPT from "../assets/PPT.png";
import FlowingMenu from "@/components/FlowingMenu";

const About = () => {
  const demoItems = [
    {
      text: "Idea",
      image:
        "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=400&fit=crop&sat=-100&auto=format",
    },
    {
      text: "Intelligence",
      image:
        "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format",
    },
    {
      text: "Story",
      image:
        "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=600&h=400&fit=crop&sat=-100&auto=format",
    },
    {
      text: "Presentation",
      image:
        "https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format",
    },
  ];
  return (
    <div className="relative min-h-screen w-full ">
      <div className="fixed inset-0 -z-10 h-screen pointer-events-none">
        <Lightfall />
      </div>
      <div className="relative z-10 ">
        <Navbar />

        <section className="min-h-screen mt-28  sm:px-10 px-3">
          <div className="bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 rounded-2xl ">
            <div className="text-center pt-10 sm:pt-14">
              <h1 className="text-amber-50 sm:text-6xl text-2xl  font-extrabold">
                Great ideas shouldn't
              </h1>
              <h2 className="text-amber-50 sm:text-6xl text-2xl font-extrabold">
                disappear inside bad slides.
              </h2>
            </div>
            <div className="relative px-5  sm:px-45 pt-13 min-h-screen  overflow-hidden">
              <div className="sm:w-6/12 sm:h-120 h-68 relative ">
                <FlowingMenu
                  items={demoItems}
                  speed={15}
                  textColor="#FFFBEB"
                  bgColor="linear-gradient(135deg, #020617, #172554, #0f172a);"
                  marqueeBgColor="#FFFBEB"
                  marqueeTextColor="black"
                  borderColor="#FFFBEB"
                />
              </div>

              <div className="relative z-20 max-sm:h-60  max-sm:mr-44">
                <CardSwap
                  cardDistance={80}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={false}
                >
                  <Card className="text-center p-5 ">
                    <h3 className="text-5xl font-semibold pb-3">✦ Idea</h3>
                    <div className="bg-white h-10/12 p-2 rounded-xl">
                      <div className=" rounded-lg h-full overflow-hidden">
                        <img src={Idea} alt="Idea" className="h-full w-full" />
                      </div>
                    </div>
                  </Card>
                  <Card className="text-center p-5">
                    <h3 className="text-5xl font-semibold pb-3">
                      ⌬ Intelligence
                    </h3>
                    <div className="bg-white h-10/12 p-2 rounded-xl">
                      <div className=" rounded-lg h-full overflow-hidden">
                        <img
                          src={Intelligence}
                          alt="Intelligence"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card className="text-center p-5">
                    <h3 className="text-5xl font-semibold pb-3">⌁ Story</h3>
                    <div className="bg-white h-10/12 p-2 rounded-xl">
                      <div className=" rounded-lg h-full overflow-hidden">
                        <img
                          src={Story}
                          alt="Story"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </Card>
                  <Card className="text-center p-5">
                    <h3 className="text-5xl font-semibold pb-3">
                      ⧉ Presentation
                    </h3>
                    <div className="bg-white h-10/12 p-2 rounded-xl">
                      <div className=" rounded-lg h-full overflow-hidden">
                        <img src={PPT} alt="PPT" className="h-full w-full" />
                      </div>
                    </div>
                  </Card>
                </CardSwap>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
