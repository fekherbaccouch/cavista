"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, X, ChevronDown, ChevronUp,
  LayoutGrid, List, Search
} from "lucide-react";
import ShopHero from "@/components/ShopHero";
import ProductCard from "@/components/ProductCard";
import { products, brands, getCategories } from "@/lib/data";

// ── Static filter data ─────────────────────────────────────────
const CATEGORIES = getCategories(); // ["Tous", "Whisky", "Champagne", ...]

const PRICE_RANGES = [
  { id: "0-50",    label: "Moins de 50 DT",  min: 0,   max: 50   },
  { id: "50-150",  label: "50 – 150 DT",     min: 50,  max: 150  },
  { id: "150-300", label: "150 – 300 DT",    min: 150, max: 300  },
  { id: "300-600", label: "300 – 600 DT",    min: 300, max: 600  },
  { id: "600+",    label: "Plus de 600 DT",  min: 600, max: null },
];

const VOLUMES = [
  "6 × 25cl", "6 × 33cl", "Kit 3 pièces", "Kit 4 pièces",
  "0.70L", "0.75L", "1L",
];

const SORT_OPTIONS = [
  { value: "default",    label: "En vedette" },
  { value: "price-asc",  label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating",     label: "Meilleures notes" },
  { value: "name",       label: "Nom A–Z" },
];

const BADGE_OPTIONS = [
  { id: "promo", label: "Promotions" },
  { id: "new",   label: "Nouveautés" },
];

// ── Collapsible filter section ─────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-bold text-cream"
      >
        {title}
        {open
          ? <ChevronUp size={13} className="text-muted" />
          : <ChevronDown size={13} className="text-muted" />
        }
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Radio option ───────────────────────────────────────────────
function RadioOpt({ name, value, checked, onChange, label, count }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
      <input type="radio" name={name} value={value} checked={checked}
        onChange={() => onChange(value)} className="sr-only" />
      {/* Custom radio */}
      <span className={`relative flex-shrink-0 w-4 h-4 rounded-full border transition-all duration-200 ${
        checked ? "border-gold bg-gold/10" : "border-border2 bg-surface2 group-hover:border-gold/60"
      }`}>
        <span className={`absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-gold transition-all duration-200 ${
          checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`} />
      </span>
      <span className={`text-[13px] flex-1 transition-colors ${checked ? "text-gold" : "text-muted group-hover:text-cream"}`}>
        {label}
      </span>
      {count != null && (
        <span className="text-[11px] text-muted">{count}</span>
      )}
    </label>
  );
}

