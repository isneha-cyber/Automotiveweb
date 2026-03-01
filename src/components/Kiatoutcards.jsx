import { useState } from "react";

const cards = [
  {
    eyebrow: "PUT THE FUN IN FUNCTIONAL",
    title: "2026 K4 Hatchback",
    cta: "Meet K4 Hatchback",
    href: "https://www.kia.com/us/en/k4-hatchback",
    image: "/images/video.png",
    alt: "2026 K4 Hatchback",
  },
  {
    eyebrow: "DESTINED FOR THE MOMENTS AHEAD",
    title: "2026 Sorento",
    cta: "Meet Sorento",
    href: "https://www.kia.com/us/en/sorento",
    image: "/images/gurkha2.jpg",
    alt: "2026 Sorento",
  },
  {
    eyebrow: "REDEFINING VERSATILITY",
    title: "2026 Carnival MPV Hybrid",
    cta: "Meet Carnival MPV Hybrid",
    href: "https://www.kia.com/us/en/carnival-mpv-hybrid",
    image: "/images/traveller2.webp",
    alt: "2026 Kia Carnival MPV Hybrid",
  },
];

function ToutCard({ card, isHovered, onMouseEnter, onMouseLeave }) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <a
      href={card.href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative overflow-hidden block cursor-pointer no-underline
        transition-all duration-400 ease-out
        ${isHovered ? 'lg:flex-[1.4_1_0%]' : 'lg:flex-[1_1_0%]'}
        w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto
        lg:w-auto lg:flex-[1_1_0%] lg:hover:flex-[1.4_1_0%]
        
        mb-4 lg:mb-0
      `}
      style={{
        transition: "flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Background image */}
      <img
        src={card.image}
        alt={card.alt}
        className={`
          absolute inset-0 w-full h-full object-cover block z-0
          transition-transform duration-600 ease-out
          ${isHovered ? 'scale-105' : 'scale-100'}
          group-hover:scale-105
        `}
        style={{
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Gradient overlay - darker on mobile for better text contrast */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-20">
        <p className="text-white/90 text-[10px] sm:text-xs tracking-[0.2em] font-medium font-helvetica mb-2 sm:mb-3 uppercase">
          {card.eyebrow}
        </p>
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight font-helvetica mb-4 sm:mb-5 md:mb-6 max-w-[250px] sm:max-w-none">
          {card.title}
        </h2>
        
        {/* Mobile: Full width button, Desktop: Inline button */}
        <button
          tabIndex={-1}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className={`
            w-full sm:w-auto
            px-4 sm:px-6 py-2.5 sm:py-2
            font-helvetica text-xs sm:text-sm font-semibold tracking-wider
            border-2 transition-all duration-200 ease-in-out
            backdrop-blur-sm
            ${btnHovered 
              ? 'bg-white text-black border-white' 
              : 'bg-black/20 text-white border-white hover:bg-white hover:text-black'
            }
            lg:bg-transparent lg:hover:bg-white lg:hover:text-black
            
          `}
        >
          {card.cta}
        </button>
        
        {/* Mobile hint - subtle indicator for more content */}
        <div className="flex justify-center mt-3 lg:hidden">
          <div className="w-8 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </a>
  );
}

export default function KiaToutCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-[#05141f] min-h-screen flex items-start lg:items-center justify-center py-12 lg:py-24">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6 lg:pt-[39px]">
        
        {/* Mobile header - visible only on mobile
        <div className="lg:hidden mb-6 sm:mb-8 text-center">
          <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Discover</span>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mt-2">New Collection</h1>
          <div className="w-16 h-0.5 bg-white/30 mx-auto mt-3"></div>
        </div>
         */}
        {/* Cards container */}
        <div className="
          flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8
          lg:h-[520px]
        ">
          {cards.map((card, i) => (
            <ToutCard
              key={i}
              card={card}
              isHovered={hoveredIndex === i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
       
      </div>
    </div>
  );
}