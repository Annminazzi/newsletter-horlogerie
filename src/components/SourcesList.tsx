import React from 'react';
import { ExternalLink } from 'lucide-react';

const sources = [
  { name: 'HODINKEE', url: 'https://hodinkee.com', description: 'Editorial content & shop' },
  { name: 'Monochrome Watches', url: 'https://monochrome-watches.com', description: 'Dedicated to fine watches' },
  { name: 'The Watches TV', url: 'https://thewatchestv.com', description: 'Video channel on horology' },
  { name: 'A Collected Man', url: 'https://acollectedman.com', description: 'Curated rare timepieces' },
  { name: 'Revolution Watch', url: 'https://revolutionwatch.com', description: 'Celebrating mechanical watches' },
];

export const SourcesList: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-serif text-[var(--color-charcoal)] mb-8 tracking-tight">
        Nos Sources de Confiance
      </h2>
      <div className="flex flex-col gap-6">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row md:items-center justify-between p-8 border border-gray-100 hover:border-[var(--color-gold)] transition-colors duration-300 bg-white"
          >
            <div>
              <h3 className="text-2xl font-serif text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                {source.name}
              </h3>
              <p className="text-gray-500 font-sans text-sm font-light">
                {source.description}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center text-[var(--color-gold)] font-sans text-sm uppercase tracking-wider">
              Visiter
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
