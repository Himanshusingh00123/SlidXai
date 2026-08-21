import { ArrowUp } from "lucide-react";
import { useState } from "react";
import SplitText from "./SplitText";
import DotGrid from "./DotGrid";
import Swal from "sweetalert2";
import PPTLogo from "../assets/PPTLogo.png";

const CreatePPT = ({ user }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userName = user?.name?.trim() || "there";
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const stages = [
    { text: "Understanding your topic…", progress: 15 },
    { text: "Planning your slide structure…", progress: 30 },
    { text: "Writing engaging content…", progress: 48 },
    { text: "Designing your slides…", progress: 65 },
    { text: "Adding visuals and layouts…", progress: 80 },
    { text: "Polishing your presentation…", progress: 98 },
  ];

  const handleSend = async () => {
    if (!text.trim()) return;

    const promptText = text;
    setText("");

    // 1. Initial Loading Modal (No buttons before API call)
    Swal.fire({
      html: `
        <div class="relative w-full overflow-hidden rounded-[28px] bg-[#0b0d12] text-white">
            <!-- Ambient glow -->
            <div class="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]"></div>

            <div class="relative px-8 pb-8 pt-9">
                <!-- AI Loader -->
                <div class="mx-auto mb-7 flex h-20 w-20 items-center justify-center">
                    <div class="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/4 shadow-[0_0_50px_rgba(139,92,246,0.18)]">
                        <div class="absolute -inset-1.25 animate-spin rounded-[20px] border border-transparent border-t-violet-400/80 border-r-fuchsia-400/40"></div>
                        <div class="absolute inset-2 rounded-xl bg-violet-500/10 blur-md"></div>
                        <svg class="relative h-7 w-7 text-violet-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                            <path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
                            <path d="m5.64 5.64 1.42 1.42M16.94 16.94l1.42 1.42"/>
                            <path d="m18.36 5.64-1.42 1.42M7.06 16.94l-1.42 1.42"/>
                            <circle cx="12" cy="12" r="4"/>
                        </svg>
                    </div>
                </div>

                <!-- Eyebrow -->
                <div class="mb-3 flex items-center justify-center gap-2">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400"></span>
                    <span class="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/80">
                        SlidXai
                    </span>
                </div>

                <!-- Heading -->
                <h2 class="text-[27px] font-semibold leading-tight tracking-[-0.04em] text-white">
                    Creating your presentation
                </h2>

                <!-- Description -->
                <p class="mx-auto mt-3 max-w-90 text-[14px] leading-6 text-zinc-400">
                    Turning your idea into a polished presentation with AI.
                </p>

                <!-- Progress area -->
                <div class="mt-8">
                    <div class="mb-3 flex items-center justify-between">
                        <span id="ppt-status-text" class="text-left text-[12px] font-medium text-zinc-300">
                            Understanding your topic…
                        </span>
                        <span id="ppt-progress" class="font-mono text-[11px] font-medium text-violet-300">
                            0%
                        </span>
                    </div>

                    <!-- Progress track -->
                    <div class="relative h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div class="absolute inset-y-0 left-0 w-1/3 animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                        <div id="ppt-progress-bar" class="h-full w-0 rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-400 shadow-[0_0_18px_rgba(139,92,246,0.65)] transition-all duration-700 ease-out"></div>
                    </div>
                </div>

                <!-- Generation steps -->
                <div class="mt-7 space-y-2 text-left">
                    <div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/2.5 px-4 py-3">
                        <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" stroke-dasharray="20 40"/>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="text-[12px] font-medium text-zinc-200">
                                Generating slide
                            </div>
                            <div class="mt-0.5 text-[10px] text-zinc-500">
                                Generating meaningful presentation
                            </div>
                        </div>
                        <span class="text-[10px] text-violet-300">AI</span>
                    </div>
                </div>

                <!-- Bottom message -->
                <div class="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                        <path d="M12 3v18"/>
                        <path d="M3 12h18"/>
                    </svg>
                    <span>AI is working on your presentation</span>
                </div>
            </div>
        </div>
      `,
      width: 460,
      padding: 0,
      background: "transparent",
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: "bg-transparent shadow-none",
      },
    });

    // Start progress stage animation only while modal is open
    let stageIndex = 0;
    const interval = setInterval(() => {
      if (stageIndex >= stages.length) {
        clearInterval(interval);
        return;
      }
      const stage = stages[stageIndex];
      const statusText = document.getElementById("ppt-status-text");
      const progressText = document.getElementById("ppt-progress");
      const progressBar = document.getElementById("ppt-progress-bar");

      if (statusText) statusText.textContent = stage.text;
      if (progressText) progressText.textContent = `${stage.progress}%`;
      if (progressBar) progressBar.style.width = `${stage.progress}%`;

      stageIndex++;
    }, 6500);

    try {
      const response = await fetch(`${apiUrl}/api/ppt/generate-ppt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          pptDescription: promptText,
        }),
      });

      const result = await response.json();
      clearInterval(interval);

      if (!response.ok || !result.PPT) {
        throw new Error(result.message || "Failed to generate presentation.");
      }

      // 2. Success Modal (With Download & working Cancel button)
      Swal.update({
        html: `
          <div class="font-['Poppins',sans-serif] text-left text-white select-none">
            <!-- Top File Card -->
            <div class="relative flex items-center gap-3.5 rounded-2xl bg-white/4 p-3.5 ring-1 ring-white/10 shadow-inner">
              <div class="relative flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-amber-500/20 to-orange-600/20 ring-1 ring-orange-500/30">
                <img src="${PPTLogo}" alt="PowerPoint" class="h-9 w-9 object-contain drop-shadow-md"/>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="truncate text-[13.5px] font-semibold text-white/95" title="${result.PPT.title || "AI Presentation.pptx"}">
                    ${result.PPT.title || "AI Presentation.pptx"}
                  </p>
                </div>
                
                <div class="mt-1 flex items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Ready
                  </span>
                  <span class="text-[10px] text-white/40 font-medium">PowerPoint (.pptx)</span>
                </div>
              </div>

              <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                <svg class="h-3.5 w-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

            <!-- Description / Message Box -->
            ${
              result.message
                ? `
            <div class="mt-3 flex items-start gap-2.5 rounded-xl bg-white/2 px-3.5 py-2.5 ring-1 ring-white/5">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-violet-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-[11px] leading-relaxed text-white/60">
                ${result.message}
              </p>
            </div>
            `
                : ""
            }

            <!-- Action Buttons -->
            <div class="mt-4 flex items-center gap-2.5">
              <button
                type="button"
                id="swal-cancel-btn"
                class="flex h-10 px-4 items-center justify-center rounded-xl
                       border border-white/10 bg-white/5
                       text-[12px] font-medium text-white/70
                       transition-all duration-200 cursor-pointer
                       hover:bg-white/10 hover:text-white hover:border-white/20
                       active:scale-[0.97]"
              >
                Cancel
              </button>

              <a
                href="${result.PPT.ppt}"
                download="${result.PPT.title || "AI_Presentation"}.pptx"
                id="download-ppt"
                class="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl
                       cursor-pointer
                       bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-600
                       text-[12px] font-semibold text-white tracking-wide
                       shadow-lg shadow-indigo-500/25
                       ring-1 ring-white/20
                       transition-all duration-200
                       hover:brightness-110 hover:-translate-y-0.5 hover:shadow-indigo-500/40
                       active:scale-[0.97]"
              >
                <svg class="h-4 w-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download PPT</span>
              </a>
            </div>
          </div>
        `,
        width: 460,
        padding: "16px",
        background: "#1e1e24",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        customClass: {
          popup: `
            !rounded-3xl
            !border !border-white/10
            !shadow-2xl !shadow-black/60
            !backdrop-blur-md
            !font-['Poppins',sans-serif]
          `,
        },
      });

      // Bind Cancel and Download click events so modal closes reliably
      const cancelBtn = Swal.getPopup()?.querySelector("#swal-cancel-btn");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", () => Swal.close());
      }
      const downloadBtn = Swal.getPopup()?.querySelector("#download-ppt");
      if (downloadBtn) {
        downloadBtn.addEventListener("click", () => Swal.close());
      }
    } catch (error) {
      clearInterval(interval);

      // 3. Error Modal (Using native showCancelButton: true and showConfirmButton: true without custom HTML buttons)
      Swal.fire({
        html: `
          <div class="font-['Poppins',sans-serif] text-center text-white select-none py-1">
            <!-- Animated Warning Icon -->
            <div class="mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30 shadow-lg shadow-amber-500/10">
              <svg class="h-6 w-6 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <!-- Title -->
            <h3 class="text-base font-semibold text-white tracking-wide">
              Request Limit Reached
            </h3>

            <!-- Message -->
            <p class="mt-2 text-[12.5px] leading-relaxed text-white/60">
              ${error.message || "You’ve reached the request limit for now. Please wait a moment and try again."}
            </p>

            <!-- Tip Box -->
            <div class="mt-3.5 rounded-xl bg-white/3 p-2.5 ring-1 ring-white/5 flex items-center justify-center gap-2">
              <span class="inline-block h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
              <span class="text-[11px] font-medium text-amber-300/80">
                Cooldown in progress, please check back shortly
              </span>
            </div>
          </div>
        `,
        width: 460,
        padding: "16px",
        background: "#1e1e24",

        // Built-in SweetAlert buttons (no custom HTML buttons)
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Got It",
        cancelButtonText: "Dismiss",
        buttonsStyling: false,
        allowOutsideClick: true,
        allowEscapeKey: true,

        customClass: {
          popup: `
            !rounded-3xl
            !border !border-white/10
            !shadow-2xl !shadow-black/60
            !backdrop-blur-md
            !font-['Poppins',sans-serif]
          `,
          actions: "!mt-4 !gap-2.5 !w-full !flex !justify-center",
          confirmButton: `
            !flex-1 !h-10 !flex !items-center !justify-center !rounded-xl
            !bg-gradient-to-r !from-amber-500 !to-orange-500
            !text-[12px] !font-semibold !text-white !tracking-wide
            !shadow-lg !shadow-amber-500/20 !ring-1 !ring-white/20
            !transition-all !duration-200 !cursor-pointer
            hover:!brightness-110 active:!scale-95
          `,
          cancelButton: `
            !h-10 !px-4 !flex !items-center !justify-center !rounded-xl
            !border !border-white/10 !bg-white/5
            !text-[12px] !font-medium !text-white/70
            !transition-all !duration-200 !cursor-pointer
            hover:!bg-white/10 hover:!text-white hover:!border-white/20
            active:!scale-95
          `,
        },
      });
    }
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
            text={`Hello, ${userName}!`}
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
