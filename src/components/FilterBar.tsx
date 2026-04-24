import React from 'react';
import { motion } from 'framer-motion';
import { Watch, Newspaper, Play, Bookmark, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type FilterType = 'Tous' | 'Publications' | 'Vidéos' | 'Archives' | 'Sources';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { id: FilterType; icon: React.ElementType; label: string }[] = [
  { id: 'Tous', icon: Watch, label: 'Tous' },
  { id: 'Publications', icon: Newspaper, label: 'Publications' },
  { id: 'Vidéos', icon: Play, label: 'Vidéos' },
  { id: 'Archives', icon: Bookmark, label: 'Archives' },
  { id: 'Sources', icon: LinkIcon, label: 'Sources' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="w-full py-8 overflow-x-auto no-scrollbar border-b border-gray-100 flex justify-start md:justify-center px-4">
      <div className="flex space-x-6 md:space-x-12 min-w-max">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="relative mb-3">
                <div
                  className={twMerge(
                    clsx(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300",
                      isActive ? "bg-white" : "bg-gray-50 group-hover:bg-gray-100"
                    )
                  )}
                >
                  <Icon
                    className={clsx(
                      "w-6 h-6 transition-colors duration-300",
                      isActive ? "text-[var(--color-gold)]" : "text-gray-400 group-hover:text-gray-600"
                    )}
                  />
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 rounded-full border border-[var(--color-gold)] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={clsx(
                  "text-xs font-sans tracking-wide uppercase transition-colors duration-300",
                  isActive ? "text-[var(--color-gold)] font-medium" : "text-gray-400"
                )}
              >
                {filter.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
