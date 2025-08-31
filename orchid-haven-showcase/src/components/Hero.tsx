
import { useEffect, useRef, useState } from "react";
// Existing banner (keep this)
const heroImage = "/lovable-uploads/42267951-7a3b-45fc-aa98-4583d57ab8bb.png";
// Additional images provided by user
const extraImages = [
  "https://raw.githubusercontent.com/shiven-c1/orchid/main/file_0000000009c8622f8a80a8227d3bb91e.png",
  "https://raw.githubusercontent.com/shiven-c1/orchid/main/file_0000000047c861f9866ebd1dbd3bcd93.png",
];

interface HeroProps {
  onCall?: () => void;
  onWhatsApp?: () => void;
}

const Hero = (_props: HeroProps) => {
  const images = [heroImage, ...extraImages];
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-advance every 2s
    sliderRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => {
      if (sliderRef.current) clearInterval(sliderRef.current);
    };
  }, [images.length]);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-[#f9f7f3] pb-8">
      <div className="w-full flex justify-center bg-white" style={{borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem'}}>
        <div
          className="relative w-full max-w-xl mt-6 mb-0 rounded-2xl shadow-lg overflow-hidden"
          style={{ maxWidth: '90vw' }}
        >
          {/* Slider images */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Banner ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-2 py-1 rounded-full">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition-all ${idx === current ? 'bg-white w-4' : 'bg-white/60'}`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Animated Counter for Years of Trust */}
      <div className="mt-10 md:mt-16" />
      <AnimatedYearsOfTrust />
    </section>
  );
};

// Animated Counter Component
function AnimatedYearsOfTrust() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev < 15) return prev + 1;
        if (intervalRef.current) clearInterval(intervalRef.current);
        return 15;
      });
    }, 80);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center w-full -mt-8">
      <div className="bg-gradient-to-r from-[#1a2238] via-[#283655] to-[#1a2238] text-white font-bold text-2xl md:text-4xl px-10 py-4 rounded-2xl shadow-lg border-2 border-[#e0e0e0] flex items-center gap-2" style={{letterSpacing: '0.04em'}}>
        <span className="text-gold text-4xl md:text-5xl font-extrabold" style={{fontVariantNumeric:'tabular-nums'}}>{count}</span>
        <span className="text-gold text-2xl md:text-3xl font-bold">+</span>
        <span className="ml-2 text-white text-lg md:text-2xl font-semibold tracking-wide">Years of Trust</span>
      </div>
    </div>
  );
}

export default Hero;