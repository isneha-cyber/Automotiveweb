import { useState, useRef, useEffect } from "react";

// ── Icons ──────────────────────────────────────────────
const ChevronDown = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 4 6 8 10 4" />
  </svg>
);
const MapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ExternalLink = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
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
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Vehicle Data ──────────────────────────────────────
const vehicleData = {
  "SUV / CUV / MPV": [
    { name: "Soul", price: "$20,490", href: "/soul" },
    { name: "Seltos", price: "$23,790", href: "/seltos" },
    { name: "Sportage", price: "$28,790", href: "/sportage" },
    { name: "Sorento", price: "$32,390", href: "/sorento" },
    { name: "Carnival MPV", price: "$37,390", href: "/carnival-mpv" },
    { name: "Telluride", price: "$39,190", href: "/telluride" },
  ],
  "Hybrid / Electric": [
    { name: "Niro Hybrid", price: "$27,390", href: "/niro" },
    { name: "Sportage Hybrid", price: "$30,490", href: "/sportage-hybrid" },
    { name: "Niro Plug-in Hybrid", price: "$34,490", href: "/niro-plug-in-hybrid" },
    { name: "Sorento Hybrid", price: "$38,890", href: "/sorento-hybrid" },
    { name: "Niro EV", price: "$39,600", href: "/niro-ev" },
    { name: "Sportage Plug-in Hybrid", price: "$40,490", href: "/sportage-plug-in-hybrid" },
    { name: "Carnival MPV Hybrid", price: "$41,390", href: "/carnival-mpv-hybrid" },
    { name: "EV6", price: "$42,900", href: "/ev6" },
    { name: "Sorento Plug-in Hybrid", price: "$48,290", href: "/sorento-plug-in-hybrid" },
    { name: "EV9", price: "$54,900", href: "/ev9" },
  ],
  "Sedan": [
    { name: "K4", price: "$22,290", href: "/k4" },
    { name: "K4 Hatchback", price: "$24,990", href: "/k4-hatchback" },
    { name: "K5", price: "$27,490", href: "/k5" },
  ],
  "Upcoming": [
    { name: "All-New Telluride Hybrid", price: "Coming Soon", href: "/next-telluride", upcoming: true },
  ],
};

const tabs = ["SUV / CUV / MPV", "Hybrid / Electric", "Sedan", "Upcoming"];

