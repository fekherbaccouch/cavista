"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const SIDES = [
  {
    id: "wine",
    label: "Vins Rouges",
    sub: "Sélection Sommelier",
    href: "/shop?cat=vins",
    img: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1400&auto=format&fit=crop",
    overlayColor: "rgba(107, 26, 46, 0.3)",   /* wine */
  },
  {
    id: "vodka",
    label: "Vodka Pure",
    sub: "L'Art de la Distillation",
    href: "/shop?cat=vodka",
    img: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?q=80&w=1400&auto=format&fit=crop",
    overlayColor: "rgba(6, 78, 59, 0.3)",      /* emerald */
  },
];

export default function SelectionToggle() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="min-h-[50vh] md:h-[80vh] flex flex-col md:flex-row border-b border-border overflow-hidden bg-bg">
      {SIDES.map(({ id, label, sub, href, img, overlayColor }) => (
        <motion.div
          key={id}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          animate={{
            flex: hovered === id ? 1.6 : hovered !== null ? 0.6 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center group cursor-pointer border-r border-border last:border-r-0 overflow-hidden"
        >
          {/* Image */}
          <motion.img
            src={img}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            animate={{ scale: hovered === id ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ backgroundColor: overlayColor }}
          />

          {/* Dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

          {/* Text content */}
          <div className="relative z-10 text-center px-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif uppercase text-white tracking-tighter italic leading-none drop-shadow-lg">
              {label}
            </h3>
            <motion.p
              animate={{
                opacity: hovered === id ? 1 : 0,
                y: hovered === id ? 0 : 12,
              }}
              transition={{ duration: 0.4 }}
              className="text-[10px] uppercase tracking-[0.45em] mt-5 text-gold font-medium"
            >
              {sub}
            </motion.p>
            <motion.div
              animate={{ opacity: hovered === id ? 1 : 0, y: hovered === id ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="mt-6"
            >
              <Link
                href={href}
                className="btn-outline text-[9px] px-6 py-2.5 tracking-[0.25em]"
                onClick={(e) => e.stopPropagation()}
              >
                Explorer →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
