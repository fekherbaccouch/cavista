export default function Newsletter() {
  return (
    <section className="py-24 border-y border-border bg-surface">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4 block">
          Privilèges Cavista
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mb-6">Restez Informé</h2>
        <p className="text-muted text-sm md:text-base mb-10 tracking-wide max-w-lg mx-auto leading-relaxed">
          Inscrivez-vous pour recevoir nos nouveaux arrivages de spiritueux et nos offres événementielles exclusives à Tunis.
        </p>

        {/* Minimalist Form - No Shadows, High Contrast Border */}
        <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-border group focus-within:border-gold transition-colors duration-500">
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            required
            className="flex-1 bg-transparent px-6 py-4 text-sm text-cream placeholder:text-muted2 focus:outline-none"
          />
          <button 
            type="submit"
            className="btn-gold !p-4 !text-[10px] sm:w-40 border-l border-border hover:border-gold-light"
          >
            S'abonner
          </button>
        </form>

        <p className="mt-6 text-[9px] text-muted2 uppercase tracking-widest">
          Discrétion garantie · Pas de spam
        </p>
      </div>
    </section>
  );
}