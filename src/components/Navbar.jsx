import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";

// ── Icons ──────────────────────────────────────────────
const ChevronDown = ({ size = 12, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="2 4 6 8 10 4" />
  </svg>
);
const MapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SearchIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ArrowRight = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const ChevRight = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

// ── Data ──────────────────────────────────────────────
const categories = [
  { key: "SUV_MPV", label: "SUV / CUV / MPV", showAll: true },
  { key: "HYBRID",  label: "Hybrid / Electric", count: 10 },
  { key: "SEDAN",   label: "Sedan", count: 3 },
];

const vehicleData = {
  SUV_MPV: [
    { name: "Traveller",  price: "$40,190", year: "2027", tagline: "Go anywhere, composed everywhere.",     thumb: "/images/traveller.webp", img: "/images/traveller.webp", href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }, { label: "RESERVE ONLINE" }] },
    { name: "Gurkha",     price: "$33,690", year: "2026", tagline: "Unstoppable by nature.",                thumb: "/images/van.webp",        img: "/images/van.webp",        href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "Urbania",    price: "$54,900", year: "2026", tagline: "Electric luxury, redefined.",           thumb: "/images/urbania.png",      img: "/images/urbania.png",      href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }, { label: "RESERVE ONLINE" }] },
    { name: "Toofan",     price: "$27,890", year: "2026", tagline: "Born from the storm.",                  thumb: "/images/Monobus.png",      img: "/images/Monobus.png",      href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "Citroen",    price: "$45,200", year: "2027", tagline: "Effortless adventure.",                 thumb: "/images/Trax.png",         img: "/images/Trax.png",         href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "Kona",       price: "$32,100", year: "2027", tagline: "Compact power, expansive freedom.",     thumb: "/images/gurkha.png",       img: "/images/gurkha.png",       href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
  ],
  HYBRID: [
    { name: "EV6",          price: "$42,600", year: "2025", tagline: "The future, fully charged.",    thumb: "/images/gurkha.png",  img: "/images/gurkha.png",  href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "Niro Hybrid",  price: "$26,600", year: "2026", tagline: "Efficiency meets elegance.",    thumb: "/images/Monobus.png", img: "/images/Monobus.png", href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "Sportage HEV", price: "$31,490", year: "2026", tagline: "Sport meets sustainability.",   thumb: "/images/van.webp",    img: "/images/van.webp",    href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
  ],
  SEDAN: [
    { name: "K5",           price: "$26,490", year: "2025", tagline: "Refined performance, every drive.", thumb: "/images/Trax.png",      img: "/images/Trax.png",      href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "K4",           price: "$22,490", year: "2026", tagline: "Compact sophistication.",            thumb: "/images/van.webp",       img: "/images/van.webp",       href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
    { name: "K4 Hatchback", price: "$23,590", year: "2026", tagline: "Versatile by design.",              thumb: "/images/traveller.webp", img: "/images/traveller.webp", href: "/detailpage", links: [{ label: "EXPLORE", primary: true }, { label: "BUILD YOUR OWN" }] },
  ],
};

const quickLinks = [
  { label: "COMPARE OUR VEHICLES", icon: "⊞" },
  { label: "ELECTRIC",             icon: "⚡" },
  { label: "CLASSIC",              icon: "◈"  },
  { label: "SV",                   icon: "★"  },
];

// ── CAR SVG Fallback ──────────────────────────────────
const CAR_COLORS = {
  Traveller: "#2d4a6b", Gurkha: "#8B7355", Urbania: "#4A90D9",
  Toofan: "#1a3a2a", Citroen: "#5a3a2a", Kona: "#3a2a5a",
  EV6: "#1a2a4a", "Niro Hybrid": "#2a4a2a", "Sportage HEV": "#4a2a1a",
  K5: "#2d4a6b", K4: "#8B7355", "K4 Hatchback": "#4A90D9",
};

function CarFallback({ name, w = 300, h = 150 }) {
  const c = CAR_COLORS[name] || "#2d4a6b";
  return (
    <svg viewBox="0 0 300 150" width={w} height={h}>
      <rect x="30" y="55" width="240" height="60" rx="8" fill={c} />
      <polygon points="60,55 80,20 220,20 240,55" fill={c} />
      <polygon points="85,53 100,25 200,25 215,53" fill="#1a2a3a" opacity="0.7" />
      <rect x="240" y="70" width="28" height="25" rx="3" fill="#111" />
      <rect x="255" y="63" width="18" height="8" rx="2" fill="#FFD700" opacity="0.9" />
      <rect x="10" y="68" width="22" height="12" rx="2" fill="#c0392b" opacity="0.8" />
      <rect x="95" y="25" width="45" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      <rect x="148" y="25" width="52" height="28" rx="2" fill="#1a2a3a" opacity="0.7" />
      <circle cx="75" cy="115" r="20" fill="#1a1a1a" /><circle cx="75" cy="115" r="13" fill="#333" /><circle cx="75" cy="115" r="5" fill="#888" />
      <circle cx="225" cy="115" r="20" fill="#1a1a1a" /><circle cx="225" cy="115" r="13" fill="#333" /><circle cx="225" cy="115" r="5" fill="#888" />
    </svg>
  );
}

function SafeImg({ src, name, className, thumbSize = false }) {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [src]);
  if (err) return (
    <div className={`flex items-center justify-center ${className}`}>
      <CarFallback name={name} w={thumbSize ? 80 : 340} h={thumbSize ? 40 : 170} />
    </div>
  );
  return <img src={src} alt={name} className={className} onError={() => setErr(true)} />;
}


