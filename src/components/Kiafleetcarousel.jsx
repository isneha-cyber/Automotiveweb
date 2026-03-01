import { useState, useEffect } from "react";
import imageone from '../../public/images/gurkha.png'
import imagetwo from '../../public/images/Monobus.png'
import imagethree from '../../public/images/Trax.webp'
import imagefour from '../../public/images/traveller.webp'
import imagefive from '../../public/images/urbania.png'
import imagesix from '../../public/images/van.webp'

const vehicles = [
  { id: 0, year: "2027", name: "Telluride", carImg: imageone,    msrp: "$39,190", power: "274 hp", mpg: "19–22 MPG Comb." },
  { id: 1, year: "2026", name: "Sorento",   carImg: imagetwo,   msrp: "$33,090", power: "281 hp", mpg: "24–27 MPG Comb." },
  { id: 2, year: "2026", name: "Sportage",  carImg: imagethree, msrp: "$28,090", power: "187 hp", mpg: "26–29 MPG Comb." },
  { id: 3, year: "2026", name: "Carnival",  carImg: imagefour,  msrp: "$35,400", power: "290 hp", mpg: "19–22 MPG Comb." },
  { id: 4, year: "2025", name: "Soul",      carImg: imagefive,  msrp: "$22,600", power: "147 hp", mpg: "28–31 MPG Comb." },
  { id: 5, year: "2026", name: "Seltos",    carImg: imagesix,   msrp: "$24,090", power: "146 hp", mpg: "27–31 MPG Comb." },
];

const TABS       = ["SUV / CUV / MPV", "Hybrid / Electric", "Sedan"];
const TAB_COUNTS = [null, 10, 3];

// Desktop: 3-card coverflow
const DESKTOP_SLOTS = {
  "-2": { x: "-140%", scale: 0.42, y:  0,  opacity: 0,    zIndex: 0  },
  "-1": { x: "-82%",  scale: 0.55, y: 28,  opacity: 0.75, zIndex: 10 },
  "0":  { x: "0%",    scale: 1,    y:  0,  opacity: 1,    zIndex: 20 },
  "1":  { x: "82%",   scale: 0.55, y: 28,  opacity: 0.75, zIndex: 10 },
  "2":  { x: "140%",  scale: 0.42, y:  0,  opacity: 0,    zIndex: 0  },
};

// Mobile: only center card visible
const MOBILE_SLOTS = {
  "-2": { x: "-300%", scale: 0.42, y: 0, opacity: 0, zIndex: 0  },
  "-1": { x: "-300%", scale: 0.58, y: 0, opacity: 0, zIndex: 0  },
  "0":  { x: "0%",    scale: 1,    y: 0, opacity: 1, zIndex: 20 },
  "1":  { x: "300%",  scale: 0.58, y: 0, opacity: 0, zIndex: 0  },
  "2":  { x: "300%",  scale: 0.42, y: 0, opacity: 0, zIndex: 0  },
};

function getSlot(offset) {
  return String(Math.max(-2, Math.min(2, offset)));
}

