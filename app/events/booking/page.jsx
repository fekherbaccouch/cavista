"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Calendar, Users, CheckCircle2, MessageCircle } from "lucide-react";

const EVENT_TYPES = [
  { id: "mariage",      label: "Mariage",        icon: "💍" },
  { id: "anniversaire", label: "Anniversaire",    icon: "🎂" },
  { id: "corporate",    label: "Corporate",       icon: "🏢" },
  { id: "soiree",       label: "Soirée Privée",   icon: "🌙" },
  { id: "autre",        label: "Autre",           icon: "🎉" },
];

const FORFAITS = [
  { id: "essentiel", label: "Essentiel", note: "à partir de 500 DT · jusqu'à 50 invités" },
  { id: "prestige",  label: "Prestige",  note: "à partir de 1 200 DT · jusqu'à 150 invités" },
  { id: "signature", label: "Signature", note: "Sur mesure · invités illimités" },
  { id: "custom",    label: "À définir", note: "Je ne sais pas encore" },
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">{label}</label>
      {children}
    </div>
  );
}

function RadioCard({ name, value, checked, onChange, label, sub, icon }) {
  return (
    <label className={`relative flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
      checked ? "border-gold bg-gold/5" : "border-border hover:border-border2"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "border-gold" : "border-border2"
      }`}>
        {checked && <span className="w-2 h-2 rounded-full bg-gold block" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-sm text-cream font-medium">{label}</span>
        </div>
        {sub && <p className="text-[11px] text-muted mt-0.5">{sub}</p>}
      </div>
    </label>
  );
}

export default function BookingPage() {
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", phone: "",
    eventType: "", forfait: "",
    date: "", guests: "", lieu: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Nom: ${form.prenom} ${form.nom}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Type d'événement: ${form.eventType}`,
      `Forfait souhaité: ${form.forfait}`,
      `Date: ${form.date}`,
      `Nombre d'invités: ${form.guests}`,
      `Lieu: ${form.lieu}`,
      `Message: ${form.message}`,
    ].join("%0A");
    const msg = `Bonjour Cavista!%0A%0ADemande de réservation événementielle:%0A%0A${lines}`;
    window.open(`https://wa.me/21650705128?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-surface border border-gold/30 rounded-2xl p-12"
        >
          <CheckCircle2 size={48} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-3">Demande envoyée !</h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Votre demande de réservation a été transmise via WhatsApp. Notre équipe vous répondra sous 24h pour confirmer les détails.
          </p>
          <Link href="/events" className="btn-gold inline-flex items-center gap-2">
            <ChevronLeft size={14} /> Retour Événementiel
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-bg min-h-screen pt-28 pb-10 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-xs uppercase tracking-[0.2em] mb-10"
        >
          <ChevronLeft size={14} /> Événementiel
        </Link>

        <div className="mb-10">
          <span className="section-label mb-3 block">Réservation</span>
          <h1 className="font-serif text-4xl text-cream uppercase tracking-tight mb-3">
            Réserver une <span className="text-gold-gradient italic">date</span>
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-md">
            Remplissez ce formulaire et nous vous contacterons rapidement pour confirmer votre réservation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identity */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-6">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight flex items-center gap-2">
              <Users size={16} className="text-gold" /> Vos informations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Prénom *">
                <input
                  type="text"
                  required
                  value={form.prenom}
                  onChange={set("prenom")}
                  placeholder="Votre prénom"
                  className="input-dark"
                />
              </Field>
              <Field label="Nom *">
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={set("nom")}
                  placeholder="Votre nom"
                  className="input-dark"
                />
              </Field>
              <Field label="Email *">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="votre@email.com"
                  className="input-dark"
                />
              </Field>
              <Field label="Téléphone *">
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+216 XX XXX XXX"
                  className="input-dark"
                />
              </Field>
            </div>
          </div>

          {/* Event type */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight flex items-center gap-2">
              <Calendar size={16} className="text-gold" /> Type d'événement *
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EVENT_TYPES.map((t) => (
                <RadioCard
                  key={t.id}
                  name="eventType"
                  value={t.id}
                  checked={form.eventType === t.id}
                  onChange={set("eventType")}
                  label={t.label}
                  icon={t.icon}
                />
              ))}
            </div>
          </div>

          {/* Forfait */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Forfait souhaité</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FORFAITS.map((f) => (
                <RadioCard
                  key={f.id}
                  name="forfait"
                  value={f.id}
                  checked={form.forfait === f.id}
                  onChange={set("forfait")}
                  label={f.label}
                  sub={f.note}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Détails de l'événement</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Date souhaitée *">
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={set("date")}
                  className="input-dark"
                />
              </Field>
              <Field label="Nombre d'invités estimé">
                <input
                  type="number"
                  min="10"
                  value={form.guests}
                  onChange={set("guests")}
                  placeholder="ex: 80"
                  className="input-dark"
                />
              </Field>
            </div>
            <Field label="Lieu / Adresse">
              <input
                type="text"
                value={form.lieu}
                onChange={set("lieu")}
                placeholder="Maison, salle des fêtes, hôtel…"
                className="input-dark"
              />
            </Field>
            <Field label="Message complémentaire">
              <textarea
                rows={4}
                value={form.message}
                onChange={set("message")}
                placeholder="Thème, demandes spéciales, contraintes à connaître…"
                className="input-dark resize-none"
              />
            </Field>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.2em] font-bold bg-[#25D366] text-bg rounded-xl hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={15} /> Envoyer via WhatsApp
            </button>
            <p className="text-[11px] text-muted text-center sm:text-left self-center max-w-[200px] leading-relaxed">
              Votre demande sera envoyée directement à notre équipe.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
