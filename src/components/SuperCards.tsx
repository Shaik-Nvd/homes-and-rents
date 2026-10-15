import React from 'react';
import { MapPin, Home, Building2, Store, Rocket, Sparkles, CheckCircle2, Hammer, Repeat } from 'lucide-react';

export type SuperCardCategory = 
  | 'Location' 
  | '2 BHK' 
  | '3 BHK' 
  | '4 BHK' 
  | 'New Launch' 
  | 'Pre Launch' 
  | 'Ready to Move' 
  | 'Under Construction' 
  | 'Lands' 
  | 'Re-Sell' 
  | 'Shops' 
  | 'All';

interface SuperCardsProps {
  selectedCategory: SuperCardCategory;
  onSelectCategory: (category: SuperCardCategory) => void;
}

const CATEGORIES = [
  { id: 'Location', label: 'Location', icon: MapPin, color: 'text-red-500', bg: 'bg-red-50' },
  { id: '2 BHK', label: '2 BHK', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: '3 BHK', label: '3 BHK', icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: '4 BHK', label: '4 BHK', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'New Launch', label: 'New Launch', icon: Rocket, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'Pre Launch', label: 'Pre Launch', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 'Ready to Move', label: 'Ready to Move', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'Under Construction', label: 'Under Construction', icon: Hammer, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'Lands', label: 'Lands', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'Re-Sell', label: 'Re-Sell', icon: Repeat, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 'Shops', label: 'Shops', icon: Store, color: 'text-amber-500', bg: 'bg-amber-50' },
] as const;

export const SuperCards: React.FC<SuperCardsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-4 sm:py-6 px-1 sm:px-4 w-full">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-y-4 gap-x-2 sm:gap-6 justify-items-center max-w-4xl mx-auto">
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
