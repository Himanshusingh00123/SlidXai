import { useState } from "react";
import logoImage from "../assets/logoImage.png";
import GooeyNav from "./GooeyNav";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "How It Works", link: "/how-it-works" },
  ];

  return (
    <nav
      className="
          sm:overflow-hidden 
          fixed inset-0 z-50
          mx-3 mt-3
          sm:mx-5 sm:mt-4
          lg:mx-8 lg:mt-5
          h-14 sm:h-16
          rounded-full
          border border-white/10
          bg-white/10
          px-4 sm:px-5
          backdrop-blur-xl
          shadow-2xl
        "
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center">
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
        </Link>

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
          <Link
            to="/login"
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
          </Link>
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
            <Link
              key={item.label}
              to={item.link}
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
            </Link>
          ))}

          <Link
            to="/login"
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
