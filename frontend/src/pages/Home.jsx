import { useState, useEffect } from "react";
import GooeyNav from "@/components/GooeyNav";
import Lightfall from "@/components/Lightfall";
import logoImage from "../assets/logoImage.png";
import FoldText from "@/components/FoldText";
import Heroimg from "../assets/Heroimg.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Features", link: "/services" },
    { label: "How It Works", link: "/contact" },
  ];

  const [fontSize, setFontSize] = useState(80);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setFontSize(41);
      } else if (width < 768) {
        setFontSize(44);
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
    <div>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background */}
        <Lightfall />

        {/* Navbar */}
        <nav
          className="
          sm:overflow-hidden
          relative z-40
          mx-3 mt-3
          sm:mx-5 sm:mt-4
          lg:mx-8 lg:mt-5
          h-14 sm:h-16
          rounded-full
          border border-white/10
          bg-white/3
          px-4 sm:px-5
          backdrop-blur-xl
          shadow-2xl
        "
        >
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex shrink-0 items-center">
              <img
                src={logoImage}
                alt="SlidXai"
                className="
                h-16 w-auto
                sm:h-18
                lg:h-20
                object-contain
                cursor-pointer
              "
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <GooeyNav
                items={items}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>

            {/* Desktop Login */}
            <div className="hidden md:flex shrink-0 items-center justify-end">
              <button
                className="
                rounded-lg
                border border-white/15
                bg-white/6
                px-5 py-2.5
                text-sm font-medium
                text-white/90
                cursor-pointer
                transition-all duration-200
                hover:border-white/20
                hover:bg-white
                hover:text-black
                active:scale-95
              "
              >
                Log in
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              className="
              flex md:hidden
              h-10 w-10
              items-center justify-center
              rounded-lg
              border border-white/10
              bg-white/5
              text-white
              transition
              hover:bg-white/10
            "
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`
                  block h-0.5 w-5 bg-white transition-transform duration-200
                  ${menuOpen ? "translate-y-2 rotate-45" : ""}
                `}
                />
                <span
                  className={`
                  block h-0.5 w-5 bg-white transition-opacity duration-200
                  ${menuOpen ? "opacity-0" : ""}
                `}
                />
                <span
                  className={`
                  block h-0.5 w-5 bg-white transition-transform duration-200
                  ${menuOpen ? "-translate-y-2 -rotate-45" : ""}
                `}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
            absolute left-0 right-0 top-[calc(100%+10px)]
            md:hidden
            overflow-hidden
            rounded-2xl
            border border-white/10
            bg-[#07101f]/90
            backdrop-blur-2xl
            shadow-2xl
            transition-all duration-300
            ${
              menuOpen
                ? "visible max-h-100 opacity-100"
                : "invisible max-h-0 opacity-0"
            }
          `}
          >
            <div className="flex flex-col p-3">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="
                  rounded-xl
                  px-4 py-3
                  text-sm font-medium
                  text-white/70
                  transition-colors
                  hover:bg-white/6
                  hover:text-white
                "
                >
                  {item.label}
                </a>
              ))}

              <div className="my-2 h-px bg-white/10" />

              <button
                className="
                rounded-xl
                border border-white/15
                bg-white/6
                max-sm:bg-white/90
                px-4 py-3
                text-sm font-medium
                text-white
                max-sm:text-black
                transition-all
                hover:bg-white
                hover:text-black
              "
              >
                Log in
              </button>
            </div>
          </div>
        </nav>

        <div className=" relative z-20 flex justify-center items-center">
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
                  rounded-lg
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
                  rounded-lg
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
            relative z-10
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
      </div>
    </div>
  );
};

export default Home;
