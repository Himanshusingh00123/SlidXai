import { useState, useEffect } from "react";
import Lightfall from "@/components/Lightfall";
import Heroimg from "../assets/Heroimg.png";
import FoldText from "@/components/FoldText";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Link } from "react-router-dom";

const Home = () => {
  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setFontSize(41);
      } else if (width < 768) {
        setFontSize(56);
      } else if (width < 1024) {
        setFontSize(58);
      } else {
        setFontSize(75);
      }
    };

    updateFontSize();

    window.addEventListener("resize", updateFontSize);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full ">
      {/* Background */}
      <div className="fixed inset-0 -z-10   pointer-events-none">
        <Lightfall />
      </div>

      {/* Navbar */}
      <div className="relative z-20 ">
        <Navbar />

        <div className=" flex justify-center items-center sm:pt-24 pt-16">
          <div className="md:w-9/12  flex-cols  md:py-15  sm:p-10 p-8 text-center">
            <h1 className="rounded-full md:text-4xl text-sm md:mb-5 mb-3 text-amber-300/80 font-bold">
              <span className="bg-white/10 py-1 px-6 rounded-full">
                ✦ AI-Powered Presentation Creation
              </span>
            </h1>
            <FoldText
              text="Turn your ideas into beautiful presentations."
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize={fontSize}
              fontWeight={800}
              color="#f7f2e8"
            />
            <h2 className="sm:text-xl text-base text-gray-300 md:font-medium font-normal lg:px-50 md:px-20 md:my-6 mt-2">
              Create polished, professional presentations in minutes with AI.
              From a simple idea to a complete story, SlidXai handles the
              structure, design, and details.
            </h2>

            <div
              className="
                mt-3
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-3
                sm:mt-10
                sm:flex-row
                sm:gap-4
                md:gap-6
              "
            >
              <button
                className="
                  w-full
                  max-w-xs
                  cursor-pointer
                  rounded-4xl
                  bg-linear-to-b from-blue-500 to-blue-600
                  px-6 py-3
                  text-base
                  font-semibold
                  text-white
                   shadow-[0_8px_30px_rgba(37,99,235,0.18)]
                  transition-all
                  duration-300
                  border border-blue-400/20
                  hover:from-blue-400
                hover:to-blue-600
                  hover:shadow-[0_12px_35px_rgba(37,99,235,0.28)]
                  hover:-translate-y-0.5
                   active:translate-y-0
                  active:scale-[0.98]
                  sm:w-auto
                  sm:text-lg
                  md:text-xl
                "
              >
                Create a presentation
              </button>

              <button
                className="
                  w-full
                  max-w-xs
                  cursor-pointer
                  rounded-4xl
                   border border-white/60
                bg-white/4
                  px-6 py-3
                  text-base
                  font-semibold
                  text-white/90
                  transition-all
                  duration-300
                  backdrop-blur-sm
                  hover:-translate-y-0.5
                  hover:bg-white/8
                  hover:border-white/25
                   active:translate-y-0
                   hover:text-white
                   active:scale-[0.98]
                  sm:w-auto
                  sm:text-lg
                  md:text-xl
                "
              >
                Explore how it works
              </button>
            </div>
          </div>
        </div>

        <section
          className="
            flex
            w-full
            justify-center
            px-3
            pb-10
            sm:px-5
            sm:pb-14
            md:px-8
            md:pb-20
          "
        >
          <div
            className="
            hover:scale-102
            transition-all
            duration-600
              relative
              flex
              w-full
              max-w-7xl
              justify-center
              rounded-[20px]
              border
              border-white/50
              bg-black/80
              p-2
              sm:rounded-[25px]
              sm:p-3
              md:rounded-[30px]
              md:p-5
            "
          >
            <div
              className="
                w-full
                overflow-hidden
                rounded-[15px]
                border
                border-white/50
                bg-white/80
                p-1.5
                sm:rounded-[20px]
                sm:p-2
                md:rounded-[25px]
                md:p-2.5
              "
            >
              <div
                className="
                  w-full
                  overflow-hidden
                  rounded-[12px]
                  border
                  border-black
                  sm:rounded-[16px]
                  md:rounded-[20px]
                "
              >
                <img
                  src={Heroimg}
                  alt="SlidXai presentation dashboard"
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                  "
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-110 sm:pb-70">
          <ScrollStack>
            <ScrollStackItem itemClassName="bg-[#0B0F19] text-white  border border-white/10 overflow-hidden">
              <div className="h-full  flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-white/10 border border-white/10 text-sm text-white/70">
                    ✦ AI-Powered Presentation Builder
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Turn your ideas into
                    <span className="text-amber-300"> stunning slides.</span>
                  </h2>

                  <p className="mt-5 text-lg text-white/60 max-w-xl">
                    Slidxa AI transforms your ideas, notes, and documents into
                    polished presentations in seconds — without starting from a
                    blank slide.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
                      ✦ AI Generation
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
                      ⚡ Seconds, not hours
                    </span>
                  </div>
                </div>

                <div className="relative w-full md:w-90 h-55 rounded-3xl bg-linear-to-br from-amber-300/30 to-orange-500/10 border border-white/10 flex items-center justify-center">
                  <div className="absolute w-32 h-32 rounded-full bg-amber-300/20 blur-3xl" />

                  <div className="relative w-56 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rotate-[-4deg]">
                    <div className="h-3 w-24 rounded-full bg-white/30 mb-4" />
                    <div className="h-2 w-full rounded-full bg-white/10 mb-2" />
                    <div className="h-2 w-4/5 rounded-full bg-white/10 mb-5" />

                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 rounded-lg bg-amber-300/60" />
                      <div className="h-16 rounded-lg bg-white/10" />
                      <div className="h-16 rounded-lg bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="bg-[#F5F7FF] h-auto text-slate-900 border border-slate-200 overflow-hidden">
              <div className="h-full flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                    ✨ From prompt to presentation
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Your idea.
                    <br />
                    <span className="text-indigo-500">Our intelligence.</span>
                  </h2>

                  <p className="mt-5 text-lg text-slate-500 max-w-xl">
                    Just describe what you want to present. Slidxa AI structures
                    your content, creates the narrative, and designs every slide
                    around your message.
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center">
                        ✦
                      </div>
                      <div className="w-9 h-9 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center">
                        AI
                      </div>
                      <div className="w-9 h-9 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center">
                        ⚡
                      </div>
                    </div>

                    <span className="text-sm text-slate-500">
                      Built for creators, teams & businesses
                    </span>
                  </div>
                </div>

                <div className="relative w-full md:w-90 h-55">
                  <div className="absolute left-8 top-8 w-64 h-40 rounded-2xl bg-white border border-slate-200 shadow-xl rotate-[-8deg] p-5">
                    <div className="h-3 w-28 rounded bg-indigo-200 mb-4" />
                    <div className="h-2 w-full rounded bg-slate-100 mb-2" />
                    <div className="h-2 w-3/4 rounded bg-slate-100" />
                  </div>

                  <div className="absolute right-4 top-4 w-64 h-40 rounded-2xl bg-indigo-500 text-white shadow-2xl p-5 rotate-[5deg]">
                    <div className="text-xs text-white/60 mb-3">SLIDXA AI</div>

                    <div className="text-xl font-bold">
                      Build better.
                      <br />
                      Present smarter.
                    </div>

                    <div className="mt-4 h-2 w-24 rounded bg-white/30" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="h-auto bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
              <div className="h-full flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full bg-white/10 border border-white/10 text-sm">
                    🚀 Ready when you are
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Stop designing slides.
                    <br />
                    <span className="text-blue-200">
                      Start telling stories.
                    </span>
                  </h2>

                  <p className="mt-5 text-lg text-white/70 max-w-xl">
                    Create presentations that look professional, communicate
                    clearly, and feel like they were designed by an expert.
                  </p>

                  <button className="mt-7 cursor-pointer px-7 py-3.5 rounded-xl bg-white text-indigo-600 font-semibold hover:scale-105 transition-transform shadow-xl">
                    <Link to="/login">Create your first presentation →</Link>
                  </button>
                </div>

                <div className="relative w-full md:w-90 h-55 flex items-center justify-center">
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative grid grid-cols-2 gap-4">
                    <div className="w-28 h-20 rounded-xl bg-white/20 backdrop-blur border border-white/20 p-4 rotate-[-8deg]">
                      <div className="w-12 h-2 rounded bg-white/60 mb-3" />
                      <div className="w-full h-2 rounded bg-white/20" />
                    </div>

                    <div className="w-28 h-20 rounded-xl bg-white/20 backdrop-blur border border-white/20 p-4 rotate-[7deg]">
                      <div className="w-16 h-2 rounded bg-white/60 mb-3" />
                      <div className="w-full h-2 rounded bg-white/20" />
                    </div>

                    <div className="w-28 h-20 rounded-xl bg-white/20 backdrop-blur border border-white/20 p-4 rotate-[5deg]">
                      <div className="text-2xl">✦</div>
                    </div>

                    <div className="w-28 h-20 rounded-xl bg-white/20 backdrop-blur border border-white/20 p-4 rotate-[-5deg]">
                      <div className="text-2xl">⚡</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
