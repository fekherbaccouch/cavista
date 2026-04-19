"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, Calendar, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, cocktailists } from "@/lib/data";

const cocktailProducts = products.filter((p) => p.category === "Cocktails");

const BASE_FILTERS = [
  { id: "Tous",           label: "Tous" },
  { id: "Prêt à boire",   label: "Prêt à boire" },
  { id: "Vodka Based",    label: "Vodka Based" },
  { id: "Rhum Based",     label: "Rhum Based" },
  { id: "Whisky Based",   label: "Whisky Based" },
  { id: "Tequila Based",  label: "Tequila Based" },
  { id: "Sans Alcool",    label: "Sans Alcool" },
];

const KEMIA_ITEMS = [
  { name: "Bruschetta Tomates & Basilic", price: 18, img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80" },
  { name: "Assortiment Olives Marinées",  price: 12, img: "https://images.unsplash.com/photo-1556744637-d3add56f9bee?w=400&q=80" },
  { name: "Mini Kefta Grillées",          price: 22, img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80" },
  { name: "Chips & Dips Artisanaux",      price: 15, img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80" },
  { name: "Plateau Fromages & Charcuterie", price: 45, img: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=400&q=80" },
  { name: "Samoussa au Thon",             price: 16, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80" },
];

function StarRow({ rating }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={11} className={n <= Math.floor(rating) ? "fill-gold text-gold" : "text-border"} />
      ))}
    </span>
  );
}

export default function CocktailsPage() {
  const [activeBase, setActiveBase] = useState("Tous");

  const filtered = useMemo(() => {
    if (activeBase === "Tous") return cocktailProducts;
    return cocktailProducts.filter((p) => p.cocktailBase === activeBase);
  }, [activeBase]);

  return (
    <main className="bg-bg min-h-screen">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[360px] md:min-h-[520px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1400&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="section-label mb-4 md:mb-5 block">L'Art du Cocktail</span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream leading-none uppercase tracking-tight mb-5 md:mb-6">
              Kits & <span className="text-gold-gradient italic">Cocktails</span>
            </h1>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
              Des kits complets pour reproduire vos cocktails préférés à la maison. Chaque ingrédient sélectionné, dosé et prêt à sublimer votre soirée.
            </p>
            <div className="flex items-center gap-4">
              <a href="#kits" className="btn-gold">Explorer les kits</a>
              <a href="#cocktailistes" className="btn-outline">Nos Bartenders</a>
            </div>
          </motion.div>
        </div>

        {/* Decorative bubbles */}
        <div className="absolute top-1/4 right-[10%] w-2 h-2 rounded-full bg-gold/40 animate-ping" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/2 right-[20%] w-1.5 h-1.5 rounded-full bg-gold/30 animate-ping" style={{ animationDelay: "0.6s" }} />
        <div className="absolute bottom-1/4 right-[15%] w-1 h-1 rounded-full bg-gold/50 animate-ping" style={{ animationDelay: "1.2s" }} />
      </section>

      {/* ── Cocktail Kits Grid ──────────────────────────────── */}
      <section id="kits" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-label mb-3 block">Nos Kits</span>
            <h2 className="font-serif text-3xl text-cream uppercase tracking-tight">
              Cocktails Signature
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {BASE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveBase(f.id)}
                className={`relative px-4 py-2 text-xs uppercase tracking-[0.15em] font-bold rounded-full transition-all whitespace-nowrap ${
                  activeBase === f.id
                    ? "text-bg bg-gold border border-gold"
                    : "text-muted border border-border hover:border-gold/50 hover:text-cream"
                }`}
              >
                {f.label}
                {activeBase === f.id && (
                  <motion.div
                    layoutId="cocktail-underline"
                    className="absolute inset-0 border border-gold -m-px pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.35) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted text-sm">Aucun kit dans cette catégorie.</p>
          </div>
        )}
      </section>

      {/* ── Gold divider ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-line" />
      </div>

      {/* ── Cocktailistes ──────────────────────────────────── */}
      <section id="cocktailistes" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block mx-auto w-fit">Notre Équipe</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight mb-4">
            Nos <span className="text-gold-gradient italic">Cocktailistes</span>
          </h2>
          <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
            Des bartenders professionnels pour vos événements privés, mariages et soirées d'entreprise. Réservez directement via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {cocktailists.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-surface border border-border rounded-2xl overflow-hidden"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

                {/* Rating overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-bg/80 backdrop-blur-sm border border-border rounded-full px-2.5 py-1.5">
                  <Sparkles size={10} className="text-gold" />
                  <span className="text-[10px] font-bold text-gold">{person.rating}</span>
                </div>

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {person.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider bg-bg/80 backdrop-blur-sm border border-border2 rounded-full px-2.5 py-1 text-muted font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-cream uppercase tracking-tight">{person.name}</h3>
                    <p className="text-[11px] uppercase tracking-wider text-gold font-medium mt-0.5">{person.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-muted uppercase tracking-wider font-medium">{person.events} events</p>
                    <p className="text-[11px] text-muted">{person.experience}</p>
                  </div>
                </div>

                <StarRow rating={person.rating} />

                <p className="text-muted text-xs leading-relaxed mt-3 mb-5">{person.bio}</p>

                <a
                  href={`https://wa.me/21650705128?text=Bonjour, je souhaite réserver ${person.name} comme cocktailiste.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full justify-center py-3 text-xs uppercase tracking-[0.15em] font-bold bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg text-[#25D366] hover:bg-[#25D366] hover:text-bg transition-all duration-300"
                >
                  <Calendar size={12} /> Réserver via WhatsApp
                </a>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/20 transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-muted text-sm mb-5">Besoin d'un bartender pour votre prochain événement ?</p>
          <Link href="/events" className="btn-gold inline-flex items-center gap-2">
            Voir nos forfaits événementiels <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Gold divider ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-line" />
      </div>

      {/* ── Kémia & Tapas ──────────────────────────────────── */}
      <section id="kemia" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          {/* Text */}
          <div className="lg:w-1/3 flex-shrink-0">
            <span className="section-label mb-4 block">Accompagnements</span>
            <h2 className="font-serif text-4xl text-cream uppercase tracking-tight mb-6 leading-none">
              Kémia & <span className="text-gold-gradient italic">Tapas</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Des bouchées savoureuses pour accompagner vos cocktails. Notre sélection de tapas et kémia tunisienne, disponible sur commande pour vos événements.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6 border-l-2 border-gold pl-4 py-1 leading-relaxed">
              Disponible sur commande<br />minimum 48h à l'avance
            </p>
            <a
              href="https://wa.me/21650705128?text=Bonjour, je souhaite commander la Kémia & Tapas pour un événement."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              Commander via WhatsApp
            </a>
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {KEMIA_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative aspect-square overflow-hidden bg-surface"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-serif text-xs text-cream leading-tight line-clamp-2">{item.name}</p>
                  <p className="text-[11px] text-gold font-medium mt-0.5">{item.price} DT / pers.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ──────────────────────────────── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl text-cream uppercase tracking-tight mb-2">
              Créez votre cocktail signature
            </h3>
            <p className="text-muted text-sm">
              Un kit personnalisé composé selon vos goûts, livré chez vous.
            </p>
          </div>
          <a
            href="https://wa.me/21650705128?text=Bonjour, je souhaite créer un kit cocktail personnalisé."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold whitespace-nowrap"
          >
            Commande personnalisée
          </a>
        </div>
      </section>
    </main>
  );
}
