"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServiceMarquee from "../components/ServiceMarquee";
import PortfolioSection from "../components/PortfolioSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import InstagramSection from "../components/InstagramSection";
import CTASection from "../components/CTASection";
import DiscountBanner from "../components/DiscountBanner";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Index() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          router.push("/portfolio");
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [router]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#0d0d0d" }}>
      <Navbar />
      <HeroSection />
      <ServiceMarquee />
      <PortfolioSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <InstagramSection />
      <DiscountBanner />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      {/* Scroll sentinel — triggers redirect to /portfolio when scrolled past footer */}
      <div ref={sentinelRef} className="h-16" aria-hidden />
    </div>
  );
}
