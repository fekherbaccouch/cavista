"use client";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div className="pt-40 text-center uppercase tracking-widest">Produit Introuvable</div>;

  return (
    <main className="pt-32 pb-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-12 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-gold transition-colors flex items-center gap-2"
        >
          ← Retour à la Cave
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[3/4] bg-surface border border-border overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">
              {product.category} — {product.origin}
            </span>
            
            <h1 className="font-serif text-4xl lg:text-6xl uppercase tracking-tighter mb-6 leading-none">
              {product.name}
            </h1>

            <p className="text-2xl text-cream font-light mb-8">
              {product.price} DT
            </p>

            <div className="max-w-md text-muted text-sm leading-relaxed mb-12 font-light">
              Une sélection rigoureuse pour les connaisseurs. Ce flacon incarne l'excellence de notre cave, offrant des notes complexes et une finale d'une élégance rare.
            </div>

            {/* Add to Cart Component we made earlier */}
            <AddToCartButton product={product} />

            {/* Technical Specs Accordion (Minimalist) */}
            <div className="border-t border-border pt-8 space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest py-2">
                <span className="text-muted">Provenance</span>
                <span className="text-cream">{product.origin}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest py-2">
                <span className="text-muted">Disponibilité</span>
                <span className="text-gold">En Stock (Tunis)</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest py-2">
                <span className="text-muted">Livraison</span>
                <span className="text-cream">24h - 48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}