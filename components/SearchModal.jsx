"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { NEW_PRODUCTS } from "@/lib/data";

const SUGGESTIONS = [
  { label: "Whiskies",    href: "/shop?cat=whisky" },
  { label: "Champagne",   href: "/shop?cat=champagne" },
  { label: "Vins Rouges", href: "/shop?cat=vins" },
  { label: "Vodka",       href: "/shop?cat=vodka" },
  { label: "Gin",         href: "/shop?cat=gin" },
  { label: "Événementiel",href: "/events" },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  /* Auto-focus when opened */
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  /* Close on ESC */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Filter against NEW_PRODUCTS + simple name match */
  const results = query.trim().length > 1
    ? NEW_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/92 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl w-full mx-auto mt-24 px-4"
          >
            {/* Search input */}
            <div className="relative flex items-center border-b-2 border-gold bg-transparent pb-1">
              <Search size={20} className="text-gold mr-4 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit, marque, catégorie…"
                className="flex-1 bg-transparent text-cream text-lg font-light placeholder:text-muted outline-none"
              />
              <button onClick={onClose} className="text-muted hover:text-cream transition-colors ml-4">
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {query.trim().length > 1 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6"
                >
                  {results.length === 0 ? (
                    <p className="text-muted text-sm text-center py-8">
                      Aucun résultat pour &laquo;{query}&raquo;
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {results.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.slug || p.id}`}
                          onClick={onClose}
                          className="group flex flex-col gap-2 border border-border rounded-xl hover:border-gold transition-colors p-2"
                        >
                          <div className="aspect-square bg-surface rounded-lg overflow-hidden">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-gold">{p.category}</p>
                            <p className="text-xs text-cream font-serif leading-tight line-clamp-2">{p.name}</p>
                            <p className="text-[11px] text-muted mt-0.5">{p.price} DT</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-8"
                >
                  <p className="text-[9px] uppercase tracking-[0.3em] text-muted mb-4">
                    Suggestions populaires
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={onClose}
                        className="cat-pill"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
