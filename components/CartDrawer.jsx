"use client";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    addToCart,
    cartTotal,
  } = useCart();

  const updateQty = (item, delta) => {
    if (item.quantity + delta <= 0) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item }, delta);
    }
  };

  const handleWhatsApp = () => {
    const lines = cartItems
      .map((i) => `- ${i.quantity}x ${i.name} (${i.price * i.quantity} DT)`)
      .join("%0A");
    const msg = `Bonjour Cavista!%0A%0AJe souhaite commander:%0A${lines}%0A%0ATotal: ${cartTotal} DT`;
    window.open(`https://wa.me/21650705128?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative w-full max-w-md bg-surface border-l border-border h-full flex flex-col"
          >
            {/* Header */}
            <div className="px-7 py-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={16} className="text-gold" />
                <h2 className="font-serif text-base uppercase tracking-widest text-cream">
                  Mon Panier
                </h2>
                {cartItems.length > 0 && (
                  <span className="text-[9px] font-bold bg-gold text-bg px-2 py-0.5 rounded-full">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-muted hover:text-cream transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-20">
                  <ShoppingBag size={40} className="text-border2" />
                  <p className="text-muted text-sm">Votre panier est vide.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-outline text-[10px] px-6 py-2.5"
                  >
                    Explorer la cave
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 pb-5 border-b border-border last:border-0 last:pb-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-[72px] h-[88px] shrink-0 border border-border rounded-lg overflow-hidden bg-surface2">
                      <img
                        src={item.image || item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        {item.category && (
                          <span className="text-[11px] uppercase tracking-wider text-gold font-semibold">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-serif text-sm text-cream leading-tight line-clamp-2 mt-0.5">
                          {item.name}
                        </h3>
                        {item.volume && (
                          <p className="text-xs text-muted mt-0.5">{item.volume}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty stepper */}
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item, -1)}
                            className="w-7 h-7 flex items-center justify-center text-muted hover:text-gold hover:bg-surface2 transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center text-cream text-xs border-x border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item, 1)}
                            className="w-7 h-7 flex items-center justify-center text-muted hover:text-gold hover:bg-surface2 transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        {/* Price + remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-gold text-sm font-medium">
                            {(item.price * item.quantity).toFixed(3)} DT
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted2 hover:text-red transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-7 py-5 border-t border-border bg-bg space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-widest text-muted">Sous-total</span>
                  <span className="text-cream font-medium">{cartTotal.toFixed(3)} DT</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-widest text-muted">Retrait</span>
                  <span className="text-green text-[10px] uppercase tracking-wider font-medium">Gratuit</span>
                </div>

                <div className="gold-line" />

                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest text-muted">Total</span>
                  <span className="font-serif text-xl text-gold">{cartTotal.toFixed(3)} DT</span>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-outline w-full text-[10px] py-3 justify-center"
                  >
                    Voir le panier
                  </Link>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 text-[10px] uppercase tracking-[0.2em] font-bold bg-[#25D366] text-bg rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span className="text-sm">💬</span> Commander via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
