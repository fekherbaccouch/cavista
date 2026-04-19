"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight, Calendar, Users, Sparkles, Music,
  Camera, UtensilsCrossed, Wine, Star, CheckCircle2,
  Phone, MessageCircle,
} from "lucide-react";

const FORFAITS = [
  {
    id: "essentiel",
    label: "Essentiel",
    price: "Sur devis",
    priceNote: "à partir de 500 DT",
    icon: "🥂",
    color: "border-border",
    highlight: false,
    features: [
      "Bar open 3h",
      "1 cocktailiste",
      "Sélection de 6 cocktails",
      "Matériel de bar inclus",
      "Jusqu'à 50 invités",
    ],
    cta: "Demander un devis",
    ctaHref: "/events/devis",
  },
  {
    id: "prestige",
    label: "Prestige",
    price: "Sur devis",
    priceNote: "à partir de 1 200 DT",
    icon: "✨",
    color: "border-gold",
    highlight: true,
    badge: "Le plus populaire",
    features: [
      "Bar open 5h",
      "2 cocktailistes",
      "Carte cocktails illimitée",
      "Kémia & Tapas inclus",
      "Décoration bar personnalisée",
      "Jusqu'à 150 invités",
      "Photo-call & scénographie",
    ],
    cta: "Réserver maintenant",
    ctaHref: "/events/booking",
  },
  {
    id: "signature",
    label: "Signature",
    price: "Sur mesure",
    priceNote: "devis personnalisé",
    icon: "👑",
    color: "border-border",
    highlight: false,
    features: [
      "Bar open durée illimitée",
      "Équipe complète 3+ bartenders",
      "Cocktail signature exclusif",
      "Kémia & banquet gastronomique",
      "Décoration & scénographie haut-de-gamme",
      "Service traiteur",
      "Invités illimités",
      "Coordinateur événementiel dédié",
    ],
    cta: "Nous contacter",
    ctaHref: "/events/devis",
  },
];

const EVENT_TYPES = [
  {
    id: "mariage",
    label: "Mariage",
    icon: "💍",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    desc: "Un bar à cocktails qui s'invite à votre grand jour. De l'apéritif au dernier verre, notre équipe crée une expérience inoubliable.",
  },
  {
    id: "anniversaire",
    label: "Anniversaire",
    icon: "🎂",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    desc: "Fêtez chaque année avec éclat. Cocktails signature, ambiance sur-mesure et bartenders de talent pour une soirée mémorable.",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: "🏢",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    desc: "Séminaires, lancements produit, team-building — Cavista élève votre événement d'entreprise au rang d'expérience premium.",
  },
  {
    id: "soiree",
    label: "Soirée Privée",
    icon: "🌙",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    desc: "Que ce soit chez vous ou dans un lieu de prestige, transformez votre soirée privée en moment d'exception avec notre bar éphémère.",
  },
];

const SERVICES = [
  { icon: <Wine size={20} />, label: "Bar Open Premium", desc: "Sélection de spiritueux haut-de-gamme et cocktails signature" },
  { icon: <UtensilsCrossed size={20} />, label: "Kémia & Tapas", desc: "Bouchées gastronomiques tunisiennes et méditerranéennes" },
  { icon: <Sparkles size={20} />, label: "Bartending Flair", desc: "Show de jonglage et techniques spectaculaires" },
  { icon: <Camera size={20} />, label: "Scénographie", desc: "Décoration et mise en scène du bar selon votre thème" },
  { icon: <Music size={20} />, label: "Ambiance DJ", desc: "Musique live ou DJ partenaires sur demande" },
  { icon: <Users size={20} />, label: "Coordination", desc: "Chef de projet dédié de la planification au J-Day" },
];

const TESTIMONIALS = [
  {
    name: "Selma & Ayoub",
    event: "Mariage — Juin 2025",
    rating: 5,
    text: "Karim et son équipe ont été incroyables. Le bar cocktails était le point fort de notre mariage. Tous nos invités en parlent encore !",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&q=80",
  },
  {
    name: "Rania B.",
    event: "Anniversaire 30 ans — Avril 2025",
    rating: 5,
    text: "J'ai choisi le forfait Prestige et c'était parfait. Les cocktails signature à mon prénom, la décoration… un souvenir magique.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
  {
    name: "DRH, MedTech Tunisia",
    event: "Séminaire Corporate — Mars 2025",
    rating: 5,
    text: "Service irréprochable, équipe professionnelle et discrète. Notre séminaire a été sublimé par la prestation Cavista. Recommandé sans hésitation.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  },
];

function StarRow({ n = 5 }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={12} className="fill-gold text-gold" />
      ))}
    </span>
  );
}

