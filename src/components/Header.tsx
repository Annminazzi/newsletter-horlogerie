import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const currentDate = format(new Date(), 'EEEE d MMMM yyyy', { locale: fr });
  const formattedDate = currentDate.toUpperCase();

  return (
    <header className="w-full pt-20 pb-16 px-6 flex flex-col items-center justify-center text-center bg-[#0d0d0d] relative overflow-hidden">
      {/* Subtle bottom gradient for blending if needed */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#0d0d0d]/80 pointer-events-none"></div>

      {/* Top Edition Text with Diamonds */}
      <div className="flex items-center space-x-4 text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-8 font-sans font-medium">
        <div className="w-2 h-2 bg-[var(--color-gold)] rotate-45"></div>
        <span>The Collector's Edition</span>
        <div className="w-2 h-2 bg-[var(--color-gold)] rotate-45"></div>
      </div>
      
      {/* Main Title */}
      <h1 className="flex flex-col items-center mb-6">
        <span className="text-4xl md:text-5xl font-serif text-white tracking-normal font-bold mb-1">
          The Watch Collector's
        </span>
        <span className="text-4xl md:text-5xl font-serif text-[var(--color-gold)] italic">
          Journal
        </span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-gray-400 font-sans text-base md:text-lg max-w-2xl font-light mb-10 tracking-wide">
        L'essentiel de l'horlogerie, une fois par mois.
      </p>

      {/* Date Box */}
      <div className="flex items-center space-x-3 border border-[var(--color-gold)]/40 px-6 py-3 rounded-sm text-[var(--color-gold)]/80">
        <Clock className="w-4 h-4" />
        <span className="text-xs tracking-[0.15em] font-sans font-light">
          {formattedDate}
        </span>
      </div>
    </header>
  );
};
