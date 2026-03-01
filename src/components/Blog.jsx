import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const posts = [
  {
    id: "service",
    title: "How preventive service reduces downtime",
    excerpt:
      "A practical maintenance checklist for operators who want better reliability and longer component life.",
    category: "Maintenance",
    date: "Jan 30, 2026",
    readTime: "4 min read",
    image: "/images/blog.webp",
  },
  {
    id: "service-2",
    title: "Essential daily service checks for fleet readiness",
    excerpt:
      "Simple pre-run inspections and preventive checks to reduce breakdowns and keep vehicles operating smoothly.",
    category: "Maintenance",
    date: "Feb 12, 2026",
    readTime: "4 min read",
    image: "/images/part2.webp",
  },
  
 
];

function BlogCard({ post }) {
  return (
    <article className="group h-full overflow-hidden bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg">
      <div className="overflow-hidden w-full aspect-[7/4]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500">
          <span>{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className="mt-2 text-sm sm:text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {post.title}
        </h3>
        
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-3 sm:mt-4 flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
          <span>{post.date}</span>
          <button className="flex items-center gap-1 text-gray-900 hover:gap-2 transition-all">
            <span className="text-[10px] sm:text-xs font-medium">Read More</span>
            <span className="text-sm sm:text-base">→</span>
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

  const slidesToShow = 1; // Mobile shows 1 slide
  const totalSlides = Math.ceil(posts.length / slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-play on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="w-full bg-[#f5f3ef] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Journal
            </p>
            <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl text-gray-900">
              Latest From Our Blog
            </h2>
          </div>
          
          <button className="w-full sm:w-fit border border-gray-900 px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] 
                           uppercase tracking-[0.14em] text-gray-900 transition-colors duration-300 
                           hover:bg-gray-900 hover:text-white">
            View All Posts
          </button>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-2 gap-4 lg:gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Mobile Slider (visible only on mobile) */}
        <div className="relative md:hidden">
          {/* Slider Container */}
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
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-1">
                  <div className="grid grid-cols-1 gap-4">
                    {posts
                      .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                      .map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-1.5 mt-5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-6 bg-gray-900"
                      : "w-1.5 bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows (optional, can be removed for cleaner mobile look) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 
                         w-8 h-8 bg-white/90 rounded-full shadow-md 
                         flex items-center justify-center
                         hover:bg-white transition-colors
                         border border-gray-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2
                         w-8 h-8 bg-white/90 rounded-full shadow-md 
                         flex items-center justify-center
                         hover:bg-white transition-colors
                         border border-gray-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile View All Link (optional) */}
        <div className="mt-6 text-center md:hidden">
          <button className="text-xs text-gray-600 underline underline-offset-4">
            View all articles →
          </button>
        </div>
      </div>
    </section>
  );
}