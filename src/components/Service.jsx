import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
        <span className="text-gray-400 text-xs uppercase tracking-widest">No Image</span>
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
        <span className="text-gray-500 text-sm uppercase tracking-widest">Force Motors</span>
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
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent pointer-events-none" />
    </>
  );
}

function MobileCardSlider({ cards }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <div className="sm:hidden relative">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {cards.map((card) => (
            <div key={card.key} className="w-full flex-shrink-0">
              <div className="group relative overflow-hidden bg-white border border-gray-100">
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <CardImage src={card.img} alt={card.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 truncate">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{card.desc}</p>
                  <button className="inline-flex items-center text-xs font-semibold text-gray-900 tracking-wide group">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-[104px] -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-[104px] -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? "w-8 h-2 bg-gray-900" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Service() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 lg:px-12 pt-12 sm:pt-20 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">

          {/* Left: Copy — spans 2 of 5 columns on lg */}
          <div className="lg:col-span-2 flex flex-col justify-center py-4 lg:py-10 order-2 lg:order-1">
            {/* Brand tag */}
            <p className="text-xs tracking-widest uppercase mb-4">
              <span className="font-bold text-gray-900">Ayam Force</span>
              <span className="font-light text-gray-400 ml-1">Motors</span>
            </p>

            {/* Sub-label */}
            <p className="text-[11px] text-gray-400 tracking-[0.22em] uppercase mb-5">
              Built For The Journey Ahead.
            </p>

            {/* Headline */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light leading-snug text-gray-900 mb-8 max-w-sm">
              Advanced Engineering With Precision-Crafted Interiors And Intelligent Features,
              Making Your Force Motors Vehicle The Perfect Companion For Work And Adventure.
            </h1>

            {/* CTA */}
            <button className="w-fit border border-gray-900 text-gray-900 text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium">
              Learn More
            </button>

            {/* Stats — visible on all breakpoints */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
              {[
                { value: "25+", label: "Years" },
                { value: "50+", label: "Dealers" },
                { value: "10k+", label: "Vehicles" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image — spans 3 of 5 columns on lg */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="relative overflow-hidden w-full h-56 sm:h-80 lg:h-[560px]">
              <HeroImage src="/images/gurkha2.jpg" alt="Force Motors Gurkha" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="px-4 sm:px-6 lg:px-12 mt-14 sm:mt-20 pb-16 sm:pb-24">
        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.key}
              className="group relative overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHovered(card.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative h-52 sm:h-56 lg:h-64 overflow-hidden bg-gray-100">
                <CardImage src={card.img} alt={card.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-2 truncate">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{card.desc}</p>
                <button className="inline-flex items-center text-xs font-semibold text-gray-900 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Bottom reveal line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500"
                style={{ width: hovered === card.key ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile slider */}
        <MobileCardSlider cards={cards} />
      </section>
    </div>
  );
}