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
  gradient: "from-black/75 via-black/35 to-transparent",
};

// GSAP loader
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) return resolve(window.gsap);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s.onload = () => resolve(window.gsap);
    document.head.appendChild(s);
  });

export default function Hero({ eyebrowRef, titleRef, btnsRef }) {
  const [gsapReady, setGsapReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadGSAP().then(() => setGsapReady(true));
  }, []);

  const animateContent = (gsap) => {
    const els = [eyebrowRef?.current, titleRef?.current, btnsRef?.current].filter(Boolean);
    if (!els.length) return;
    gsap.fromTo(
      els,
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );
  };

  useEffect(() => {
    if (gsapReady) animateContent(window.gsap);
  }, [gsapReady]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video play failed:", e));
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 560 }}
      aria-label="Hero section"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={slide.bg}
          className="w-full h-full object-cover object-center"
          muted
          loop
          playsInline
          autoPlay
          poster="/images/fallback.jpg"
        />
        {/* Left gradient for text legibility */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        {/* Bottom vignette - responsive height */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Top vignette (helps with navbar blend) - responsive height */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 md:h-28 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      {/* ── Hero Text Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 w-full">

          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="text-white/75 text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4"
          >
            {slide.eyebrow}
          </p>

          {/* Title */}
          <h1
            ref={titleRef}
            className="hero-title text-white font-bold leading-[0.95] sm:leading-[0.92] mb-4 sm:mb-6 md:mb-9"
            style={{
              fontSize: "clamp(36px, 8vw, 48px)",
              whiteSpace: "pre-line",
              maxWidth: isMobile ? "100%" : "80%",
            }}
          >
            {slide.title}
          </h1>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 pointer-events-auto"
          >
            <button className="group flex items-center justify-center gap-2 bg-white text-black text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 min-w-[140px] sm:min-w-[160px] hover:bg-black hover:text-white transition-all duration-300 rounded-none border border-transparent hover:border-white">
              {slide.cta1}
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight />
              </span>
            </button>
            <button className="group flex items-center justify-center gap-2 border border-white text-white text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 min-w-[140px] sm:min-w-[160px] hover:bg-white hover:text-black transition-all duration-300 rounded-none">
              {slide.cta2}
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}