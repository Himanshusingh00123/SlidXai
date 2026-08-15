import Lightfall from "@/components/Lightfall";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardSwap, { Card } from "@/components/CardSwap";
import Idea from "../assets/Idea.png";
import Intelligence from "../assets/Intelligence.png";
import Story from "../assets/Story.png";
import PPT from "../assets/PPT.png";
import FlowingMenu from "@/components/FlowingMenu";
import TiltedCard from "@/components/TiltedCard";
import Clarity from "@/assets/Clarity.png";
import Motion from "@/assets/Motion.png";
import Craft from "@/assets/Craft.png";

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
            <div className="relative   sm:px-45 pt-13 min-h-screen  overflow-hidden">
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

          <div className="mt-6 overflow-hidden rounded-2xl bg-white sm:mt-10">
            {/* Text */}
            <div className="px-4 py-10 text-center text-black sm:px-8 sm:py-12">
              <h1 className="text-4xl font-bold leading-tight sm:text-7xl">
                We don't believe AI should
              </h1>

              <h2 className="mt-1 text-4xl font-bold leading-tight sm:text-7xl">
                replace creativity.
              </h2>

              <h3 className="pt-6 text-2xl font-extrabold leading-tight sm:text-5xl">
                <span className="text-gray-500/40">We believe it should</span>{" "}
                remove the
              </h3>

              <h4 className="text-2xl font-extrabold leading-tight sm:text-5xl">
                friction <span className="text-gray-500/40">around it.</span>
              </h4>
            </div>

            {/* ================= TILTED CARDS ================= */}
            <div className="flex flex-col items-center gap-10 overflow-hidden px-4 py-8 sm:h-124 sm:flex-row sm:justify-between sm:gap-0 sm:px-12 sm:py-2 lg:px-24">
              {/* CLARITY */}
              <TiltedCard
                imageSrc={Clarity}
                altText="SlidXai clarity visual showing complex ideas becoming simple"
                captionText="CLARITY — Make complex ideas simple"
                containerHeight="min(360px, 85vw)"
                containerWidth="min(360px, 85vw)"
                imageHeight="min(360px, 85vw)"
                imageWidth="min(360px, 85vw)"
                rotateAmplitude={10}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="tilted-card-demo-text p-6 sm:p-8">
                    <span className="text-xs uppercase tracking-[0.2em] opacity-60">
                      01
                    </span>

                    <p className="mt-1 text-lg font-semibold">◉ Clarity</p>

                    <p className="text-sm opacity-60">
                      Complex ideas deserve simple communication.
                    </p>
                  </div>
                }
              />

              {/* MOTION */}
              <TiltedCard
                imageSrc={Motion}
                altText="SlidXai motion visual showing presentations coming alive"
                captionText="MOTION — Make every slide feel alive."
                containerHeight="min(360px, 85vw)"
                containerWidth="min(360px, 85vw)"
                imageHeight="min(360px, 85vw)"
                imageWidth="min(360px, 85vw)"
                rotateAmplitude={10}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="tilted-card-demo-text p-6 sm:p-8">
                    <span className="text-xs uppercase tracking-[0.2em] opacity-60">
                      02
                    </span>

                    <p className="mt-1 text-lg font-semibold">⌁ MOTION</p>

                    <p className="text-sm opacity-60">
                      Make every slide feel alive.
                    </p>
                  </div>
                }
              />

              {/* CRAFT */}
              <TiltedCard
                imageSrc={Craft}
                altText="SlidXai craft visual showing AI assisted design"
                captionText="CRAFT — AI creates faster. Design makes it yours."
                containerHeight="min(360px, 85vw)"
                containerWidth="min(360px, 85vw)"
                imageHeight="min(360px, 85vw)"
                imageWidth="min(360px, 85vw)"
                rotateAmplitude={10}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <div className="tilted-card-demo-text p-6 sm:p-8">
                    <span className="text-xs uppercase tracking-[0.2em] opacity-60">
                      03
                    </span>

                    <p className="mt-1 text-lg font-semibold">✦ CRAFT</p>

                    <p className="text-sm opacity-60">
                      AI creates faster. Design makes it yours.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
