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
    <section
      ref={bannerRef}
      className="mx-4 md:mx-8 my-6 md:my-10 rounded-lg px-4 py-3 md:py-4 gold-gradient will-change-transform flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center shadow-lg"
    >
      <p className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase whitespace-nowrap" style={{ color: "#0d0d0d" }}>
        Limited Time Offer
      </p>
      <div className="hidden md:block w-px h-6 bg-black/20" />
      <h3
        className="text-sm md:text-base font-bold whitespace-nowrap"
        style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
      >
        Get 10% Discount on Your First Shoot
      </h3>
      <div className="hidden md:block w-px h-6 bg-black/20" />
      <p className="text-[10px] md:text-xs opacity-90 tracking-wide font-medium" style={{ color: "#0d0d0d" }}>
        Book today and save on premium photography services
      </p>
    </section>
  );
}
