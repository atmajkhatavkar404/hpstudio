"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".contact-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        },
      );
    }
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        },
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    const text = `Hi HP Studio!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 px-4 sm:px-6 lg:px-8 text-center">
        <div ref={heroRef}>
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "#b8922e" }}
          >
            Get In Touch
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
          >
            Contact <span className="" style={{ color: "#D9A520" }}>HP Studio</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
            We'd love to hear from you. Reach out to book a session, ask a question,
            or just say hello.
          </p>
        </div>
      </section>

      {/* ─── Contact Cards ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
        <div
          ref={cardsRef}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {/* Phone */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="contact-card group bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,0.1)" }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
              style={{ backgroundColor: "rgba(212,168,67,0.12)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D9A520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              Phone
            </h3>
            <p className="text-sm" style={{ color: "#777" }}>+91 XXXXX XXXXX</p>
          </a>

          {/* Email */}
          <a
            href="mailto:hpstudio@gmail.com"
            className="contact-card group bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,0.1)" }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
              style={{ backgroundColor: "rgba(212,168,67,0.12)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D9A520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              Email
            </h3>
            <p className="text-sm" style={{ color: "#777" }}>hpstudio@gmail.com</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,0.1)" }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
              style={{ backgroundColor: "rgba(37,211,102,0.12)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              WhatsApp
            </h3>
            <p className="text-sm" style={{ color: "#777" }}>Chat with us instantly</p>
          </a>

          {/* Location */}
          <div
            className="contact-card group bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,0.1)" }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:scale-110"
              style={{ backgroundColor: "rgba(212,168,67,0.12)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D9A520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              Studio
            </h3>
            <p className="text-sm" style={{ color: "#777" }}>Your Studio Address</p>
          </div>
        </div>
      </section>

      {/* ─── Form + Map Grid ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">

          {/* Enquiry Form */}
          <div
            className="bg-white rounded-2xl p-7 md:p-10"
            style={{ boxShadow: "0 15px 50px -15px rgba(0,0,0,0.1)" }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
            >
              Send an <span className="" style={{ color: "#D9A520" }}>Enquiry</span>
            </h2>
            <p className="text-sm mb-6" style={{ color: "#999" }}>
              Fill in the form and we'll get back to you on WhatsApp.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs tracking-wider uppercase font-semibold mb-1.5" style={{ color: "#555" }}>
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Priya Deshmukh"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "#faf5eb",
                    border: "1px solid rgba(13,13,13,0.1)",
                    color: "#0d0d0d",
                    // @ts-expect-error ring color
                    "--tw-ring-color": "#D9A520",
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs tracking-wider uppercase font-semibold mb-1.5" style={{ color: "#555" }}>
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "#faf5eb",
                    border: "1px solid rgba(13,13,13,0.1)",
                    color: "#0d0d0d",
                  }}
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-xs tracking-wider uppercase font-semibold mb-1.5" style={{ color: "#555" }}>
                  Service Interested In
                </label>
                <select
                  id="contact-service"
                  name="service"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 appearance-none"
                  style={{
                    backgroundColor: "#faf5eb",
                    border: "1px solid rgba(13,13,13,0.1)",
                    color: "#555",
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="Wedding">Wedding Photography & Film</option>
                  <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                  <option value="Baby Shoot">Baby Shoot</option>
                  <option value="Event Coverage">Event Coverage</option>
                  <option value="Commercial">Commercial / Business Shoot</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs tracking-wider uppercase font-semibold mb-1.5" style={{ color: "#555" }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your event, date, requirements..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 focus:ring-2 resize-none"
                  style={{
                    backgroundColor: "#faf5eb",
                    border: "1px solid rgba(13,13,13,0.1)",
                    color: "#0d0d0d",
                  }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor: "#D9A520",
                  color: "#0d0d0d",
                  boxShadow: "0 4px 15px rgba(212, 168, 67, 0.3)",
                }}
              >
                {submitted ? "✓ Sent! Opening WhatsApp…" : "Send via WhatsApp"}
              </button>
            </form>
          </div>

          {/* Map + Working Hours */}
          <div className="flex flex-col gap-6">
            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden flex-1 min-h-[280px] relative"
              style={{ boxShadow: "0 15px 50px -15px rgba(0,0,0,0.1)" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: "#e8ddc8" }}
              >
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D9A520" strokeWidth="1.5" className="mx-auto mb-3">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-sm font-semibold" style={{ color: "#0d0d0d", fontFamily: "var(--font-family-playfair)" }}>
                    HP Studio Location
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#777" }}>
                    Your Studio Address Here
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-5 py-2 text-[10px] tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#D9A520", color: "#0d0d0d" }}
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div
              className="rounded-2xl p-7 md:p-8"
              style={{ backgroundColor: "#0d0d0d", boxShadow: "0 15px 50px -15px rgba(0,0,0,0.3)" }}
            >
              <h3
                className="text-xl md:text-2xl font-bold mb-5"
                style={{ fontFamily: "var(--font-family-playfair)" }}
              >
                <span className="text-white">Working </span>
                <span className="" style={{ color: "#D9A520" }}>Hours</span>
              </h3>

              <div className="space-y-3">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 9:00 PM" },
                  { day: "Sunday", time: "10:00 AM – 6:00 PM" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <span className="text-sm text-white/60">{item.day}</span>
                    <span className="text-sm font-medium" style={{ color: "#D9A520" }}>{item.time}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Outdoor Shoots</span>
                  <span className="text-sm font-medium" style={{ color: "#D9A520" }}>By Appointment</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://instagram.com/hp_studio_07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