export default function EventsPage() {
  const [activeType, setActiveType] = useState("mariage");
  const activeEvent = EVENT_TYPES.find((e) => e.id === activeType);

  return (
    <main className="bg-bg min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="section-label mb-5 block">Bar & Événementiel</span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream leading-none uppercase tracking-tight mb-6">
              Vos événements,<br />
              <span className="text-gold-gradient italic">sublimés</span>
            </h1>
            <p className="text-muted text-sm leading-relaxed mb-10 max-w-lg">
              Cavista met son expertise caviste et son équipe de bartenders professionnels au service de vos moments d'exception. Mariages, anniversaires, corporates — nous créons l'expérience.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/events/booking" className="btn-gold inline-flex items-center gap-2">
                Réserver une date <ChevronRight size={14} />
              </Link>
              <Link href="/events/devis" className="btn-outline inline-flex items-center gap-2">
                Demande de devis
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex gap-6">
          {[
            { n: "500+", label: "Événements" },
            { n: "98%", label: "Satisfaction" },
            { n: "3", label: "Bartenders" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-bg/80 backdrop-blur-sm border border-border rounded-xl px-5 py-4">
              <p className="font-serif text-2xl text-gold">{s.n}</p>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Event Types ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <span className="section-label mb-4 block mx-auto w-fit">Nos Prestations</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight mb-3">
            Pour chaque <span className="text-gold-gradient italic">occasion</span>
          </h2>
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
            Chaque événement a sa propre âme. Nous adaptons notre service à votre vision.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EVENT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-bold rounded-full border transition-all ${
                activeType === t.id
                  ? "bg-gold text-bg border-gold"
                  : "text-muted border-border hover:border-gold/50 hover:text-cream"
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border"
        >
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
              src={activeEvent.image}
              alt={activeEvent.label}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-surface p-10 flex flex-col justify-center gap-6">
            <span className="text-3xl">{activeEvent.icon}</span>
            <div>
              <h3 className="font-serif text-3xl text-cream uppercase tracking-tight mb-3">
                {activeEvent.label}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{activeEvent.desc}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/events/booking" className="btn-gold inline-flex items-center gap-2">
                Réserver <Calendar size={13} />
              </Link>
              <Link href="/events/devis" className="btn-outline text-xs">
                Demande de devis
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-line" />
      </div>

      {/* ── Services inclus ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block mx-auto w-fit">Ce que nous offrons</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight">
            Nos <span className="text-gold-gradient italic">Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface border border-border rounded-xl p-6 hover:border-gold/40 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="font-serif text-base text-cream mb-2">{s.label}</h3>
              <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-line" />
      </div>

      {/* ── Forfaits ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block mx-auto w-fit">Tarification</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight mb-3">
            Nos <span className="text-gold-gradient italic">Forfaits</span>
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            Des formules claires adaptées à toutes les envergures. Chaque forfait est personnalisable sur demande.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {FORFAITS.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`relative bg-surface border-2 ${f.color} rounded-2xl p-8 flex flex-col gap-6 ${
                f.highlight ? "shadow-[0_0_40px_rgba(201,168,76,0.15)]" : ""
              }`}
            >
              {f.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-bg text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full">
                    {f.badge}
                  </span>
                </div>
              )}

              <div>
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-serif text-xl text-cream uppercase tracking-tight mb-1">{f.label}</h3>
                <p className="text-gold text-sm font-semibold">{f.price}</p>
                <p className="text-muted text-xs mt-0.5">{f.priceNote}</p>
              </div>

              <ul className="space-y-3 flex-1">
                {f.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={f.ctaHref}
                className={`w-full text-center py-3 text-xs uppercase tracking-[0.15em] font-bold rounded-xl transition-all ${
                  f.highlight
                    ? "bg-gold text-bg hover:opacity-90"
                    : "border border-border2 text-cream hover:border-gold hover:text-gold"
                }`}
              >
                {f.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-8">
          Tous les prix sont indicatifs et varient selon la date, le lieu et le nombre d'invités. Contactez-nous pour un devis personnalisé.
        </p>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="gold-line" />
      </div>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block mx-auto w-fit">Avis Clients</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight">
            Ils nous ont fait <span className="text-gold-gradient italic">confiance</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="bg-surface border border-border rounded-2xl p-7 flex flex-col gap-5"
            >
              <StarRow n={t.rating} />
              <p className="text-cream text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                <div>
                  <p className="text-cream text-xs font-semibold">{t.name}</p>
                  <p className="text-muted text-[11px]">{t.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl text-cream uppercase tracking-tight mb-2">
              Prêt à créer l'événement parfait ?
            </h3>
            <p className="text-muted text-sm">
              Notre équipe vous répond sous 24h. Devis gratuit et sans engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/events/devis" className="btn-gold inline-flex items-center gap-2 justify-center">
              <Sparkles size={14} /> Demander un devis
            </Link>
            <a
              href="https://wa.me/21650705128?text=Bonjour Cavista, je souhaite organiser un événement."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center px-5 py-3 text-xs uppercase tracking-[0.15em] font-bold bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-xl hover:bg-[#25D366] hover:text-bg transition-all"
            >
              <MessageCircle size={14} /> WhatsApp Direct
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block mx-auto w-fit">Notre Processus</span>
          <h2 className="font-serif text-4xl text-cream uppercase tracking-tight">
            Comment ça <span className="text-gold-gradient italic">fonctionne</span> ?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {[
            { step: "01", label: "Contact", desc: "Partagez-nous votre projet par formulaire ou WhatsApp." },
            { step: "02", label: "Devis", desc: "Nous vous envoyons une proposition personnalisée sous 24h." },
            { step: "03", label: "Validation", desc: "On affine ensemble les détails : thème, menu, logistique." },
            { step: "04", label: "Le Jour J", desc: "Notre équipe arrive installée 2h avant. Vous profitez." },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center mx-auto mb-5">
                <span className="font-serif text-gold text-xl">{s.step}</span>
              </div>
              <h4 className="font-serif text-base text-cream uppercase tracking-tight mb-2">{s.label}</h4>
              <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events/booking" className="btn-gold inline-flex items-center gap-2">
            <Calendar size={14} /> Réserver une date
          </Link>
          <a
            href="tel:+21650705128"
            className="inline-flex items-center gap-2 btn-outline text-sm"
          >
            <Phone size={14} /> +216 50 705 128
          </a>
        </div>
      </section>
    </main>
  );
}