// ── Checkbox option ────────────────────────────────────────────
function CheckOpt({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group select-none">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      {/* Custom checkbox */}
      <span className={`relative flex-shrink-0 w-4 h-4 rounded-sm border transition-all duration-200 ${
        checked ? "border-gold bg-gold" : "border-border2 bg-surface2 group-hover:border-gold/60"
      }`}>
        {/* Checkmark */}
        <svg
          viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`absolute inset-0 m-auto w-2.5 h-2 text-bg transition-all duration-150 ${
            checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <polyline points="1 4 3.5 6.5 9 1" />
        </svg>
      </span>
      <span className={`text-[13px] transition-colors ${checked ? "text-gold" : "text-muted group-hover:text-cream"}`}>
        {label}
      </span>
    </label>
  );
}

// ── List-view product row ──────────────────────────────────────
function ProductRow({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-4 border border-border rounded-xl bg-surface hover:border-gold/30 transition-colors p-4"
    >
      <div className="w-20 h-24 overflow-hidden bg-surface2 flex-shrink-0">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-gold font-semibold block mb-1">{product.category}</span>
          <h3 className="font-serif text-sm text-cream leading-snug mb-1">{product.name}</h3>
          {product.volume && <p className="text-xs text-muted">{product.volume}</p>}
          {product.description && (
            <p className="text-[11px] text-muted mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-gold font-medium text-sm">{product.price} DT</span>
            {product.oldPrice && (
              <span className="text-muted text-[11px] line-through">{product.oldPrice} DT</span>
            )}
          </div>
          <a href={`/product/${product.slug || product.id}`}
            className="text-[11px] uppercase tracking-wider text-muted hover:text-gold border border-border rounded-lg hover:border-gold px-3 py-1.5 transition-all">
            Voir détails
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function ShopPage() {
  // Filter state
  const [activeCategory,  setActiveCategory]  = useState("Tous");
  const [activePriceRange, setActivePriceRange] = useState(null);
  const [selectedVolumes, setSelectedVolumes]  = useState([]);
  const [selectedBrands,  setSelectedBrands]   = useState([]);
  const [selectedBadges,  setSelectedBadges]   = useState([]);
  const [minPrice,        setMinPrice]         = useState("");
  const [maxPrice,        setMaxPrice]         = useState("");
  const [sortBy,          setSortBy]           = useState("default");
  const [viewMode,        setViewMode]         = useState("grid");
  const [search,          setSearch]           = useState("");
  const [mobileOpen,      setMobileOpen]       = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  // Brand list derived from products
  const brandList = useMemo(() => {
    const seen = new Set();
    return products
      .map((p) => p.brand)
      .filter((b) => { if (seen.has(b)) return false; seen.add(b); return true; });
  }, []);

  // ── Filtered + sorted products ─────────────────────────────
  const filtered = useMemo(() => {
    let list = [...products];

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    // Category
    if (activeCategory !== "Tous") {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Price range preset
    if (activePriceRange) {
      const range = PRICE_RANGES.find((r) => r.id === activePriceRange);
      if (range) {
        list = list.filter((p) =>
          p.price >= range.min && (range.max == null || p.price <= range.max)
        );
      }
    }

    // Custom price
    if (minPrice !== "") list = list.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") list = list.filter((p) => p.price <= Number(maxPrice));

    // Volumes
    if (selectedVolumes.length > 0) {
      list = list.filter((p) => selectedVolumes.includes(p.volume));
    }

    // Brands
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    // Badges (promo / new)
    if (selectedBadges.length > 0) {
      list = list.filter((p) => selectedBadges.includes(p.badge));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "name":       list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return list;
  }, [activeCategory, activePriceRange, minPrice, maxPrice, selectedVolumes, selectedBrands, selectedBadges, sortBy, search]);

  // Active filter pills
  const activeFilters = useMemo(() => {
    const pills = [];
    if (activeCategory !== "Tous") pills.push({ id: "cat", label: activeCategory, clear: () => setActiveCategory("Tous") });
    if (activePriceRange) {
      const r = PRICE_RANGES.find((p) => p.id === activePriceRange);
      if (r) pills.push({ id: "price", label: r.label, clear: () => setActivePriceRange(null) });
    }
    if (minPrice || maxPrice) {
      pills.push({ id: "custom-price", label: `${minPrice || "0"} – ${maxPrice || "∞"} DT`, clear: () => { setMinPrice(""); setMaxPrice(""); } });
    }
    selectedVolumes.forEach((v) => pills.push({ id: `vol-${v}`, label: v, clear: () => setSelectedVolumes((prev) => prev.filter((x) => x !== v)) }));
    selectedBrands.forEach((b)  => pills.push({ id: `brand-${b}`, label: b, clear: () => setSelectedBrands((prev) => prev.filter((x) => x !== b)) }));
    selectedBadges.forEach((b)  => {
      const opt = BADGE_OPTIONS.find((o) => o.id === b);
      if (opt) pills.push({ id: `badge-${b}`, label: opt.label, clear: () => setSelectedBadges((prev) => prev.filter((x) => x !== b)) });
    });
    return pills;
  }, [activeCategory, activePriceRange, minPrice, maxPrice, selectedVolumes, selectedBrands, selectedBadges]);

  const clearAll = () => {
    setActiveCategory("Tous");
    setActivePriceRange(null);
    setMinPrice("");
    setMaxPrice("");
    setSelectedVolumes([]);
    setSelectedBrands([]);
    setSelectedBadges([]);
    setSearch("");
  };

  const toggleArr = (setter, value) =>
    setter((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);

  // ── Sidebar JSX (shared by desktop + mobile) ───────────────
  const SidebarContent = () => (
    <div className="border border-border rounded-2xl bg-surface p-5 space-y-0">
      <div className="pb-4 border-b border-border mb-0">
        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-1">Filtres</h3>
        <p className="text-xs text-muted">{filtered.length} produit{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Search */}
      <FilterSection title="Recherche" defaultOpen={false}>
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom, marque, catégorie…"
            className="input-dark w-full pl-8 text-xs"
          />
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Catégorie">
        {CATEGORIES.map((cat) => (
          <RadioOpt
            key={cat} name="category" value={cat}
            checked={activeCategory === cat}
            onChange={setActiveCategory}
            label={cat}
            count={cat === "Tous" ? products.length : (categoryCounts[cat] || 0)}
          />
        ))}
      </FilterSection>

      {/* Price range presets */}
      <FilterSection title="Gamme de prix">
        {PRICE_RANGES.map((r) => (
          <RadioOpt
            key={r.id} name="priceRange" value={r.id}
            checked={activePriceRange === r.id}
            onChange={(v) => setActivePriceRange(activePriceRange === v ? null : v)}
            label={r.label}
          />
        ))}
        {/* Custom price inputs */}
        <div className="flex gap-2 pt-2">
          <input
            type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min" className="input-dark w-full text-xs" min={0}
          />
          <input
            type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max" className="input-dark w-full text-xs" min={0}
          />
        </div>
      </FilterSection>

      {/* Volume */}
      <FilterSection title="Volume / Format" defaultOpen={false}>
        {VOLUMES.map((v) => (
          <CheckOpt key={v} checked={selectedVolumes.includes(v)}
            onChange={() => toggleArr(setSelectedVolumes, v)} label={v} />
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Marque" defaultOpen={false}>
        {brandList.map((b) => (
          <CheckOpt key={b} checked={selectedBrands.includes(b)}
            onChange={() => toggleArr(setSelectedBrands, b)} label={b} />
        ))}
      </FilterSection>

      {/* Special */}
      <FilterSection title="Offres" defaultOpen={false}>
        {BADGE_OPTIONS.map((opt) => (
          <CheckOpt key={opt.id} checked={selectedBadges.includes(opt.id)}
            onChange={() => toggleArr(setSelectedBadges, opt.id)} label={opt.label} />
        ))}
      </FilterSection>

      {/* Reset */}
      {activeFilters.length > 0 && (
        <div className="pt-4">
          <button
            onClick={clearAll}
            className="w-full text-[11px] uppercase tracking-wider text-muted border border-border rounded-lg hover:border-gold/40 hover:text-cream py-2.5 transition-all"
          >
            Réinitialiser tout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="bg-bg min-h-screen">
      {/* Hero Slider */}
      <ShopHero />

      {/* Sticky top filter bar (categories only) */}
      <nav className="sticky top-[72px] md:top-[88px] z-40 bg-bg/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3 md:gap-4">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-all relative pb-2 whitespace-nowrap ${
                  activeCategory === cat ? "text-gold" : "text-muted hover:text-cream"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold" />
                )}
              </button>
            ))}
          </div>
          <span className="text-xs uppercase tracking-widest text-muted hidden sm:block">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </nav>

      {/* Main layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.15em] font-bold text-muted border border-border rounded-lg px-4 py-2.5 hover:border-gold/50 hover:text-cream transition-all"
        >
          <SlidersHorizontal size={13} /> Filtres avancés
          {activeFilters.length > 0 && (
            <span className="ml-1 bg-gold text-bg text-[10px] font-bold px-2 py-0.5 rounded-full">{activeFilters.length}</span>
          )}
        </button>

        <div className="flex gap-5 md:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-[110px]">
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setMobileOpen(false)}
                  className="lg:hidden fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm"
                />
                <motion.aside
                  initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 overflow-y-auto bg-bg border-r border-border p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-gold">Filtres</span>
                    <button onClick={() => setMobileOpen(false)} className="text-muted hover:text-cream"><X size={18} /></button>
                  </div>
                  <SidebarContent />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Active filter pills */}
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
                {activeFilters.length > 1 && (
                  <button
                    onClick={clearAll}
                    className="text-xs uppercase tracking-wider text-muted hover:text-cream transition-colors px-2"
                  >
                    Tout effacer
                  </button>
                )}
              </div>

              {/* Right: sort + view toggle */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-dark text-xs uppercase tracking-wider py-2 px-3 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-gold text-bg" : "text-muted hover:text-cream"}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-gold text-bg" : "text-muted hover:text-cream"}`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid / List */}
            <AnimatePresence mode="popLayout">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 border border-border rounded-2xl bg-surface/50"
              >
                <p className="text-muted text-sm mb-4">Aucun produit ne correspond à vos critères.</p>
                <button onClick={clearAll} className="btn-outline text-xs">
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
