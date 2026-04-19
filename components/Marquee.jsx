/* components/Marquee.jsx */
"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const texts = ["Selection Tunis Prestige", "Livraison Express 24h", "Cuvées Rares", "Cavista Concierge"];

  return (
    <div className="border-y border-border py-4 overflow-hidden whitespace-nowrap bg-bg select-none">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {[...texts, ...texts].map((text, i) => (
          <span key={i} className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-muted hover:text-gold transition-colors mx-6 md:mx-12">
            &bull; {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}