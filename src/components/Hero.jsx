import { useState, useEffect, useRef } from "react";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const slide = {
  eyebrow: "BUILT FOR GREATER",
  title: "The all-new\n2027 TForce Motors",
  cta1: "Ayam Force",
  cta2: "Explore",
  bg: "/images/herovideo.mp4",
  poster: "/images/fallback.jpg",
};

const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

export default function Hero() {
  const [gsapReady, setGsapReady] = useState(false);
  const [navHeight, setNavHeight] = useState(62);
  const videoRef  = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);
  const btnsRef    = useRef(null);

  // ── Measure actual navbar height ──
  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector("nav") || document.querySelector("[data-navbar]");
      if (nav) setNavHeight(nav.offsetHeight);
      else setNavHeight(62); // fallback
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── GSAP entrance ──
  useEffect(() => {
    loadGSAP().then((gsap) => {
      setGsapReady(true);
      const els = [eyebrowRef.current, titleRef.current, btnsRef.current].filter(Boolean);
      gsap.fromTo(
        els,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.16, ease: "power3.out", delay: 0.25 }
      );
    });
  }, []);

  // ── Autoplay video ──
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        // Full viewport minus the navbar so nothing is hidden under it
        height: `calc(100svh)`,
        minHeight: "560px",
      }}
      aria-label="Hero section"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 ">
        <video
          ref={videoRef}
          src={slide.bg}
          poster={slide.poster}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            // On very small screens, shift the focal point slightly right
            // so the car/subject stays visible
          }}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />

        {/* Left-to-right gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Bottom fade into page background */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "220px",
            background: "linear-gradient(to top, #05141f 0%, transparent 100%)",
          }}
        />

        {/* Top vignette so navbar text stays readable */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "140px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Hero Text Content ── */}
      <div
        className="relative z-10 flex flex-col h-full pointer-events-none"
        style={{ paddingTop: navHeight }} // push content below navbar
      >
        {/* Vertically center on desktop, bottom-align on mobile */}
        <div className="flex-1 flex flex-col justify-end sm:justify-center">
          <div className="w-full px-5 sm:px-8 lg:px-14 xl:px-20 pb-14 sm:pb-0">
            <div className="max-w-2xl lg:max-w-3xl">

              {/* Eyebrow */}
              <p
                ref={eyebrowRef}
                className="font-semibold tracking-[0.28em] uppercase mb-3"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "clamp(0.6rem, 1.8vw, 0.875rem)",
                  opacity: 0, // GSAP will animate in
                }}
              >
                {slide.eyebrow}
              </p>

              {/* Title */}
              <h1
                ref={titleRef}
                className="font-black leading-[1.06] whitespace-pre-line mb-6 sm:mb-8"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  letterSpacing: "-0.01em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                  opacity: 0,
                }}
              >
                {slide.title}
              </h1>

              {/* CTA Buttons */}
              <div
                ref={btnsRef}
                className="flex flex-row gap-3 pointer-events-auto"
                style={{ opacity: 0 }}
              >
                {/* Primary */}
                <button
                  className="group flex items-center gap-2 font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: "#fff",
                    color: "#05141f",
                    fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
                    padding: "clamp(10px, 1.5vw, 16px) clamp(16px, 3vw, 40px)",
                    border: "1.5px solid transparent",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#05141f";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  {slide.cta1}
                  <ArrowRight />
                </button>

                {/* Secondary */}
                <button
                  className="group flex items-center gap-2 font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: "transparent",
                    color: "#fff",
                    fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
                    padding: "clamp(10px, 1.5vw, 16px) clamp(16px, 3vw, 40px)",
                    border: "1.5px solid rgba(255,255,255,0.55)",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#05141f";
                    e.currentTarget.style.borderColor = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                  }}
                >
                  {slide.cta2}
                  <ArrowRight />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className=" sm:hidden block flex justify-center pb-6 pointer-events-none"
          style={{ opacity: 0.45 }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-white font-medium tracking-[0.22em] uppercase"
              style={{ fontSize: "9px" }}
            >
              Scroll
            </span>
            <div
              className="w-px"
              style={{
                height: "28px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
                animation: "scrollPulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
      `}</style>
    </section>
  );
}