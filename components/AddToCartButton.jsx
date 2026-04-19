"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-12">
      <div className="flex items-center border border-border bg-surface h-14 rounded-xl overflow-hidden">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 h-full hover:text-gold transition-colors">—</button>
        <span className="w-12 text-center font-medium border-x border-border">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="px-6 h-full hover:text-gold transition-colors">+</button>
      </div>

      <button
        onClick={() => addToCart(product, quantity)}
        className="btn-gold flex-1 h-14 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-xs"
      >
        Ajouter au Panier
      </button>
    </div>
  );
}