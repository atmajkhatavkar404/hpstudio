"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {

const services = [
  {
    title: "Wedding",
    desc: "Comprehensive coverage of your big day. We capture every ritual, emotion, and celebration to create a timeless cinematic masterpiece.",
    items: [
      "Cinematic Wedding Films",
      "Candid & Traditional Photography and Videography",
      "Drone & specialized shots",
      "Live Streaming Services",
    ],
  },
  {
    title: "Pre Wedding",
    desc: "A cinematic pre-wedding experience designed to tell your love story with emotion, style, and storytelling.",
    items: [
      "Concept & Story-Based Pre-Wedding Film",
      "Script Planning & Shot Design",
      "Multi-Location Cinematic Shoot",
      "Drone & Gimbal Cinematography",
      "Song-Based Creative Editing",
      "Save The Date Film",
      "Instagram Reel Version (Vertical Edit)",
      "Teaser + Full Cinematic Film",
    ],
  },
  {
    title: "Commercial & Business Shoots",
    desc: "A range of professional corporate cinematography services to capture your brand's essence.",
    items: [
      "Shop / Showroom Promotional Videos",
      "Product Shoots",
      "Interior & Exterior Cinematic Coverage",
      "Social Media Ads (Instagram / Facebook Ads)",
      "Brand Storytelling Videos",
    ],
  },
  {
    title: "Event Coverage",
    desc: "Professional event cinematography services to capture the essence of your event.",
    items: [
      "Corporate Events",
      "Birthday / Anniversary Events",
      "Cultural Programs",
      "School / College Functions",
    ],
  },
  {
    title: "Post-Production Services",
    desc: "Professional post-production services to elevate your raw footage into a memorable experience.",
    items: [
      "Professional Video Editing",
      "Cinematic Color Grading (DaVinci Resolve)",
      "Motion Graphics (After Effects)",
      "Teaser & Trailer Edits",
      "Instagram Reel Editing",
    ],
  },
  {
    title: "Premium Wedding Services",
    desc: "Luxury production add-ons for couples who want the very best on their big day.",
    items: [
      "Same Day Edit (Wedding day highlight video)",
      "Wedding Teaser (1–2 min cinematic cut)",
      "Couple Interview Story Film",
      "Luxury Album Designing",
      "LED Screen Live Coverage Editing",
      "Destination Wedding Coverage",
    ],
  },
];

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".svc-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <Navbar />

      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
          Packages
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
        >
          Our Service <span className="italic" style={{ color: "#d4a843" }}>&</span> Pricing
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm md:text-base" style={{ color: "#555" }}>
          Cinematic packages tailored to your story. Tap any card to enquire.
        </p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="svc-card group relative bg-white rounded-2xl p-7 md:p-8 flex flex-col transition-all duration-500 hover:-translate-y-2"
              style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,0.15)" }}
            >
              <div className="absolute top-0 left-7 right-7 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg,#d4a843,#f0d078)" }} />

              <h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#555" }}>
                {s.desc}
              </p>

              <ul className="space-y-2 mb-7 flex-1">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm" style={{ color: "#333" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#d4a843" }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="self-center inline-flex items-center justify-center px-7 py-2.5 text-xs tracking-[0.2em] font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#0d0d0d", color: "white" }}
              >
                Contact for Details
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
