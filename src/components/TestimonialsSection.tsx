import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "HP Studio captured our wedding perfectly! Every photo feels like a movie scene. Absolutely stunning work.",
    name: "Rushi & Snehal",
    initial: "R",
    image: "/images/wedding-couple-By2WaDyA.jpg",
  },
  {
    text: "Team bahut friendly thi. Photos premium level ke the! Baby shoot ka experience amazing tha.",
    name: "Mayuri Shinde",
    initial: "M",
    image: "/images/baby-shoot-AS9JeDcT.jpg",
  },
  {
    text: "Pre-wedding shoot was a dream come true. Creative concepts and professional execution. Loved it!",
    name: "Priya Deshmukh",
    initial: "P",
    image: "/images/pre-wedding-D9AyVlV8.jpg",
  },
  {
    text: "Best photography studio in the area. On-time delivery, amazing quality, and very reasonable pricing.",
    name: "Aditya Patil",
    initial: "A",
    image: "/images/wedding-ceremony-IK_03SAI.jpg",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ─── Parallax: card floats gently ───
  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 40 }, {
        y: -20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);;

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
            Testimonials
          </p>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            <span style={{ color: "#0d0d0d" }}>What Our </span>
            <span className="italic" style={{ color: "#d4a843" }}>Clients</span>
            <span style={{ color: "#0d0d0d" }}> Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          ref={cardRef}
          key={current}
          className="rounded-2xl overflow-hidden grid lg:grid-cols-2 gap-0 transition-all duration-500 animate-[fade-in_0.5s_ease-out] will-change-transform"
          style={{ backgroundColor: "#fdf5dc", boxShadow: "0 20px 60px -20px rgba(212,168,67,0.35)" }}
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[400px] overflow-hidden">
            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#d4a843">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p className="text-base md:text-lg italic leading-relaxed mb-6" style={{ fontFamily: "var(--font-family-playfair)", color: "#333" }}>
              "{t.text}"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold" style={{ backgroundColor: "#d4a843", color: "#0d0d0d" }}>
                {t.initial}
              </div>
              <span className="text-lg italic" style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}>
                {t.name}
              </span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={
                i === current
                  ? { width: 32, height: 8, backgroundColor: "#d4a843" }
                  : { width: 8, height: 8, backgroundColor: "rgba(13,13,13,0.2)" }
              }
            />
          ))}
        </div>

        {/* Review buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-[0.15em] font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#0d0d0d", color: "white" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Your Review
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-[0.15em] font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#0d0d0d", color: "white" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1H12v3.2h5.35c-.5 2.4-2.55 3.8-5.35 3.8a6.1 6.1 0 1 1 0-12.2c1.5 0 2.85.55 3.9 1.45L18.2 5a9.6 9.6 0 1 0-6.2 17c5.5 0 9.5-3.85 9.5-9.5 0-.5-.05-1-.15-1.4z"/></svg>
            Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
