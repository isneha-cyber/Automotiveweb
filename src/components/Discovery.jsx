import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA (from second code)
───────────────────────────────────────────── */
const categories = [
  { key: "SUV_MPV", label: "SUV / CUV / MPV", showAll: true },
  { key: "HYBRID",  label: "Hybrid / Electric", count: 10   },
  { key: "SEDAN",   label: "Sedan",             count: 3    },
];

const vehicleData = {
  SUV_MPV: [
    { name: "Traveller", year: "2027", price: "40,190", power: "291 hp", mpg: "23 MPG Comb.", img: "/images/traveller.webp" },
    { name: "Gurkha",    year: "2026", price: "33,690", power: "191 hp", mpg: "29 MPG Comb.", img: "images/van.webp" },
    { name: "Urbania",   year: "2026", price: "54,900", power: "379 hp", mpg: "230 mi range", img: "/images/urbania.png" },
    { name: "Toofan",    year: "2026", price: "27,890", power: "139 hp", mpg: "33 MPG Comb.", img: "/images/Monobus.png" },
    { name: "Citroen",   year: "2027", price: "45,200", power: "250 hp", mpg: "21 MPG Comb.", img: "/images/Trax.png" },
    { name: "Kona",      year: "2027", price: "32,100", power: "180 hp", mpg: "28 MPG Comb.", img: "/images/gurkha.png" },
  ],
  HYBRID: [
    { name: "EV6",          year: "2025", price: "42,600", power: "320 hp", mpg: "274 mi range", img: "/images/gurkha.png" },
    { name: "Niro Hybrid",  year: "2026", price: "26,600", power: "139 hp", mpg: "53 MPG Comb.", img: "/images/Monobus.png" },
    { name: "Sportage HEV", year: "2026", price: "31,490", power: "226 hp", mpg: "38 MPG Comb.", img: "images/van.webp" },
  ],
  SEDAN: [
    { name: "K5",           year: "2025", price: "26,490", power: "180 hp", mpg: "32 MPG Comb.", img: "/images/Trax.png" },
    { name: "K4",           year: "2026", price: "22,490", power: "147 hp", mpg: "34 MPG Comb.", img: "/images/van.webp" },
    { name: "K4 Hatchback", year: "2026", price: "23,590", power: "147 hp", mpg: "33 MPG Comb.", img: "/images/traveller.webp" },
  ],
};

