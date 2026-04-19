"use client";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CategoryBento from "@/components/CategoryBento";
import SelectionToggle from "@/components/SelectionToggle";
import NewArrivals from "@/components/NewArrivals";
import AboutUs from "@/components/AboutUs";

export default function HomePage() {
  return (
    <main className="bg-bg min-h-screen selection:bg-gold selection:text-bg">
      {/* 1. HERO SECTION: L'Art de la Dégustation (Full Color HD) */}
      <Hero />

      {/* 2. INFINITE TICKER: Brand Pillars */}
      <Marquee />

      {/* 3. NEW ARRIVALS: Featured Products Grid */}
      <section className="py-12 md:py-24 border-b border-border bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-4"
          >
            <div>
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] mb-3 block font-bold">
                Exclusivités
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif uppercase tracking-tighter leading-none">
                Nouveaux <br /> <span className="italic text-gold">Arrivages</span>
              </h2>
            </div>
            <p className="text-muted text-xs max-w-xs mb-2 font-light leading-relaxed">
              Découvrez notre sélection hebdomadaire de bouteilles rares et de spiritueux fraîchement importés.
            </p>
          </motion.div>
          
          {/* Grid of New Products with HD Images */}
          <NewArrivals />
        </div>
      </section>

      {/* 4. CATEGORY BENTO: The Editorial Grid with Background Bleed Icons */}
      <CategoryBento />

      {/* 5. SELECTION TOGGLE: Interactive Wine vs Vodka split (HD Hover) */}
      <SelectionToggle />

      {/* 6. PROMOTIONS: High-Contrast Marketing (Champagne Feature) */}

      {/* 7. ABOUT US: Heritage & Storytelling (The Goulette Legacy) */}
      <AboutUs />

      {/* 8. DYNAMIC BOTTOM MARQUEE: The Legal Footer */}
      <footer className="border-t border-border py-12 md:py-20 overflow-hidden bg-surface">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[36px] sm:text-[60px] md:text-[90px] lg:text-[120px] font-serif uppercase tracking-tighter text-border2/60 select-none pointer-events-none"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-6 md:mx-12">
              L&apos;Abus d&apos;alcool est dangereux &bull; Cavista Tunis &bull;
            </span>
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border/50">
          <div className="text-xs uppercase tracking-widest text-muted">
            &copy; 2026 Cavista Store. All Rights Reserved.
          </div>
          <div className="flex justify-center gap-8">
             <span className="text-xs uppercase tracking-widest cursor-pointer hover:text-gold transition-colors underline underline-offset-8">Instagram</span>
             <span className="text-xs uppercase tracking-widest cursor-pointer hover:text-gold transition-colors underline underline-offset-8">Facebook</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-right text-muted">
            La Goulette, Tunis, Tunisie
          </div>
        </div>
      </footer>
    </main>
  );
}