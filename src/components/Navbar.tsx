import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "HOME", to: "/" as const },
  { label: "PORTFOLIO", to: "/portfolio" as const },
  { label: "SERVICES", to: "/services" as const },
  { label: "CONTACT", to: "/contact" as const },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="font-bold text-xl md:text-2xl tracking-wider" style={{ fontFamily: "var(--font-family-poppins)" }}>
              <span className="text-white">HP </span>
              <span style={{ color: "#d4a843" }}>STUDIO</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white/80 hover:text-white text-sm tracking-[0.15em] font-medium transition-colors duration-200"
                activeProps={{ style: { color: "#d4a843" } }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-6 py-3 text-sm tracking-[0.15em] font-semibold border-2 rounded-full transition-all duration-200 hover:scale-[1.05]"
              style={{ borderColor: "#d4a843", color: "#d4a843", backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d4a843";
                e.currentTarget.style.color = "#0d0d0d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#d4a843";
              }}
            >
              BOOK NOW
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 touch-friendly"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1a1a1a]/98 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white text-base tracking-[0.15em] font-medium touch-friendly"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full max-w-xs px-6 py-3 text-sm tracking-[0.15em] font-semibold border-2 rounded-full"
              style={{ borderColor: "#d4a843", color: "#d4a843" }}
            >
              BOOK NOW
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
