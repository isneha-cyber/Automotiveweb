import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// ── Icons ──────────────────────────────────────────────
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const navLinks = [
  
  { label: "Vehicles", dropdown: true },
  { label: "Price", dropdown: false },
  { label: "AyamForce Innovation", dropdown: true },
  { label: "Blogs", dropdown: false, external: false },
   { label: "Contact", dropdown: false },
];

const mobileNavLinks = ["Vehicles", "Price",  "AyamForce Innovation", "Blogs", "Contact", "Find a Dealer"];

export default function Navbar({ navRef }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (navbarRef.current) {
      // Initial animation when component mounts
      gsap.to(navbarRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        y: 0
      });
    }
  }, []);

  // Animate mobile menu
  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(".mobile-menu",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05101e]/98 shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          : "bg-[#05101e]"
      }`}
      style={{ opacity: 0, transform: "translateY(0)" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex items-center h-[56px] md:h-[62px]">

          {/* ── Logo ── */}
          <a href="/" className="flex-shrink-0 mr-4 md:mr-10">
            <img
              src="/logo2.png"
              alt="Force Motors"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </a>

          {/* ── Divider after logo ── */}
          <div className="hidden lg:block w-[1px] h-6 bg-white/15 mr-8" />

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-0 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="/"
                className="nav-item relative flex items-center gap-1.5 px-4 py-2 text-white/80 hover:text-white text-[13px] font-medium tracking-wide whitespace-nowrap group transition-colors duration-200"
              >
                {link.label}
                {link.external && <ExternalLink />}
                {link.dropdown && <ChevronDown />}
                {/* animated underline */}
                <span className="nav-underline absolute bottom-0 left-4 right-4 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            ))}
          </div>

          {/* ── Right Side Actions ── */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <a
              href="#"
              className="flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-white text-[13px] font-medium tracking-wide transition-colors duration-200"
            >
              <MapPin />
              Find a Dealer
            </a>
            <div className="w-[1px] h-5 bg-white/20 mx-1" />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium tracking-wide transition-all duration-200 rounded-sm">
              <SearchIcon />
              Search
            </button>
          </div>

          {/* ── Mobile Right Actions ── */}
          <div className="flex lg:hidden items-center gap-1 ml-auto">
            <button className="text-white/80 hover:text-white p-2 transition-colors">
              <SearchIcon />
            </button>
            <button
              className="text-white p-2 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom border accent ── */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="mobile-menu lg:hidden bg-[#05101e] border-t border-white/10 shadow-2xl">
          <div className="max-w-[1440px] mx-auto px-4 py-2">
            {mobileNavLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className={`flex items-center justify-between py-4 text-white/85 hover:text-white text-[15px] font-medium transition-colors duration-200 ${
                  i !== mobileNavLinks.length - 1 ? "border-b border-white/10" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link}
                <ChevronDown />
              </a>
            ))}
            {/* Mobile CTA */}
            <div className="py-4 flex gap-3">
              <button className="flex-1 bg-white text-black text-[12px] font-bold tracking-widest uppercase py-3 rounded-sm">
                Find a Dealer
              </button>
              <button className="flex-1 border border-white/40 text-white text-[12px] font-bold tracking-widest uppercase py-3 rounded-sm flex items-center justify-center gap-2">
                <SearchIcon /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}