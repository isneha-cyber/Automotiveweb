import { useEffect, useRef, useState } from "react";

// Checkmark icon with animation
const CheckIcon = ({ animate }) => (
  <svg 
    width="22" 
    height="22" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={animate ? "animate-[check_0.5s_ease-in-out]" : ""}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function TrustedBanner() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);

  // Scroll-triggered fade-in with staggered animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate badge after banner appears
          setTimeout(() => setAnimateBadge(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes check {
          0% {
            stroke-dashoffset: 24;
            stroke-dasharray: 24;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 24;
          }
        }
        
        @keyframes badgePulse {
          0% {
            box-shadow: 0 0 0 0 rgba(26, 122, 46, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(26, 122, 46, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(26, 122, 46, 0);
          }
        }
        
        @keyframes bounceRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
        
        .animate-fade-up {
          animation: fadeUp 0.7s ease forwards;
        }
        
        .badge-pulse {
          animation: badgePulse 2s ease-out;
        }
        
        .view-link {
          position: relative;
        }
        
        .view-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .view-link:hover::after {
          width: 100%;
        }
        
        .view-arrow {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .view-link:hover .view-arrow {
          transform: translateX(6px) scale(1.1);
        }
        
        .badge-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .badge-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }

        .trusted-title {
          font-family: 'Rajdhani', sans-serif;
        }

        .trusted-body {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      {/* OUTER WRAPPER */}
      <div className="trusted-body bg-[#080f1a]">
    
        {/* BANNER SECTION */}
        <div
          ref={sectionRef}
          className="relative overflow-hidden"
        >
          {/* Background with parallax effect */}
          <div className="absolute inset-0">
            <img
              src="images/hero2.webp"
              alt=""
              className="w-full h-full object-cover object-center transition-transform duration-[10s] ease-out"
              style={{
                transform: isVisible ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#05101e]/45 via-[#05101e]/20 to-[#05101e]/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080f1a]/45 via-transparent to-[#080f1a]/45" />
            
            {/* Subtle moving light effect */}
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* CONTENT - with py-24 */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
              
              {/* LEFT: Headline */}
              <div 
                className="flex-1 max-w-2xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? 'fadeUp 0.7s ease forwards' : 'none',
                }}
              >
                <h2 
                  className="trusted-title text-white font-bold leading-tight mb-3"
                  style={{ 
                    fontSize: "clamp(28px, 5vw, 52px)",
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Trusted by consumers.
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
                  Explore AyamForce models that made Consumer Reports' 
                  <span className="hidden xs:inline"> </span>
                  <br className="hidden sm:block" />
                  Recommended list for 2025
                </p>
              </div>

              {/* CENTRE: CR Badge */}
              {/* <div 
                className={`flex-shrink-0 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              > */}
                {/* <div className={`badge-hover inline-flex items-center gap-0 bg-[#1a7a2e] rounded-lg overflow-hidden shadow-2xl shadow-black/40 ${animateBadge ? 'badge-pulse' : ''}`}> */}
                  {/* Black circle checkmark */}
                  {/* <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black/90 flex-shrink-0">
                    <CheckIcon animate={animateBadge} />
                  </div> */}
                  
                  {/* CR text */}
                  {/* <div className="px-4 sm:px-5 py-2.5 sm:py-3 flex flex-col justify-center">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span 
                        className="trusted-title text-white font-bold"
                        style={{ 
                          fontSize: "clamp(22px, 3.5vw, 34px)", 
                          lineHeight: 1,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        CR
                      </span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">Consumer</span>
                        <span className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">Reports</span>
                      </div>
                    </div>
                    <span className="text-white text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase mt-1 sm:mt-1.5">
                      RECOMMENDED<sup className="text-[7px] sm:text-[8px] ml-[2px]">®</sup>
                    </span>
                  </div> */}
                {/* </div> */}
              {/* </div> */}

              {/* RIGHT: View link */}
              <div 
                className={`flex-shrink-0 lg:ml-auto ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s' }}
              >
                <a
                  href="#"
                  className="view-link inline-flex items-center gap-2.5 text-white hover:text-white/80 text-sm sm:text-base font-medium tracking-wide transition-colors duration-200 whitespace-nowrap group"
                >
                  <span>View Recommended Models</span>
                  <span className="view-arrow inline-block">
                    <ArrowRight />
                  </span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </>
  );
}