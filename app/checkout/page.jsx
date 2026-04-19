"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, MapPin, Clock, MessageSquare, ShoppingBag,
  ChevronRight, ChevronLeft, CheckCircle, Trash2
} from "lucide-react";
import { timeSlots, formatPrice } from "@/lib/data";

const STEPS = [
  { id: 1, label: "Coordonnées",   icon: User },
  { id: 2, label: "Retrait",       icon: MapPin },
  { id: 3, label: "Confirmation",  icon: CheckCircle },
];

const PICKUP_OPTIONS = [
  {
    id: "boutique",
    label: "Retrait en boutique",
    sub: "19 Av. Francklin Roosevelt, La Goulette",
    free: true,
  },
  {
    id: "whatsapp",
    label: "Commande WhatsApp",
    sub: "On vous confirme la disponibilité avant",
    free: true,
  },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 md:mb-12 overflow-x-auto no-scrollbar px-2">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-400 ${
                  done   ? "bg-gold border-gold text-bg"
                  : active ? "bg-transparent border-gold text-gold"
                  : "bg-transparent border-border text-muted"
                }`}
              >
                {done ? <CheckCircle size={16} /> : <Icon size={16} />}
              </div>
              <span className={`text-[11px] uppercase tracking-[0.15em] font-medium ${active ? "text-gold" : done ? "text-cream" : "text-muted"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-10 sm:w-20 h-px mx-2 sm:mx-3 mb-6 transition-colors ${done ? "bg-gold" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderSummary({ cartItems, cartTotal, note }) {
  const delivery = 0;
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 sticky top-28 md:top-[88px]">
      <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-gold mb-6">
        Votre Commande
      </h3>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag size={28} className="text-muted mx-auto mb-3" />
          <p className="text-muted text-xs">Votre panier est vide</p>
          <Link href="/shop" className="btn-outline text-xs mt-4 inline-block">
            Explorer la cave
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto no-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-14 h-16 bg-surface2 border border-border rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-cream font-serif leading-tight line-clamp-2">{item.name}</p>
                  {item.volume && (
                    <p className="text-[11px] text-muted mt-0.5">{item.volume}</p>
                  )}
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-muted">×{item.quantity}</span>
                    <span className="text-[11px] text-gold font-medium">{item.price * item.quantity} DT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-border pt-4 mb-4">
            <div className="flex justify-between text-xs text-muted">
              <span>Sous-total</span>
              <span>{cartTotal} DT</span>
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>Livraison</span>
              <span className="text-green-400">Gratuite</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline border-t border-border pt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-cream">Total</span>
            <span className="text-xl font-serif text-gold">{cartTotal + delivery} DT</span>
          </div>

          <div className="mt-5 p-3 bg-bg border border-border/50 rounded-xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted mb-1 font-medium">Mode de paiement</p>
            <p className="text-sm text-cream font-medium">Paiement à la caisse</p>
            <p className="text-xs text-muted mt-0.5">En espèces ou carte bancaire</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    pickupMethod: "boutique",
    date: "", time: "",
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const buildWhatsAppMessage = () => {
    const lines = [
      "🛒 *Nouvelle commande Cavista*",
      "",
      `👤 *Client :* ${form.name}`,
      `📱 *Téléphone :* ${form.phone}`,
      form.email ? `📧 *Email :* ${form.email}` : null,
      "",
      `🏪 *Mode :* ${form.pickupMethod === "boutique" ? "Retrait en boutique" : "Commande WhatsApp"}`,
      form.date ? `📅 *Date :* ${form.date}` : null,
      form.time ? `🕐 *Heure :* ${form.time}` : null,
      "",
      "📦 *Commande :*",
      ...cartItems.map((item) => `  • ${item.name}${item.volume ? ` (${item.volume})` : ""} ×${item.quantity} — ${item.price * item.quantity} DT`),
      "",
      `💰 *Total : ${cartTotal} DT*`,
      form.note ? `\n📝 *Note :* ${form.note}` : null,
    ].filter(Boolean).join("\n");

    return encodeURIComponent(lines);
  };

  const handleSubmit = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/21650705128?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const canProceedStep1 = form.name.trim() && form.phone.trim();
  const canProceedStep2 = form.pickupMethod;

  if (submitted) {
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={36} className="text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-cream uppercase tracking-tight mb-4">
            Commande envoyée !
          </h1>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Votre commande a été transmise via WhatsApp. Notre équipe vous contacte sous 30 minutes pour confirmer les détails.
          </p>
          <div className="gold-line mb-8" />
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="btn-gold">Continuer mes achats</Link>
            <Link href="/" className="btn-outline">Accueil</Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-bg min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.webp" alt="Cavista" className="h-9 w-auto object-contain" />
          </Link>
          <Link href="/shop" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted hover:text-cream transition-colors">
            <ChevronLeft size={12} /> Continuer les achats
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-10">
          {/* Left: Steps */}
          <div>
            <AnimatePresence mode="wait">

              {/* ── Step 1: Coordonnées ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-8">
                    Vos Coordonnées
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-2 font-medium">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Prénom et Nom"
                        className="input-dark w-full"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-2 font-medium">
                        Numéro de téléphone *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+216 XX XXX XXX"
                        className="input-dark w-full"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-2 font-medium">
                        Email (optionnel)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="votre@email.com"
                        className="input-dark w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-10">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className={`flex items-center gap-2 btn-gold disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      Suivant <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Mode de retrait ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-8">
                    Mode de Retrait
                  </h2>

                  {/* Pickup method */}
                  <div className="space-y-3 mb-8">
                    {PICKUP_OPTIONS.map((opt) => (
                      <label key={opt.id} className="cursor-pointer">
                        <div
                          className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${
                            form.pickupMethod === opt.id
                              ? "border-gold bg-gold/5"
                              : "border-border hover:border-border2 bg-surface"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                            form.pickupMethod === opt.id ? "border-gold" : "border-muted"
                          }`}>
                            {form.pickupMethod === opt.id && (
                              <div className="w-2 h-2 rounded-full bg-gold m-auto mt-[2px]" />
                            )}
                          </div>
                          <input
                            type="radio"
                            className="sr-only"
                            name="pickupMethod"
                            value={opt.id}
                            checked={form.pickupMethod === opt.id}
                            onChange={() => update("pickupMethod", opt.id)}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-cream font-medium">{opt.label}</p>
                            <p className="text-xs text-muted mt-0.5">{opt.sub}</p>
                          </div>
                          <span className="text-[11px] uppercase tracking-wider text-green-400 font-bold">Gratuit</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Date picker */}
                  {form.pickupMethod === "boutique" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-2 font-medium">
                          Date de retrait souhaitée
                        </label>
                        <input
                          type="date"
                          value={form.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => update("date", e.target.value)}
                          className="input-dark w-full"
                        />
                      </div>

                      {/* Time slots */}
                      {form.date && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-3 font-medium">
                            <Clock size={11} className="inline mr-1.5" />
                            Heure de retrait
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot.time}
                                disabled={!slot.available}
                                onClick={() => update("time", slot.time)}
                                className={`py-2 px-1 text-xs border rounded-lg text-center transition-all ${
                                  !slot.available
                                    ? "border-border/30 text-muted/30 cursor-not-allowed line-through"
                                    : form.time === slot.time
                                    ? "border-gold bg-gold text-bg font-bold"
                                    : "border-border text-muted hover:border-gold/50 hover:text-cream"
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Notes */}
                  <div className="mt-6">
                    <label className="text-xs uppercase tracking-[0.2em] text-muted block mb-2 font-medium">
                      <MessageSquare size={11} className="inline mr-1.5" />
                      Notes / Instructions (optionnel)
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) => update("note", e.target.value)}
                      rows={3}
                      placeholder="Emballage cadeau, produits manquants, instructions spéciales…"
                      className="input-dark w-full resize-none"
                    />
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted hover:text-cream transition-colors"
                    >
                      <ChevronLeft size={12} /> Retour
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="flex items-center gap-2 btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Confirmer <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Confirmation ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-8">
                    Récapitulatif
                  </h2>

                  {/* Summary cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="border border-border rounded-xl bg-surface p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <User size={13} className="text-gold" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold">Coordonnées</span>
                      </div>
                      <p className="text-sm text-cream">{form.name}</p>
                      <p className="text-xs text-muted">{form.phone}</p>
                      {form.email && <p className="text-xs text-muted">{form.email}</p>}
                      <button onClick={() => setStep(1)} className="text-[11px] text-muted hover:text-gold transition-colors mt-2 underline">
                        Modifier
                      </button>
                    </div>

                    <div className="border border-border rounded-xl bg-surface p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={13} className="text-gold" />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold">Retrait</span>
                      </div>
                      <p className="text-sm text-cream">
                        {form.pickupMethod === "boutique" ? "Retrait en boutique" : "Commande WhatsApp"}
                      </p>
                      {form.date && <p className="text-xs text-muted">{form.date} {form.time ? `à ${form.time}` : ""}</p>}
                      {form.note && <p className="text-xs text-muted italic mt-1">Note : {form.note}</p>}
                      <button onClick={() => setStep(2)} className="text-[11px] text-muted hover:text-gold transition-colors mt-2 underline">
                        Modifier
                      </button>
                    </div>
                  </div>

                  {/* Cart review */}
                  <div className="border border-border rounded-xl bg-surface p-5 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingBag size={13} className="text-gold" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-gold">Articles ({cartItems.length})</span>
                    </div>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-surface2 overflow-hidden flex-shrink-0">
                            <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-cream font-serif">{item.name}</p>
                            <p className="text-[9px] text-muted">×{item.quantity}</p>
                          </div>
                          <span className="text-xs text-gold">{item.price * item.quantity} DT</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-4 pt-4 flex justify-between">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-cream">Total</span>
                      <span className="text-lg font-serif text-gold">{cartTotal} DT</span>
                    </div>
                  </div>

                  {/* WhatsApp notice */}
                  <div className="border border-[#25D366]/20 bg-[#25D366]/5 rounded-xl p-4 mb-8 flex gap-3">
                    <span className="text-[#25D366] text-lg">💬</span>
                    <div>
                      <p className="text-xs text-cream font-medium mb-1">Commande envoyée via WhatsApp</p>
                      <p className="text-xs text-muted leading-relaxed">
                        En cliquant sur "Envoyer la commande", vous serez redirigé vers WhatsApp avec tous les détails préremplis. Notre équipe vous confirme sous 30 min.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted hover:text-cream transition-colors"
                    >
                      <ChevronLeft size={12} /> Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={cartItems.length === 0}
                      className="flex items-center gap-2 py-4 px-8 bg-[#25D366] text-bg text-xs uppercase tracking-[0.15em] font-bold rounded-xl hover:bg-[#20bc5b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="text-base">💬</span> Envoyer la commande
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary (sticky) */}
          <OrderSummary cartItems={cartItems} cartTotal={cartTotal} note={form.note} />
        </div>
      </div>
    </main>
  );
}
