import React from 'react';
import { Building2, Rocket, Sparkles, CheckCircle2, Hammer, Repeat, PlusSquare } from 'lucide-react';

export type SuperCardCategory = 
  | 'Pre Launch' 
  | 'New Launch' 
  | 'Ready to Move' 
  | 'Under Construction' 
  | 'Plots & Lands' 
  | 'Resale Properties' 
  | 'Commercial' 
  | 'All';

interface SuperCardsProps {
  selectedCategory: SuperCardCategory;
  onSelectCategory: (category: SuperCardCategory) => void;
}

const CATEGORIES = [
  { id: 'Pre Launch', label: 'Pre Launch', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 'New Launch', label: 'New Launch', icon: Rocket, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'Ready to Move', label: 'Ready to Move', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'Under Construction', label: 'Under Construction', icon: Hammer, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'Plots & Lands', label: 'Plots & Lands', icon: PlusSquare, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'Resale Properties', label: 'Resale Properties', icon: Repeat, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'Commercial', label: 'Commercial', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
] as const;

export const SuperCards: React.FC<SuperCardsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-3 sm:py-5 px-1 sm:px-2 w-full">
      {/* 
        Responsive layout:
        - Mobile/Tablet (< md): smooth horizontal swipe with snap alignment so all 7 icons are accessible and perfectly spaced without awkward 5 + 2 wrapping.
        - Desktop (>= md): grid-cols-7 or flex justify-between so all 7 items sit evenly in a single balanced row.
      */}
      <div className="flex md:grid md:grid-cols-7 items-start justify-start md:justify-items-center gap-3 sm:gap-4 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-2 py-1 max-w-5xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as SuperCardCategory)}
              className={`group flex flex-col items-center justify-start gap-1.5 sm:gap-2 transition-all duration-300 flex-shrink-0 w-[72px] sm:w-[84px] md:w-full max-w-[100px] snap-center cursor-pointer ${
                isSelected ? 'scale-105' : 'hover:-translate-y-1'
              }`}
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-[1.1rem] sm:rounded-[1.4rem] flex items-center justify-center transition-all duration-300 border-[2px] relative overflow-hidden ${
                  isSelected
                    ? `border-indigo-500 shadow-[0_8px_20px_rgba(99,102,241,0.25)] ${cat.bg}`
                    : `border-white/80 ${cat.bg} shadow-sm group-hover:shadow-md group-hover:border-white`
                }`}
              >
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent pointer-events-none"></div>
                
                <Icon
                  strokeWidth={isSelected ? 2.5 : 2}
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors relative z-10 ${
                    isSelected ? 'text-indigo-600' : cat.color
                  } group-hover:scale-110 duration-300`}
                />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] md:text-[12px] font-extrabold text-center leading-tight tracking-tight line-clamp-2 px-0.5 ${
                  isSelected ? 'text-indigo-700 drop-shadow-sm font-black' : 'text-gray-700 group-hover:text-gray-900'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
