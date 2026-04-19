"use client";
import { useState, useEffect } from "react";
import { Wine } from "lucide-react";

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("cavista_age");
    if (!isVerified) setShow(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("cavista_age", "1");
    setShow(false);
  };

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // This protocol attempts to force Safari on iOS/macOS
    const safariUrl = "safari-https://www.google.com";
    const defaultUrl = "https://www.google.com";

    // Attempt to redirect to Safari
    window.location.href = safariUrl;

    // Fallback: If the protocol isn't supported, 
    // it will navigate to the default browser URL after a short delay
    setTimeout(() => {
      window.location.href = defaultUrl;
    }, 500);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#040404f7] backdrop-blur-md flex items-center justify-center p-4">
      {/* Container with border only - no shadows applied */}
      <div className="max-w-[420px] w-full bg-surface border border-border p-10 text-center">
        {/* Pulsing Icon */}
        <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-6 coin-pulse">
          <Wine className="text-gold" size={28} />
        </div>
        
        <h2 className="text-2xl mb-2">Bienvenue chez Cavista</h2>
        <div className="h-[1px] w-12 bg-gold mx-auto mb-6" />
        
        <p className="text-muted text-sm mb-8 leading-relaxed">
          Vous devez avoir au moins 18 ans pour accéder à notre cave premium et nos services événementiels.
        </p>

        <button 
          onClick={handleConfirm} 
          className="btn-gold w-full mb-4 cursor-pointer"
        >
          J'ai 18 ans ou plus — Entrer
        </button>

        <button 
          onClick={handleExit} 
          className="block w-full text-[0.7rem] uppercase tracking-widest text-muted hover:text-red transition-colors bg-transparent border-none cursor-pointer"
        >
          Je suis mineur — Quitter
        </button>

        <p className="mt-12 text-[10px] text-muted2 leading-tight uppercase tracking-tighter">
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </div>
  );
}