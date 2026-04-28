import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiscountBanner() {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bannerRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: bannerRef.current, start: "top 85%", end: "top 60%", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="my-8 px-4 py-3 md:py-4 text-center gold-gradient will-change-transform rounded-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
    >
      <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "#0d0d0d" }}>
        Limited Time Offer
      </span>
      <span className="hidden sm:inline text-[#0d0d0d]/40">|</span>
      <span className="text-sm md:text-base font-semibold" style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}>
        Get 10% Discount on Your First Shoot
      </span>
      <span className="hidden sm:inline text-[#0d0d0d]/40">|</span>
      <span className="text-xs md:text-sm" style={{ color: "#0d0d0d" }}>
        Book today &amp; save on premium photography
      </span>
    </section>
  );
}
