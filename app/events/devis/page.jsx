"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, FileText, CheckCircle2, MessageCircle } from "lucide-react";

const BUDGETS = [
  { id: "500-1000",  label: "500 – 1 000 DT" },
  { id: "1000-2000", label: "1 000 – 2 000 DT" },
  { id: "2000-5000", label: "2 000 – 5 000 DT" },
  { id: "5000+",     label: "+ 5 000 DT" },
  { id: "ouvert",    label: "Ouvert / À discuter" },
];

const SERVICES_WANTED = [
  { id: "bar",       label: "Bar Open & Cocktails" },
  { id: "bartender", label: "Cocktailiste(s)" },
  { id: "kemia",     label: "Kémia & Tapas" },
  { id: "deco",      label: "Décoration Bar" },
  { id: "flair",     label: "Show Flair Bartending" },
  { id: "traiteur",  label: "Service Traiteur" },
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">{label}</label>
      {children}
    </div>
  );
}

function CheckCard({ id, label, checked, onChange }) {
  return (
    <label className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
      checked ? "border-gold bg-gold/5" : "border-border hover:border-border2"
    }`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "border-gold bg-gold" : "border-border2"
      }`}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <polyline points="1,3.5 3.5,6 8,1" stroke="#07080C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-cream">{label}</span>
    </label>
  );
}

function RadioCard({ name, value, checked, onChange, label }) {
  return (
    <label className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
      checked ? "border-gold bg-gold/5" : "border-border hover:border-border2"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "border-gold" : "border-border2"
      }`}>
        {checked && <span className="w-2 h-2 rounded-full bg-gold block" />}
      </div>
      <span className="text-sm text-cream">{label}</span>
    </label>
  );
}

export default function DevisPage() {
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", phone: "",
    societe: "",
    eventType: "", date: "", guests: "", lieu: "",
    services: [],
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceLabels = SERVICES_WANTED.filter((s) => form.services.includes(s.id)).map((s) => s.label).join(", ");
    const lines = [
      `Nom: ${form.prenom} ${form.nom}`,
      form.societe ? `Société: ${form.societe}` : "",
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Type d'événement: ${form.eventType}`,
      `Date: ${form.date}`,
      `Nombre d'invités: ${form.guests}`,
      `Lieu: ${form.lieu}`,
      `Services souhaités: ${serviceLabels}`,
      `Budget estimé: ${form.budget}`,
      `Message: ${form.message}`,
    ].filter(Boolean).join("%0A");
    const msg = `Bonjour Cavista!%0A%0ADemande de devis événementiel:%0A%0A${lines}`;
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
          <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-3">Devis envoyé !</h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Votre demande de devis a été transmise via WhatsApp. Un membre de notre équipe vous contactera sous 24h avec une proposition personnalisée.
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
          <span className="section-label mb-3 block">Gratuit & Sans Engagement</span>
          <h1 className="font-serif text-4xl text-cream uppercase tracking-tight mb-3">
            Demande de <span className="text-gold-gradient italic">Devis</span>
          </h1>
          <p className="text-muted text-sm leading-relaxed max-w-md">
            Décrivez votre projet et nous vous proposons une offre sur mesure, adaptée à votre budget et vos attentes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight flex items-center gap-2">
              <FileText size={16} className="text-gold" /> Vos coordonnées
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Prénom *">
                <input type="text" required value={form.prenom} onChange={set("prenom")} placeholder="Votre prénom" className="input-dark" />
              </Field>
              <Field label="Nom *">
                <input type="text" required value={form.nom} onChange={set("nom")} placeholder="Votre nom" className="input-dark" />
              </Field>
              <Field label="Email *">
                <input type="email" required value={form.email} onChange={set("email")} placeholder="votre@email.com" className="input-dark" />
              </Field>
              <Field label="Téléphone *">
                <input type="tel" required value={form.phone} onChange={set("phone")} placeholder="+216 XX XXX XXX" className="input-dark" />
              </Field>
            </div>
            <Field label="Société / Organisation">
              <input type="text" value={form.societe} onChange={set("societe")} placeholder="Optionnel — pour les événements corporates" className="input-dark" />
            </Field>
          </div>

          {/* Event */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Votre événement</h3>
            <Field label="Type d'événement *">
              <input type="text" required value={form.eventType} onChange={set("eventType")} placeholder="Mariage, Anniversaire, Corporate, Soirée…" className="input-dark" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Date envisagée">
                <input type="date" value={form.date} onChange={set("date")} className="input-dark" />
              </Field>
              <Field label="Nombre d'invités estimé">
                <input type="number" min="1" value={form.guests} onChange={set("guests")} placeholder="ex: 120" className="input-dark" />
              </Field>
            </div>
            <Field label="Lieu de l'événement">
              <input type="text" value={form.lieu} onChange={set("lieu")} placeholder="Ville, salle, adresse…" className="input-dark" />
            </Field>
          </div>

          {/* Services */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Services souhaités</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_WANTED.map((s) => (
                <CheckCard
                  key={s.id}
                  id={s.id}
                  label={s.label}
                  checked={form.services.includes(s.id)}
                  onChange={() => toggleService(s.id)}
                />
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Budget estimé</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUDGETS.map((b) => (
                <RadioCard
                  key={b.id}
                  name="budget"
                  value={b.id}
                  checked={form.budget === b.id}
                  onChange={set("budget")}
                  label={b.label}
                />
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="bg-surface border border-border rounded-2xl p-7 space-y-5">
            <h3 className="font-serif text-base text-cream uppercase tracking-tight">Informations complémentaires</h3>
            <Field label="Décrivez votre projet">
              <textarea
                rows={5}
                value={form.message}
                onChange={set("message")}
                placeholder="Thème, ambiance souhaitée, contraintes particulières, demandes spéciales…"
                className="input-dark resize-none"
              />
            </Field>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.2em] font-bold bg-[#25D366] text-bg rounded-xl hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={15} /> Envoyer la demande via WhatsApp
            </button>
          </div>

          <p className="text-[11px] text-muted text-center leading-relaxed">
            Devis gratuit, sans engagement. Réponse garantie sous 24h ouvrées.
          </p>
        </form>
      </div>
    </main>
  );
}
