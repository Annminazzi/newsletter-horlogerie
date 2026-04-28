import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import type { Article } from '../data/mockData';

interface FeedItemProps {
  article: Article;
  index: number;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ article, index, isSaved, onToggleSave }) => {
  const isEven = index % 2 === 0;
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop'; // Macro shot of watch mechanism

  return (
    <article className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-24 border-b border-gray-100 last:border-0 group">
      {/* Image Container */}
      <div
        className={clsx(
          "w-full md:w-1/2 overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-square",
          isEven ? "md:order-1" : "md:order-2"
        )}
      >
        <img
          src={article.imageURL || FALLBACK_IMAGE}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // Prevent infinite loop if fallback also fails
            target.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* Content Container */}
      <div
        className={clsx(
          "w-full md:w-1/2 flex flex-col justify-center",
          isEven ? "md:order-2" : "md:order-1"
        )}
      >
        <div className="flex flex-col mb-4">
          <span className="text-[var(--color-gold)] text-xs font-sans font-semibold tracking-widest uppercase mb-2">
            {article.category} • {article.type}
          </span>
          <span className="text-xs text-gray-400 font-sans tracking-wide">
            {new Date(article.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-charcoal)] mb-6 leading-tight">
          {article.title}
        </h2>

        <p className="text-gray-500 font-sans text-base md:text-lg leading-relaxed mb-8 font-light">
          {article.summary}
        </p>

        <div className="flex items-center space-x-6">
          <a
            href={article.sourceURL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center px-6 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] font-sans text-sm uppercase tracking-wider hover:bg-[var(--color-gold)] hover:text-white transition-colors duration-300"
          >
            Learn More
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>

          <button
            onClick={() => onToggleSave(article.id)}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none"
            aria-label={isSaved ? "Remove from archives" : "Save to archives"}
          >
            <Bookmark
              className={clsx(
                "w-5 h-5 transition-colors duration-300",
                isSaved ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-gray-400"
              )}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
