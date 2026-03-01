import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const posts = [
  {
    id: "service",
    title: "How preventive service reduces downtime",
    excerpt: "A practical maintenance checklist for operators who want better reliability and longer component life.",
    category: "Maintenance",
    date: "Jan 30, 2026",
    readTime: "4 min read",
    image: "/images/blog.webp",
  },
  {
    id: "service-2",
    title: "Essential daily service checks for fleet readiness",
    excerpt: "Simple pre-run inspections and preventive checks to reduce breakdowns and keep vehicles operating smoothly.",
    category: "Maintenance",
    date: "Feb 12, 2026",
    readTime: "4 min read",
    image: "/images/part2.webp",
  },
  {
    id: "service-3",
    title: "Understanding engine oil intervals for modern vehicles",
    excerpt: "When to change, what to use, and how oil quality affects long-term engine performance.",
    category: "Technical",
    date: "Mar 5, 2026",
    readTime: "3 min read",
    image: "/images/blog.webp",
  },
];

function BlogCard({ post }) {
  return (
    <article className="group h-full overflow-hidden bg-white border border-gray-200 transition-shadow duration-300 hover:shadow-md">
      {/* Image */}
      <div className="overflow-hidden w-full aspect-[16/9]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-gray-400 mb-2">
          <span>{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1.5">
          {post.title}
        </h3>

        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <span className="text-[10px] text-gray-400">{post.date}</span>
          <button className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-900 hover:gap-2 transition-all duration-200">
            Read More <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const totalSlides = posts.length;

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + totalSlides) % totalSlides);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove  = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd   = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50)  nextSlide();
    if (dist < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="w-full bg-[#f5f3ef] py-12 md:py-24">
      <div className=" w-full px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Journal</p>
            <h2 className="mt-1 text-lg sm:text-xl md:text-2xl font-light text-gray-900">Latest From Our Blog</h2>
          </div>
          <button className="w-full hidden md:block sm:w-auto border border-gray-900 px-4 py-2 text-[10px] uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300">
            View All Posts
          </button>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* ── Mobile: Slider ── */}
        <div className="relative md:hidden">
          <div
            ref={sliderRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {posts.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0 px-0.5">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? "w-5 bg-gray-900" : "w-1.5 bg-gray-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1 w-7 h-7 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1 w-7 h-7 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile View All */}
        <div className="mt-5 text-center md:hidden">
          <button className="text-[11px] text-gray-500 underline underline-offset-4">
            View all articles →
          </button>
        </div>

      </div>
    </section>
  );
}