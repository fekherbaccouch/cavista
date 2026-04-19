"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "LES CELLIERS DE MONTFLEURY",
    subtitle: "Coup de cœur",
    tagline: "Collection Privilège",
    cta: "Découvrir",
    href: "/shop?cat=vins",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "DOMAINE NEFERIS",
    subtitle: "Offre de la semaine",
    tagline: "Remise de 10% · Vins tunisiens AOC",
    cta: "Voir l'offre",
    href: "/shop?cat=vins&brand=neferis",
    image: "https://images.unsplash.com/photo-1547595628-c61a32f82bf3?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "BAR & BARTENDER",
    subtitle: "Location Événementiel",
    tagline: "À partir de 500 DT · Bar mobile professionnel",
    cta: "Réserver",
    href: "/events",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2940&auto=format&fit=crop",
  },
];

export default function ShopHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-bg border-b border-border">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          {/* Background */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="section-label mb-4"
            >
              {slide.subtitle}
            </motion.p>

            <motion.h1
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-7xl font-serif text-cream uppercase tracking-tighter leading-none mb-5 max-w-4xl"
            >
              {slide.title}
            </motion.h1>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="text-cream/60 italic text-sm md:text-base font-light tracking-widest mb-10"
            >
              {slide.tagline}
            </motion.p>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <Link href={slide.href} className="btn-gold px-12 py-4 text-[11px] tracking-[0.35em]">
                {slide.cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-px transition-all duration-500 ${
              index === i ? "w-12 bg-gold" : "w-5 bg-cream/25"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <span className="text-[10px] text-gold font-bold font-serif">0{index + 1}</span>
        <div className="h-16 w-px bg-border" />
        <span className="text-[10px] text-muted">0{slides.length}</span>
      </div>
    </section>
  );
}
