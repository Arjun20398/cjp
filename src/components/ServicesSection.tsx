"use client";

import { useEffect, useRef, useState } from "react";
import servicesData from "../../content/data/services.json";

type Service = {
  title: string;
  tagline: string;
  description: string;
};

const services: Service[] = servicesData;

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative border border-border rounded-xl p-6 bg-card-bg cursor-default overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-3 hover:scale-[1.03] hover:border-gold/60
        hover:shadow-[0_20px_50px_-15px_rgba(197,164,78,0.35)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-gold">
          {service.title}
        </h3>
        <span className="text-[10px] px-2 py-1 rounded bg-gold/15 text-gold font-semibold uppercase tracking-wider transition-all duration-300 group-hover:bg-gold group-hover:text-background group-hover:scale-110 group-hover:-rotate-2">
          {service.tagline}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="border-b border-border py-16" aria-label="Our Services — What the judiciary offers">
      <div className="max-w-6xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          What We Offer
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Our Services
        </h2>
        <p className="text-muted text-sm mb-10">
          What the Indian judiciary proudly offers its citizens
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
