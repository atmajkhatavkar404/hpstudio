"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../../../components/Navbar";

gsap.registerPlugin(ScrollTrigger);
import Footer from "../../../../components/Footer";
import WhatsAppButton from "../../../../components/WhatsAppButton";
import { useManifest } from "../../../../lib/useManifest";
import {
  CATEGORY_LABELS,
  PUBLIC_CATEGORIES,
  IMAGES_PER_PAGE,
  getAlbumDetails,
  albumDisplayName,
  type CategoryKey,
} from "../../../../lib/images";

export default function StoryPage() {
  const { category, album } = useParams();
  const manifest = useManifest();
  const cat = category as CategoryKey;
  const albumSlug = album as string;

  const albumDetails = useMemo(() => getAlbumDetails(manifest, cat, albumSlug), [manifest, cat, albumSlug]);
  const displayName = useMemo(() => albumDisplayName(cat, albumSlug), [cat, albumSlug]);

  const allPhotos = useMemo(() => {
    if (!albumDetails) return [];
    const photos: string[] = [];
    photos.push(...(albumDetails.photos || []));
    Object.values(albumDetails.events || {}).forEach((eventPhotos) => {
      photos.push(...eventPhotos);
    });
    return photos;
  }, [albumDetails]);

  const eventsList = useMemo(() => {
    if (!albumDetails?.events) return [];
    return Object.keys(albumDetails.events);
  }, [albumDetails]);

  const categories = ["All", ...eventsList];

  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const galleryImages = useMemo(() => {
    if (activeCategory === "All") {
      return allPhotos;
    } else {
      return albumDetails?.events?.[activeCategory] || [];
    }
  }, [activeCategory, allPhotos, albumDetails]);

  const visibleImages = showAll
    ? galleryImages
    : galleryImages.slice(0, 12);

  // Parallax Scroll Effect for Hero Background
  useEffect(() => {
    if (!sectionRef.current || !heroBgRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        scale: 1.15,
        yPercent: 5,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
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
    <div className="overflow-x-hidden" style={{ backgroundColor: "#f6f1e8" }}>
      <Navbar />
      <main className="min-h-screen px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden shadow-sm">
            <Image
              src={allPhotos[0] || "/images/wedding-couple-By2WaDyA.jpg"}
              alt="Couple Hero"
              width={1600}
              height={900}
              className="w-full h-[300px] md:h-[550px] object-cover"
              priority
            />
          </div>

          {/* Title Section */}
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#3d332d]">
              {displayName}
            </h1>

            <p className="mt-3 text-[#5c5149] text-base md:text-xl font-medium max-w-2xl mx-auto">
              "A union written in golden hour light — every glance,
              every laugh, captured forever."
            </p>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveCategory(item)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300
                    ${
                      activeCategory === item
                        ? "bg-[#f1d58a] border-[#f1d58a] text-black"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item === "All" ? "All Photos" : item.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {visibleImages.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md group"
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  width={500}
                  height={700}
                  className="w-full h-[220px] md:h-[320px] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && visibleImages.length >= 12 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="bg-[#1f1f1f] text-white px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
              >
                SHOW MORE
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
