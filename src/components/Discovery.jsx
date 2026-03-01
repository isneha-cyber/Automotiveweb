import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";

const categories = [
  { key: "SUV_MPV", label: "SUV / CUV / MPV", showAll: true },
  { key: "HYBRID",  label: "Hybrid / Electric", count: 10 },
  { key: "SEDAN",   label: "Sedan",             count: 3  },
];

const vehicleData = {
  SUV_MPV: [
    { name: "Traveller",  year: "2027", price: "40,190", power: "291 hp", mpg: "23 MPG Comb." },
    { name: "Gurkha",     year: "2026", price: "33,690", power: "191 hp", mpg: "29 MPG Comb." },
    { name: "Urbania",    year: "2026", price: "54,900", power: "379 hp", mpg: "230 mi range" },
    { name: "Toofan",     year: "2026", price: "27,890", power: "139 hp", mpg: "33 MPG Comb." },
    { name: "Citroen",    year: "2027", price: "45,200", power: "250 hp", mpg: "21 MPG Comb." },
    { name: "Kona",       year: "2027", price: "32,100", power: "180 hp", mpg: "28 MPG Comb." },
  ],
  HYBRID: [
    { name: "EV6",          year: "2025", price: "42,600", power: "320 hp", mpg: "274 mi range" },
    { name: "Niro Hybrid",  year: "2026", price: "26,600", power: "139 hp", mpg: "53 MPG Comb." },
    { name: "Sportage HEV", year: "2026", price: "31,490", power: "226 hp", mpg: "38 MPG Comb." },
  ],
  SEDAN: [
    { name: "K5",           year: "2025", price: "26,490", power: "180 hp", mpg: "32 MPG Comb." },
    { name: "K4",           year: "2026", price: "22,490", power: "147 hp", mpg: "34 MPG Comb." },
    { name: "K4 Hatchback", year: "2026", price: "23,590", power: "147 hp", mpg: "33 MPG Comb." },
  ],
};

const CAR_COLORS = {
  Traveller: "#2d4a6b", Gurkha: "#8B7355", Urbania: "#4A90D9",
  Toofan: "#2d4a6b", Citroen: "#8B7355", Kona: "#4A90D9",
  EV6: "#2d4a6b", "Niro Hybrid": "#8B7355", "Sportage HEV": "#4A90D9",
  K5: "#2d4a6b", K4: "#8B7355", "K4 Hatchback": "#4A90D9",
};

