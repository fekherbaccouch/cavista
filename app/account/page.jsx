"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Award, ShoppingBag, ChevronRight, Gift } from "lucide-react";

const TABS = [
  { id: "login",    label: "Se connecter" },
  { id: "register", label: "Créer un compte" },
];

function Field({ label, icon, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium flex items-center gap-1.5">
        {icon && <span className="text-gold">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-dark w-full pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

const PERKS = [
  { icon: <Award size={18} />, label: "Cavacoins", desc: "Gagnez des points à chaque achat et débloquez des récompenses exclusives." },
  { icon: <ShoppingBag size={18} />, label: "Historique", desc: "Retrouvez facilement toutes vos commandes et statuts de livraison." },
  { icon: <Gift size={18} />, label: "Offres VIP", desc: "Accédez aux ventes privées et promotions réservées aux membres." },
];

export default function AccountPage() {
  const [tab, setTab] = useState("login");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({ prenom: "", nom: "", email: "", password: "", confirm: "" });
  const [success, setSuccess] = useState(false);

  const setL = (k) => (e) => setLogin((f) => ({ ...f, [k]: e.target.value }));
  const setR = (k) => (e) => setRegister((f) => ({ ...f, [k]: e.target.value }));

  const handleLogin = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-surface border border-gold/30 rounded-2xl p-12"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <User size={28} className="text-gold" />
          </div>
          <h2 className="font-serif text-2xl text-cream uppercase tracking-tight mb-3">Bienvenue !</h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Votre espace membre est en cours de préparation. Vous serez notifié dès que les fonctionnalités complètes seront disponibles.
          </p>
          <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
            Explorer la cave <ChevronRight size={14} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-bg min-h-screen pt-28 pb-10 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left — Form */}
          <div>
            <div className="mb-8">
              <span className="section-label mb-3 block">Mon Espace</span>
              <h1 className="font-serif text-4xl text-cream uppercase tracking-tight mb-3">
                Mon <span className="text-gold-gradient italic">Compte</span>
              </h1>
              <p className="text-muted text-sm leading-relaxed">
                Connectez-vous pour accéder à votre historique de commandes, vos Cavacoins et vos avantages membres.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border border-border rounded-xl overflow-hidden mb-8">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.15em] font-bold transition-all ${
                    tab === t.id ? "bg-gold text-bg" : "text-muted hover:text-cream"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleLogin}
                  className="bg-surface border border-border rounded-2xl p-7 space-y-5"
                >
                  <Field label="Adresse email" icon={<Mail size={12} />}>
                    <input
                      type="email"
                      required
                      value={login.email}
                      onChange={setL("email")}
                      placeholder="votre@email.com"
                      className="input-dark"
                    />
                  </Field>
                  <Field label="Mot de passe" icon={<Lock size={12} />}>
                    <PasswordInput
                      value={login.password}
                      onChange={setL("password")}
                      placeholder="••••••••"
                    />
                  </Field>

                  <div className="flex justify-end">
                    <button type="button" className="text-[11px] text-muted hover:text-gold transition-colors uppercase tracking-widest">
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <button type="submit" className="w-full btn-gold py-3.5 justify-center flex">
                    Se connecter
                  </button>

                  <p className="text-center text-xs text-muted">
                    Pas encore de compte ?{" "}
                    <button type="button" onClick={() => setTab("register")} className="text-gold hover:underline">
                      Créer un compte
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleRegister}
                  className="bg-surface border border-border rounded-2xl p-7 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Field label="Prénom">
                      <input
                        type="text"
                        required
                        value={register.prenom}
                        onChange={setR("prenom")}
                        placeholder="Prénom"
                        className="input-dark"
                      />
                    </Field>
                    <Field label="Nom">
                      <input
                        type="text"
                        required
                        value={register.nom}
                        onChange={setR("nom")}
                        placeholder="Nom"
                        className="input-dark"
                      />
                    </Field>
                  </div>

                  <Field label="Email" icon={<Mail size={12} />}>
                    <input
                      type="email"
                      required
                      value={register.email}
                      onChange={setR("email")}
                      placeholder="votre@email.com"
                      className="input-dark"
                    />
                  </Field>

                  <Field label="Mot de passe" icon={<Lock size={12} />}>
                    <PasswordInput
                      value={register.password}
                      onChange={setR("password")}
                      placeholder="8 caractères minimum"
                    />
                  </Field>

                  <Field label="Confirmer le mot de passe">
                    <PasswordInput
                      value={register.confirm}
                      onChange={setR("confirm")}
                      placeholder="Répétez le mot de passe"
                    />
                  </Field>

                  <p className="text-[11px] text-muted leading-relaxed">
                    En créant un compte, vous acceptez nos{" "}
                    <Link href="/terms" className="text-gold hover:underline">conditions d'utilisation</Link>
                    {" "}et notre{" "}
                    <Link href="/privacy" className="text-gold hover:underline">politique de confidentialité</Link>.
                  </p>

                  <button type="submit" className="w-full btn-gold py-3.5 justify-center flex">
                    Créer mon compte
                  </button>

                  <p className="text-center text-xs text-muted">
                    Déjà un compte ?{" "}
                    <button type="button" onClick={() => setTab("login")} className="text-gold hover:underline">
                      Se connecter
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Perks */}
          <div className="lg:pt-24">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-3">Pourquoi créer un compte ?</span>
              <h2 className="font-serif text-2xl text-cream uppercase tracking-tight leading-snug">
                Les avantages <span className="text-gold-gradient italic">membres</span>
              </h2>
            </div>

            <div className="space-y-4 mb-10">
              {PERKS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-surface border border-border rounded-xl p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-sm text-cream font-semibold mb-1">{p.label}</h4>
                    <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cavacoins teaser */}
            <div className="bg-surface border border-gold/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award size={20} className="text-gold" />
                <h4 className="font-serif text-base text-cream uppercase tracking-tight">Programme Cavacoins</h4>
              </div>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Gagnez <span className="text-gold font-semibold">+100 points</span> dès l'inscription, et <span className="text-gold font-semibold">1 point par DT</span> dépensé. Échangez vos points contre des réductions et cadeaux exclusifs.
              </p>
              <Link href="/cavacoins" className="text-[11px] uppercase tracking-widest text-gold hover:underline flex items-center gap-1">
                En savoir plus <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
