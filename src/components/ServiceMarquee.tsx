const services = [
  "Baby Shoot",
  "Pre-Wedding Shoot",
  "Wedding Shoot",
  "Cafe / Restaurant Shoot",
  "Event Coverage",
];

export default function ServiceMarquee() {
  const repeated = [...services, ...services, ...services];
  return (
    <section id="services" className="py-3 overflow-hidden" style={{ backgroundColor: "#f5f5dc" }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((service, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-4 md:mx-6 text-sm md:text-base tracking-wider uppercase font-medium"
            style={{ color: "#000000" }}
          >
            <span className="mr-4 md:mr-6">•</span>
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
