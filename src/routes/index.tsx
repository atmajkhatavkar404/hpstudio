import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")(  {
  component: Index,
  head: () => ({
    meta: [
      { title: "HP Studio — Premium Photography | Wedding, Baby Shoot & Events" },
      { name: "description", content: "HP Studio captures emotions, not just photos. Premium photography for weddings, baby shoots, pre-wedding, and events." },
      { property: "og:title", content: "HP Studio — Premium Photography" },
      { property: "og:description", content: "We capture emotions, not just photos. Book your shoot today." },
    ],
  }),
});

function Index() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          navigate({ to: "/portfolio" });
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [navigate]);

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
