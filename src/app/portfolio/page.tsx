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
  getAllMixedPhotos,
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

  const displayPhotos = useMemo(() => {
    const filterCat = active === "All" ? undefined : active;
    return getAllMixedPhotos(manifest, filterCat).slice(0, 32); // Max 32 for the bento grid display
  }, [manifest, active]);

  useEffect(() => {
    if (gridRef.current && albums.length) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".album-card"),
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
      );
    }
    // Also animate the bento grid items if any exist
    const bentoItems = document.querySelectorAll(".bento-item");
    if (bentoItems.length > 0) {
      gsap.fromTo(
        bentoItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
          },
        }
      );
    }
  }, [active, albums.length, displayPhotos.length]);

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
          HP Studio <span className="" style={{ color: "#d4a843" }}>Portfolio</span>
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
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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

      {/* Bento Box Photo Grid */}
      {displayPhotos.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <div className="bento-grid max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {displayPhotos.map((photo, i) => {
              const index = i % 16;
              let spanClass = "col-span-1 row-span-1";
              
              if (index === 8 || index === 9) {
                spanClass = "col-span-2 row-span-1";
              } else if (index >= 10 && index < 14) {
                spanClass = "col-span-1 row-span-1";
              } else if (index >= 14) {
                spanClass = "col-span-2 row-span-2";
              }

              return (
                <div 
                  key={photo + i} 
                  className={`bento-item overflow-hidden bg-neutral-200 relative group ${spanClass}`}
                >
                  <img
                    src={photo}
                    alt={`Portfolio image ${i}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </section>
      )}

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
      className="album-card group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer block aspect-[4/3] md:aspect-[3/2]"
      style={{ boxShadow: "0 12px 40px -15px rgba(0,0,0,0.2)" }}
    >
      {/* Cover collage: two images side by side */}
      {album.cover !== album.coverAlt ? (
        <div className="flex w-full h-full">
          <div className="w-1/2 h-full overflow-hidden">
            <img
              src={album.cover}
              alt={album.displayName}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="w-1/2 h-full overflow-hidden border-l border-white/20">
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

      {/* Dark gradient overlay covering whole card smoothly */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 ease-out" />

      {/* Centered Album name (Replaces bottom text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg tracking-wide transition-transform duration-500 group-hover:scale-105"
          style={{ fontFamily: "var(--font-family-playfair)" }}
        >
          {album.displayName}
        </h3>
      </div>
    </Link>
  );
}
