import { ArrowUp } from "lucide-react";
import { useState } from "react";
import SplitText from "./SplitText";
import DotGrid from "@/components/DotGrid";

const CreatePPT = () => {
  const [text, setText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    console.log("Submitted prompt:", text);
    // Add your generation / redirect logic here
  };
  return (
    <div className="flex min-h-full relative flex-col items-center justify-center px-4 sm:px-6 py-10">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

      <div className="flex w-full max-w-3xl flex-col items-center justify-center">
        {/* GREETING */}
        <div className="mb-8 w-full text-center">
          <SplitText
            text="Hello, Himanshu Singh!"
            className="text-center text-3xl font-semibold sm:text-4xl md:text-5xl"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />
          <p className="mt-2 text-sm text-white/50">
            What presentation would you like to create today?
          </p>
        </div>

        {/* SCROLLABLE INPUT AREA */}
        <div className="w-full relative group">
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-linear-to-r from-[#22D3EE] via-[#402fb5] to-[#cf30aa] opacity-40 blur-xl transition-all duration-500 group-hover:opacity-70 group-focus-within:opacity-85" />

          <div className="relative flex flex-col rounded-2xl border border-white/15 bg-[#09090d]/95 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your presentation topic or paste an outline..."
              rows={2}
              className="
                        w-full
                        min-h-12.5
                        max-h-40
                        resize-none
                        bg-transparent
                        text-sm
                        sm:text-base
                        text-white
                        placeholder:text-white/35
                        outline-none
                        overflow-y-auto
                        leading-relaxed
                        pr-2
                        scrollbar-thin
                        [scrollbar-color:#3f3f46_transparent]
                      "
            />

            <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-2.5">
              <span className="text-[11px] text-white/30 hidden sm:inline">
                Press{" "}
                <kbd className="rounded bg-white/10 px-1 py-0.5 text-white/50 font-mono text-[10px]">
                  Enter ↵
                </kbd>{" "}
                to generate
              </span>

              <button
                type="button"
                onClick={handleSend}
                disabled={!text.trim()}
                className={`
                          ml-auto
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          transition-all
                          duration-200
                          ${
                            text.trim()
                              ? "bg-linear-to-tr from-[#306FF7] to-[#cf30aa] text-white shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 cursor-pointer"
                              : "bg-white/10 text-white/30 cursor-not-allowed"
                          }
                        `}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePPT;
