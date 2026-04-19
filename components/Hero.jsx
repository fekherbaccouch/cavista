"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2940&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-border bg-bg">
      {/* Background image with subtle zoom-in */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMG}
          alt="Cavista cave premium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/85 via-bg/30 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(8,8,8,0.8)_100%)]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-label mb-8 inline-block"
        >
          La Cave Premium de Tunisie &nbsp;&bull;&nbsp; Établi à La Goulette
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-serif mb-6 md:mb-8 leading-[0.92] text-cream uppercase tracking-tighter"
        >
          L&apos;Art du
          <br />
          <span className="text-gold-gradient italic">Bon Verre</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 mx-auto gold-line mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-muted text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          Une sélection rigoureuse de spiritueux d&apos;exception et vins fins.
          Commandez en ligne — retrait en magasin ou parking à La Goulette.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/shop" className="btn-gold px-10 py-4 text-[11px] tracking-[0.35em] min-w-[220px]">
            Explorer la Cave
          </Link>
          <Link
            href="/events"
            className="btn-outline px-10 py-4 text-[11px] tracking-[0.35em] min-w-[220px]"
          >
            Bar Événementiel
          </Link>
        </motion.div>

        {/* Service pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: <MapPin size={11} />, label: "Retrait en magasin" },
            { icon: <MapPin size={11} />, label: "Retrait parking" },
            { icon: <Clock size={11} />, label: "Commande en ligne" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border text-[9px] uppercase tracking-[0.2em] text-muted"
            >
              <span className="text-gold">{icon}</span>
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.5em] text-gold font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
