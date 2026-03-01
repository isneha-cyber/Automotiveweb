import { useState } from "react";

const cars = [
  {
    id: 1,
    eyebrow: "DESTINED FOR THE MOMENTS AHEAD",
    name: "Urbania",
    cta: "Meet Urbania",
    href: "#urbania",
    bg: "/images/video.png",
  },
  {
    id: 2,
    eyebrow: "ADVENTURE GETS REAL",
    name: "Gurkha",
    cta: "Meet Gurkha",
    href: "#gurkha",
    bg: "/images/gurkha.png",
  },
  {
    id: 3,
    eyebrow: "REDEFINING VERSATILITY",
    name: "Traveller",
    cta: "Meet Traveller",
    href: "#traveller",
    bg: "/images/traveller2.webp",
  },
];

const ToutCard = ({ car }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={car.href}
      className="tout-card"
      aria-label={`${car.eyebrow} ${car.name} ${car.cta}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        cursor: "pointer",
        height: "100%",
        minHeight: "520px",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src={car.bg}
          alt={car.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay — Kia style: dark at bottom, fading up */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(5,20,31,1) 0%, rgba(5,20,31,0.7) 40%, rgba(5,20,31,0.15) 45%, transparent 100%)"
            : "linear-gradient(to top, rgba(5,20,31,0.92) 0%, rgba(5,20,31,0.5) 40%, rgba(5,20,31,0.08) 45%, transparent 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Top accent line on hover */}
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "#fff",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          zIndex: 10,
        }}
      /> */}

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(24px, 4vw, 40px)",
          zIndex: 10,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            marginBottom: "10px",
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "transform 0.4s ease, color 0.3s ease",
          }}
        >
          {car.eyebrow}
        </p>

        {/* Vehicle Name */}
        <h2
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "24px",
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "transform 0.4s ease 0.04s",
          }}
        >
          {car.name}
        </h2>

        {/* CTA Button */}
        <div>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 28px",
              border: "1.5px solid",
              borderColor: hovered ? "#ffffff" : "rgba(255,255,255,0.75)",
              background: hovered ? "#ffffff" : "transparent",
              color: hovered ? "#05141f" : "#ffffff",
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              opacity: hovered ? 1 : 0.9,
              transition:
                "background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.4s ease 0.08s, opacity 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            {car.cta}
          </span>
        </div>
      </div>
    </a>
  );
};

export default function Showcase() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tout-card-wrap {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .tout-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          width: 100%;
          padding: 0 48px;
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .tout-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 32px;
          }
          .tout-card-wrap:last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .tout-cards-grid {
            grid-template-columns: 1fr;
            padding: 0 16px;
            gap: 20px;
          }
          .tout-card-wrap:last-child {
            grid-column: auto;
          }
          .tout-card-min-h {
            min-height: 380px !important;
          }
        }
      `}</style>

      <section
        className="py-12 sm:py-32 "
        style={{
          background: "#05141f",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div className="tout-cards-grid">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="tout-card-wrap tout-card-min-h"
              style={{
                animationDelay: `${index * 0.18}s`,
                minHeight: "550px",
              }}
            >
              <ToutCard car={car} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}