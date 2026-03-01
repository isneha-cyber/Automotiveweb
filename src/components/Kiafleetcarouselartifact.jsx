import { useState, useEffect, useRef } from "react";


const vehicles = [
  {
    id: 0,
    year: "2027",
    name: "Telluride",
    carImg: "/images/gurkha.png",
    msrp: "$39,190",
    power: "274 hp",
    mpg: "19–22 MPG Comb.",
  },
  {
    id: 1,
    year: "2026",
    name: "Sorento",
    carImg: "/images/Monobus.png",
    msrp: "$33,090",
    power: "281 hp",
    mpg: "24–27 MPG Comb.",
  },
  {
    id: 2,
    year: "2026",
    name: "Sportage",
    carImg: "/images/Trax.png",
    msrp: "$28,090",
    power: "187 hp",
    mpg: "26–29 MPG Comb.",
  },
  {
    id: 3,
    year: "2026",
    name: "Carnival",
    carImg: "/images/traveller.webp",
    msrp: "$35,400",
    power: "290 hp",
    mpg: "19–22 MPG Comb.",
  },
  {
    id: 4,
    year: "2025",
    name: "Soul",
    carImg: "/images/urbania.png",
    msrp: "$22,600",
    power: "147 hp",
    mpg: "28–31 MPG Comb.",
  },
  {
    id: 5,
    year: "2026",
    name: "Seltos",
    carImg: "/images/van.webp",
    msrp: "$24,090",
    power: "146 hp",
    mpg: "27–31 MPG Comb.",
  },
];

const TABS = [
  { label: "SUV / CUV / MPV", count: null },
  { label: "Hybrid / Electric", count: 10 },
  { label: "Sedan", count: 3 },
];

export default function KiaFleetCarouselartifact() {
  const [activeTab, setActiveTab] = useState(0);
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const n = vehicles.length;

  const go = (idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((idx + n) % n);
      setTransitioning(false);
    }, 320);
  };

  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  const getIdx = (offset) => (current + offset + n) % n;
  const v = vehicles[current];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#05141f" }} className="w-full bg-white overflow-hidden">

      {/* ── Hero / Carousel Section ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "520px" }}>
        {/* Background */}
        <img
          src={'/images/bg.jpeg'}
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
        {/* Dark top overlay for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,20,31,0.45) 0%, rgba(5,20,31,0.1) 55%, rgba(255,255,255,0) 75%)" }} />
        {/* White fade at very bottom into the info panel */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "120px", background: "linear-gradient(to top, #fff 0%, transparent 100%)" }} />

        {/* ── Header content ── */}
        <div className="relative z-10 flex flex-col items-center pt-12 px-4">
          <h2 className="text-white text-3xl font-bold mb-6" style={{ letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
            Discover the new Kia
          </h2>

          {/* Tab bar */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-1.5 transition-all duration-200"
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: activeTab === i ? "2px solid #fff" : "2px solid rgba(255,255,255,0.45)",
                  background: activeTab === i ? "#fff" : "transparent",
                  color: activeTab === i ? "#05141f" : "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
                {tab.count != null && (
                  <span style={{
                    background: activeTab === i ? "#05141f" : "rgba(255,255,255,0.25)",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "1px 6px",
                    fontSize: "10px",
                    fontWeight: "700",
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
            <a
              href="/vehicles"
              style={{ color: "#fff", fontSize: "13px", fontWeight: "600", padding: "6px 10px", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
              className="hover:underline"
            >
              All Vehicles <span style={{ fontSize: "16px" }}>›</span>
            </a>
          </div>
        </div>

        {/* ── Carousel vehicles ── */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center" style={{ paddingBottom: "20px" }}>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              position: "absolute", left: "16px", bottom: "80px", zIndex: 20,
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* 3 Slides: left / center / right */}
          {[-1, 0, 1].map((offset) => {
            const idx = getIdx(offset);
            const veh = vehicles[idx];
            const isCenter = offset === 0;
            return (
              <div
                key={`${idx}-${offset}`}
                onClick={() => !isCenter && go(idx)}
                style={{
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                  cursor: isCenter ? "default" : "pointer",
                  zIndex: isCenter ? 10 : 1,
                  width: isCenter ? "380px" : "220px",
                  opacity: isCenter ? 1 : 0.55,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <img
                  src={veh.carImg}
                  alt={`${veh.year} Kia ${veh.name}`}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: isCenter ? "230px" : "145px",
                    transition: "all 0.4s ease",
                 
                  }}
                  onError={(e) => { e.target.style.opacity = "0.15"; }}
                />
              </div>
            );
          })}

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            style={{
              position: "absolute", right: "16px", bottom: "80px", zIndex: 20,
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* ── Vehicle Info Panel ── */}
      <div
        style={{
          padding: "30px 30px 40px",
          transition: "opacity 0.3s ease",
          opacity: transitioning ? 0 : 1,
        }}
      >
        <div
          className="max-w-4xl mx-auto"
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}
        >
          {/* Left: name + stats */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
              <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>{v.year}</span>
              <h3 style={{ fontSize: "38px", fontWeight: "900", lineHeight: 1, letterSpacing: "-0.02em", color: "#05141f" }}>
                {v.name}
              </h3>
              <button style={{ fontSize: "11px", color: "#999", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
                Disclaimers
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", marginTop: "16px", flexWrap: "wrap" }}>
              {[
                { label: "STARTING AT", value: v.msrp, sup: "1" },
                { label: "POWER UP TO", value: v.power },
                { label: "MPG UP TO", value: v.mpg, sup: "2" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "1.5px", color: "#999", textTransform: "uppercase", marginBottom: "4px" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#05141f" }}>
                    {s.value}
                    {s.sup && <sup style={{ fontSize: "9px", color: "#aaa" }}>{s.sup}</sup>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
            <a
              href="#"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                fontSize: "13px", fontWeight: "700", color: "#05141f",
                border: "2px solid #05141f", padding: "10px 22px", borderRadius: "4px",
                textDecoration: "none", transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#05141f"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#05141f"; }}
            >
              Build yours <span style={{ fontSize: "14px" }}>›</span>
            </a>
            <a
              href="#"
              style={{
                display: "inline-flex", alignItems: "center",
                fontSize: "13px", fontWeight: "700", color: "#fff",
                background: "#05141f", padding: "10px 22px", borderRadius: "4px",
                textDecoration: "none", transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a3a52"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#05141f"; }}
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
          {vehicles.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: "8px",
                width: i === current ? "24px" : "8px",
                borderRadius: "4px",
                background: i === current ? "#05141f" : "#ccc",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}