const ChevL = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function CarSVG({ color, width = 300, height = 150 }) {
  return (
    <svg viewBox="0 0 300 150" width={width} height={height}>
      <rect x="30" y="55" width="240" height="60" rx="8" fill={color} />
      <polygon points="60,55 80,20 220,20 240,55" fill={color} />
      <polygon points="85,53 100,25 200,25 215,53" fill="#1a2a3a" opacity="0.7" />
      <rect x="240" y="70" width="28" height="25" rx="3" fill="#111" />
      <rect x="243" y="73" width="22" height="4" rx="1" fill="#333" />
      <rect x="243" y="80" width="22" height="4" rx="1" fill="#333" />
      <rect x="243" y="87" width="22" height="4" rx="1" fill="#333" />
      <rect x="255" y="63" width="18" height="8" rx="2" fill="#FFD700" opacity="0.9" />
      <rect x="10"  y="68" width="22" height="12" rx="2" fill="#c0392b" opacity="0.8" />
      <rect x="95"  y="25" width="45" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      <rect x="148" y="25" width="52" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      <circle cx="75"  cy="115" r="20" fill="#1a1a1a" />
      <circle cx="75"  cy="115" r="13" fill="#333" />
      <circle cx="75"  cy="115" r="5"  fill="#888" />
      <circle cx="225" cy="115" r="20" fill="#1a1a1a" />
      <circle cx="225" cy="115" r="13" fill="#333" />
      <circle cx="225" cy="115" r="5"  fill="#888" />
      <line x1="148" y1="55" x2="148" y2="115" stroke="#000" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

export default function KiaDiscovery() {
  const [activeCat,   setActiveCat]   = useState("SUV_MPV");
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const [infoVisible, setInfoVisible] = useState(true);
  const [bgOpacity,   setBgOpacity]   = useState(1);

  const tabRefs     = useRef({});
  const tabBarRef   = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX   = useRef(null);

  const vehicles   = vehicleData[activeCat];
  const total      = vehicles.length;
  const vehicle    = vehicles[activeIdx];
  const isMpgRange = vehicle.mpg.includes("range");
  const prevIdx    = (activeIdx - 1 + total) % total;
  const nextIdx    = (activeIdx + 1) % total;

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

  const changeCategory = (key) => {
    if (key === activeCat) return;
    setBgOpacity(0); setInfoVisible(false);
    setTimeout(() => { setActiveCat(key); setActiveIdx(0); setBgOpacity(1); setInfoVisible(true); }, 300);
  };

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

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchEndX.current = null; };
  const onTouchMove  = (e) => { touchEndX.current = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? "next" : "prev");
    touchStartX.current = null; touchEndX.current = null;
  };

  return (
    <div className="bg-white font-sans overflow-hidden">

      {/* ── NAV ── */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="text-white text-xl sm:text-2xl font-bold tracking-widest select-none">KIA</div>
        <div className="hidden sm:flex gap-6 text-white text-sm font-medium">
          {["Vehicles", "Why Kia", "Owners", "Shopping Tools"].map(item => (
            <span key={item} className="cursor-pointer hover:underline opacity-90">{item}</span>
          ))}
        </div>
        <button className="sm:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className="w-5 h-0.5 bg-white rounded" />
          <span className="w-5 h-0.5 bg-white rounded" />
          <span className="w-5 h-0.5 bg-white rounded" />
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (< sm)
      ══════════════════════════════════════════ */}
      <div
        className="sm:hidden flex flex-col"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background hero area — fixed height */}
        <div className="relative w-full" style={{ height: "380px" }}>
          {/* BG */}
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: bgOpacity }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpeg')" }} />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
          </div>

          {/* Title + tabs */}
          <div className="absolute top-16 left-0 right-0 text-center z-10 px-4">
            <h1 className="text-white text-lg font-light tracking-wide mb-4">
              Discover The Ayam Force
            </h1>
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div ref={tabBarRef} className="relative inline-flex items-end border-b border-white/20 min-w-max" role="tablist">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    ref={el => { tabRefs.current[cat.key] = el; }}
                    role="tab"
                    aria-selected={activeCat === cat.key}
                    onClick={() => changeCategory(cat.key)}
                    className={`bg-transparent border-none cursor-pointer px-3 pb-2.5 pt-2 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-200 ${activeCat === cat.key ? "text-white" : "text-white/55"}`}
                  >
                    {cat.label}
                    {cat.showAll && <span className="text-[8px] bg-white/20 text-white px-1.5 py-0.5 rounded-full border border-white/30">All</span>}
                    {cat.count  && <span className="text-[8px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded-full">{cat.count}</span>}
                  </button>
                ))}
                <span
                  className="absolute bottom-[-1px] h-[2px] bg-white rounded-sm transition-all duration-300 pointer-events-none z-[5]"
                  style={{ left: sliderStyle.left, width: sliderStyle.width }}
                />
              </div>
            </div>
          </div>

          {/* Car — centered in remaining space */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
            <div
              className="transition-opacity duration-200"
              style={{ opacity: infoVisible ? 1 : 0, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))" }}
            >
              <CarSVG color={CAR_COLORS[vehicle.name] || "#2d4a6b"} width={260} height={130} />
            </div>
          </div>
        </div>

        {/* Controls bar — sits below the hero, on white */}
        <div className="bg-white px-5 pt-4 pb-2 flex items-center justify-between">
          {/* Prev */}
          <button
            onClick={() => navigate("prev")}
            className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 text-gray-700 flex items-center justify-center active:scale-95 transition"
          >
            <ChevL />
          </button>

          {/* Counter + dots */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              {activeIdx + 1} / {total}
            </span>
            <div className="flex items-center gap-1">
              {vehicles.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)} className="p-0.5">
                  <span className={`block rounded-full transition-all duration-220 ${i === activeIdx ? "w-4 h-1.5 bg-gray-900" : "w-1.5 h-1.5 bg-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => navigate("next")}
            className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 text-gray-700 flex items-center justify-center active:scale-95 transition"
          >
            <ChevR />
          </button>
        </div>

        {/* Info panel */}
        <div className={`bg-white px-5 pb-6 transition-all duration-200 ${infoVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Year */}
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{vehicle.year}</p>

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{vehicle.name}</h2>
          <button className="text-[11px] text-blue-600 underline mb-4">Disclaimers</button>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-4" />

          {/* Specs — 3 equal columns */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Starting At</p>
              <p className="font-semibold text-gray-900 text-sm">${vehicle.price}<sup className="text-[8px] text-gray-400">1</sup></p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Power</p>
              <p className="font-semibold text-gray-900 text-sm">{vehicle.power}</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{isMpgRange ? "Range" : "MPG"}</p>
              <p className="font-semibold text-gray-900 text-sm">{vehicle.mpg}{!isMpgRange && <sup className="text-[8px] text-gray-400">2</sup>}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <button className="flex-1 bg-gray-900 text-white text-xs font-semibold py-3 hover:bg-gray-700 active:scale-95 transition tracking-wide">
              Learn More
            </button>
            <button className="flex-1 border border-gray-900 text-gray-900 text-xs font-semibold py-3 hover:bg-gray-900 hover:text-white active:scale-95 transition tracking-wide">
              Build Yours
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (≥ sm)
      ══════════════════════════════════════════ */}
      <div
        className="hidden sm:block relative w-full"
        style={{ height: "clamp(480px, 65vw, 640px)" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background */}
        <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: bgOpacity }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.jpeg')" }} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
        </div>

        {/* Heading + Tabs */}
        <div className="absolute top-28 left-0 right-0 text-center z-10 px-4">
          <h1 className="text-white text-3xl font-light tracking-wide mb-8">Discover The Ayam Force</h1>
          <div ref={tabBarRef} className="relative inline-flex items-end border-b border-white/20" role="tablist">
            {categories.map(cat => (
              <button
                key={cat.key}
                ref={el => { tabRefs.current[cat.key] = el; }}
                role="tab"
                aria-selected={activeCat === cat.key}
                onClick={() => changeCategory(cat.key)}
                className={`bg-transparent border-none cursor-pointer px-[22px] pb-3 pt-2.5 flex items-center gap-[7px] text-[clamp(10px,1.3vw,13px)] font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-250 ${activeCat === cat.key ? "text-white" : "text-white/60"}`}
              >
                {cat.label}
                {cat.showAll && <span className="text-[9px] bg-white/20 text-white px-[7px] py-0.5 rounded-full border border-white/30">All</span>}
                {cat.count  && <span className="text-[9px] bg-white/10 text-white/80 px-[7px] py-0.5 rounded-full min-w-[20px] text-center">{cat.count}</span>}
              </button>
            ))}
            <span
              className="absolute bottom-[-1px] h-[2.5px] bg-white rounded-sm transition-all duration-380 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-[5]"
              style={{ left: sliderStyle.left, width: sliderStyle.width }}
            />
          </div>
        </div>

        {/* Three-slot carousel */}
        <div className="absolute bottom-12 left-0 right-0 flex items-end justify-center z-10 px-4">
          <button onClick={() => navigate("prev")} className="absolute left-6 bottom-28 w-10 h-10 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition z-20"><ChevL /></button>

          <div className="flex-shrink-0 opacity-60 cursor-pointer hover:opacity-80 transition-all" style={{ marginBottom: "60px", transform: "scale(0.65)", transformOrigin: "bottom center" }} onClick={() => jumpTo(prevIdx)}>
            <CarSVG color={CAR_COLORS[vehicles[prevIdx].name] || "#2d4a6b"} width={300} height={150} />
          </div>

          <div className="flex-shrink-0 mx-6 transition-all duration-500" style={{ marginBottom: "12px", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}>
            <CarSVG color={CAR_COLORS[vehicle.name] || "#2d4a6b"} width={300} height={150} />
          </div>

          <div className="flex-shrink-0 opacity-60 cursor-pointer hover:opacity-80 transition-all" style={{ marginBottom: "60px", transform: "scale(0.65)", transformOrigin: "bottom center" }} onClick={() => jumpTo(nextIdx)}>
            <CarSVG color={CAR_COLORS[vehicles[nextIdx].name] || "#2d4a6b"} width={300} height={150} />
          </div>

          <button onClick={() => navigate("next")} className="absolute right-6 bottom-28 w-10 h-10 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition z-20"><ChevR /></button>
        </div>
      </div>

      {/* Desktop info panel */}
      <div className={`hidden sm:block bg-white px-8 pt-6 pb-8 transition-all duration-220 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-baseline gap-3 flex-wrap pr-40">
            <h2 className="text-4xl font-bold text-gray-900">{vehicle.name}</h2>
            <span className="text-xs text-gray-400">{vehicle.year}</span>
            <button className="text-xs text-blue-600 underline cursor-pointer">Disclaimers</button>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <a href="#" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition">Build yours <ChevR /></a>
            </div>
          </div>

          <div className="flex items-center mt-2 mb-4">
            {vehicles.map((_, i) => (
              <button key={i} onClick={() => jumpTo(i)} className="p-1.5 inline-flex items-center justify-center">
                <span className={`w-[7px] h-[7px] rounded-full transition-all duration-220 ${i === activeIdx ? "bg-gray-900 scale-150" : "bg-gray-300"}`} />
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mt-2 mb-5" />

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Starting At</p>
                <p className="font-semibold text-gray-900 text-xl">${vehicle.price}<sup className="text-gray-400 text-[9px] ml-0.5">1</sup></p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Power Up To</p>
                <p className="font-semibold text-gray-900 text-xl">{vehicle.power}</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{isMpgRange ? "Range Up To" : "MPG Up To"}</p>
                <p className="font-semibold text-gray-900 text-xl">{vehicle.mpg}{!isMpgRange && <sup className="text-gray-400 text-[9px] ml-0.5">2</sup>}</p>
              </div>
            </div>
            <button className="bg-gray-900 text-white text-sm px-6 py-2.5 hover:bg-gray-700 active:scale-95 transition font-medium">Learn more</button>
          </div>
        </div>
      </div>

    </div>
  );
}