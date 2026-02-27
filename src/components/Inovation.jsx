import { useState } from "react";

const cards = [
  {
    key: "parts",
    img: "/images/part.jpg",
    label: "Support",
    title: "Genuine Parts & Accessories",
    desc: "OEM-grade components engineered for long life, reliable fitment, and stable performance.",
  },
  {
    key: "maintenance",
    img: "/images/part2.webp",
    label: "Workshop",
    title: "Service & Maintenance",
    desc: "Trained technicians and preventive schedules that keep your vehicle operating at its best.",
  },
  {
    key: "mobility",
    img: "/images/traveller2.webp",
    label: "Mobility",
    title: "Force Traveller",
    desc: "Spacious, durable, and route-ready mobility built for high-usage passenger operations.",
  },
];

function CardImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
        <span className="text-xs uppercase tracking-widest text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}

function HeroImage({ src, alt }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
        <span className="text-sm uppercase tracking-widest text-gray-500">Force Motors</span>
      </div>
    );
  }

  return (
    <>
      <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setErrored(true)} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-transparent" />
    </>
  );
}

export default function Service() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f8f7f4] to-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 lg:p-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Service</p>
            <h2 className="mt-3 text-2xl leading-tight text-gray-900 sm:text-3xl">
              Reliable Service Network Built for Daily Demands
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              From genuine parts to preventive maintenance, our service ecosystem is designed to maximize uptime,
              improve safety, and protect long-term vehicle value.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-gray-200 py-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900 sm:text-xl">OEM</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Parts</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 sm:text-xl">24/7</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Support</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 sm:text-xl">Expert</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">Technicians</p>
              </div>
            </div>

            <button className="mt-7 w-fit border border-gray-900 px-5 py-2 text-[11px] uppercase tracking-[0.14em] text-gray-900 transition-colors duration-300 hover:bg-gray-900 hover:text-white">
              Book Service
            </button>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm sm:min-h-[380px] lg:col-span-7 lg:min-h-[520px]">
            <HeroImage src="/images/gurkha2.jpg" alt="Force Motors Gurkha Service" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.key}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-56 overflow-hidden bg-gray-100 sm:h-60">
                <CardImage src={card.img} alt={card.title} />
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">{card.label}</p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
