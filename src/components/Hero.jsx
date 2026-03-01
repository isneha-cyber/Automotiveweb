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
  const heroRef = useRef(null);
  const videoRef = useRef(null);

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
      style={{ height: "100svh", minHeight: "560px" }}
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
  {/* Bottom vignette - fades into page bg color #05141f */}
  <div
    className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 md:h-64"
    style={{ background: 'linear-gradient(to top, #05141f, transparent)' }}
  />
  {/* Top vignette */}
  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent sm:h-20 md:h-28" />
</div>
      {/* ── Hero Text Content ── */}
      <div className="relative z-10 flex flex-col justify-end sm:justify-center h-full pointer-events-none pb-16 sm:pb-0">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Content wrapper for better mobile control */}
          <div className="w-full max-w-3xl sm:mt-18 mt-0">
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="text-white/75 text-xs font-semibold tracking-wider uppercase mb-2 sm:text-sm sm:tracking-[0.3em] sm:mb-3 md:text-base md:mb-4"
            >
              {slide.eyebrow}
            </p>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-white font-bold leading-tight mb-4 sm:mb-6 md:mb-9 lg:text-6xl md:text-5xl sm:text-4xl text-3xl whitespace-pre-line"
            >
              {slide.title}
            </h1>

            {/* CTA Buttons - Using Flexbox */}
            <div
              ref={btnsRef}
              className="flex flex-col sm:flex-row gap-2 pointer-events-auto sm:gap-4"
            >
              <button className="flex items-center justify-center gap-1.5 bg-white text-black text-[10px] font-bold tracking-wider uppercase px-4 py-2.5 min-w-[120px] hover:bg-black hover:text-white transition-all duration-300 rounded-none border border-transparent hover:border-white sm:text-sm sm:px-8 sm:py-3.5 sm:min-w-[160px] sm:gap-2 md:text-base md:px-10 md:py-4">
                {slide.cta1}
                <span className="flex items-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </button>
              <button className="flex items-center justify-center gap-1.5 border border-white text-white text-[10px] font-bold tracking-wider uppercase px-4 py-2.5 min-w-[120px] hover:bg-white hover:text-black transition-all duration-300 rounded-none sm:text-sm sm:px-8 sm:py-3.5 sm:min-w-[160px] sm:gap-2 md:text-base md:px-10 md:py-4">
                {slide.cta2}
                <span className="flex items-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}