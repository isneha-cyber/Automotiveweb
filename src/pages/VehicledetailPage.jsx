import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const models = [
  {
    name: "Telluride",
    year: "2027",
    price: "$39,190",
    image: "/images/gurkha.png",
    tagline: "Go anywhere, composed everywhere.",
    power: "274 hp",
    mpg: "19-22 MPG",
    drive: "AWD",
    description:
      "Built for long family journeys with premium comfort, sharp road presence, and confident all-weather control.",
  },
  {
    name: "Sorento",
    year: "2026",
    price: "$33,090",
    image: "/images/Monobus.png",
    tagline: "Balanced performance for everyday adventure.",
    power: "281 hp",
    mpg: "24-27 MPG",
    drive: "AWD / FWD",
    description:
      "A flexible three-row SUV focused on smart tech, efficient power, and cabin practicality for city and highway use.",
  },
  {
    name: "Sportage",
    year: "2026",
    price: "$28,090",
    image: "/images/Trax.webp",
    tagline: "Bold design with urban-ready confidence.",
    power: "187 hp",
    mpg: "26-29 MPG",
    drive: "AWD / FWD",
    description:
      "Contemporary styling, intuitive infotainment, and strong fuel efficiency make Sportage ideal for daily driving.",
  },
  {
    name: "Carnival",
    year: "2026",
    price: "$35,400",
    image: "/images/traveller.webp",
    tagline: "Roomy, refined, and family-first.",
    power: "290 hp",
    mpg: "19-22 MPG",
    drive: "FWD",
    description:
      "Designed for larger families, Carnival blends van-like space with SUV-inspired design and premium convenience.",
  },
  {
    name: "Soul",
    year: "2025",
    price: "$22,600",
    image: "/images/urbania.png",
    tagline: "Compact form, big character.",
    power: "147 hp",
    mpg: "28-31 MPG",
    drive: "FWD",
    description:
      "A city-friendly crossover that delivers practical dimensions, confident road manners, and standout styling.",
  },
  {
    name: "Seltos",
    year: "2026",
    price: "$24,090",
    image: "/images/van.webp",
    tagline: "Versatile by design, ready for all roads.",
    power: "146 hp",
    mpg: "27-31 MPG",
    drive: "AWD / FWD",
    description:
      "Seltos brings compact agility, modern safety tech, and flexible interior space for active everyday use.",
  },
];

function getModelFromSearch(search) {
  const params = new URLSearchParams(search);
  return params.get("model");
}

export default function VehiclePage() {
  const location = useLocation();
  const initialModel = useMemo(() => getModelFromSearch(location.search), [location.search]);
  const initialIndex = Math.max(
    0,
    models.findIndex((item) => item.name.toLowerCase() === (initialModel || "").toLowerCase())
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const active = models[activeIndex];

  return (
    <main className="w-full bg-[#05141f] text-white">
      <section className="relative min-h-[78vh] overflow-hidden pt-24 md:pt-28">
        <img
          src={active.image}
          alt={`${active.year} ${active.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05141f]  to-[gray]/30" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-5 pb-16 pt-8 md:px-10 lg:pb-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
            Built for greater
          </p>
          <h1 className="text-4xl font-bold uppercase leading-tight md:text-6xl">
            {active.year} {active.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80 md:text-base">{active.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#"
              className="border border-white bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#05141f] transition hover:bg-transparent hover:text-white"
            >
              Build your own
            </a>
            <a
              href="#"
              className="border border-white/60 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white hover:text-[#05141f]"
            >
              Book test drive
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 border-y border-white/10 px-5 py-8 md:grid-cols-4 md:gap-6 md:px-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Starting at</p>
          <p className="mt-1 text-xl font-bold">{active.price}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Power up to</p>
          <p className="mt-1 text-xl font-bold">{active.power}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Mileage up to</p>
          <p className="mt-1 text-xl font-bold">{active.mpg}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Drive type</p>
          <p className="mt-1 text-xl font-bold">{active.drive}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold uppercase md:text-3xl">Choose your model</h2>
          <p className="text-xs uppercase tracking-[0.22em] text-white/55">AyamForce lineup</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {models.map((model, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={model.name}
                onClick={() => setActiveIndex(index)}
                className={`group overflow-hidden border text-left transition ${
                  selected
                    ? "border-white bg-white/10"
                    : "border-white/20 bg-white/5 hover:border-white/45 hover:bg-white/10"
                }`}
              >
                <div className="h-20 bg-[#071a29] p-2">
                  <img src={model.image} alt={model.name} className="h-full w-full object-contain" />
                </div>
                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{model.year}</p>
                  <p className="mt-1 text-sm font-bold uppercase">{model.name}</p>
                  <p className="mt-1 text-xs text-white/75">{model.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#06111a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Highlights</p>
            <h3 className="mt-2 text-2xl font-bold uppercase md:text-3xl">{active.tagline}</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">{active.description}</p>
          </div>
          <div className="overflow-hidden border border-white/15 bg-[#071a29] p-3">
            <img src={active.image} alt={active.name} className="h-64 w-full object-contain md:h-72" />
          </div>
        </div>
      </section>
    </main>
  );
}
