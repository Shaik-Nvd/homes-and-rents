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
    <div className="py-4 sm:py-6 px-1 sm:px-4 w-full">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as SuperCardCategory)}
              className={`group flex flex-col items-center justify-start gap-1.5 sm:gap-3 transition-all duration-300 w-full max-w-[76px] sm:max-w-[96px] ${
                isSelected ? 'scale-105' : 'hover:-translate-y-1'
              }`}
            >
              <div
                className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[1.1rem] sm:rounded-[1.5rem] flex items-center justify-center transition-all duration-300 border-[2px] relative overflow-hidden ${
                  isSelected
                    ? `border-indigo-500 shadow-[0_8px_20px_rgba(99,102,241,0.25)] ${cat.bg}`
                    : `border-white/60 ${cat.bg} shadow-sm group-hover:shadow-md`
                }`}
              >
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent pointer-events-none"></div>
                
                <Icon
                  strokeWidth={isSelected ? 2.5 : 2}
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors relative z-10 ${
                    isSelected ? 'text-indigo-600' : cat.color
                  } group-hover:scale-110 duration-300`}
                />
              </div>
              <span
                className={`text-[10px] sm:text-[13px] font-extrabold text-center leading-tight tracking-tight ${
                  isSelected ? 'text-indigo-700 drop-shadow-sm' : 'text-gray-700 group-hover:text-gray-900'
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
