import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useManifest } from "../lib/useManifest";
import {
  CATEGORY_LABELS,
  PUBLIC_CATEGORIES,
  IMAGES_PER_PAGE,
  getAlbumPhotos,
  albumDisplayName,
  type CategoryKey,
} from "../lib/images";

export const Route = createFileRoute("/story/$category/$album")({
  component: StoryPage,
  head: ({ params }) => ({
    meta: [
      { title: `${formatTitle(params.album, params.category)} — HP Studio` },
      { name: "description", content: `View the full gallery of ${formatTitle(params.album, params.category)} by HP Studio.` },
      { property: "og:title", content: `${formatTitle(params.album, params.category)} — HP Studio` },
    ],
  }),
});

function formatTitle(slug: string, cat: string): string {
  return albumDisplayName(slug, cat as CategoryKey);
}

function StoryPage() {
  const { category, album } = Route.useParams();
  const manifest = useManifest();
  const cat = category as CategoryKey;
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allPhotos = useMemo(
    () => getAlbumPhotos(manifest, cat, album),
    [manifest, cat, album],
  );

  const [page, setPage] = useState(1);
  const visiblePhotos = useMemo(
    () => allPhotos.slice(0, page * IMAGES_PER_PAGE),
    [allPhotos, page],
  );
  const hasMore = visiblePhotos.length < allPhotos.length;

  const displayName = useMemo(() => albumDisplayName(album, cat), [album, cat]);

  // Hero cover photos (up to 4 for the collage)
  const heroPhotos = useMemo(() => allPhotos.slice(0, 4), [allPhotos]);

  // GSAP animations
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, []);

  useEffect(() => {
    if (gridRef.current && visiblePhotos.length) {
      const cards = gridRef.current.querySelectorAll(".photo-card");
      // Only animate newly added cards
      const startIdx = Math.max(0, (page - 1) * IMAGES_PER_PAGE);
      const newCards = Array.from(cards).slice(startIdx);
      if (newCards.length) {
        gsap.fromTo(
          newCards,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
        );
      }
    }
  }, [visiblePhotos.length, page]);

  // Lightbox state
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <Navbar />

      {/* ─── Hero Collage ─── */}
      <section className="pt-20 md:pt-24">
        {heroPhotos.length >= 2 ? (
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <div className="flex h-full">
              {heroPhotos.slice(0, 2).map((src, i) => (
                <div key={src} className="flex-1 overflow-hidden" style={i === 0 ? { borderRight: "3px solid #faf5eb" } : {}}>
                  <img
                    src={src}
                    alt={`${displayName} photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Album name overlay */}
            <div ref={heroRef} className="absolute bottom-0 left-0 right-0 text-center pb-10 md:pb-14 px-4">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "#d4a843" }}>
                {CATEGORY_LABELS[cat] ?? category}
              </p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ fontFamily: "var(--font-family-playfair)" }}
              >
                {displayName.includes("&") ? (
                  <>
                    {displayName.split("&")[0].trim()}{" "}
                    <span className="italic" style={{ color: "#d4a843" }}>&</span>{" "}
                    {displayName.split("&")[1]?.trim()}
                  </>
                ) : (
                  displayName
                )}
              </h1>
              <p className="mt-2 text-white/60 text-sm">
                {allPhotos.length} photos
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-12 pb-6 text-center px-4">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
              {CATEGORY_LABELS[cat] ?? category}
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              {displayName}
            </h1>
          </div>
        )}
      </section>

      {/* ─── Category Tabs (navigation) ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {PUBLIC_CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/portfolio"
              search={{}}
              className="px-5 py-2 text-sm tracking-wider rounded-full border transition-all duration-300"
              style={{
                borderColor: c === cat ? "#d4a843" : "rgba(13,13,13,0.2)",
                backgroundColor: c === cat ? "#d4a843" : "transparent",
                color: c === cat ? "#0d0d0d" : "#555",
              }}
            >
              {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Photo Grid with Load More ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {visiblePhotos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="photo-card group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: "1", boxShadow: "0 4px 20px -8px rgba(0,0,0,0.15)" }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt={`${displayName} — photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* Zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Load More button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-10 py-3 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#0d0d0d",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Load More ({allPhotos.length - visiblePhotos.length} remaining)
            </button>
          </div>
        )}

        {allPhotos.length === 0 && manifest.total > 0 && (
          <p className="text-center text-neutral-500 py-12">
            No photos found for this album.
          </p>
        )}

        {/* Back to portfolio */}
        <div className="text-center mt-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-200"
            style={{ color: "#b8922e" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => setLightbox(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {lightbox < visiblePhotos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={visiblePhotos[lightbox]}
            alt={`${displayName} — photo ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider">
            {lightbox + 1} / {visiblePhotos.length}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
