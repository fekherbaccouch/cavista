import Link from "next/link";

const SHOP_LINKS = [
  { label: "Bières",      href: "/shop?cat=bieres" },
  { label: "Vins",        href: "/shop?cat=vins" },
  { label: "Whiskies",    href: "/shop?cat=whisky" },
  { label: "Vodka",       href: "/shop?cat=vodka" },
  { label: "Gin",         href: "/shop?cat=gin" },
  { label: "Rhum",        href: "/shop?cat=rhum" },
  { label: "Cocktails",   href: "/shop?cat=cocktails" },
  { label: "Accessoires", href: "/accessories" },
];

const SERVICE_LINKS = [
  { label: "Bar & Événementiel",  href: "/events" },
  { label: "Nos Cocktailistes",   href: "/cocktails#cocktailistes" },
  { label: "Kémia & Tapas",       href: "/cocktails#kemia" },
  { label: "Demande de devis",    href: "/events/devis" },
  { label: "Réserver une date",   href: "/events/booking" },
  { label: "Programme Cavacoins", href: "/cavacoins" },
  { label: "Parrainage",          href: "/cavacoins#parrainage" },
];

const INFO_LINKS = [
  { label: "À propos",          href: "/about" },
  { label: "Blog",              href: "/blog" },
  { label: "FAQ",               href: "/faq" },
  { label: "Conditions d'utilisation", href: "/terms" },
  { label: "Politique de confidentialité", href: "/privacy" },
  { label: "Contact",           href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-border">
      <div className="gold-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-8 md:pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 mb-10 md:mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-7 lg:col-span-1">
            <Link href="/" className="flex items-center w-fit">
              <img src="/logo.webp" alt="Cavista" className="h-10 w-auto object-contain" />
            </Link>

            <p className="text-muted text-sm leading-relaxed font-light max-w-[260px]">
              L'excellence du service caviste et événementiel en Tunisie. Une sélection rigoureuse pour vos moments d'exception.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted">
                <span className="text-xs leading-relaxed">19 Avenue Francklin Roosevelt<br />La Goulette, Tunis — CP 2060</span>
              </div>
              <a href="tel:+21650705128" className="flex items-center gap-2 text-muted hover:text-gold transition-colors">
                <span className="text-xs">+216 50 705 128</span>
              </a>
              <a href="mailto:contact@cavistastore.com" className="flex items-center gap-2 text-muted hover:text-gold transition-colors">
                <span className="text-xs">contact@cavistastore.com</span>
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all">
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted hover:border-gold hover:text-gold transition-all">
              </a>
              <a
                href="https://wa.me/21650705128"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted hover:border-[#25D366] hover:text-[#25D366] transition-all text-xs font-bold"
              >
                WA
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-7 font-bold">Boutique</h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-gold transition-colors font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-7 font-bold">Services</h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-gold transition-colors font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-7 font-bold">Informations</h4>
            <ul className="space-y-3">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-gold transition-colors font-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <div className="mt-8 p-4 border border-border rounded-xl bg-surface">
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted mb-3">Commandez directement</p>
              <a
                href="https://wa.me/21650705128"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#25D366] hover:opacity-80 transition-opacity"
              >
                <span className="text-base">💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-muted2 uppercase tracking-[0.3em]">
            © {year} Cavista Tunisia. Tous droits réservés.
          </p>

          <p className="text-[9px] text-muted2 uppercase tracking-[0.2em] text-center">
            Paiement sécurisé · Retrait La Goulette
          </p>

          <p className="text-[9px] text-muted2 uppercase italic tracking-widest opacity-50 text-right">
            L'abus d'alcool est dangereux pour la santé.
          </p>
        </div>
      </div>
    </footer>
  );
}
