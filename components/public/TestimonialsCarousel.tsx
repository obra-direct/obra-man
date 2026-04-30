"use client";

import { useRef, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials-data";

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  // Sync dot indicator when user manually swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 0;
      if (cardWidth === 0) return;
      const idx = Math.round(track.scrollLeft / (cardWidth + 12));
      setActiveIndex(Math.min(idx, TESTIMONIALS.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Mobile carousel ────────────────────────────────────── */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto pb-2 -mx-3 px-3 snap-x snap-mandatory scrollbar-hide"
        >
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop grid ───────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </>
  );
}

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="snap-center shrink-0 w-[82vw] min-[400px]:w-[72vw] sm:w-[60vw] md:w-auto md:min-w-0 bg-white/8 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/12 transition-colors duration-200 flex flex-col">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 text-gold/60 mb-2 sm:mb-4 shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-white/85 text-xs sm:text-sm leading-snug sm:leading-relaxed mb-3 sm:mb-6 line-clamp-5 sm:line-clamp-none flex-1">
        {item.text}
      </p>
      <div className="border-t border-white/10 pt-3 sm:pt-4 flex items-center gap-2 sm:gap-3 mt-auto">
        <div className="w-10 h-10 bg-gold/30 rounded-full flex items-center justify-center shrink-0 ring-1 ring-gold/40">
          <span className="text-gold font-bold text-sm">{item.name[0]}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-xs sm:text-sm truncate">{item.name}</p>
          <p className="text-gold/80 text-[10px] sm:text-xs truncate">
            {item.location} · {item.service}
          </p>
        </div>
        <div className="ml-auto flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, star) => (
            <svg
              key={star}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold fill-gold shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
