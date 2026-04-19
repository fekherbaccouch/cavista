"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SpiritBottle, FluteGlass } from "./Icons";

const categories = [
  {
    id: "whisky",
    label: "Whisky d'Exception",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    minH: "min-h-[420px]",
    icon: <SpiritBottle className="w-14 h-14 text-amber-400" />,
    img: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?q=80&w=1287&auto=format&fit=crop",
    href: "/shop?cat=whisky",
  },
  {
    id: "champagne",
    label: "Champagne de Prestige",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-2",
    minH: "min-h-[420px]",
    icon: <FluteGlass className="w-14 h-14 text-gold" />,
    img: "https://images.unsplash.com/photo-1547595628-c61a32f82bf3?q=80&w=1287&auto=format&fit=crop",
    href: "/shop?cat=champagne",
  },
  {
    id: "vin",
    label: "Vins Fins",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[200px]",
    icon: <SpiritBottle className="w-10 h-10 text-red-400 -rotate-12" />,
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1287&auto=format&fit=crop",
    href: "/shop?cat=vins",
  },
  {
    id: "spiritueux",
    label: "Spiritueux",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    minH: "min-h-[200px]",
    icon: <SpiritBottle className="w-10 h-10 text-emerald-400 rotate-12" />,
    img: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1287&auto=format&fit=crop",
    href: "/shop?cat=vodka",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function CategoryBento() {
  return (
    <section className="py-12 md:py-24 bg-bg border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3"
          style={{ gridAutoRows: "minmax(200px, auto)" }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              variants={item}
              className={`relative border border-border bg-surface group overflow-hidden cursor-pointer ${cat.colSpan} ${cat.rowSpan} ${cat.minH}`}
            >
              <Link href={cat.href} className="absolute inset-0 z-30" aria-label={cat.label} />

              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
              </div>

              {/* Number */}
              <div className="relative z-10 p-7 flex justify-between items-start">
                <span className="text-muted text-[9px] uppercase tracking-[0.4em] font-bold">
                  0{i + 1}
                </span>
              </div>

              {/* Label + CTA */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif leading-tight uppercase tracking-tighter text-cream mb-3 md:mb-4">
                  {cat.label.split(" ").map((word, idx) => {
                    const italic = ["d'Exception", "Prestige", "Fins", "Pursuit"].includes(word);
                    return italic ? (
                      <span key={idx} className="text-gold italic font-medium">{word} </span>
                    ) : (
                      <span key={idx}>{word} </span>
                    );
                  })}
                </h3>

                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-muted group-hover:text-gold transition-colors inline-flex items-center gap-2 after:content-[''] after:h-px after:w-0 after:bg-gold group-hover:after:w-8 after:transition-all after:duration-500">
                  Explorer →
                </span>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/25 transition-colors duration-700 pointer-events-none z-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
