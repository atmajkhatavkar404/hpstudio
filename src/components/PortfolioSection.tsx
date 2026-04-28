"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useManifest } from "../lib/useManifest";
import {
  CATEGORY_LABELS,
  HIGHLIGHTS_PER_CATEGORY,
  PUBLIC_CATEGORIES,
  getHighlights,
  type CategoryKey,
  type GalleryItem,
} from "../lib/images";

type Filter = "All" | CategoryKey;

function ReelRow({ items, direction = "left", speed = 12 }: { items: GalleryItem[]; direction?: "left" | "right"; speed?: number }) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];
  const animationName = direction === "left" ? "reel-left" : "reel-right";
  const duration = Math.max(8, items.length * (speed / 5));

  return (
    <div className="overflow-hidden group/reel">
      <div
        className="flex gap-5 w-max"
        style={{ animation: `${animationName} ${duration}s linear infinite` }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative overflow-hidden group cursor-pointer flex-shrink-0 rounded-xl"
            style={{ width: "210px", height: "300px", boxShadow: "0 8px 30px -8px rgba(0,0,0,0.6)" }}
          >
            <img
              src={item.src}
              alt={item.label}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-xs font-medium tracking-wider uppercase" style={{ color: "#d4a843" }}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const manifest = useManifest();
  const [active, setActive] = useState<Filter>("All");
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  // Use a smaller cap for the homepage reel so it stays lightweight
  const highlights = useMemo(() => getHighlights(manifest, Math.min(HIGHLIGHTS_PER_CATEGORY, 6)), [manifest]);

  const filtered = active === "All" ? highlights : highlights.filter((it) => it.category === active);

  const half = Math.ceil(filtered.length / 2);
  const row1Items = filtered.slice(0, half);
  const row2Items = filtered.slice(half);

  const filters: Filter[] = ["All", ...PUBLIC_CATEGORIES];

  return (
    <section id="portfolio" className="py-16 md:py-24" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#d4a843" }}>
            Our Work
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-family-playfair)" }}>
            <span className="text-white">Professional </span>
            <span className="" style={{ color: "#d4a843" }}>Portfolio</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 text-sm tracking-wider border rounded-full transition-all duration-300"
              style={{
                borderColor: active === cat ? "#d4a843" : "rgba(255,255,255,0.2)",
                backgroundColor: active === cat ? "#d4a843" : "transparent",
                color: active === cat ? "#0d0d0d" : "rgba(255,255,255,0.7)",
              }}
            >
              {cat === "All" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 py-2">
        <ReelRow items={row1Items} direction="left" speed={30} />
        {row2Items.length > 0 && <ReelRow items={row2Items} direction="right" speed={35} />}
      </div>

      <div className="text-center mt-10 px-4 sm:px-6 lg:px-8">
        <a
          ref={buttonRef}
          href="/portfolio"
          onClick={(e) => {
            e.preventDefault();
            if (!buttonRef.current) return;
            gsap.to(buttonRef.current, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
              onComplete: () => {
                router.push("/portfolio");
              },
            });
          }}
          className="inline-block px-8 py-3 text-sm tracking-[0.15em] font-semibold border-2 rounded-full transition-all duration-300 will-change-transform"
          style={{ borderColor: "white", color: "white" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "#0d0d0d"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "white"; }}
        >
          Show More Work
        </a>
      </div>
    </section>
  );
}
