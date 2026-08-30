import React from 'react';
import { EventCategory } from '../types';

interface CategoryFiltersProps {
  selectedCategory: EventCategory | 'all';
  onSelectCategory: (cat: EventCategory | 'all') => void;
  counts: Record<EventCategory | 'all', number>;
}

interface FilterOption {
  id: EventCategory | 'all';
  label: string;
  emoji: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All Activities', emoji: '📋' },
  { id: 'sports', label: 'Sports', emoji: '🏃' },
  { id: 'workshops', label: 'Workshops', emoji: '🛠️' },
  { id: 'competitions', label: 'Competitions', emoji: '🏆' },
  { id: 'clubs', label: 'Clubs', emoji: '🎭' },
];

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div id="category-filters-container" className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DEDACE]">
        <div className="flex items-center gap-2">
          <span className="mono-font text-xs uppercase tracking-wider text-[#6B6F66] font-semibold">
            Browse by category:
          </span>
        </div>
        <span className="mono-font text-xs text-[#6B6F66]">
          Showing: <strong className="text-[#21261F]">{counts[selectedCategory]} events</strong>
        </span>
      </div>

      {/* Pill Filters */}
      <div 
        id="category-pills"
        className="flex flex-wrap items-center gap-2.5 pt-3"
      >
        {FILTER_OPTIONS.map((opt) => {
          const isSelected = selectedCategory === opt.id;
          const count = counts[opt.id] ?? 0;

          return (
            <button
              key={opt.id}
              id={`filter-pill-${opt.id}`}
              onClick={() => onSelectCategory(opt.id)}
              className={`filter-pill ${isSelected ? 'filter-pill-active' : ''}`}
            >
              <span className="text-sm">{opt.emoji}</span>
              <span className="font-medium">{opt.label}</span>
              <span 
                className={`text-[10px] mono-font px-1.5 py-0.5 rounded-[4px] ${
                  isSelected ? 'bg-[#FFFFFF]/20 text-[#FFFFFF]' : 'bg-[#F7F5EF] text-[#6B6F66] border border-[#DEDACE]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
