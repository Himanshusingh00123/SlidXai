import { useLayoutEffect, useRef, useCallback } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => {
  return (
    <div
      className={`
        scroll-stack-card
        relative
        w-full
        min-h-130
        md:min-h-125
        my-6
        md:my-8
        p-6
        sm:p-8
        md:p-12
        rounded-[28px]
        md:rounded-[40px]
        shadow-[0_0_30px_rgba(0,0,0,0.12)]
        box-border
        origin-top
        will-change-transform
        transform-gpu
        ${itemClassName}
      `.trim()}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

const ScrollStack = ({
  children,
  className = "",

  itemDistance = 80,
  itemScale = 0.025,
  itemStackDistance = 30,

  stackPosition = "18%",
  scaleEndPosition = "8%",
  baseScale = 0.86,

  rotationAmount = 0,
  blurAmount = 0,

  useWindowScroll = true,

  onStackComplete,
}) => {
  const scrollerRef = useRef(null);

  const cardsRef = useRef([]);
  const cardPositionsRef = useRef([]);
  const endPositionRef = useRef(0);

  const animationFrameRef = useRef(null);
  const isUpdatingRef = useRef(false);

  const stackCompletedRef = useRef(false);

  const lastTransformsRef = useRef(new Map());

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }

    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;

    const distance = end - start;

    if (distance <= 0) return 1;

    return (scrollTop - start) / distance;
  }, []);

  // --------------------------------------------------
  // Get scroll information
  // --------------------------------------------------

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return {
        scrollTop: 0,
        containerHeight: window.innerHeight,
      };
    }

    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, [useWindowScroll]);

  // --------------------------------------------------
  // Update card transforms
  // --------------------------------------------------

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) {
      return;
    }

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );

    const endElementTop = endPositionRef.current;

    const pinEnd = endElementTop - containerHeight / 2;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // IMPORTANT:
      // We NEVER use getBoundingClientRect()
      // here. Position is cached once.
      const cardTop = cardPositionsRef.current[i];

      if (typeof cardTop !== "number") {
        return;
      }

      // ------------------------------------------
      // Scale
      // ------------------------------------------

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;

      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );

      const targetScale = baseScale + i * itemScale;

      const scale = 1 - scaleProgress * (1 - targetScale);

      // ------------------------------------------
      // Rotation
      // ------------------------------------------

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // ------------------------------------------
      // Blur
      // ------------------------------------------

      let blur = 0;

      if (blurAmount > 0) {
        let topCardIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardPositionsRef.current[j];

          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;

          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depth = topCardIndex - i;

          blur = Math.max(0, depth * blurAmount);
        }
      }

      // ------------------------------------------
      // Pinning
      // ------------------------------------------

      let translateY = 0;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      // ------------------------------------------
      // Round values
      // ------------------------------------------

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,

        scale: Math.round(scale * 1000) / 1000,

        rotation: Math.round(rotation * 100) / 100,

        blur: Math.round(blur * 100) / 100,
      };

      // ------------------------------------------
      // Avoid unnecessary DOM writes
      // ------------------------------------------

      const previous = lastTransformsRef.current.get(i);

      const changed =
        !previous ||
        Math.abs(previous.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(previous.scale - newTransform.scale) > 0.001 ||
        Math.abs(previous.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(previous.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `
              translate3d(
                0,
                ${newTransform.translateY}px,
                0
              )
              scale(${newTransform.scale})
              rotate(${newTransform.rotation}deg)
            `;

        card.style.filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "none";

        lastTransformsRef.current.set(i, newTransform);
      }

      // ------------------------------------------
      // Stack completion
      // ------------------------------------------

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;

          onStackComplete?.();
        }

        if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    getScrollData,
    parsePercentage,
    calculateProgress,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  // --------------------------------------------------
  // Scroll handler
  // --------------------------------------------------

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      return;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;

      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  // --------------------------------------------------
  // Setup
  // --------------------------------------------------

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card"),
    );

    if (!cards.length) return;

    cardsRef.current = cards;

    // ------------------------------------------
    // Cache original card positions
    // ------------------------------------------

    if (useWindowScroll) {
      cardPositionsRef.current = cards.map((card) => {
        const rect = card.getBoundingClientRect();

        return rect.top + window.scrollY;
      });
    } else {
      cardPositionsRef.current = cards.map((card) => card.offsetTop);
    }

    // ------------------------------------------
    // Cache end position
    // ------------------------------------------

    const endElement = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scroller.querySelector(".scroll-stack-end");

    if (endElement) {
      if (useWindowScroll) {
        const rect = endElement.getBoundingClientRect();

        endPositionRef.current = rect.top + window.scrollY;
      } else {
        endPositionRef.current = endElement.offsetTop;
      }
    }

    // ------------------------------------------
    // Card styles
    // ------------------------------------------

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange = "transform";

      card.style.transformOrigin = "top center";

      card.style.backfaceVisibility = "hidden";

      card.style.webkitBackfaceVisibility = "hidden";

      card.style.transform = "translate3d(0,0,0)";

      card.style.webkitTransform = "translate3d(0,0,0)";

      card.style.contain = "layout style paint";
    });

    // ------------------------------------------
    // Initial render
    // ------------------------------------------

    updateCardTransforms();

    // ------------------------------------------
    // Native scroll
    // ------------------------------------------

    const scrollTarget = useWindowScroll ? window : scroller;

    scrollTarget.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // ------------------------------------------
    // Resize
    // ------------------------------------------

    const handleResize = () => {
      // Recalculate positions after resize
      if (useWindowScroll) {
        cardPositionsRef.current = cards.map((card) => {
          const rect = card.getBoundingClientRect();

          return rect.top + window.scrollY;
        });

        if (endElement) {
          const rect = endElement.getBoundingClientRect();

          endPositionRef.current = rect.top + window.scrollY;
        }
      } else {
        cardPositionsRef.current = cards.map((card) => card.offsetTop);

        if (endElement) {
          endPositionRef.current = endElement.offsetTop;
        }
      }

      lastTransformsRef.current.clear();

      updateCardTransforms();
    };

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    // ------------------------------------------
    // Cleanup
    // ------------------------------------------

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = null;
      }

      cardsRef.current = [];

      cardPositionsRef.current = [];

      endPositionRef.current = 0;

      lastTransformsRef.current.clear();

      stackCompletedRef.current = false;

      isUpdatingRef.current = false;
    };
  }, [itemDistance, useWindowScroll, handleScroll, updateCardTransforms]);

  // --------------------------------------------------
  // Container
  // --------------------------------------------------

  const containerClassName = useWindowScroll
    ? `
        relative
        w-full
        ${className}
      `.trim()
    : `
        relative
        w-full
        h-full
        overflow-y-auto
        overflow-x-hidden
        ${className}
      `.trim();

  return (
    <div
      ref={scrollerRef}
      className={containerClassName}
      style={{
        overscrollBehavior: "contain",

        WebkitOverflowScrolling: "touch",

        transform: "translate3d(0,0,0)",

        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <div
        className="
          scroll-stack-inner
          w-full
          px-3
          sm:px-5
          md:px-10
          lg:px-20
          min-h-screen
        "
      >
        {children}

        <div
          className="
            scroll-stack-end
            w-full
            h-px
          "
        />
      </div>
    </div>
  );
};

export default ScrollStack;
