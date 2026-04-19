"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Shield, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import AccessoryCard from "@/components/AccessoryCard";
import { accessories, accessoryCategories } from "@/lib/data";

// Extend accessories with more products for a richer page
const ALL_ACCESSORIES = [
  ...accessories,
  {
    id: "a5", slug: "set-coupes-champagne",
    name: "Set 6 Coupes Champagne",
    category: "verrerie", price: 65, oldPrice: null,
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&q=80",
    badge: null, rating: 4.5, reviews: 18, inStock: true,
    description: "Coupes art déco en cristal, parfaites pour les célébrations.",
  },
  {
    id: "a6", slug: "plateau-service-ardoise",
    name: "Plateau Service Ardoise",
    category: "art-de-la-table", price: 55, oldPrice: 70,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    badge: "promo", rating: 4.7, reviews: 11, inStock: true,
    description: "Plateau en ardoise naturelle pour présenter vos cocktails avec style.",
  },
  {
    id: "a7", slug: "kit-bar-complet",
    name: "Kit Bar Professionnel Complet",
    category: "coffrets", price: 145, oldPrice: 180,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80",
    badge: "promo", rating: 4.9, reviews: 43, inStock: true,
    description: "Shaker, cuillère de bar, passoire, doseur, muddler et bec verseur. Tout en inox poli.",
  },
  {
    id: "a8", slug: "bac-a-glace-inox",
    name: "Bac à Glaçons Inox Premium",
    category: "outils", price: 28, oldPrice: null,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80",
    badge: "new", rating: 4.6, reviews: 29, inStock: true,
    description: "Bac inox double paroi avec couvercle et pince intégrée.",
  },
  {
    id: "a9", slug: "verres-whisky-old-fashioned",
    name: "Set 4 Verres Old Fashioned",
    category: "verrerie", price: 42, oldPrice: null,
    image: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?w=400&q=80",
    badge: null, rating: 4.8, reviews: 52, inStock: true,
    description: "Verres à fond lourd en cristal taillé, idéaux pour le whisky on the rocks.",
  },
  {
    id: "a10", slug: "decoration-bar-neon",
    name: "Décoration Bar Néon LED",
    category: "decoration", price: 95, oldPrice: null,
    image: "https://images.unsplash.com/photo-1572535641698-34ead18a1bdc?w=400&q=80",
    badge: "new", rating: 4.4, reviews: 8, inStock: true,
    description: "Signe lumineux LED 'Bar' en néon flexible, USB-C. Ambiance garantie.",
  },
  {
    id: "a11", slug: "muddler-passoire",
    name: "Set Muddler & Passoire Fine",
    category: "outils", price: 22, oldPrice: null,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
    badge: null, rating: 4.5, reviews: 36, inStock: true,
    description: "Muddler en bois et passoire Hawthorne fine maille, essentiels du bartender.",
  },
  {
    id: "a12", slug: "coffret-degustation-whisky",
    name: "Coffret Dégustation Whisky",
    category: "coffrets", price: 120, oldPrice: null,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&q=80",
    badge: null, rating: 4.9, reviews: 27, inStock: true,
    description: "4 verres Glencairn + carafe + guide de dégustation illustré. Coffret cadeau.",
  },
];

