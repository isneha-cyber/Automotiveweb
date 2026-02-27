import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="w-full font-sans">
      {/* Top Bar - Stay Updated Section */}
      <div
        className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 gap-6 md:gap-4"
        style={{ backgroundColor: "#2d3a3f" }}
      >
        <div className="text-center md:text-left">
          <p className="text-white text-xl md:text-2xl font-semibold">
            Don't miss a beat
          </p>
          <p className="text-gray-300 text-xs md:text-sm mt-1">
            Sign up to get the latest updates.
          </p>
        </div>
        
        <button
          className="order-3 md:order-none border border-white text-white px-8 md:px-10 py-3 text-sm font-medium 
                     hover:bg-white hover:text-gray-900 transition-colors duration-200 w-full md:w-auto"
          style={{ minWidth: "180px" }}
        >
          Stay Updated
        </button>
        
        <div className="flex items-center gap-3 order-2 md:order-none">
          {/* Social Icons */}
          <a
            href=""
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white 
                       hover:bg-white/20 transition-colors duration-200"
            style={{ backgroundColor: "#1a2326" }}
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/aAayamforce/"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white 
                       hover:bg-white/20 transition-colors duration-200"
            style={{ backgroundColor: "#1a2326" }}
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/aAayamforcenepal/?hl=en"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white 
                       hover:bg-white/20 transition-colors duration-200"
            style={{ backgroundColor: "#1a2326" }}
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-6 md:px-10 pt-8 md:pt-10 pb-8" style={{ backgroundColor: "#0d1b1e" }}>
        {/* Logo */}
        <div className="mb-8 fade-in text-center md:text-left">
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wider mb-1">
            Aayam Force
          </h2>
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase">
            Travel World Class
          </p>
        </div>

        {/* Nav Grid - Responsive Stack */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 border-b border-gray-700 pb-8">
          {/* Left: Toll Free Section */}
          <div className="w-full md:w-64 flex-shrink-0 md:pr-8 md:border-r border-gray-700 text-center md:text-left">
            <h3 className="text-xs tracking-wider text-gray-400 uppercase mb-4">
              Toll Free No.
            </h3>
            <a
              href="tel:980-2803118"
              className="text-lg md:text-xl font-semibold text-white hover:text-gray-300 
                         transition-colors block mb-8"
            >
              980-2803118
            </a>
            
            <h3 className="text-xs tracking-wider text-gray-400 uppercase mb-4">
              Connect With Us
            </h3>
            <a
              href="mailto:manager.aAayampkr@gmail.com"
              className="text-sm text-gray-300 hover:text-white transition-colors block mb-4 break-all"
            >
              manager.aAayampkr@gmail.com
            </a>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Force Motors Limited, Kathmandu - Nepal
            </p>
          </div>

          {/* Middle: Explore Aayam Force Section */}
          <div className="flex-1 md:px-8 md:border-r border-gray-700">
            <h3 className="text-xs tracking-wider text-gray-400 uppercase mb-4 text-center md:text-left">
              Explore Aayam Force
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2">
              {[
                "Force Traveller",
                "Force Tarx",
                "Force Monobus",
                "Force Gurkha",
                "Force Urbania",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-400 text-xs hover:text-white transition-colors 
                           leading-relaxed text-center md:text-left"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Follow Us On Section */}
          <div className="flex-1 md:pl-8">
            <h3 className="text-xs tracking-wider text-gray-400 uppercase mb-6 text-center md:text-left">
              Follow Us On
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href=""
                className="w-10 h-10 rounded-full flex items-center justify-center text-white 
                           hover:bg-white/10 transition-colors duration-200"
                style={{ backgroundColor: "#1a2326" }}
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/aAayamforce/"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white 
                           hover:bg-white/10 transition-colors duration-200"
                style={{ backgroundColor: "#1a2326" }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/aAayamforcenepal/?hl=en"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white 
                           hover:bg-white/10 transition-colors duration-200"
                style={{ backgroundColor: "#1a2326" }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 mb-8 fade-in">
          <p className="text-[9px] md:text-[10px] text-gray-500 leading-relaxed text-center md:text-left">
            <span className="font-semibold">DISCLAIMER:</span> Force Motors Limited
            reserves the right to change without notice the colours, equipment,
            specifications, prices, models and other website contents. Accessories
            shown in the pictures and features mentioned may not be a part of the
            standard fitments and may change with the variants and models. Actual
            colour, finesse and upholstery might vary. For latest information usage
            visit our site at forcemotors.com. Pictures are for illustration
            purpose only.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700 fade-in">
          <div className="flex gap-6 order-2 md:order-1">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-white transition-colors underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-white transition-colors underline"
            >
              Cookie Policy
            </a>
          </div>
          <p className="text-xs text-gray-400 order-1 md:order-2">
            © 2022 Aayam Force. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}