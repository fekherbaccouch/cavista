import { ShieldCheck, Truck, GlassWater, Clock } from "lucide-react";

const features = [
  { icon: <Truck size={24} />, title: "Retrait Rapide", desc: "Commandez en ligne, retirez au parking à La Goulette." },
  { icon: <ShieldCheck size={24} />, title: "Staff Pro", desc: "Barman et serveurs qualifiés pour vos événements." },
  { icon: <GlassWater size={24} />, title: "Verrerie Fine", desc: "Location de verres en cristal et matériel de bar." },
  { icon: <Clock size={24} />, title: "Service 24/7", desc: "Réservation d'événements disponible à tout moment." },
];

export default function Features() {
  return (
    <section className="py-20 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
              {f.icon}
            </div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3">{f.title}</h3>
            <p className="text-muted text-[12px] leading-relaxed max-w-[200px] font-light">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}