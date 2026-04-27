import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Hari Patil",
    role: "Owner & Lead Photographer",
    img: "/images/team-hari-COBwqhv5.jpg",
  },
  {
    name: "Abhi Patil",
    role: "Video Editor & Cinematographer",
    img: "/images/team-abhi-CVjCTo_9.jpg",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".team-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#faf5eb" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#d4a843" }}>
          The People Behind The Lens
        </p>
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-family-playfair)" }}
        >
          <span style={{ color: "#0d0d0d" }}>Our </span>
          <span className="italic" style={{ color: "#d4a843" }}>Team</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
          {team.map((member) => (
            <div key={member.name} className="team-card flex flex-col items-center">
              <div
                className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 mb-4"
                style={{ borderColor: "#d4a843" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3
                className="text-lg md:text-xl font-bold mt-2"
                style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
              >
                {member.name}
              </h3>
              <p className="text-sm" style={{ color: "#666" }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
