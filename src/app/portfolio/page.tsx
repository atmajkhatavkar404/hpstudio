"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { useManifest } from "../../lib/useManifest";
import {
  CATEGORY_LABELS,
  PUBLIC_CATEGORIES,
  getAlbums,
  type CategoryKey,
  type AlbumInfo,
} from "../../lib/images";

gsap.registerPlugin(ScrollTrigger);

type Filter = "All" | CategoryKey;

export default function PortfolioPage() {
  const manifest = useManifest();
  const [active, setActive] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const albums = useMemo(() => {
    const filterCat = active === "All" ? undefined : active;
    return getAlbums(manifest, filterCat);
  }, [manifest, active]);

  useEffect(() => {
    if (gridRef.current && albums.length) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".album-card"),
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
      );
    }
  }, [active, albums.length]);

  const filters: Filter[] = ["All", ...PUBLIC_CATEGORIES];

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
          Our Work
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
        >
          HP Studio <span className="italic" style={{ color: "#d4a843" }}>Portfolio</span>
        </h1>
        <p className="mt-4 text-sm text-neutral-600 max-w-xl mx-auto">
          {manifest.total} photos across {albums.length} stories. Click any story to explore the full gallery.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 text-sm tracking-wider rounded-full border transition-all duration-300"
              style={{
                borderColor: active === cat ? "#d4a843" : "rgba(13,13,13,0.2)",
                backgroundColor: active === cat ? "#d4a843" : "transparent",
                color: active === cat ? "#0d0d0d" : "#555",
              }}
            >
              {cat === "All" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Album grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {albums.map((album) => (
            <AlbumCard key={`${album.category}-${album.slug}`} album={album} />
          ))}

          {albums.length === 0 && manifest.total > 0 && (
            <p className="col-span-full text-center text-neutral-500 py-12">
              No stories in this category yet.
            </p>
          )}

          {manifest.total === 0 && (
            <p className="col-span-full text-center text-neutral-500 py-12">
              Loading portfolio…
            </p>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

/* ─── Album Card ─── */

function AlbumCard({ album }: { album: AlbumInfo }) {
  return (
    <Link
      href={`/story/${album.category}/${album.slug}`}
      className="album-card group relative overflow-hidden rounded-2xl cursor-pointer block"
      style={{ boxShadow: "0 12px 40px -15px rgba(0,0,0,0.2)" }}
    >
      {/* Cover collage: two images side by side */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {album.cover !== album.coverAlt ? (
          <div className="flex h-full">
            <div className="w-1/2 h-full overflow-hidden">
              <img
                src={album.cover}
                alt={album.displayName}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="w-1/2 h-full overflow-hidden border-l-2" style={{ borderColor: "#faf5eb" }}>
              <img
                src={album.coverAlt}
                alt={album.displayName}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ) : (
          <img
            src={album.cover}
            alt={album.displayName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Photo count badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-wider font-semibold uppercase"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(4px)" }}
        >
          {album.photoCount} Photos
        </div>

        {/* Album name */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#d4a843" }}>
            {CATEGORY_LABELS[album.category]}
          </p>
          <h3
            className="text-xl md:text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            {album.displayName}
          </h3>
        </div>
      </div>
    </Link>
  );
}
