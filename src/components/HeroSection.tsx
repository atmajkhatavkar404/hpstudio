import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useManifest } from "../lib/useManifest";
import { getAllMixedPhotos } from "../lib/images";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK = ["/placeholder.svg"];

export default function HeroSection() {
  const manifest = useManifest();
  const heroImages = useMemo(() => {
    const imgs = getAllMixedPhotos(manifest).slice(0, 3);
    return imgs.length ? imgs : FALLBACK;
  }, [manifest]);
  const [current, setCurrent] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Entry animation
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  // ─── Parallax: background scrolls slower, text fades out + moves up ───
  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !textRef.current) return;

      const ctx = gsap.context(() => {
      // Background moves down slower + gradually zooms in
      gsap.to(bgRef.current, {
        yPercent: 25,
        scale: 1.15,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text content moves up faster and fades
      gsap.to(textRef.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background images — parallax container */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ height: "120%" }}>
        {heroImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={img}
              alt="HP Studio photography"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        <p
          className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
          style={{ color: "#d4a843" }}
        >
          Premium Photography Studio
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-family-playfair)" }}
        >
          <span className="text-white">We Capture Emotions,</span>
          <br />
          <span className="italic" style={{ color: "#d4a843" }}>
            Not Just Photos
          </span>
        </h1>

        <p className="mt-4 md:mt-6 text-white/70 text-sm md:text-lg max-w-xl leading-relaxed">
          From weddings to baby shoots, we create timeless memories that you'll
          cherish forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
          <a
            href="#book"
            className="px-8 py-3 text-xs md:text-sm tracking-[0.15em] font-semibold uppercase transition-all duration-300 rounded-sm"
            style={{
              backgroundColor: "#d4a843",
              color: "#0d0d0d",
            }}
          >
            Book Your Shoot
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3 text-xs md:text-sm tracking-[0.15em] font-semibold uppercase border-2 rounded-sm transition-all duration-300"
            style={{
              borderColor: "#d4a843",
              color: "#d4a843",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Now
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2"
                : "w-2 h-2 bg-white/50"
            }`}
            style={i === current ? { backgroundColor: "#d4a843" } : {}}
          />
        ))}
      </div>
    </section>
  );
}
