import { categories } from "@/lib/data";
import Link from "next/link";

export default function CategorySection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif">Parcourir par Univers</h2>
          <div className="h-[2px] w-16 bg-gold mt-4" />
        </div>
        <p className="text-muted text-sm max-w-xs italic">
          Du malt écossais aux crus locaux, trouvez la pièce maîtresse de votre bar.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/shop?cat=${cat.id}`}
            className="group relative h-[180px] bg-surface border border-border flex flex-col items-center justify-center transition-all duration-500 hover:border-gold"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-500">
              {cat.icon}
            </span>
            <span className="text-[11px] uppercase tracking-widest font-medium">
              {cat.label}
            </span>
            {/* Hover visual effect (No shadow per rules, using border/opacity) */}
            <div className="absolute inset-x-4 bottom-4 h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        ))}
      </div>
    </section>
  );
}