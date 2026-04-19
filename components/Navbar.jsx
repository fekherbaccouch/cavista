"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Search, User, Menu, X, ChevronDown,
  MapPin, Phone, Award,
} from "lucide-react";
import SearchModal from "@/components/SearchModal";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Événementiel", href: "/events" },
  { label: "Cocktails",    href: "/cocktails" },
  { label: "Accessoires",  href: "/accessories" },
  { label: "Blog",         href: "/blog" },
];

const MEGA_CATEGORIES = [
  { id: "bieres",    label: "Bières",     icon: "🍺", href: "/shop?cat=bieres" },
  { id: "vins",      label: "Vins",       icon: "🍷", href: "/shop?cat=vins" },
  { id: "whisky",    label: "Whiskies",   icon: "🥃", href: "/shop?cat=whisky" },
  { id: "vodka",     label: "Vodka",      icon: "🫙", href: "/shop?cat=vodka" },
  { id: "gin",       label: "Gin",        icon: "🌿", href: "/shop?cat=gin" },
  { id: "rhum",      label: "Rhum",       icon: "🏝️",  href: "/shop?cat=rhum" },
  { id: "tequila",   label: "Tequila",    icon: "🌵", href: "/shop?cat=tequila" },
  { id: "cocktails", label: "Cocktails",  icon: "🍹", href: "/shop?cat=cocktails" },
];

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const megaTimer = useRef(null);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, []);

  /* mega-menu hover with delay so it doesn't flicker */
  const handleMegaEnter = () => {
    clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 h-auto p-4 ${
          scrolled ? "bg-bg/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]" : "bg-bg/80 backdrop-blur-sm"
        }`}
      >
        {/* ── TOP INFO BAR (desktop only) ── */}
        <div className="hidden md:block border-b border-border/60 bg-surface/40">
          <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted text-[11px] uppercase tracking-[0.12em]">
              <MapPin size={10} className="text-gold" />
              Retrait parking &amp; en magasin · 19 Av. F. Roosevelt, La Goulette
            </div>
            <div className="flex items-center gap-6">
              <a
                href="tel:+21650705128"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted hover:text-gold transition-colors"
              >
                <Phone size={10} />
                +216 50 705 128
              </a>
              <button className="text-[11px] uppercase tracking-[0.12em] text-muted hover:text-gold transition-colors font-medium">
                FR / EN
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <div className="max-w-7xl mx-auto px-6 h-auto w-full flex items-center justify-between gap-8">

          {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.webp"
            alt="Cavista Logo"
            className="w-28 sm:w-32 md:w-40 h-auto object-contain transition-all duration-300 mix-blend-multiply"
          />
        </Link>

          {/* Center links — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Shop with mega-menu */}
            <div
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <button className="nav-link flex items-center gap-1 py-2">
                Boutique
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[min(520px,calc(100vw-2rem))] p-6"
                  >
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {MEGA_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={cat.href}
                          onClick={() => setMegaOpen(false)}
                          className="flex flex-col items-center gap-1.5 p-3 rounded border border-transparent hover:border-border hover:bg-surface2 transition-all group"
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-[11px] uppercase tracking-wider text-muted group-hover:text-gold transition-colors font-medium">
                            {cat.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="gold-line mb-4" />
                    <Link
                      href="/accessories"
                      onClick={() => setMegaOpen(false)}
                      className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted hover:text-gold transition-colors font-medium"
                    >
                      <span>🍸</span> Accessoires Bar →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link py-2">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-muted hover:text-gold transition-colors"
              aria-label="Rechercher"
            >
              <Search size={17} />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Account */}
            <Link href="/account" className="text-muted hover:text-gold transition-colors hidden md:block" aria-label="Mon compte">
              <User size={17} />
            </Link>

            {/* Cavacoins */}
            <Link
              href="/cavacoins"
              className="hidden md:flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
            >
              <Award size={15} className="text-gold" />
              <span className="text-[11px] uppercase tracking-[0.1em] font-medium">0 pts</span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 text-muted hover:text-gold transition-colors group"
              aria-label="Panier"
            >
              <ShoppingBag size={17} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                    itemCount > 0 ? "bg-gold text-bg" : "bg-border2 text-muted"
                  }`}
                >
                  {itemCount}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-muted hover:text-gold transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border bg-surface"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold mb-3">Boutique</div>
                {MEGA_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-sm text-muted hover:text-gold transition-colors"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
                <div className="gold-line my-3" />
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-sm text-muted hover:text-gold transition-colors uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="gold-line my-3" />
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted">
                  <MapPin size={10} className="text-gold" />
                  La Goulette, Tunis
                </div>
                <a
                  href="https://wa.me/21650705128"
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted hover:text-gold transition-colors mt-1"
                >
                  <Phone size={10} />
                  +216 50 705 128
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