// ── DESKTOP Vehicle Dropdown ──────────────────────────
function VehicleDropdown({ isOpen }) {
  const [activeCat, setActiveCat] = useState("SUV_MPV");
  const [activeIdx, setActiveIdx] = useState(0);
  const [panelAnim, setPanelAnim] = useState(true);

  const tabRefs   = useRef({});
  const tabBarRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  const vehicles = vehicleData[activeCat];
  const vehicle  = vehicles[activeIdx];

  const updateSlider = useCallback(() => {
    const tabEl = tabRefs.current[activeCat];
    const barEl = tabBarRef.current;
    if (!tabEl || !barEl) return;
    const tR = tabEl.getBoundingClientRect();
    const bR = barEl.getBoundingClientRect();
    setSliderStyle({ width: tR.width, left: tR.left - bR.left });
  }, [activeCat]);

  useLayoutEffect(() => { updateSlider(); }, [updateSlider, isOpen]);
  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  const switchCat = (key) => {
    if (key === activeCat) return;
    setPanelAnim(false);
    setTimeout(() => { setActiveCat(key); setActiveIdx(0); setPanelAnim(true); }, 180);
  };
  const switchVehicle = (i) => {
    if (i === activeIdx) return;
    setPanelAnim(false);
    setTimeout(() => { setActiveIdx(i); setPanelAnim(true); }, 150);
  };

  return (
    <div
      className="absolute top-full left-0 right-0 w-full overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        maxHeight: isOpen ? "calc(100vh - 62px)" : "0px",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <div style={{ background: "#05101e", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Category Tab Bar */}
        <div
          ref={tabBarRef}
          className="relative flex items-end px-6 md:px-10 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", height: "48px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              ref={(el) => { tabRefs.current[cat.key] = el; }}
              onClick={() => switchCat(cat.key)}
              className="relative flex items-center gap-1.5 px-4 pb-3 pt-2 whitespace-nowrap text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 flex-shrink-0"
              style={{ color: activeCat === cat.key ? "#fff" : "rgba(255,255,255,0.45)" }}
            >
              {cat.label}
              {cat.showAll && <span className="text-[8px] px-1.5 py-0.5 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.5)" }}>ALL</span>}
              {cat.count && <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{cat.count}</span>}
            </button>
          ))}
          <span className="absolute bottom-0 h-[2px] transition-all duration-300 pointer-events-none" style={{ left: sliderStyle.left, width: sliderStyle.width, background: "#fff" }} />
        </div>

        {/* Three Columns - with scrolling */}
        <div 
          className="flex overflow-y-auto" 
          style={{ 
            minHeight: "420px",
            maxHeight: "calc(100vh - 110px)", // 62px navbar + 48px tabs = 110px
          }}
        >
          {/* LEFT */}
          <div className="flex-shrink-0 flex flex-col overflow-y-auto" style={{ width: "260px", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex-1 py-2">
              {vehicles.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => switchVehicle(i)}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-150"
                  style={{ background: activeIdx === i ? "rgba(255,255,255,0.07)" : "transparent", borderLeft: activeIdx === i ? "2px solid #fff" : "2px solid transparent" }}
                  onMouseEnter={e => { if (activeIdx !== i) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if (activeIdx !== i) e.currentTarget.style.background = "transparent"; }}
                >
                  <div className="flex-shrink-0 overflow-hidden rounded-sm" style={{ width: "52px", height: "30px", background: "rgba(255,255,255,0.05)" }}>
                    <SafeImg src={v.thumb} name={v.name} thumbSize className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold tracking-wider uppercase leading-none mb-0.5" style={{ color: activeIdx === i ? "#fff" : "rgba(255,255,255,0.75)" }}>{v.name}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{v.price}*</p>
                  </div>
                  <span style={{ color: activeIdx === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}><ChevRight /></span>
                </button>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="py-3">
              {quickLinks.map((ql) => (
                <a key={ql.label} href="#"
                  className="flex items-center gap-2.5 px-5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
                  <span style={{ fontSize: "12px" }}>{ql.icon}</span>{ql.label}
                </a>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div
            className="flex-shrink-0 flex flex-col justify-center px-8 py-8 transition-all duration-200"
            style={{ width: "280px", borderRight: "1px solid rgba(255,255,255,0.07)", opacity: panelAnim ? 1 : 0, transform: panelAnim ? "translateX(0)" : "translateX(8px)" }}
          >
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{vehicle.year}</p>
            <h3 className="font-bold tracking-wider uppercase mb-2 leading-none" style={{ color: "#fff", fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>{vehicle.name}</h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{vehicle.tagline}</p>
            <p className="text-sm font-semibold mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              Price from: <span style={{ color: "#fff" }}>{vehicle.price}*</span>
            </p>
            <div className="flex flex-col gap-2">
              {vehicle.links.map((link, li) => (
                <a 
                  key={li} 
                  href={vehicle.href}
                  className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
                  style={
                    link.primary 
                      ? { 
                          color: "#fff", 
                          paddingBottom: "2px", 
                          borderBottom: "1px solid rgba(255,255,255,0.3)", 
                          width: "fit-content" 
                        } 
                      : { 
                          color: "rgba(255,255,255,0.5)",
                          paddingBottom: "2px",
                          borderBottom: "1px solid transparent",
                        }
                  }
                  onMouseEnter={e => {
                    if (link.primary) {
                      e.currentTarget.style.color = "#fff";
                    } else {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderBottom = "1px solid rgba(255,255,255,0.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (link.primary) {
                      e.currentTarget.style.color = "#fff";
                    } else {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.borderBottom = "1px solid transparent";
                    }
                  }}
                >
                  {link.label} <ArrowRight size={11} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex items-center justify-center overflow-hidden transition-opacity duration-300 relative" style={{ opacity: panelAnim ? 1 : 0 }}>
            <div className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10" style={{ background: "linear-gradient(to right, #05101e, transparent)" }} />
            <SafeImg src={vehicle.img} name={vehicle.name} className="w-full h-full object-contain object-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MOBILE Vehicle Panel ──────────────────────────────
function MobileVehiclePanel({ isOpen }) {
  const [activeCat, setActiveCat] = useState("SUV_MPV");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [catAnim, setCatAnim] = useState(true);
  const [detailAnim, setDetailAnim] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) { setSelectedVehicle(null); setCatAnim(true); setDetailAnim(false); }
  }, [isOpen]);

  const vehicles = vehicleData[activeCat];

  const switchCat = (key) => {
    if (key === activeCat) return;
    setCatAnim(false);
    setTimeout(() => { setActiveCat(key); setCatAnim(true); }, 160);
  };

  const openVehicle = (v) => {
    setSelectedVehicle(v);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setTimeout(() => setDetailAnim(true), 10);
  };

  const closeDetail = () => {
    setDetailAnim(false);
    setTimeout(() => setSelectedVehicle(null), 240);
  };

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ 
        maxHeight: isOpen ? "calc(100vh - 200px)" : "0px", 
        opacity: isOpen ? 1 : 0,
        position: "relative",
        zIndex: 50
      }}
    >
      <div
        ref={scrollRef}
        style={{
          background: "#060d1a",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ── Detail Panel (slides over) ── */}
        {selectedVehicle && (
          <div
            style={{
              position: "absolute", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 60,
              background: "#060d1a",
              transform: detailAnim ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.24s cubic-bezier(0.4,0,0.2,1)",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Back button — sticky */}
            <button
              onClick={closeDetail}
              className="flex items-center gap-2 px-5 py-4 w-full sticky top-0 z-10 text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.5)", background: "#060d1a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <BackIcon /> Back to Vehicles
            </button>

            {/* Image */}
            <div className="relative overflow-hidden flex-shrink-0" style={{ height: "190px", background: "rgba(255,255,255,0.02)" }}>
              <SafeImg src={selectedVehicle.img} name={selectedVehicle.name} className="absolute inset-0 w-full h-full object-contain p-6" />
              <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, #060d1a, transparent)" }} />
            </div>

            {/* Info */}
            <div className="px-5 pt-2 pb-6 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{selectedVehicle.year}</p>
              <h2 className="text-[22px] font-black tracking-wider uppercase mb-2 leading-tight" style={{ color: "#fff" }}>{selectedVehicle.name}</h2>
              <p className="text-[13px] mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.46)" }}>{selectedVehicle.tagline}</p>
              <p className="text-sm font-semibold mb-5" style={{ color: "rgba(255,255,255,0.62)" }}>
                From: <span style={{ color: "#fff" }}>{selectedVehicle.price}*</span>
              </p>
              <div className="flex flex-col gap-2.5">
                {selectedVehicle.links.map((link, li) => (
                  <a
                    key={li} 
                    href={selectedVehicle.href}
                    className="flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
                    style={
                      link.primary 
                        ? { 
                            background: "#fff", 
                            color: "#05101e",
                            border: "1px solid #fff"
                          } 
                        : { 
                            border: "1px solid rgba(255,255,255,0.18)", 
                            color: "rgba(255,255,255,0.62)",
                            background: "transparent"
                          }
                    }
                    onMouseEnter={e => {
                      if (!link.primary) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!link.primary) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.62)";
                      }
                    }}
                  >
                    {link.label} <ArrowRight size={12} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links grid */}
            <div className="grid grid-cols-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {quickLinks.map((ql, qi) => (
                <a key={ql.label} href="#"
                  className="flex items-center gap-2 px-4 py-3.5 text-[10px] font-semibold tracking-wider uppercase"
                  style={{
                    color: "rgba(255,255,255,0.38)",
                    borderRight: qi % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderBottom: qi < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <span>{ql.icon}</span>{ql.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Category Tabs (sticky inside scroll) ── */}
        <div
          className="flex overflow-x-auto sticky top-0 z-10"
          style={{ background: "#04090f", borderBottom: "1px solid rgba(255,255,255,0.08)", scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => switchCat(cat.key)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap relative transition-all duration-200"
              style={{ color: activeCat === cat.key ? "#fff" : "rgba(255,255,255,0.38)" }}
            >
              {cat.label}
              {cat.showAll && <span className="text-[7px] px-1 py-0.5 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.35)" }}>ALL</span>}
              {cat.count && <span className="text-[7px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{cat.count}</span>}
              {activeCat === cat.key && <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "#fff" }} />}
            </button>
          ))}
        </div>

        {/* ── Vehicle List ── */}
        <div style={{ opacity: catAnim ? 1 : 0, transition: "opacity 0.16s" }}>
          {vehicles.map((v) => (
            <button
              key={v.name}
              onClick={() => openVehicle(v)}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-left"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.055)", background: "transparent", transition: "background 0.12s" }}
              onTouchStart={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onTouchEnd={e => setTimeout(() => { if (e.currentTarget) e.currentTarget.style.background = "transparent"; }, 180)}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div className="flex-shrink-0 overflow-hidden rounded" style={{ width: "70px", height: "42px", background: "rgba(255,255,255,0.05)" }}>
                <SafeImg src={v.thumb} name={v.name} thumbSize className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold tracking-wider uppercase leading-tight mb-0.5" style={{ color: "#fff" }}>{v.name}</p>
                <p className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.36)" }}>{v.year} · {v.price}*</p>
                <p className="text-[9px] leading-tight mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.26)" }}>{v.tagline}</p>
              </div>
              <span style={{ color: "rgba(255,255,255,0.26)", flexShrink: 0 }}><ChevRight size={13} /></span>
            </button>
          ))}

          {/* Quick links grid */}
          <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((ql) => (
                <a key={ql.label} href="#"
                  className="flex items-center gap-2 px-3 py-3 text-[10px] font-semibold tracking-wider uppercase"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.42)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}
                >
                  <span>{ql.icon}</span>{ql.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────
const navLinks = [
  { label: "Vehicles", dropdown: "vehicles" },
  { label: "Price",    dropdown: false },
  { label: "AyamForce Innovation", dropdown: false },
  { label: "Blogs",    dropdown: false },
  { label: "Contact",  dropdown: false },
];

export default function Navbar() {
  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [scrolled,           setScrolled]           = useState(false);
  const [vehiclesOpen,       setVehiclesOpen]       = useState(false);
  const [mobileVehiclesOpen, setMobileVehiclesOpen] = useState(false);
  const [searchOpen,         setSearchOpen]         = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef    = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setVehiclesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu OR desktop vehicles dropdown is open
  useEffect(() => {
    // Prevent body scroll when mobile menu is open OR desktop vehicles dropdown is open
    document.body.style.overflow = (mobileOpen || vehiclesOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, vehiclesOpen]);

  // Auto-focus search input
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 60);
  }, [searchOpen]);

  const toggleMobile = () => {
    setMobileOpen(prev => {
      if (prev) { setMobileVehiclesOpen(false); setSearchOpen(false); }
      return !prev;
    });
  };

  const isNavSolid = scrolled || vehiclesOpen || mobileOpen;

  return (
    <div ref={dropdownRef} className="fixed top-0 left-0 right-0 z-50" data-navbar>
      {/* ── Nav Bar ── */}
      <nav
        className="w-full transition-all duration-300"
        style={{
          background: isNavSolid ? "rgba(5,12,24,0.97)" : "transparent",
          boxShadow: isNavSolid ? "0 1px 0 rgba(255,255,255,0.06), 0 4px 32px rgba(0,0,0,0.55)" : "none",
          backdropFilter: isNavSolid ? "blur(18px) saturate(180%)" : "none",
          WebkitBackdropFilter: isNavSolid ? "blur(18px) saturate(180%)" : "none",
        }}
      >
        <div className="w-full px-4 md:px-10">
          <div className="flex items-center" style={{ height: "62px" }}>

            {/* Logo */}
            <a href="/" className="flex-shrink-0 mr-4 md:mr-10 flex items-center gap-2.5">
              <img className="w-10 h-10 object-contain" src="/logo2.png" alt="AyamForce" />
              <span className="hidden sm:block font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.88)", fontSize: "11px" }}>
                AyamForce
              </span>
            </a>

            <div className="hidden lg:block w-px h-6 mr-8" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0 flex-1">
              {navLinks.map((link) =>
                link.dropdown === "vehicles" ? (
                  <button
                    key={link.label}
                    onClick={() => setVehiclesOpen(!vehiclesOpen)}
                    className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200"
                    style={{ color: vehiclesOpen ? "#fff" : "rgba(255,255,255,0.78)" }}
                  >
                    {link.label}
                    <ChevronDown style={{ transition: "transform 0.2s", transform: vehiclesOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    {vehiclesOpen && <span className="absolute bottom-0 left-4 right-4" style={{ height: "2px", background: "#fff" }} />}
                  </button>
                ) : (
                  <a key={link.label} href="#"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.78)"}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
              <a href="#"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.78)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.78)"}
              >
                <MapPin /> Find a Dealer
              </a>
              <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.18)" }} />
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.09)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
              >
                <SearchIcon /> Search
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center ml-auto">
              <button
                className="p-2.5 transition-colors duration-200"
                style={{ color: searchOpen ? "#fff" : "rgba(255,255,255,0.78)" }}
                onClick={() => setSearchOpen(s => !s)}
                aria-label="Search"
              >
                <SearchIcon size={18} />
              </button>
              <button
                className="p-2.5"
                style={{ color: "#fff" }}
                onClick={toggleMobile}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {/* Animated icon swap */}
                <div style={{ position: "relative", width: "22px", height: "22px" }}>
                  <span style={{ position: "absolute", inset: 0, transition: "opacity 0.22s, transform 0.22s", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)" }}>
                    <CloseIcon />
                  </span>
                  <span style={{ position: "absolute", inset: 0, transition: "opacity 0.22s, transform 0.22s", opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)" }}>
                    <MenuIcon />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-200"
          style={{ maxHeight: searchOpen ? "64px" : "0", opacity: searchOpen ? 1 : 0 }}
        >
          <div className="px-4 pb-3 pt-1">
            <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)" }}>
              <SearchIcon size={14} />
              <input
                ref={searchInputRef}
                className="flex-1 bg-transparent outline-none"
                style={{ color: "#fff", fontSize: "13px" }}
                placeholder="Search vehicles, features…"
              />
              <button onClick={() => setSearchOpen(false)} style={{ color: "rgba(255,255,255,0.4)", fontSize: "20px", lineHeight: 1 }}>×</button>
            </div>
          </div>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </nav>

      {/* Desktop Vehicles Dropdown */}
      <div className="hidden lg:block">
        <VehicleDropdown isOpen={vehiclesOpen} />
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out fixed left-0 right-0"
        style={{
          maxHeight: mobileOpen ? "calc(100vh - 62px)" : "0px",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
          top: "62px",
          bottom: 0,
          zIndex: 40,
          overflowY: "auto",
        }}
      >
        <div style={{ 
          background: "rgba(4,9,20,0.98)", 
          backdropFilter: "blur(18px)", 
          WebkitBackdropFilter: "blur(18px)", 
          borderTop: "1px solid rgba(255,255,255,0.07)",
          minHeight: "100%",
        }}>
          {/* Nav rows */}
          <div>
            {navLinks.map((link) => (
              <div key={link.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.065)" }}>
                {link.dropdown === "vehicles" ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium tracking-wide"
                      style={{ color: mobileVehiclesOpen ? "#fff" : "rgba(255,255,255,0.82)" }}
                      onClick={() => setMobileVehiclesOpen(v => !v)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={13} style={{ transition: "transform 0.25s", transform: mobileVehiclesOpen ? "rotate(180deg)" : "rotate(0deg)", color: mobileVehiclesOpen ? "#fff" : "rgba(255,255,255,0.38)" }} />
                    </button>
                    <MobileVehiclePanel isOpen={mobileVehiclesOpen} />
                  </>
                ) : (
                  <a href="#"
                    className="flex items-center justify-between px-5 py-4 text-sm font-medium tracking-wide"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}

            <a href="#"
              className="flex items-center justify-between px-5 py-4 text-sm font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.82)", borderBottom: "1px solid rgba(255,255,255,0.065)" }}
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center gap-2"><MapPin /> Find a Dealer</span>
            </a>
          </div>

          {/* CTA Row */}
          <div className="px-5 py-4 flex gap-3">
            <button className="flex-1 py-3.5 text-[11px] font-bold tracking-widest uppercase" style={{ background: "#fff", color: "#05101e" }}>
              Build Your Own
            </button>
            <button className="flex-1 py-3.5 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.82)" }}>
              <SearchIcon size={13} /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}