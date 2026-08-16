import { useState, useEffect } from "react";
import {
  PanelRightOpen,
  PanelLeftOpen,
  X,
  ArrowUp,
  Presentation,
  Plus,
  User,
  LogOut,
} from "lucide-react";
import DotGrid from "@/components/DotGrid";
import SplitText from "@/components/SplitText";
import Logo from "../../public/Logo.png";

const Dashboard = () => {
  // 1. Initialize sidebarOpen: Open on desktop (>= 768px), closed on mobile/tablet (< 768px)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return false;
  });

  const [isOpen, setIsOpen] = useState(false);

  // 2. Automatically adjust state when resizing across mobile & desktop breakpoints
  useEffect(() => {
    let prevIsDesktop = window.innerWidth >= 768;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      // Only update when switching between desktop and mobile viewports
      if (isDesktop !== prevIsDesktop) {
        setSidebarOpen(isDesktop);
        prevIsDesktop = isDesktop;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/get-me", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log(data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-white">
      {/* =====================================================
          MOBILE / TABLET OVERLAY
      ====================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => {
            setSidebarOpen(false);
            setIsOpen(false);
          }}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          flex-col
          overflow-hidden
          border-r
          border-white/8
          bg-[#0f0f13]
          w-64
          transition-[width,transform]
          duration-300
          ease-in-out
          ${sidebarOpen ? "translate-x-0 md:w-64" : "-translate-x-full md:translate-x-0 md:w-18"}
          md:relative
        `}
      >
        {/* =================================================
            SIDEBAR HEADER
        ================================================== */}
        <div
          className={`
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-white/8
            transition-all
            duration-300
            ${sidebarOpen ? "justify-between px-4" : "justify-center px-2"}
          `}
        >
          {/* LOGO */}
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <img
                src={Logo}
                alt="SlideXAI"
                className="h-9 w-9 object-contain"
              />
            </div>

            {/* Logo Text */}
            <div
              className={`
                whitespace-nowrap
                transition-all
                duration-200
                ${
                  sidebarOpen
                    ? "w-auto opacity-100"
                    : "pointer-events-none w-0 opacity-0"
                }
              `}
            >
              <span className="text-xl font-semibold">
                Slid
                <span className="bg-linear-to-b from-[#22D3EE] via-[#306FF7] to-[#5A11D8] bg-clip-text text-transparent">
                  X
                </span>
                <span className="bg-linear-to-b from-[#E469F7] via-[#9948E4] to-[#4C45DF] bg-clip-text text-transparent">
                  ai
                </span>
              </span>
            </div>
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
              md:hidden
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* =================================================
            SIDEBAR NAVIGATION
        ================================================== */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3">
          <SidebarItem
            icon={<Plus size={19} />}
            label="Create New PPT"
            open={sidebarOpen}
            active
          />
          <SidebarItem
            icon={<Presentation size={19} />}
            label="My Presentations"
            open={sidebarOpen}
          />
        </div>

        {/* =================================================
            SIDEBAR FOOTER
        ================================================== */}
        <div className="shrink-0 border-t  border-white/8 p-3">
          <SidebarItem
            icon={<User size={19} />}
            label="Profile"
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<LogOut size={19} />}
            label="Logout"
            open={sidebarOpen}
          />
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="relative flex-1 min-h-screen  overflow-hidden">
        {/* =================================================
      BACKGROUND (MAGIC RINGS)
  ================================================== */}
        <div className="absolute inset-0 z-0 h-full  pointer-events-none overflow-hidden">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#2F293A"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* =================================================
      TOPBAR
  ================================================== */}
        <header
          className="
      relative
      z-10
      flex
      justify-between
      items-center
      h-16
      border-b
      border-white/8
      bg-[#09090b]/40
      backdrop-blur-md
      px-4
    "
        >
          {/* SIDEBAR TOGGLE & TITLE */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                setSidebarOpen((prev) => !prev);
                setIsOpen(false);
              }}
              className="
          cursor-pointer
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          border
          border-white/8
          bg-white/3
          text-white/60
          transition
          hover:bg-white/8
          hover:text-white
        "
            >
              {sidebarOpen ? (
                <PanelRightOpen size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>

            <div className="ml-4">
              <h1 className="text-base font-medium">Dashboard</h1>
            </div>
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer rounded-lg sm:px-3 py-1.5 hover:bg-gray-100/10"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-gray-300">john@example.com</p>
              </div>

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="John Doe"
                className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
              />

              <svg
                className={`hidden h-4 w-4 transition-transform sm:block ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute bg-[#0f0f13] right-0 top-[calc(100%+8px)] z-50 sm:w-72 w-64 rounded-xl border border-white/10 p-2 shadow-xl backdrop-blur-lg">
                <div className="flex items-center gap-3 rounded-lg p-2">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="John Doe"
                    className="h-10 w-10 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-sm text-gray-500 break-all">
                      john@example.com
                    </p>
                  </div>
                </div>

                <div className="my-2 h-px bg-white/10" />

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg px-3 flex gap-1.5 items-center py-2.5 cursor-pointer text-left text-sm text-white hover:bg-white/10"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg px-3 py-2.5 flex gap-1.5 items-center cursor-pointer text-left text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* =================================================
      CONTENT
  ================================================== */}
        <div className="relative z-10 min-h-[calc(100vh-64px)]">
          <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 sm:px-6">
            {/* Greeting */}
            <div className="mb-10 w-full text-center sm:mb-12">
              <SplitText
                text="Hello, Himanshu Singh!"
                className="text-center text-4xl font-semibold sm:text-5xl md:text-6xl"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                showCallback
              />
            </div>

            {/* Input */}
            <div className="w-full max-w-3xl">
              <div className="group relative bg-black">
                <textarea
                  id="idea"
                  rows={1}
                  placeholder="📊 Share your idea..."
                  className="
                  min-h-14 w-full
                  resize-none
                  rounded-full
                  border border-gray-300
                  bg-gray-100/15
                  px-5 py-4
                  pr-16
                  shadow-sm
                  outline-none
                  transition-all duration-200

                  focus:border-blue-500
                  focus:ring-2 focus:ring-blue-500/20

                  max-h-28
                  overflow-y-auto
                  scrollbar-none
                "
                />

                {/* Generate Button */}
                <button
                  type="button"
                  className="
                  absolute
                  cursor-pointer
                  bottom-2.5 right-2.5
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-blue-700
                  text-gray-200
                  transition-all duration-300
                  hover:scale-105
                  hover:bg-blue-600
                  active:scale-95
                "
                >
                  <ArrowUp size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   SIDEBAR ITEM
========================================================= */
const SidebarItem = ({ icon, label, open, active = false }) => {
  return (
    <button
      className={`
        group
        relative
        mb-1
        flex
        h-11
        w-full
        items-center
        rounded-xl
        transition-all
        cursor-pointer
        duration-200
        ${open ? "gap-3 px-3" : "justify-center px-0"}
        ${
          active
            ? "bg-white/8 text-white"
            : "text-white/45 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span
        className={`
          flex
          shrink-0
          items-center
          justify-center
          ${active ? "text-violet-400" : "text-white/50 group-hover:text-white"}
        `}
      >
        {icon}
      </span>

      <span
        className={`
          overflow-hidden
          whitespace-nowrap
          text-sm
          transition-all
          duration-200
          ${open ? "w-auto opacity-100" : "pointer-events-none w-0 opacity-0"}
        `}
      >
        {label}
      </span>

      {!open && (
        <span
          className="
            pointer-events-none
            absolute
            left-14.5
            z-100
            whitespace-nowrap
            rounded-lg
            border
            border-white/10
            bg-[#18181f]
            px-3
            py-2
            text-xs
            text-white
            opacity-0
            shadow-xl
            transition-opacity
            group-hover:opacity-100
          "
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default Dashboard;
