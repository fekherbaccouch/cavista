"use client";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

const FEATURED = [
  {
    id: 1,
    slug: "dalmore-king-alexander",
    name: "Dalmore King Alexander III",
    category: "Whisky",
    price: 1250,
    tag: "Rare",
    img: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?w=600&q=80",
  },
  {
    id: 2,
    slug: "krug-grande-cuvee",
    name: "Krug Grande Cuvée",
    category: "Champagne",
    price: 950,
    tag: "Exclusif",
    img: "https://images.unsplash.com/photo-1547595628-c61a32f82bf3?w=600&q=80",
  },
  {
    id: 3,
    slug: "chateau-talbot-2018",
    name: "Château Talbot 2018",
    category: "Vin Rouge",
    price: 480,
    tag: "Nouveau",
    img: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80",
  },
  {
    id: 4,
    slug: "belvedere-heritage",
    name: "Belvédère Heritage 176",
    category: "Vodka",
    price: 220,
    tag: "Premium",
    img: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&q=80",
  },
];

export default function NewArrivals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
      {FEATURED.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group relative bg-bg p-5 md:p-8 overflow-hidden"
        >
          {/* Tag */}
          <div className="absolute top-6 left-6 z-20">
            <span className="badge-promo">{product.tag}</span>
          </div>

          {/* Image */}
          <Link href={`/product/${product.slug}`}>
            <div className="aspect-[3/4] mb-8 overflow-hidden relative bg-surface">
              <motion.img
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Info */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-gold font-medium">
              {product.category}
            </span>
            <h3 className="text-lg font-serif text-cream leading-tight uppercase tracking-tighter line-clamp-2 h-12 group-hover:text-gold transition-colors">
              {product.name}
            </h3>

            <div className="pt-4 flex justify-between items-center border-t border-border/50">
              <span className="text-base font-light text-cream">
                {formatPrice(product.price)}
              </span>
              <Link
                href={`/product/${product.slug}`}
                className="text-[9px] uppercase tracking-widest text-muted hover:text-gold transition-colors underline underline-offset-4"
              >
                Détails
              </Link>
            </div>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 transition-colors duration-700 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
