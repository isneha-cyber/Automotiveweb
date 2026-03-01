import { useEffect, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "9779800000000";
const WHATSAPP_MESSAGE = "Hi AyamForce team, I want details about your vehicles.";

const UpArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="h-10 w-8" fill="currentColor" aria-hidden="true">
    <path d="M16.02 3.2C8.94 3.2 3.2 8.9 3.2 15.96c0 2.26.6 4.5 1.74 6.46L3.2 28.8l6.58-1.72a12.8 12.8 0 0 0 6.24 1.6h.01c7.08 0 12.82-5.7 12.82-12.76S23.11 3.2 16.02 3.2Zm0 23.37h-.01a10.56 10.56 0 0 1-5.37-1.47l-.39-.24-3.9 1.02 1.04-3.8-.26-.4a10.52 10.52 0 0 1-1.62-5.62c0-5.85 4.75-10.6 10.6-10.6 2.83 0 5.48 1.1 7.48 3.1a10.5 10.5 0 0 1 3.1 7.49c0 5.85-4.75 10.6-10.6 10.6Zm5.81-7.9c-.32-.16-1.88-.93-2.17-1.03-.29-.1-.5-.16-.7.16-.2.31-.8 1.02-.98 1.23-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.13-.64.13-.13.31-.34.47-.5.16-.16.2-.28.31-.47.1-.2.05-.37-.03-.52-.08-.16-.7-1.7-.96-2.33-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.08-.8.37-.28.3-1.05 1.02-1.05 2.49 0 1.47 1.08 2.9 1.23 3.1.16.2 2.1 3.22 5.1 4.52.71.3 1.27.48 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.88-.77 2.14-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.2-.6-.37Z" />
  </svg>
);

export default function Backtotop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(doc.scrollTop > 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const conic = useMemo(
    () =>
      `conic-gradient(#05141f ${scrollProgress}%, rgba(255,255,255,0.16) ${scrollProgress}% 100%)`,
    [scrollProgress]
  );

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/35 transition hover:scale-105 hover:bg-[#21bf5a] sm:h-12 sm:w-12"
      >
        <WhatsAppIcon />
      </a>

      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className={`pointer-events-auto relative grid place-items-center rounded-full transition-all duration-300 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-90 opacity-0"
        }`}
      >
        <span
          className="grid h-11 w-11 place-items-center rounded-full p-[2px] shadow-lg shadow-black/30 sm:h-12 sm:w-12"
          style={{ background: conic }}
        >
          <span className="grid h-full w-full place-items-center rounded-full bg-white text-[#05141f]">
            <UpArrowIcon />
          </span>
        </span>
      </button>
    </div>
  );
}
