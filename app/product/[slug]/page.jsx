import { products, formatPrice } from "@/lib/data";
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck, RotateCcw, Star } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-bg text-cream px-6 text-center">
        <h1 className="font-serif text-3xl mb-4 text-gold uppercase tracking-tighter">Produit Introuvable</h1>
        <p className="text-muted text-sm mb-8">
          Le produit <span className="text-gold">"{slug}"</span> n'existe pas dans notre cave.
        </p>
        <Link href="/shop" className="btn-outline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-bg pt-28 pb-10 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-xs uppercase tracking-[0.2em] mb-12 w-fit"
        >
          <ChevronLeft size={14} /> Retour à la sélection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Product Image */}
          <div className="bg-surface border border-border rounded-2xl aspect-square overflow-hidden flex items-center justify-center p-10 relative">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                {product.badge === "promo" && discount ? (
                  <span className="badge-promo">-{discount}%</span>
                ) : product.badge === "new" ? (
                  <span className="badge-new">Nouveau</span>
                ) : null}
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-1000 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            {/* Category + brand */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] text-gold uppercase tracking-[0.3em] font-bold">
                {product.category}
              </span>
              {product.brand && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border2 block" />
                  <span className="text-[11px] text-muted uppercase tracking-wider">{product.brand}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-5 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={13}
                      className={n <= Math.floor(product.rating) ? "fill-gold text-gold" : "text-border2"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gold font-semibold">{product.rating}</span>
                {product.reviews && (
                  <span className="text-xs text-muted">({product.reviews} avis)</span>
                )}
              </div>
            )}

            {/* Price block */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-border">
              <span className="font-serif text-4xl text-gold">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-muted text-lg line-through">{formatPrice(product.oldPrice)}</span>
              )}
              {product.volume && (
                <>
                  <div className="h-6 w-[1px] bg-border mx-1" />
                  <span className="text-muted text-sm uppercase tracking-widest">{product.volume}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted leading-relaxed mb-10 text-sm max-w-md">
              {product.description}
            </p>

            <AddToCartButton product={product} />

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 md:pt-8 border-t border-border mt-6 md:mt-8">
              {[
                { icon: <Truck size={16} className="text-gold" />, label: "Retrait Express" },
                { icon: <ShieldCheck size={16} className="text-gold" />, label: "100% Authentique" },
                { icon: <RotateCcw size={16} className="text-gold" />, label: "Conciergerie" },
              ].map((g) => (
                <div key={g.label} className="flex flex-col items-center gap-2 text-center bg-surface rounded-xl p-3 border border-border">
                  {g.icon}
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted font-medium">{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related section placeholder */}
        <div className="mt-20">
          <div className="gold-line mb-12" />
          <div className="text-center mb-10">
            <span className="section-label mb-3 block mx-auto w-fit">Notre Sélection</span>
            <h2 className="font-serif text-3xl text-cream uppercase tracking-tight">
              D'autres produits <span className="text-gold-gradient italic">similaires</span>
            </h2>
          </div>
          <div className="text-center">
            <Link href={`/shop?cat=${product.category.toLowerCase()}`} className="btn-outline inline-flex items-center gap-2">
              Voir toute la catégorie {product.category} <ShoppingBag size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
