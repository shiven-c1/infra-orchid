import React, { useEffect, useRef, useState } from "react";

interface OrchidCarouselProps {
  images: string[];
  className?: string;
  interval?: number;
  fit?: "contain" | "cover";
  alt?: string;
}

const OrchidCarousel = ({ images, className = "", interval = 3500, fit = "cover", alt = "Image" }: OrchidCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images, interval, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!images || images.length === 0) return null;

  const imgClass = fit === "contain" ? "object-contain bg-black" : "object-cover";

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full h-full relative">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className={`w-full h-full transition-opacity duration-700 absolute inset-0 ${imgClass} ${i === index ? "opacity-100" : "opacity-0"}`}
            style={fit === "contain" ? { objectPosition: "center", backgroundColor: "#000" } : {}}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-luxury" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrchidCarousel;
