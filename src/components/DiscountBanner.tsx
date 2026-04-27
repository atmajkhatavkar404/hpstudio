import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DiscountBanner() {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bannerRef.current, { scale: 0.92, opacity: 0.6 }, {
        scale: 1, opacity: 1, ease: "none",
        scrollTrigger: { trigger: bannerRef.current, start: "top 85%", end: "top 40%", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="mx-4 md:mx-8 my-8 rounded-xl px-6 py-10 md:py-14 text-center gold-gradient will-change-transform">
      <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#0d0d0d" }}>
        Limited Time Offer
      </p>
      <h3
        className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3"
        style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
      >
        Get 10% Discount on Your First Shoot
      </h3>
      <p className="text-sm md:text-base" style={{ color: "#0d0d0d" }}>
        Book today and save on premium photography services
      </p>
    </section>
  );
}
