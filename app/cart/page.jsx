"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();

  const updateQuantity = (item, delta) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart(item, delta);
    }
  };

  return (
    <main className="pt-28 pb-12 md:pb-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <span className="section-label mb-3 block">Mon Panier</span>
          <h1 className="font-serif text-4xl uppercase tracking-tight text-cream mb-4">Votre Sélection</h1>
          <div className="gold-line w-20" />
        </header>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center border border-dashed border-border rounded-2xl"
          >
            <ShoppingBag size={44} className="text-border2 mx-auto mb-5" />
            <p className="text-muted text-sm mb-8">Votre panier est actuellement vide.</p>
            <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
              Explorer la cave <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

            {/* Items list */}
            <div className="lg:col-span-8">
              <div className="border-t border-border">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      className="flex items-center gap-5 py-7 border-b border-border group"
                    >
                      {/* Image */}
                      <div className="w-20 h-28 bg-surface shrink-0 overflow-hidden border border-border rounded-xl">
                        <img
                          src={item.image || item.img}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold block mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base text-cream mb-1 line-clamp-2">{item.name}</h3>
                        {item.volume && (
                          <p className="text-xs text-muted mb-3">{item.volume}</p>
                        )}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-muted2 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={12} /> Supprimer
                        </button>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
                        <button
                          onClick={() => updateQuantity(item, -1)}
                          className="w-8 h-9 flex items-center justify-center text-muted hover:text-gold hover:bg-surface2 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-10 h-9 flex items-center justify-center text-cream text-sm font-medium border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item, 1)}
                          className="w-8 h-9 flex items-center justify-center text-muted hover:text-gold hover:bg-surface2 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="w-28 text-right shrink-0">
                        <p className="text-gold font-semibold text-sm">
                          {(item.price * item.quantity).toFixed(3)} DT
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-muted mt-0.5">{item.price} DT / u.</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/shop"
                  className="btn-outline text-xs inline-flex items-center gap-2"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="bg-surface border border-border rounded-2xl p-5 md:p-7 sticky top-28 md:top-36">
                <h2 className="text-xs uppercase tracking-[0.3em] mb-7 font-bold text-gold">Résumé de commande</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs text-muted uppercase tracking-widest">
                    <span>Sous-total</span>
                    <span className="text-cream">{cartTotal.toFixed(3)} DT</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted uppercase tracking-widest">
                    <span>Articles</span>
                    <span className="text-cream">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted uppercase tracking-widest">
                    <span>Retrait</span>
                    <span className="text-green-400 font-semibold text-[11px]">Gratuit</span>
                  </div>
                </div>

                <div className="gold-line mb-5" />

                <div className="flex justify-between items-baseline mb-7">
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-muted">Total</span>
                  <span className="font-serif text-2xl text-gold">{cartTotal.toFixed(3)} DT</span>
                </div>

                <Link
                  href="/checkout"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3.5"
                >
                  Procéder au paiement <ArrowRight size={14} />
                </Link>

                <p className="text-[11px] text-center text-muted mt-5 uppercase tracking-widest leading-relaxed">
                  Paiement à la livraison disponible<br />sur toute la Tunisie.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