const SORT_OPTIONS = [
  { value: "featured", label: "En vedette" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Meilleures notes" },
  { value: "newest", label: "Nouveautés" },
];

const PRICE_RANGES = [
  { id: "0-30",    label: "Moins de 30 DT" },
  { id: "30-60",   label: "30 – 60 DT" },
  { id: "60-100",  label: "60 – 100 DT" },
  { id: "100+",    label: "Plus de 100 DT" },
];

function FilterSection({ title, children }) {
  return (
    <div className="py-5 border-b border-border/50 last:border-0">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold mb-3">{title}</p>
      {children}
    </div>
  );
}

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePriceRange, setActivePriceRange] = useState(null);
  const [onlyDeliverable, setOnlyDeliverable] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filter pills for quick removal
  const activeFilters = useMemo(() => {
    const f = [];
    if (activeCategory !== "all") {
      const cat = accessoryCategories.find((c) => c.id === activeCategory);
      if (cat) f.push({ id: "cat", label: cat.label, clear: () => setActiveCategory("all") });
    }
    if (activePriceRange) {
      const pr = PRICE_RANGES.find((r) => r.id === activePriceRange);
      if (pr) f.push({ id: "price", label: pr.label, clear: () => setActivePriceRange(null) });
    }
    if (onlyNew) f.push({ id: "new", label: "Nouveautés", clear: () => setOnlyNew(false) });
    return f;
  }, [activeCategory, activePriceRange, onlyNew]);

  const filtered = useMemo(() => {
    let list = [...ALL_ACCESSORIES];

    if (activeCategory !== "all") {
      list = list.filter((a) => a.category === activeCategory);
    }

    if (activePriceRange) {
      list = list.filter((a) => {
        if (activePriceRange === "0-30")   return a.price < 30;
        if (activePriceRange === "30-60")  return a.price >= 30 && a.price < 60;
        if (activePriceRange === "60-100") return a.price >= 60 && a.price < 100;
        if (activePriceRange === "100+")   return a.price >= 100;
        return true;
      });
    }

    if (onlyNew)         list = list.filter((a) => a.badge === "new");

    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "newest":     list = list.filter((a) => a.badge === "new").concat(list.filter((a) => a.badge !== "new")); break;
      default: break;
    }

    return list;
  }, [activeCategory, activePriceRange, onlyNew, sortBy]);

  const Sidebar = () => (
    <aside className="w-56 flex-shrink-0">
      <div className="sticky top-[88px] space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-white uppercase tracking-[0.2em]">Filtres</span>
          <span className="text-xs text-muted">{filtered.length} produit{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Categories */}
        <FilterSection title="Catégorie">
          <div className="space-y-1">
            {[{ id: "all", label: "Tout voir", icon: "✦" }, ...accessoryCategories].map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                    active
                      ? "bg-gold/10 text-gold border border-gold/30"
                      : "text-muted hover:text-white hover:bg-surface2 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.label}</span>
                  </span>
                  {cat.count && <span className="text-[10px] opacity-60">{cat.count}</span>}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection title="Budget">
          <div className="space-y-1">
            {PRICE_RANGES.map((range) => {
              const active = activePriceRange === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => setActivePriceRange(active ? null : range.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 font-medium ${
                    active
                      ? "bg-gold/10 text-gold border border-gold/30"
                      : "text-muted hover:text-white hover:bg-surface2 border border-transparent"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Toggles */}
        <FilterSection title="Options">
          <div className="space-y-2">
            {[
              { checked: onlyNew,         onChange: setOnlyNew,         label: "Nouveautés" },
              { checked: onlyDeliverable, onChange: setOnlyDeliverable, label: "Livraison dispo" },
            ].map(({ checked, onChange, label }) => (
              <button
                key={label}
                onClick={() => onChange(!checked)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                  checked
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-muted hover:text-white hover:bg-surface2 border border-transparent"
                }`}
              >
                <span className="font-medium">{label}</span>
                <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 transition-all ${checked ? "bg-gold border-gold" : "border-border2"}`} />
              </button>
            ))}
          </div>
        </FilterSection>

        {activeFilters.length > 0 && (
          <button
            onClick={() => { setActiveCategory("all"); setActivePriceRange(null); setOnlyNew(false); setOnlyDeliverable(false); }}
            className="w-full mt-2 text-[10px] uppercase tracking-[0.15em] text-muted hover:text-white py-2 transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <main className="bg-bg min-h-screen">
      {/* ── Delivery Banner ─────────────────────────────────── */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {[
            { icon: <Truck size={13} />, text: "Livraison disponible" },
            { icon: <Shield size={13} />, text: "Paiement sécurisé" },
            { icon: <RotateCcw size={13} />, text: "Retours 14 jours" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted font-medium">
              <span className="text-gold">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Page Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4 block mx-auto w-fit">Art du Bar</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream uppercase tracking-tight mb-4">
              Accessoires & <span className="text-gold-gradient italic">Verrerie</span>
            </h1>
            <p className="text-muted text-sm max-w-lg mx-auto">
              Équipez votre bar avec le meilleur. Verres d'exception, outils professionnels et coffrets cadeaux sélectionnés par nos experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFilterOpen((v) => !v)}
          className="lg:hidden flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.15em] font-bold text-muted border border-border rounded-lg px-4 py-2.5 hover:border-gold/50 hover:text-cream transition-all"
        >
          <SlidersHorizontal size={13} /> Filtres
          {activeFilters.length > 0 && (
            <span className="ml-1 bg-gold text-bg text-[10px] font-bold px-2 py-0.5 rounded-full">{activeFilters.length}</span>
          )}
        </button>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-bg border-r border-border overflow-y-auto p-5"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-gold">Filtres</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-muted hover:text-cream">
                    <X size={18} />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top bar: active pills + sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((f) => (
                  <button
                    key={f.id}
                    onClick={f.clear}
                    className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider bg-gold/10 border border-gold/40 rounded-full text-gold px-3.5 py-1.5 hover:bg-gold/20 transition-colors font-medium"
                  >
                    {f.label} <X size={9} />
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-dark text-xs uppercase tracking-wider py-2 px-3 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <AccessoryCard product={product} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-24 border border-border rounded-2xl bg-surface/50">
                <p className="text-muted text-sm mb-4">Aucun accessoire ne correspond à vos critères.</p>
                <button
                  onClick={() => { setActiveCategory("all"); setActivePriceRange(null); setOnlyNew(false); }}
                  className="btn-outline text-xs"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Gift Banner ─────────────────────────────────────── */}
      <section className="bg-surface border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl text-cream uppercase tracking-tight mb-2">Coffrets Cadeaux sur Mesure</h3>
            <p className="text-muted text-sm">Composez votre coffret idéal — livraison possible avec ruban doré et carte personnalisée.</p>
          </div>
          <a href="/events/devis" className="btn-gold whitespace-nowrap">
            Créer mon coffret
          </a>
        </div>
      </section>
    </main>
  );
}
