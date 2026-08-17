import { useState } from "react";
import {
  Presentation as PresentationIcon,
  Plus,
  Clock,
  MoreVertical,
  Layers,
  Search,
} from "lucide-react";

const MyPresentations = ({ onCreateNew, user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Presentations list (can be fetched from your API)
  const [presentations] = useState([
    {
      id: 1,
      title: "AI Healthcare Pitch Deck",
      slides: 10,
      updatedAt: "2 hours ago",
      gradient: "from-cyan-500/20 to-blue-600/30",
    },
    {
      id: 2,
      title: "Q3 Financial Performance Review",
      slides: 12,
      updatedAt: "Yesterday",
      gradient: "from-purple-500/20 to-pink-600/30",
    },
    {
      id: 3,
      title: "B2B SaaS Go-To-Market Strategy",
      slides: 8,
      updatedAt: "3 days ago",
      gradient: "from-emerald-500/20 to-teal-600/30",
    },
  ]);

  const filtered = presentations.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">My Presentations</h2>
        </div>
      </div>

      {/* Grid of Presentations */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
          <PresentationIcon size={40} className="mx-auto text-white/30 mb-3" />
          <p className="text-white/60 text-sm">No presentations found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0f0f14]/80 p-4 transition-all duration-200 hover:border-white/20 hover:bg-[#14141c] hover:-translate-y-1 cursor-pointer"
            >
              {/* Thumbnail Preview */}
              <div
                className={`h-36 w-full rounded-xl bg-linear-to-br ${item.gradient} border border-white/10 flex items-center justify-center mb-3.5`}
              >
                <PresentationIcon
                  size={32}
                  className="text-white/40 group-hover:scale-110 transition-transform"
                />
              </div>

              {/* Title & Actions */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-medium text-white truncate group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10"
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Footer Meta */}
              <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                <span className="flex items-center gap-1">
                  <Layers size={13} /> {item.slides} Slides
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {item.updatedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPresentations;