// Car colors from first code
const CAR_COLORS = {
  Traveller: "#2d4a6b",
  Gurkha: "#8B7355",
  Urbania: "#4A90D9",
  Toofan: "#2d4a6b",
  Citroen: "#8B7355",
  Kona: "#4A90D9",
  EV6: "#2d4a6b",
  "Niro Hybrid": "#8B7355",
  "Sportage HEV": "#4A90D9",
  K5: "#2d4a6b",
  K4: "#8B7355",
  "K4 Hatchback": "#4A90D9",
};

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const ChevL = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/* ─────────────────────────────────────────────
   CAR SVG COMPONENT (from first code, adapted)
───────────────────────────────────────────── */
function CarSVG({ name, color, small = false }) {
  const scale = small ? 0.65 : 1;
  
  // Generic car SVG that works for any vehicle name
  return (
    <svg
      viewBox="0 0 300 150"
      width={300 * scale}
      height={150 * scale}
      style={{ filter: small ? "brightness(0.85)" : "none" }}
    >
      {/* Body */}
      <rect x="30" y="55" width="240" height="60" rx="8" fill={color} />
      {/* Roof */}
      <polygon points="60,55 80,20 220,20 240,55" fill={color} />
      {/* Windshield */}
      <polygon points="85,53 100,25 200,25 215,53" fill="#1a2a3a" opacity="0.7" />
      {/* Front grille */}
      <rect x="240" y="70" width="28" height="25" rx="3" fill="#111" />
      <rect x="243" y="73" width="22" height="4" rx="1" fill="#333" />
      <rect x="243" y="80" width="22" height="4" rx="1" fill="#333" />
      <rect x="243" y="87" width="22" height="4" rx="1" fill="#333" />
      {/* Headlight */}
      <rect x="255" y="63" width="18" height="8" rx="2" fill="#FFD700" opacity="0.9" />
      {/* Rear lights */}
      <rect x="10" y="68" width="22" height="12" rx="2" fill="#c0392b" opacity="0.8" />
      {/* Windows */}
      <rect x="95" y="25" width="45" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      <rect x="148" y="25" width="52" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      {/* Wheels */}
      <circle cx="75" cy="115" r="20" fill="#1a1a1a" />
      <circle cx="75" cy="115" r="13" fill="#333" />
      <circle cx="75" cy="115" r="5" fill="#888" />
      <circle cx="225" cy="115" r="20" fill="#1a1a1a" />
      <circle cx="225" cy="115" r="13" fill="#333" />
      <circle cx="225" cy="115" r="5" fill="#888" />
      {/* Door line */}
      <line x1="148" y1="55" x2="148" y2="115" stroke="#000" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT (first code layout + second code content)
───────────────────────────────────────────── */
export default function KiaDiscovery() {
  const [activeCat,   setActiveCat]   = useState("SUV_MPV");
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const [infoVisible, setInfoVisible] = useState(true);
  const [bgOpacity,   setBgOpacity]   = useState(1);

  const tabRefs     = useRef({});
  const tabBarRef   = useRef(null);
  const touchStartX = useRef(null);

  const vehicles   = vehicleData[activeCat];
  const total      = vehicles.length;
  const vehicle    = vehicles[activeIdx];
  const isMpgRange = vehicle.mpg.includes("range");

  /* ── Animated underline ── */
  const updateSlider = useCallback(() => {
    const tabEl = tabRefs.current[activeCat];
    const barEl = tabBarRef.current;
    if (!tabEl || !barEl) return;
    const tR = tabEl.getBoundingClientRect();
    const bR = barEl.getBoundingClientRect();
    setSliderStyle({ width: tR.width, left: tR.left - bR.left });
  }, [activeCat]);

  useLayoutEffect(() => { updateSlider(); }, [updateSlider]);
  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  /* ── Category change with fade ── */
  const changeCategory = (key) => {
    if (key === activeCat) return;
    setBgOpacity(0);
    setInfoVisible(false);
    setTimeout(() => {
      setActiveCat(key);
      setActiveIdx(0);
      setBgOpacity(1);
      setInfoVisible(true);
    }, 300);
  };

  /* ── Vehicle navigation ── */
  const navigate = (dir) => {
    setInfoVisible(false);
    setTimeout(() => {
      setActiveIdx(p => dir === "next" ? (p + 1) % total : (p - 1 + total) % total);
      setInfoVisible(true);
    }, 200);
  };
  
  const jumpTo = (i) => {
    if (i === activeIdx) return;
    setInfoVisible(false);
    setTimeout(() => { setActiveIdx(i); setInfoVisible(true); }, 200);
  };

  /* ── Swipe ── */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  /* ── 3-slot carousel ── */
  const prevIdx = (activeIdx - 1 + total) % total;
  const nextIdx = (activeIdx + 1) % total;
  const slots = [
    { xVw: -32, scale: 0.50, opacity: 0.45, z: 5,  idx: prevIdx,   clickable: true  },
    { xVw:   0, scale: 1.00, opacity: 1.00, z: 10, idx: activeIdx, clickable: false },
    { xVw:  32, scale: 0.50, opacity: 0.45, z: 5,  idx: nextIdx,   clickable: true  },
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* NAV - from first code */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
        <div className="text-white text-2xl font-bold tracking-widest select-none">KIA</div>
        <div className="flex gap-6 text-white text-sm font-medium">
          {["Vehicles", "Why Kia", "Owners", "Shopping Tools"].map((item) => (
            <span key={item} className="cursor-pointer hover:underline opacity-90">{item}</span>
          ))}
        </div>
      </nav>

      {/* HERO - from first code with mountain bg */}
      <div 
        className="relative w-full" 
        style={{ height: "620px" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
       {/* Mountain BG - from first code */}
<div
  className="absolute inset-0 transition-opacity duration-400 ease-in-out"
  style={{
    opacity: bgOpacity,
  }}
>
  {/* Background Image - Replace the URL with your image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/bg.jpeg')", // Replace this with your image path
    }}
  />
  
  {/* Dark overlay to maintain text readability */}
  <div className="absolute inset-0 bg-black/40" />
  
 
  
  {/* Subtle vignette */}
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
    }}
  />
</div>

        {/* Heading and Tabs - from second code but positioned like first */}
        <div className="absolute top-28 left-0 right-0 text-center z-10">
          <h1 className="text-white text-3xl font-light tracking-wide mb-8">
            Discover The Ayam Force
          </h1>
          
          {/* Tab rail - from second code */}
          <div ref={tabBarRef} className="relative inline-flex items-end border-b border-white/20" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.key}
                ref={(el) => { tabRefs.current[cat.key] = el; }}
                role="tab"
                aria-selected={activeCat === cat.key}
                tabIndex={activeCat === cat.key ? 0 : -1}
                onClick={() => changeCategory(cat.key)}
                className={`
                  bg-transparent border-none cursor-pointer px-[22px] pb-3 pt-2.5 first:pl-0
                  flex items-center gap-[7px] text-[clamp(10px,1.3vw,13px)] font-bold 
                  tracking-wider uppercase whitespace-nowrap transition-colors duration-250
                  ${activeCat === cat.key ? "text-white" : "text-white/60"}
                `}
              >
                {cat.label}
                {cat.showAll && (
                  <span className="text-[9px] font-bold tracking-wider bg-white/20 text-white px-[7px] py-0.5 rounded-full border border-white/30">
                    Show all
                  </span>
                )}
                {cat.count && (
                  <span className="text-[9px] font-semibold bg-white/10 text-white/80 px-[7px] py-0.5 rounded-full min-w-[20px] text-center">
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
            
            {/* Animated underline */}
            <span
              className="absolute bottom-[-1px] h-[2.5px] bg-white rounded-sm transition-all duration-380 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-[5]"
              style={{ left: sliderStyle.left, width: sliderStyle.width }}
            />
          </div>
        </div>

        {/* Cars row - from first code but with second code data */}
        <div className="absolute bottom-12 left-0 right-0 flex items-end justify-center z-10 px-4">
          {/* Left arrow */}
          <button
            onClick={() => navigate("prev")}
            className="absolute left-6 bottom-28 w-10 h-10 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition z-20 text-2xl"
          >
            ‹
          </button>

          {/* Left car */}
          <div
            className="flex-shrink-0 opacity-70 cursor-pointer hover:opacity-90 transition-all"
            style={{ marginBottom: "60px", transform: "scale(0.7)", transformOrigin: "bottom center" }}
            onClick={() => jumpTo(prevIdx)}
          >
            <CarSVG 
              name={vehicles[prevIdx].name} 
              color={CAR_COLORS[vehicles[prevIdx].name] || "#2d4a6b"} 
              small 
            />
          </div>

          {/* Center car */}
          <div
            className="flex-shrink-0 mx-6 transition-all duration-500"
            style={{ marginBottom: "12px" }}
          >
            <CarSVG 
              name={vehicle.name} 
              color={CAR_COLORS[vehicle.name] || "#2d4a6b"} 
            />
          </div>

          {/* Right car */}
          <div
            className="flex-shrink-0 opacity-70 cursor-pointer hover:opacity-90 transition-all"
            style={{ marginBottom: "60px", transform: "scale(0.7)", transformOrigin: "bottom center" }}
            onClick={() => jumpTo(nextIdx)}
          >
            <CarSVG 
              name={vehicles[nextIdx].name} 
              color={CAR_COLORS[vehicles[nextIdx].name] || "#2d4a6b"} 
              small 
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={() => navigate("next")}
            className="absolute right-6 bottom-28 w-10 h-10 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition z-20 text-2xl"
          >
            ›
          </button>
        </div>
      </div>

      {/* INFO PANEL - from second code, with first code styling */}
      <div
        className={`
          bg-white px-8 pt-6 pb-8 transition-all duration-220 ease-in-out
          ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
        `}
      >
        <div className="max-w-4xl mx-auto">
          {/* Mobile: year + dots */}
          <div className="flex sm:hidden items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              {vehicle.year}
            </span>
            <div className="flex">
              {vehicles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className="p-1.5 inline-flex items-center justify-center"
                >
                  <span className={`
                    w-[7px] h-[7px] rounded-full transition-all duration-220
                    ${i === activeIdx ? "bg-gray-900 scale-150" : "bg-gray-300"}
                  `} />
                </button>
              ))}
            </div>
          </div>

          {/* Name row */}
          <div className="relative flex items-baseline gap-3 flex-wrap pr-0 sm:pr-40">
            <h2 className="text-4xl font-bold text-gray-900">
              {vehicle.name}
            </h2>
            <span className="hidden sm:inline text-xs text-gray-400">
              {vehicle.year}
            </span>
            <button className="text-xs text-blue-600 underline cursor-pointer">
              Disclaimers
            </button>
            
            {/* Build yours — desktop absolute right */}
            <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2">
              <a href="#" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition">
                Build yours <ChevR />
              </a>
            </div>
          </div>

          {/* Desktop dots */}
          <div className="hidden sm:flex items-center mt-2 mb-4">
            {vehicles.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                className="p-1.5 inline-flex items-center justify-center"
              >
                <span className={`
                  w-[7px] h-[7px] rounded-full transition-all duration-220
                  ${i === activeIdx ? "bg-gray-900 scale-150" : "bg-gray-300"}
                `} />
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mt-2 mb-6" />

          {/* Specs + CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Starting At</p>
                <p className="font-semibold text-gray-900 text-xl">
                  ${vehicle.price}<sup className="text-gray-400 text-[9px] ml-0.5">1</sup>
                </p>
              </div>
              
              <div className="w-px h-8 bg-gray-300" />
              
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Power Up To</p>
                <p className="font-semibold text-gray-900 text-xl">{vehicle.power}</p>
              </div>
              
              <div className="w-px h-8 bg-gray-300" />
              
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {isMpgRange ? "Range Up To" : "MPG Up To"}
                </p>
                <p className="font-semibold text-gray-900 text-xl">
                  {vehicle.mpg}{!isMpgRange && <sup className="text-gray-400 text-[9px] ml-0.5">2</sup>}
                </p>
              </div>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex gap-3">
              <button className="bg-gray-900 text-white text-sm px-6 py-2.5 hover:bg-gray-700 transition font-medium">
                Learn more
              </button>
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="flex sm:hidden flex-col gap-3 mt-5">
            <button className="bg-gray-900 text-white text-sm px-6 py-2.5 hover:bg-gray-700 transition font-medium w-full">
              Learn more
            </button>
            <button className="bg-transparent text-gray-900 text-sm px-6 py-2.5 border border-gray-900 hover:bg-gray-900 hover:text-white transition font-medium w-full">
              Build yours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