// ── Vehicle Dropdown Panel ─────────────────────────────
function VehicleDropdown({ isOpen }) {
  const [activeTab, setActiveTab] = useState("SUV / CUV / MPV");
  const vehicles = vehicleData[activeTab] || [];

  return (
    <div
      className="absolute top-full left-0 right-0 w-full overflow-hidden transition-all duration-300"
      style={{
        maxHeight: isOpen ? "520px" : "0px",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      {/* Tab bar — white theme, full width */}
      <div
        style={{ background: "#f5f5f5", height: "56px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}
        className="flex items-center px-4 md:px-10 gap-0 overflow-x-auto w-full"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative whitespace-nowrap px-5 h-full text-sm font-medium tracking-wide transition-colors duration-200 flex-shrink-0"
            style={{
              color: activeTab === tab ? "#05101e" : "rgba(0,0,0,0.5)",
              borderBottom: activeTab === tab ? "3px solid #05101e" : "3px solid transparent",
              background: "transparent",
            }}
          >
            {tab}
          </button>
        ))}

        {/* Divider */}
        <div className="mx-4 w-px h-5 flex-shrink-0" style={{ background: "rgba(0,0,0,0.15)" }} />

        <a
          href="/vehicles"
          className="whitespace-nowrap px-4 h-full flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase flex-shrink-0 transition-colors duration-200"
          style={{ color: "rgba(0,0,0,0.4)" }}
          onMouseEnter={e => e.currentTarget.style.color = "#05101e"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}
        >
          Show All <ArrowRight />
        </a>
      
      </div>

      {/* Vehicle grid — white bg, full width */}
      <div
        style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}
        className="px-6 md:px-10 py-6 w-full"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {vehicles.map((v) => (
            <a
              key={v.name}
              href={v.href}
              className="group flex flex-col items-start p-3 rounded transition-colors duration-200"
              style={{ background: "rgba(0,0,0,0.02)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"}
            >
              {/* Placeholder image area */}
              <div
                className="w-full mb-2 rounded flex items-center justify-center overflow-hidden"
                style={{ height: "72px", background: "rgba(0,0,0,0.04)" }}
              >
                <span className="text-xs" style={{ color: "rgba(0,0,0,0.2)" }}>🚗</span>
              </div>
              <p
                className="text-sm font-semibold leading-tight mb-1 group-hover:underline"
                style={{ color: "#05101e" }}
              >
                {v.name}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: v.upcoming ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.55)" }}
              >
                {v.upcoming ? v.price : `${v.price} starting MSRP*`}
              </p>
              {!v.upcoming && (
                <div className="flex gap-3 mt-2">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(0,0,0,0.4)" }}>Build</span>
                  <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(0,0,0,0.4)" }}>Nearby</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────
const navLinks = [
  { label: "Vehicles", dropdown: "vehicles" },
  { label: "Price", dropdown: false },
  { label: "AyamForce Innovation", dropdown: true },
  { label: "Blogs", dropdown: false },
  { label: "Contact", dropdown: false },
];

const mobileNavLinks = ["Vehicles", "Price", "AyamForce Innovation", "Blogs", "Contact", "Find a Dealer"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setVehiclesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
//#05101e
  return (
    <div ref={dropdownRef} className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="transition-all duration-300 w-full"
        style={{
          background: scrolled ? "rgba(5,16,30,0.98)" : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="w-full px-4 md:px-10">
          <div className="flex items-center" style={{ height: "62px" }}>

            {/* Logo */}
            <a href="/" className="flex-shrink-0 mr-4 md:mr-10">
              {/* <div
                className="font-bold text-xl tracking-widest uppercase"
                style={{ color: "#fff", letterSpacing: "0.15em" }}
              >
                AYAMFORCE
              </div> */}
              <img className="w-12 h-12" src="/logo2.png" alt="" />
            </a>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 mr-8" style={{ background: "rgba(255,255,255,0.15)" }} />

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0 flex-1">
              {navLinks.map((link) => (
                link.dropdown === "vehicles" ? (
                  <button
                    key={link.label}
                    onClick={() => setVehiclesOpen(!vehiclesOpen)}
                    className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap group transition-colors duration-200"
                    style={{ color: vehiclesOpen ? "#fff" : "rgba(255,255,255,0.8)" }}
                  >
                    {link.label}
                    <span
                      style={{
                        display: "inline-flex",
                        transition: "transform 0.2s",
                        transform: vehiclesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown />
                    </span>
                    {/* Active underline */}
                    {vehiclesOpen && (
                      <span
                        className="absolute bottom-0 left-4 right-4"
                        style={{ height: "2px", background: "#fff" }}
                      />
                    )}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href="#"
                    className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap group transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown />}
                  </a>
                )
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
              <a
                href="#"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
              >
                <MapPin />
                Find a Dealer
              </a>
              <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.2)" }} />
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              >
                <SearchIcon />
                Search
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-1 ml-auto">
              <button className="p-2 transition-colors" style={{ color: "rgba(255,255,255,0.8)" }}>
                <SearchIcon />
              </button>
              <button
                className="p-2 transition-colors"
                style={{ color: "#fff" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
        />
      </nav>

      {/* Vehicle Dropdown */}
      <VehicleDropdown isOpen={vehiclesOpen} />

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t w-full"
          style={{ background: "#05101e", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        >
          <div className="w-full px-4 py-2">
            {mobileNavLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="flex items-center justify-between py-4 text-sm font-medium transition-colors duration-200"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  borderBottom: i !== mobileNavLinks.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link}
                <ChevronDown />
              </a>
            ))}
            <div className="py-4 flex gap-3">
              <button
                className="flex-1 text-xs font-bold tracking-widest uppercase py-3"
                style={{ background: "#fff", color: "#000" }}
              >
                Find a Dealer
              </button>
              <button
                className="flex-1 text-xs font-bold tracking-widest uppercase py-3 flex items-center justify-center gap-2"
                style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}
              >
                <SearchIcon /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}