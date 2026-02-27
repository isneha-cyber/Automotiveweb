import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    key: "home",
    img: "/images/part.jpg",
    title: "Genuine Parts & Accessories",
    desc: "OEM-grade components engineered for peak performance and long-lasting reliability",
  },
  {
    key: "swap",
    img: "/images/part2.webp",
    title: "Service & Maintenance",
    desc: "Expert technicians and scheduled servicing to keep your vehicle at its best",
  },
  {
    key: "mobile",
    img: "/images/traveller2.webp",
    title: "Force Traveller",
    desc: "Spacious, powerful, and built for every road - the ideal choice for group travel",
  },
];

function CardImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest">
          No Image
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}

function HeroImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
        <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest">
          Force Motors
        </span>
      </div>
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setErrored(true)}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300/40 via-transparent to-transparent pointer-events-none" />
    </>
  );
}

// Mobile Slider Component
function MobileCardSlider({ cards }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="sm:hidden">
      <div
        ref={sliderRef}
        className="overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={card.key} className="w-full flex-shrink-0 px-2">
              <div className="relative overflow-hidden bg-white border border-gray-100">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <CardImage src={card.img} alt={card.title} />
                </div>

                <div className="p-5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                  
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-6 bg-gray-900"
                : "w-1.5 bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <p className="text-center text-[10px] text-gray-400 mt-2">
        {currentSlide + 1} / {cards.length}
      </p>
    </div>
  );
}

export default function Service() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans py-12 sm:py-24 px-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Content Section */}
        <div className="flex flex-col justify-center py-12 lg:py-14  order-2 lg:order-1">
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm tracking-wide text-gray-800">
              <span className="font-bold text-black">AYAM FORCE</span>
              <span className="font-light text-gray-500 ml-1">MOTORS</span>
            </p>
            <p className="text-[9px] sm:text-[11px] text-gray-400 mt-1 tracking-[0.18em] uppercase">
              Built For The Journey Ahead.
            </p>
          </div>

          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed lg:leading-snug 
                       font-light text-gray-900 mb-6 lg:mb-10 max-w-xl">
            Advanced Engineering Meets Rugged Reliability With Precision-Crafted
            Interiors And Intelligent Features That Adapt To Every Terrain, Making
            Your Force Motors Vehicle The Perfect Companion For Work And Adventure.
          </h1>

          <button className="w-fit border border-gray-800 text-gray-800 text-[10px] sm:text-[11px] 
                           tracking-[0.18em] uppercase px-4 sm:px-5 py-2.5 
                           hover:bg-gray-900 hover:text-white transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[520px] order-1 lg:order-2">
          <HeroImage src="/images/gurkha2.jpg" alt="Force Motors Gurkha" />
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-8 sm:mt-12 ">
        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-100 gap-12">
          {cards.map((card, i) => (
            <div
              key={card.key}
              className="relative overflow-hidden cursor-pointer group border-b border-gray-100 
                        sm:border-b-0 last:border-b-0"
              style={{
                borderRight: i < cards.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
              onMouseEnter={() => setHovered(card.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
                <CardImage src={card.img} alt={card.title} />
              </div>

              <div className="p-4 sm:p-5 lg:p-6 bg-white">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
                
                {/* Desktop Learn More Link (hidden on mobile) */}
                {/* <button className="mt-3 sm:mt-4 text-[10px] uppercase tracking-wider text-gray-900 
                                 font-medium opacity-0 group-hover:opacity-100 transition-opacity
                                 flex items-center gap-1">
                  Learn More
                  <span className="text-sm">→</span>
                </button> */}
              </div>

              {/* Hover Indicator Line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500"
                style={{ width: hovered === card.key ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <MobileCardSlider cards={cards} />
      </div>

      {/* Mobile View All Link (optional) */}
      <div className="text-center mt-8 sm:hidden">
        <button className="text-xs text-gray-600 underline underline-offset-4">
          View all services →
        </button>
      </div>
    </div>
  );
}