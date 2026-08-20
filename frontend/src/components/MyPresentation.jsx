import { useEffect, useState } from "react";
import { Download, Trash2 } from "lucide-react";
import PPTLogo from "../assets/PPTLogo.png";
import Swal from "sweetalert2";

const PPTChipLoader = () => (
  <div className="flex h-full w-full items-center justify-center py-12">
    <div className="w-full max-w-2xl">
      <svg
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <defs>
          <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#0f0f0f" />
          </linearGradient>

          <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eeeeee" />
            <stop offset="100%" stopColor="#888888" />
          </linearGradient>

          <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#bbbbbb" />
            <stop offset="50%" stopColor="#888888" />
            <stop offset="100%" stopColor="#555555" />
          </linearGradient>
        </defs>

        {/* Traces */}
        <g>
          {/* Left */}
          <path d="M100 100 H200 V210 H326" className="trace-bg" />
          <path d="M100 100 H200 V210 H326" className="trace-flow" />

          <path d="M80 180 H180 V230 H326" className="trace-bg" />
          <path d="M80 180 H180 V230 H326" className="trace-flow" />

          <path d="M60 260 H150 V250 H326" className="trace-bg" />
          <path d="M60 260 H150 V250 H326" className="trace-flow" />

          <path d="M100 350 H200 V270 H326" className="trace-bg" />
          <path d="M100 350 H200 V270 H326" className="trace-flow" />

          {/* Right */}
          <path d="M700 90 H560 V210 H474" className="trace-bg" />
          <path d="M700 90 H560 V210 H474" className="trace-flow" />

          <path d="M740 160 H580 V230 H474" className="trace-bg" />
          <path d="M740 160 H580 V230 H474" className="trace-flow" />

          <path d="M720 250 H590 V250 H474" className="trace-bg" />
          <path d="M720 250 H590 V250 H474" className="trace-flow" />

          <path d="M680 340 H570 V270 H474" className="trace-bg" />
          <path d="M680 340 H570 V270 H474" className="trace-flow" />
        </g>

        {/* Chip */}
        <rect
          x="330"
          y="190"
          width="140"
          height="100"
          rx="20"
          ry="20"
          fill="url(#chipGradient)"
          stroke="#222"
          strokeWidth="3"
          style={{
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))",
          }}
        />

        {/* Left pins */}
        <g>
          <rect
            x="322"
            y="205"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="322"
            y="225"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="322"
            y="245"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="322"
            y="265"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
        </g>

        {/* Right pins */}
        <g>
          <rect
            x="470"
            y="205"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="470"
            y="225"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="470"
            y="245"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
          <rect
            x="470"
            y="265"
            width="8"
            height="10"
            fill="url(#pinGradient)"
            rx="2"
          />
        </g>

        {/* Text */}
        <text
          x="400"
          y="240"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fill="url(#textGradient)"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="font-bold tracking-wide"
        >
          Loading
        </text>

        {/* Connection dots */}
        <circle cx="100" cy="100" r="5" fill="black" />
        <circle cx="80" cy="180" r="5" fill="black" />
        <circle cx="60" cy="260" r="5" fill="black" />
        <circle cx="100" cy="350" r="5" fill="black" />

        <circle cx="700" cy="90" r="5" fill="black" />
        <circle cx="740" cy="160" r="5" fill="black" />
        <circle cx="720" cy="250" r="5" fill="black" />
        <circle cx="680" cy="340" r="5" fill="black" />

        {/* SVG animation */}
        <style>
          {`
            .trace-bg {
              stroke: #252525;
              stroke-width: 1.8;
              fill: none;
            }

            .trace-flow {
              stroke: #399fff;
              stroke-width: 1.8;
              fill: none;
              stroke-dasharray: 40 400;
              stroke-dashoffset: 438;
              filter: drop-shadow(0 0 6px #399fff);
              animation: flow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
            }

            @keyframes flow {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </svg>
    </div>
  </div>
);

const MyPresentations = ({ onCreateNew, ppt = [], isLoading = false }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to safely extract an array from any data format
  const extractArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.ppts)) return data.ppts;
    if (Array.isArray(data?.ppt)) return data.ppt;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const [presentations, setPresentations] = useState(() => extractArray(ppt));

  // Keep local state synced when parent ppt data changes
  useEffect(() => {
    setPresentations(extractArray(ppt));
  }, [ppt]);

  // Safe Search Filter
  const safeList = Array.isArray(presentations) ? presentations : [];
  const filtered = safeList.filter((presentation) =>
    presentation?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Delete
  const handleDelete = async (id) => {
    // 1. Show confirmation dialog FIRST
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6", // matches your violet theme
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#222226", // matches your dark card background
      color: "#ffffff",
    });
    // 2. Only proceed if user clicked "Yes, delete it!"
    if (confirmResult.isConfirmed) {
      setIsDeleting(true);
      try {
        const response = await fetch(`${apiUrl}/api/ppt/delete-ppt/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the presentation");
        }
        const data = await response.json();

        // 3. Artificial delay after deleting to display the smooth loader animation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 4. Update UI list
        setPresentations((prev) =>
          prev.filter((item) => (item._id || item.id) !== id),
        );

        // 5. Show success popup
        await Swal.fire({
          title: "Deleted!",
          text: data.message || "Presentation deleted successfully.",
          icon: "success",
          background: "#222226",
          color: "#ffffff",
          confirmButtonColor: "#8b5cf6",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
          background: "#222226",
          color: "#ffffff",
          confirmButtonColor: "#8b5cf6",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Helper to format date if available
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            My Presentations
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Manage and download your presentations
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search presentations..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
          />
        </div>
      </div>

      {/* Presentations List / Loader / Empty State */}
      {isLoading || isDeleting ? (
        <PPTChipLoader />
      ) : filtered.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((presentation) => {
            const itemId = presentation._id || presentation.id || Math.random();
            return (
              <div
                key={itemId}
                className="group relative flex min-h-18.5 w-full items-center rounded-[20px] border border-white/6 bg-[#222226] px-3.5 py-3 shadow-lg shadow-black/20 backdrop-blur-[10px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-white/15 hover:bg-[#2b2b30] hover:shadow-xl hover:shadow-black/30"
              >
                {/* PPT Logo */}
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[12px] bg-white/5 p-1 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={PPTLogo}
                    alt="PowerPoint"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="ml-3 min-w-0 flex-1 font-['Poppins',sans-serif] text-white">
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <p
                      className="min-w-0 truncate text-[13px] font-semibold sm:text-[14px]"
                      title={presentation.title}
                    >
                      {presentation.title || "Untitled Presentation"}
                    </p>

                    <span className="shrink-0 whitespace-nowrap text-[9px] text-white/40">
                      {formatDate(presentation.createdAt)}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[10px] text-white/40">
                    PowerPoint Presentation
                  </p>
                </div>

                {/* Actions */}
                <div className="ml-2 flex shrink-0 items-center gap-1 opacity-100 transition-all duration-300 sm:ml-3 sm:opacity-0 sm:group-hover:opacity-100">
                  {/* Download */}
                  {presentation.ppt && (
                    <a
                      href={presentation.ppt}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Download ${presentation.title || "presentation"}`}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all duration-200 hover:bg-white/20 hover:text-white active:scale-90"
                    >
                      <Download size={15} strokeWidth={2} />
                    </a>
                  )}

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(itemId)}
                    aria-label={`Delete ${presentation.title || "presentation"}`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-all duration-200 hover:bg-red-500/20 hover:text-red-300 active:scale-90"
                  >
                    <Trash2 size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-64 flex-col items-center justify-center rounded-[20px] border border-white/5 bg-white/2 px-6 py-10 text-center">
          <div className="mb-3 text-5xl">📂</div>

          <h3 className="text-lg font-semibold text-white">
            {searchQuery
              ? "No matching presentations"
              : "No presentations found"}
          </h3>

          <p className="mt-1 max-w-md text-sm text-white/40">
            {searchQuery
              ? `No presentations match "${searchQuery}"`
              : "You haven't generated any presentations yet."}
          </p>

          {/* Create Button (shows when not searching and onCreateNew callback is passed) */}
          {!searchQuery && onCreateNew && (
            <button
              type="button"
              onClick={onCreateNew}
              className="mt-5 cursor-pointer rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/30 active:scale-95"
            >
              Create Presentation
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPresentations;
