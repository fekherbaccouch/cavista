"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, Plus, Check } from "lucide-react";

function Stars({ rating = 5 }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((n) => (
        <span key={n} className={`text-[10px] ${n <= Math.floor(rating) ? "text-gold" : "text-border2"}`}>★</span>
      ))}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((v) => !v);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const badgeLabel =
    product.badge === "promo"       ? (discount ? `-${discount}%` : "Promo")
    : product.badge === "new"       ? "Nouveau"
    : product.badge === "exclusive" ? "Exclusif"
    : null;

  return (
    <Link href={`/product/${product.slug || product.id}`} className="block group">
      <div className="bg-surface border border-border/60 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,168,67,0.1)]">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface2">
          <img
            src={product.image || product.img || "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          {badgeLabel && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                product.badge === "new" ? "bg-emerald text-white" : "bg-gold text-bg"
              }`}>
                {badgeLabel}
              </span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-bg/60 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-gold/60 transition-all"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={12} className={isWishlisted ? "fill-gold text-gold" : "text-white/70"} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2.5">
          {product.category && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
              {product.category}
            </span>
          )}

          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-gold-light transition-colors">
            {product.name}
          </h3>

          {product.volume && (
            <p className="text-[11px] text-muted font-medium">{product.volume}</p>
          )}

          {product.rating && (
            <div className="flex items-center gap-1.5">
              <Stars rating={product.rating} />
              {product.reviews && (
                <span className="text-[10px] text-muted">({product.reviews})</span>
              )}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white">{product.price} DT</span>
              {product.oldPrice && (
                <span className="text-[11px] text-muted line-through">{product.oldPrice} DT</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isAdded
                  ? "bg-gold border-gold text-bg"
                  : "bg-transparent border-border2 text-muted hover:border-gold hover:text-gold hover:bg-gold/10"
              }`}
              aria-label="Ajouter au panier"
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={13} />
                  </motion.span>
                ) : (
                  <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Plus size={13} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
