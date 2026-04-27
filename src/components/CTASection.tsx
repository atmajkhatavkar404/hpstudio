import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Left image floats up
      if (leftRef.current) {
        gsap.fromTo(leftRef.current, { y: 60 }, {
          y: -40, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      // Right image floats down
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { y: -40 }, {
          y: 60, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      // Center text scales subtly
      if (centerRef.current) {
        gsap.fromTo(centerRef.current, { scale: 0.95, opacity: 0.7 }, {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "40% 50%", scrub: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#faf5eb" }}
    >
      {/* Subtle warm gradient blobs */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #f7e6b8 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #f0d078 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-6">

          {/* ─── Left Image: Wedding Couple ─── */}
          <div ref={leftRef} className="hidden lg:flex justify-center lg:justify-end will-change-transform">
            <div className="relative">
              {/* Decorative gold border ring */}
              <div
                className="absolute -inset-3 rounded-[2rem] opacity-20"
                style={{ border: "1.5px solid #d4a843" }}
              />
              {/* Decorative dots */}
              <div
                className="absolute -top-6 -left-6 w-3 h-3 rounded-full"
                style={{ backgroundColor: "#d4a843", opacity: 0.3 }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#d4a843", opacity: 0.25 }}
              />
              {/* Sparkle */}
              <svg className="absolute -top-8 right-4 opacity-30" width="16" height="16" viewBox="0 0 16 16" fill="#d4a843">
                <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
              </svg>

              <div
                className="w-56 xl:w-64 aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 50px -15px rgba(212, 168, 67, 0.25)" }}
              >
                <img
                  src="/left.jpeg"
                  alt="Wedding couple by HP Studio"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small floating accent image */}
              <div
                className="absolute -bottom-6 -left-8 w-24 xl:w-28 aspect-square rounded-xl overflow-hidden border-4"
                style={{
                  borderColor: "#faf5eb",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src="/left.jpeg"
                  alt="Pre-wedding shoot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ─── Center Content ─── */}
          <div ref={centerRef} className="relative text-center max-w-lg mx-auto lg:mx-0 lg:px-4 will-change-transform">
            {/* Heart icon — coral / pink */}
            <div className="flex justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="none"
                  stroke="#e88b8b"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="#e88b8b"
                  opacity="0.25"
                />
              </svg>
            </div>

            {/* Subtitle */}
            <p
              className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "#b8922e" }}
            >
              Let's Create Together
            </p>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-family-playfair)" }}
            >
              <span style={{ color: "#0d0d0d" }}>Create memories that</span>
              <br />
              <span className="" style={{ color: "#d4a843" }}>
                last forever
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-sm md:text-[15px] max-w-md mx-auto leading-relaxed"
              style={{ color: "#777" }}
            >
              Ready to tell your story? Book your session today and let us create
              something beautiful together.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-10">
              {/* Book Now — filled gold */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-9 py-3 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: "#d4a843",
                  color: "#0d0d0d",
                  boxShadow: "0 4px 15px rgba(212, 168, 67, 0.3)",
                }}
              >
                Book Now
              </a>

              {/* Chat on WhatsApp — outlined */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs tracking-[0.2em] font-bold uppercase rounded-full border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "rgba(13, 13, 13, 0.3)",
                  color: "#333",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#333">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Subtle gold gradient divider */}
            <div
              className="mt-12 mx-auto max-w-xs h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #d4a843, transparent)",
              }}
            />
          </div>

          {/* ─── Right Image: Photographer / Team ─── */}
          <div ref={rightRef} className="hidden lg:flex justify-center lg:justify-start will-change-transform">
            <div className="relative">
              {/* Decorative gold border ring */}
              <div
                className="absolute -inset-3 rounded-[2rem] opacity-20"
                style={{ border: "1.5px solid #d4a843" }}
              />
              {/* Decorative dots */}
              <div
                className="absolute -top-4 -right-6 w-3 h-3 rounded-full"
                style={{ backgroundColor: "#d4a843", opacity: 0.3 }}
              />
              <div
                className="absolute -bottom-6 -left-4 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#d4a843", opacity: 0.25 }}
              />
              {/* Sparkle */}
              <svg className="absolute -bottom-8 right-6 opacity-30" width="16" height="16" viewBox="0 0 16 16" fill="#d4a843">
                <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
              </svg>

              <div
                className="w-56 xl:w-64 aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 50px -15px rgba(212, 168, 67, 0.25)" }}
              >
                <img
                  src="/right.jpeg"
                  alt="HP Studio photographer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small floating accent image */}
              <div
                className="absolute -bottom-6 -right-8 w-24 xl:w-28 aspect-square rounded-xl overflow-hidden border-4"
                style={{
                  borderColor: "#faf5eb",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src="/right.jpeg"
                  alt="Event coverage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ─── Mobile: Show both images in a row ─── */}
        <div className="flex lg:hidden justify-center gap-4 mt-10">
          <div
            className="w-36 sm:w-40 aspect-[3/4] rounded-xl overflow-hidden"
            style={{ boxShadow: "0 12px 30px -10px rgba(212, 168, 67, 0.25)" }}
          >
            <img
              src="/left.jpeg"
              alt="Wedding couple"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-36 sm:w-40 aspect-[3/4] rounded-xl overflow-hidden"
            style={{ boxShadow: "0 12px 30px -10px rgba(212, 168, 67, 0.25)" }}
          >
            <img
              src="/right.jpeg"
              alt="HP Studio photographer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
