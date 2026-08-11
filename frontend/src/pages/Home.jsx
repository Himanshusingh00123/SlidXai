import { useState } from "react";
import GooeyNav from "@/components/GooeyNav";
import Lightfall from "@/components/Lightfall";
import logoImage from "../assets/logoImage.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Features", link: "/services" },
    { label: "How It Works", link: "/contact" },
  ];

  return (
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
                h-10 w-auto
                sm:h-12
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
            bg-white/3
            absolute left-0 right-0 top-[calc(100%+10px)]
            md:hidden
            overflow-hidden
            rounded-2xl
            border border-white/20
            backdrop-blur-xl
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
                  text-white
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
                max-sm:bg-white
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

      {/* Hero content can go here */}
    </div>
  );
};

export default Home;