export default function Kiafleet() {
  const [activeTab,     setActiveTab]     = useState(0);
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const n = vehicles.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (index) => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveIndex((index + n) % n);
    setTimeout(() => setTransitioning(false), 520);
  };

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  const getOffset = (idx) => {
    let diff = idx - activeIndex;
    if (diff >  n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  };

  const slots   = isMobile ? MOBILE_SLOTS : DESKTOP_SLOTS;
  const vehicle = vehicles[activeIndex];

  // Preload neighbors
  useEffect(() => {
    [-1, 1].forEach((off) => {
      const idx = (activeIndex + off + n) % n;
      const img = new Image();
      img.src = vehicles[idx].carImg;
    });
  }, [activeIndex]);

  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <div
        className="relative w-full"
        style={{ height: isMobile ? "360px" : "720px", overflow: "visible" }}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <img
            src="/images/bg.jpeg"
            alt=""
            role="presentation"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 55%" }}
          />
        </div>

        {/* Title + Tabs */}
        <div
          className="relative flex flex-col items-center px-4 gap-4"
          style={{ paddingTop: isMobile ? "58px" : "260px", zIndex: 30 }}
        >
          <h2
            className="text-white text-center tracking-widest sm:text-4xl text-lg"
            style={{ marginTop: isMobile ? "20px" : "0" }}
          >
            Discover the AyamForce Motors
          </h2>

          <div className="flex items-center flex-wrap justify-center gap-2 md:gap-6 mt-2">
            {TABS.map((tab, i) => {
              const active = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className="inline-flex sm:text-sm text-xs items-center gap-1.5 rounded-full whitespace-nowrap transition-all duration-200"
                  style={{
                    padding: isMobile ? "4px 12px" : "6px 15px",
                    border:  active ? "2px solid #fff" : "2px solid rgba(255,255,255,0.4)",
                    background: active ? "#fff" : "transparent",
                    color:   active ? "#05141f" : "#fff",
                    cursor:  "pointer",
                  }}
                >
                  {tab}
                  {TAB_COUNTS[i] != null && (
                    <span
                      className="rounded-full font-bold"
                      style={{
                        padding:    "1px 7px",
                        background: active ? "#05141f" : "rgba(255,255,255,0.25)",
                        color:      "#fff",
                      }}
                    >
                      {TAB_COUNTS[i]}
                    </span>
                  )}
                </button>
              );
            })}
            <a
              href="/vehicles"
              className="text-white inline-flex items-center gap-1 no-underline text-xs sm:text-lg"
              style={{ padding: "6px 8px" }}
            >
              All Vehicles <span style={{ lineHeight: 1 }}>›</span>
            </a>
          </div>
        </div>

        {/* ── NAV ARROWS — positioned relative to the HERO, always visible ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="group absolute"
          style={{
            left:      isMobile ? "12px" : "24px",
            bottom:    isMobile ? "calc(-70px + 90px)" : "calc(-90px + 170px)",
            transform: "translateY(50%)",
            width:     isMobile ? "38px" : "52px",
            height:    isMobile ? "38px" : "52px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border:     "1.5px solid rgba(255,255,255,0.6)",
            color:      "#fff",
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:     "pointer",
            zIndex:     50,
            backdropFilter:       "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow:  "0 2px 16px rgba(0,0,0,0.22)",
            transition: "background 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.30)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <svg width={isMobile ? 13 : 18} height={isMobile ? 13 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="group absolute"
          style={{
            right:     isMobile ? "12px" : "24px",
            bottom:    isMobile ? "calc(-70px + 90px)" : "calc(-90px + 170px)",
            transform: "translateY(50%)",
            width:     isMobile ? "38px" : "52px",
            height:    isMobile ? "38px" : "52px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border:     "1.5px solid rgba(255,255,255,0.6)",
            color:      "#fff",
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor:     "pointer",
            zIndex:     30,
            backdropFilter:       "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow:  "0 2px 16px rgba(0,0,0,0.22)",
            transition: "background 200ms ease, transform 200ms ease",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.30)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <svg width={isMobile ? 13 : 18} height={isMobile ? 13 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* ── CAROUSEL STAGE ── */}
        <div
          className="absolute"
          style={{
            bottom: isMobile ? "-70px" : "-90px",
            left:   isMobile ? "0" : "-8vw",
            right:  isMobile ? "0" : "-8vw",
            zIndex: 20,
            height: isMobile ? "220px" : "420px",
          }}
        >
          <div className="relative w-full h-full">
            {vehicles.map((veh, idx) => {
              const offset     = getOffset(idx);
              const key        = getSlot(offset);
              const slot       = slots[key];
              const isCenter   = offset === 0;
              const isNeighbor = Math.abs(offset) === 1;

              return (
                <div
                  key={veh.id}
                  onClick={() => !isCenter && goTo(idx)}
                  style={{
                    position:        "absolute",
                    left:            "50%",
                    bottom:          0,
                    transformOrigin: "bottom center",
                    transform:       `translateX(calc(-50% + ${slot.x})) translateY(${slot.y ?? 0}px) scale(${slot.scale})`,
                    opacity:         slot.opacity,
                    zIndex:          slot.zIndex,
                    transition:      "transform 480ms cubic-bezier(0.4, 0, 0.2, 1), opacity 380ms ease",
                    cursor:          isCenter ? "default" : "pointer",
                    willChange:      "transform, opacity",
                    pointerEvents:   Math.abs(offset) >= 2 ? "none" : "auto",
                  }}
                >
                  <img
                    src={veh.carImg}
                    alt={`${veh.year} Kia ${veh.name}`}
                    style={{
                      display:         "block",
                      objectFit:       "contain",
                      objectPosition:  "bottom center",
                      height:          isMobile ? "200px" : "380px",
                      width:           isMobile ? "280px" : "600px",
                      filter:          isCenter
                        ? "drop-shadow(0 28px 52px rgba(0,0,0,0.55))"
                        : "drop-shadow(0 10px 28px rgba(0,0,0,0.25))",
                      transition:      "filter 480ms ease",
                      userSelect:      "none",
                      WebkitUserDrag:  "none",
                    }}
                    onError={(e) => { e.currentTarget.style.opacity = "0.12"; }}
                  />

                  {isNeighbor && !isMobile && (
                    <div
                      style={{
                        position:      "absolute",
                        bottom:        "-6px",
                        left:          "50%",
                        transform:     "translateX(-50%)",
                        color:         "rgba(255,255,255,0.7)",
                        fontSize:      "11px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        whiteSpace:    "nowrap",
                        transition:    "opacity 300ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      {veh.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── INFO PANEL ── */}
      <div
        className="relative w-full bg-white"
        style={{
          marginTop: isMobile ? "90px" : "130px",
          padding:   isMobile ? "0 16px 32px" : "0 clamp(20px, 7vw, 120px) 40px",
          zIndex:    10,
        }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-start justify-between gap-5"
          style={{ maxWidth: "860px", animation: "fadeUp 0.4s ease both" }}
          key={activeIndex}
        >
          {/* Left */}
          <div className="flex flex-col w-full md:w-auto">
            <span className="uppercase text-gray-400 mb-1 text-md sm:text-xl">
              {vehicle.year}
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="leading-none m-0 text-black font-bold sm:text-5xl text-3xl">
                {vehicle.name}
              </h3>
              <button
                className="underline cursor-pointer bg-transparent border-none p-0 self-end mb-1"
                style={{ fontSize: "11px", color: "#bbb" }}
              >
                Disclaimers
              </button>
            </div>
            <div className="flex flex-wrap gap-5 md:gap-10 mt-4">
              <Stat label="STARTING AT" value={vehicle.msrp}  sup="1" />
              <Stat label="POWER UP TO" value={vehicle.power}         />
              <Stat label="MPG UP TO"   value={vehicle.mpg}   sup="2" />
            </div>
          </div>

          {/* Right: CTAs */}
          <div
            className="flex flex-row md:flex-col gap-3 w-full md:w-auto sm:text-md text-sm"
            style={{ minWidth: isMobile ? "100%" : "136px" }}
          >
            <HoverLink href="#" outlined>Build yours ›</HoverLink>
            <HoverLink href="#">Learn more</HoverLink>
          </div>
        </div>

        {/* Dot indicators */}
        <div className={`flex justify-center gap-2 mt-6 ${isMobile ? "mt-8" : ""}`}>
          {vehicles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="border-none cursor-pointer p-0"
              style={{
                height:       isMobile ? "10px" : "8px",
                width:        i === activeIndex ? (isMobile ? "28px" : "24px") : (isMobile ? "10px" : "8px"),
                borderRadius: isMobile ? "5px" : "4px",
                background:   i === activeIndex ? "#05141f" : "#d1d5db",
                transition:   "width 300ms ease, background 300ms ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}

/* ── Stat block ── */
function Stat({ label, value, sup }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="uppercase font-bold text-gray-400"
        style={{ fontSize: "9px", letterSpacing: "1.8px" }}
      >
        {label}
      </span>
      <span
        className="font-bold text-[#05141f]"
        style={{ fontSize: "clamp(13px, 1.4vw, 16px)", letterSpacing: "-0.01em" }}
      >
        {value}
        {sup && (
          <sup style={{ fontSize: "9px", color: "#aaa", marginLeft: "1px" }}>{sup}</sup>
        )}
      </span>
    </div>
  );
}

/* ── CTA link ── */
function HoverLink({ href, children, outlined }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="flex items-center transition-all duration-200 whitespace-nowrap no-underline"
      style={{
        padding:        "6px 20px",
        gap:            "6px",
        justifyContent: outlined ? "space-between" : "center",
        border:         outlined ? "2px solid #05141f" : "none",
        background:     outlined
          ? (hovered ? "#05141f"  : "transparent")
          : (hovered ? "#1c3b52" : "#05141f"),
        color: outlined
          ? (hovered ? "#fff" : "#05141f")
          : "#fff",
        flex: "1 1 0",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}