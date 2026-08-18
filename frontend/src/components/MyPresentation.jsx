import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import PPTLogo from "../assets/PPTLogo.png";

const MyPresentations = ({ onCreateNew, user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [presentations, setPresentations] = useState([]);

  // Search
  const filtered = presentations.filter((presentation) =>
    presentation.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Download
  const handleDownload = (presentation) => {
    console.log("Downloading:", presentation.title);
  };

  // Delete
  const handleDelete = (id) => {
    const presentation = presentations.find((item) => item.id === id);

    if (!presentation) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${presentation.title}"?`,
    );

    if (!confirmed) return;

    setPresentations((prev) =>
      prev.filter((presentation) => presentation.id !== id),
    );
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

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search presentations..."
          className="
            w-full rounded-xl
            border border-white/10
            bg-gray-100/6
            px-4 py-3
            text-sm text-white
            outline-none
            placeholder:text-white/30
            transition-all
            focus:border-blue-500/50
            focus:ring-2
            focus:ring-white/5
          "
        />
      </div>

      {/* Presentations Grid */}
      {filtered.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((presentation) => (
            <div
              key={presentation.id}
              className="
                group relative flex min-h-20 w-full
                items-center
                rounded-[20px]
                bg-[#353535]
                px-2.5 py-3
                shadow-lg shadow-black/10
                backdrop-blur-[10px]
                transition-all duration-300 ease-in-out
                hover:-translate-y-1
                hover:bg-[#3b3b3b]
                hover:shadow-xl hover:shadow-black/20
              "
            >
              {/* PPTX Logo */}
              <div
                className="
                  h-12.5 w-12.5 shrink-0
                  overflow-hidden rounded-[10px]
                  transition-transform duration-300
                  group-hover:scale-105
                "
              >
                <img
                  src={PPTLogo}
                  alt="PowerPoint"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div
                className="
                  ml-2.5 min-w-0 flex-1
                  font-['Poppins',sans-serif]
                  text-white
                "
              >
                {/* Title + Time */}
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[14px] font-bold sm:text-[16px]">
                    {presentation.title}
                  </p>

                  <span className="shrink-0 text-[9px] text-white/40 sm:text-[10px]">
                    {presentation.updatedAt}
                  </span>
                </div>

                {/* Slides */}
                <p className="mt-0.5 truncate text-[11px] font-light text-white/60 sm:text-[12px]">
                  {presentation.slides} slides
                </p>
              </div>

              {/* Actions */}
              <div
                className="
                  ml-2 flex shrink-0 items-center gap-1
                  opacity-100
                  transition-all duration-300
                  sm:ml-3
                  sm:opacity-0
                  sm:group-hover:opacity-100
                "
              >
                {/* Download */}
                <button
                  type="button"
                  onClick={() => handleDownload(presentation)}
                  aria-label={`Download ${presentation.title}`}
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-lg
                    cursor-pointer
                    bg-white/10
                    text-white/60
                    transition-all duration-200
                    hover:bg-white/20
                    hover:text-white
                    active:scale-90
                  "
                >
                  <Download size={15} strokeWidth={2} />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(presentation.id)}
                  aria-label={`Delete ${presentation.title}`}
                  className="
                    flex h-8 w-8 items-center justify-center
                    rounded-lg
                    cursor-pointer
                    bg-red-500/10
                    text-red-400
                    transition-all duration-200
                    hover:bg-red-500/20
                    hover:text-red-300
                    active:scale-90
                  "
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="
            flex min-h-60
            flex-col items-center justify-center
            rounded-[20px]
            border border-white/5
            bg-gray-100/6
            px-6 text-center
          "
        >
          <div className="mb-3 text-6xl">📂</div>

          <h3 className="text-lg font-semibold text-white">
            No presentations found
          </h3>

          <p className="mt-1 text-sm text-white/40">
            {searchQuery
              ? `No presentations match "${searchQuery}"`
              : "Create your first presentation to get started."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPresentations;
