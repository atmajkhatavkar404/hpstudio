import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "High Quality Editing",
  "Creative Concepts",
  "Affordable Pricing",
  "Cinematic Shots",
  "Same Day Delivery",
  "Drone Coverage",
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  // ─── Parallax: text floats up, video card floats down ───
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const textBlock = sectionRef.current!.querySelector(".parallax-text");
      const videoCard = sectionRef.current!.querySelector(".parallax-video");

      if (textBlock) {
        gsap.fromTo(textBlock, { y: 30 }, {
          y: -20, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      if (videoCard) {
        gsap.fromTo(videoCard, { y: -20 }, {
          y: 30, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const repeated = [...features, ...features, ...features];

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden" style={{ backgroundColor: "#faf5eb" }}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-12 -left-16 w-72 h-72 rounded-full opacity-50" style={{ background: "radial-gradient(circle,#f7e6b8 0%,transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-20 -right-10 w-96 h-96 rounded-full opacity-40" style={{ background: "radial-gradient(circle,#f0d078 0%,transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left text */}
          <div className="reveal parallax-text will-change-transform">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
              Why Choose Us?
            </p>
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              Meet <span className="" style={{ color: "#D9A520" }}>HP Studio</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#444" }}>
              At HP Studio, photography is more than just pictures - it's about
              capturing real emotions, special moments, and timeless memories.
              From weddings to personal shoots, we focus on every detail to
              deliver photos that tell your story beautifully.
            </p>
          </div>

          {/* Right video card */}
          <div className="reveal parallax-video relative rounded-2xl overflow-hidden aspect-video shadow-2xl group cursor-pointer will-change-transform" style={{ boxShadow: "0 30px 60px -20px rgba(212,168,67,0.4)" }}>
            <img
              src="/images/wedding-couple-By2WaDyA.jpg"
              alt="HP Studio showreel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <button className="absolute inset-0 flex items-center justify-center" aria-label="Play showreel">
              <span
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.95)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#0d0d0d" className="ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature marquee */}
      <div className="overflow-hidden py-6 border-y" style={{ borderColor: "rgba(13,13,13,0.08)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {repeated.map((feature, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-2 md:mx-3 px-5 md:px-6 py-2 md:py-2.5 text-sm md:text-base border rounded-full whitespace-nowrap"
              style={{ borderColor: "rgba(13,13,13,0.15)", color: "#0d0d0d", backgroundColor: "rgba(255,255,255,0.5)" }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip with counting animation */}
      <StatsStrip />
    </section>
  );
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 2000, started = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) {
      setValue(0);
      return;
    }
    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return value;
}

/* ─── Stats strip with animated counters ─── */
const stats = [
  { target: 200, suffix: "+", label: "Photoshoots" },
  { target: 50, suffix: "+", label: "Weddings" },
  { target: 150, suffix: "+", label: "Happy Clients" },
  { target: 5, suffix: " Years", label: "Experience" },
];

function StatItem({ target, suffix, label, started, delay }: {
  target: number; suffix: string; label: string; started: boolean; delay: number;
}) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  const count = useCountUp(target, target <= 10 ? 1500 : 2000, go);

  return (
    <div>
      <div
        className="text-4xl md:text-5xl font-bold mb-1"
        style={{ fontFamily: "var(--font-family-playfair)", color: "#D9A520" }}
      >
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/60">
        {label}
      </div>
    </div>
  );
}

function StatsStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stripRef} style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            target={s.target}
            suffix={s.suffix}
            label={s.label}
            started={visible}
            delay={i * 150}
          />
        ))}
      </div>
    </div>
  );
}
