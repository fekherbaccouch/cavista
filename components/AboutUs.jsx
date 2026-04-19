"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
  // HD Luxury Cellar Image from Unsplash
  const CELLAR_IMAGE = "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1600&auto=format&fit=crop";

  return (
    <section className="py-16 md:py-32 bg-bg border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        
        {/* Left Side: Image with reveal animation */}
        <motion.div 
          initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="border border-border p-3"
        >
          <div className="aspect-[4/5] bg-surface relative overflow-hidden group">
             <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5 }}
                src={CELLAR_IMAGE} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                alt="Cavista Boutique La Goulette"
             />
             {/* Subtle 1px inner border for elegance */}
             <div className="absolute inset-4 border border-white/10 pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Side: Text with staggered entry */}
        <div className="space-y-6 md:space-y-10">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gold text-[11px] uppercase tracking-[0.6em] font-bold block"
          >
            L&apos;Héritage Cavista
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] text-cream uppercase tracking-tighter"
          >
            Une Passion pour <br /> les <span className="text-gold italic font-medium">Grands Crus</span>
          </motion.h2 >
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted text-lg leading-relaxed font-light max-w-lg"
          >
            Situé au cœur de La Goulette, Cavista Store est bien plus qu&apos;une cave. 
            C&apos;est un lieu dédié à l&apos;excellence, où chaque bouteille est sélectionnée 
            pour son histoire et son caractère unique.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <button className="group relative px-14 py-5 border border-border text-[10px] uppercase tracking-[0.4em] text-cream overflow-hidden">
              <span className="relative z-10 group-hover:text-bg transition-colors duration-500">
                Notre Histoire
              </span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}