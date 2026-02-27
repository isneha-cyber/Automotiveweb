import { useState } from "react";

// Only 4 cards exist — indices 0–3
const cards = [
  {
    id: "et9",
    img: "/images/img7.webp",
    title: "ET9",
    subtitle: "Smart Electric Executive Flagship",
  },
  {
    id: "nio-11th",
    img: "/images/img9.webp",
    title: "NIO 11th Anniversary",
    subtitle: `For more than 4,000 days and nights, we have stayed true to our mission of "Blue Sky Coming."`,
    overlay: "anniversary", // fixed: was "overlayStyle", now matches prop name
  },
  {
    id: "ep9",
    img: "/images/img10.webp",
    title: "EP9",
    subtitle: "One of the fastest electric cars in the world",
  },
  {
    id: "nio-life",
    img: "/images/hands.webp",
    title: "NIO Life",
    subtitle: "NIO's original design and lifestyle brand",
  },
];

// ─── Caption ────────────────────────────────────────────────────────────────
const Caption = ({ title, subtitle }) => (
  <div className="pt-2 pb-1">
    <p className="text-[13px] font-semibold text-gray-900 mb-0.5 leading-tight">
      {title}
    </p>
    <p className="text-[12px] text-gray-500 leading-relaxed">{subtitle}</p>
  </div>
);

// ─── Anniversary overlay ─────────────────────────────────────────────────────
const AnniversaryOverlay = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/15">
    <svg
      width="90"
      height="70"
      viewBox="0 0 90 80"
      fill="none"
      className="max-w-[70px] md:max-w-[90px] mb-2"
    >
      <rect x="10" y="8" width="6" height="58" rx="1" stroke="white" strokeWidth="3" fill="none" />
      <rect x="4" y="60" width="18" height="6" rx="1" stroke="white" strokeWidth="2.5" fill="none" />
      <rect x="58" y="8" width="6" height="58" rx="1" stroke="white" strokeWidth="3" fill="none" />
      <rect x="52" y="60" width="18" height="6" rx="1" stroke="white" strokeWidth="2.5" fill="none" />
    </svg>
    <p className="text-[11px] font-semibold text-white tracking-widest">NIO 11th</p>
    <p className="text-[11px] font-normal text-white/85 tracking-wide">Anniversary</p>
  </div>
);

// ─── Image tile with hover zoom ──────────────────────────────────────────────
const Img = ({ src, alt, className = "", overlay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        loading="lazy"
      />
      {overlay === "anniversary" && <AnniversaryOverlay />}
    </div>
  );
};

// ─── Main section ────────────────────────────────────────────────────────────
export default function Innovation() {
  // Destructure for safe, named access — no more magic indices
  const [et9, anniversary, ep9, nioLife] = cards;

  return (
    <section className="w-full bg-[#f0ede8]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 md:py-16 lg:py-20">
        <h2 className="text-center mb-8 md:mb-12 text-[clamp(15px,1.8vw,20px)] font-normal text-gray-900 tracking-wide">
          Innovation &amp; Engineering
        </h2>

        {/* ── DESKTOP (md+) ────────────────────────────────────────────────────
            Layout:
            ┌───────────────┬───────────────┐
            │               │  Anniversary  │  ← aspect-[4/3]
            │     ET9       ├───────────────┤
            │  (row-span-2) │     EP9       │  ← fills remaining height
            ├───────────────┴───────────────┤
            │          NIO Life (wide)      │  ← aspect-[21/6]
            └───────────────────────────────┘
        ──────────────────────────────────────────────────────────────────── */}
        <div className="hidden md:block max-w-[1400px] mx-auto">
          {/* Top two-column block */}
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "1fr 0.62fr" }}
          >
            {/* ET9 — tall left column spanning 2 rows */}
            <div className="row-span-2 flex flex-col">
              <Img
                src={et9.img}
                alt={et9.title}
                className="flex-1 min-h-[420px] lg:min-h-[520px]"
              />
              <Caption title={et9.title} subtitle={et9.subtitle} />
            </div>

            {/* Anniversary — top right */}
            <div className="flex flex-col">
              <Img
                src={anniversary.img}
                alt={anniversary.title}
                className="w-full aspect-[4/3]"
                overlay={anniversary.overlay}
              />
              <Caption title={anniversary.title} subtitle={anniversary.subtitle} />
            </div>

            {/* EP9 — bottom right, fills remaining height */}
            <div className="flex flex-col">
              <Img
                src={ep9.img}
                alt={ep9.title}
                className="w-full flex-1 min-h-[180px]"
              />
              <Caption title={ep9.title} subtitle={ep9.subtitle} />
            </div>
          </div>

          {/* NIO Life — full-width cinematic banner */}
          <div className="mt-3 flex flex-col">
            <Img
              src={nioLife.img}
              alt={nioLife.title}
              className="w-full aspect-[21/6]"
            />
            <Caption title={nioLife.title} subtitle={nioLife.subtitle} />
          </div>
        </div>

        {/* ── MOBILE (<md) ─────────────────────────────────────────────────────
            Stacked: ET9 → Anniversary → EP9 + NIO Life (side-by-side)
        ──────────────────────────────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-4 max-w-[480px] mx-auto">
          {/* ET9 */}
          <div>
            <Img src={et9.img} alt={et9.title} className="w-full aspect-video" />
            <Caption title={et9.title} subtitle={et9.subtitle} />
          </div>

          {/* Anniversary */}
          <div>
            <Img
              src={anniversary.img}
              alt={anniversary.title}
              className="w-full aspect-video"
              overlay={anniversary.overlay}
            />
            <Caption title={anniversary.title} subtitle={anniversary.subtitle} />
          </div>

          {/* EP9 + NIO Life — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Img src={ep9.img} alt={ep9.title} className="w-full aspect-square" />
              <Caption title={ep9.title} subtitle={ep9.subtitle} />
            </div>
            <div>
              <Img src={nioLife.img} alt={nioLife.title} className="w-full aspect-square" />
              <Caption title={nioLife.title} subtitle={nioLife.subtitle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}