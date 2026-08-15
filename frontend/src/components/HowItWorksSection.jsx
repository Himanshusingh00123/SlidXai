import { useEffect, useRef } from "react";
import FeatureIdea from "../assets/FeatureIdea.png";
import AiUnderstand from "../assets/AiUnderstand.png";
import AiStory from "../assets/AiStory.png";
import AiCreateSlides from "../assets/AiCreateSlides.png";
import PptPresent from "../assets/PptPresent.png";

const features = [
  {
    title: "Your Idea",
    description:
      "Start with a simple idea. Tell AI what you want to communicate, and let it turn your thoughts into a compelling presentation.",
    image: FeatureIdea,
    imageAlt: "A presentation idea coming to life",
  },
  {
    title: "AI Understands",
    description:
      "AI understands your topic, audience, goals, and key message to create the right foundation for your presentation.",
    image: AiUnderstand,
    imageAlt: "AI understanding a presentation idea",
  },
  {
    title: "AI Builds the Story",
    description:
      "AI turns your idea into a clear, engaging narrative, organizing your key points into a story that keeps your audience engaged.",
    image: AiStory,
    imageAlt: "AI building a presentation story",
  },
  {
    title: "AI Creates the Slides",
    description:
      "Your story becomes a polished presentation with structured slides, compelling visuals, and a cohesive design.",
    image: AiCreateSlides,
    imageAlt: "AI creating presentation slides",
  },
  {
    title: "Ready to Present",
    description:
      "Go from a simple idea to a presentation you can confidently share with your audience—faster than ever.",
    image: PptPresent,
    imageAlt: "Finished presentation ready to present",
  },
];

function FeatureItem({ feature, index }) {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const text = textRef.current;
    const image = imageRef.current;

    if (!text || !image) return;

    if (reduceMotion) {
      text.classList.remove("opacity-0");
      image.classList.remove("opacity-0");

      text.classList.remove("-translate-x-6", "translate-x-6");

      image.classList.remove("-translate-x-6", "translate-x-6");

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "-translate-x-6",
              "translate-x-6",
            );

            entry.target.classList.add("opacity-100", "translate-x-0");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-100px",
      },
    );

    observer.observe(text);
    observer.observe(image);

    return () => observer.disconnect();
  }, []);

  const isReversed = index % 2 === 1;

  return (
    <div
      className={`grid items-center gap-12 md:grid-cols-2 ${
        isReversed ? "md:[direction:rtl]" : ""
      }`}
    >
      {/* Text */}
      <div
        ref={textRef}
        className={`
          md:[direction:ltr]
          opacity-0
          translate-x-0
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isReversed ? "md:translate-x-6" : "md:-translate-x-6"}
        `}
      >
        <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>

        <p className="text-lg leading-relaxed text-foreground/70">
          {feature.description}
        </p>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        className={`
          md:[direction:ltr]
          opacity-0
          translate-x-0
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isReversed ? "md:-translate-x-6" : "md:translate-x-6"}
        `}
      >
        <div className="overflow-hidden rounded-xl border shadow-md">
          <img
            src={feature.image}
            alt={feature.imageAlt}
            draggable={false}
            className="aspect-video h-auto w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section aria-labelledby="features-heading">
      <div className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              id="features-heading"
              className="text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              From blank page to finished deck.
            </h2>

            <p className="mt-4 text-lg text-foreground/70">
              SlideXAI brings writing, design, storytelling, and presentation
              creation into one AI-powered workflow.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-24">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
