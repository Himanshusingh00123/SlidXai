import { useState, useEffect, useRef } from "react";
import {
  PanelRightOpen,
  PanelLeftOpen,
  X,
  Presentation,
  Plus,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import Logo from "../../public/Logo.png";
import MyPresentation from "@/components/MyPresentation";
import Profile from "@/components/Profile";
import CreatePPT from "@/components/CreatePPT";

const Dashboard = () => {
  // 1. Navigation Tab State ('create' | 'presentations' | 'profile')
  const [activeTab, setActiveTab] = useState("create");

  // 2. Sidebar open on desktop (>= 768px), closed on mobile (< 768px)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return false;
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample data for My Presentations

  // Adjust sidebar on resize
  useEffect(() => {
    let prevIsDesktop = window.innerWidth >= 768;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop !== prevIsDesktop) {
        setSidebarOpen(isDesktop);
        prevIsDesktop = isDesktop;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <div className="flex h-screen w-full overflow-hidden bg-[#09090b] text-white">
      {/* =====================================================
          MOBILE / TABLET OVERLAY
      ====================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => {
            setSidebarOpen(false);
            setIsOpen(false);
          }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
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
          transition-all
          duration-300
          ease-in-out
          ${sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-18"}
          md:relative
        `}
      >
        {/* SIDEBAR HEADER */}
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
          <div
            onClick={() => setActiveTab("create")}
            className="flex min-w-0 items-center gap-2 cursor-pointer"
          >
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
                ${sidebarOpen ? "w-auto opacity-100" : "pointer-events-none w-0 opacity-0"}
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
          <SidebarItem
            icon={<Plus size={19} />}
            label="Create New PPT"
            open={sidebarOpen}
            active={activeTab === "create"}
            onClick={() => {
              setActiveTab("create");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          />
          <SidebarItem
            icon={<Presentation size={19} />}
            label="My Presentations"
            open={sidebarOpen}
            active={activeTab === "presentations"}
            onClick={() => {
              setActiveTab("presentations");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          />
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="shrink-0 border-t border-white/8 p-3 space-y-1">
          <SidebarItem
            icon={<User size={19} />}
            label="Profile"
            open={sidebarOpen}
            active={activeTab === "profile"}
            onClick={() => {
              setActiveTab("profile");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          />
          <SidebarItem
            icon={<LogOut size={19} />}
            label="Logout"
            open={sidebarOpen}
            onClick={() => console.log("Logging out...")}
          />
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT AREA
      ====================================================== */}
      <main className="relative flex flex-1 flex-col h-screen overflow-hidden">
        {/* =================================================
            TOPBAR
        ================================================== */}
        <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-white/8 bg-[#09090b]/40 backdrop-blur-md px-4 sm:px-6">
          {/* SIDEBAR TOGGLE & DYNAMIC TITLE */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSidebarOpen((prev) => !prev);
                setIsOpen(false);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/60 transition hover:bg-white/8 hover:text-white"
            >
              {sidebarOpen ? (
                <PanelRightOpen size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </button>

            <h1 className="text-base font-medium flex">
              <span className="text-gray-300">SlidXai</span> <ChevronRight />
              {activeTab === "create" && "Dashboard"}
              {activeTab === "presentations" && "My Presentations"}
              {activeTab === "profile" && "Profile"}
            </h1>
          </div>

          {/* PROFILE DROPDOWN (CLICK ONLY) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer rounded-lg px-2 sm:px-3 py-1.5 transition hover:bg-white/5"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">
                  Himanshu Singh
                </p>
                <p className="text-xs text-gray-400">himanshu@example.com</p>
              </div>

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-white/20 object-cover"
              />

              <ChevronDown
                className={`hidden h-4 w-4 text-white/60 transition-transform sm:block ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {isOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 rounded-xl border border-white/10 bg-[#0f0f13] p-2 shadow-2xl backdrop-blur-lg">
                <div className="flex items-center gap-3 rounded-lg p-2 bg-white/5">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover border border-white/20"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">
                      Himanshu Singh
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      himanshu@example.com
                    </p>
                  </div>
                </div>

                <div className="my-2 h-px bg-white/10" />

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("profile");
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10 cursor-pointer transition"
                >
                  <User className="h-4 w-4 text-white/70" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    console.log("Log out");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* =====================================================
            CONDITIONAL PAGES CONTAINER
        ====================================================== */}
        <div className="relative z-10 flex-1 overflow-y-auto">
          {/* ================= PAGE 1: CREATE NEW PPT ================= */}
          {activeTab === "create" && <CreatePPT />}

          {/* ================= PAGE 2: MY PRESENTATIONS ================= */}
          {activeTab === "presentations" && <MyPresentation />}

          {/* ================= PAGE 3: USER PROFILE ================= */}
          {activeTab === "profile" && <Profile />}
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   SIDEBAR ITEM COMPONENT WITH ONCLICK
========================================================= */
const SidebarItem = ({ icon, label, open, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
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
            ? "bg-white/10 text-white font-medium shadow-inner"
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
            z-50
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
