import React from 'react';
import { MapPin, Home, Building2, Store, ArrowRight, Building, PlusSquare } from 'lucide-react';

export type SuperCardCategory = 'Location' | '2 BHK' | '3 BHK' | '4 BHK' | '5 BHK' | 'Lands' | 'Plots' | 'Shops' | 'Offices' | 'All';

interface SuperCardsProps {
  selectedCategory: SuperCardCategory;
  onSelectCategory: (category: SuperCardCategory) => void;
}

const CATEGORIES = [
  { id: 'Location', label: 'Location', icon: MapPin, color: 'text-red-500', bg: 'bg-red-50' },
  { id: '2 BHK', label: '2 BHK', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: '3 BHK', label: '3 BHK', icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: '4 BHK', label: '4 BHK', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: '5 BHK', label: '5 BHK', icon: Building2, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 'Lands', label: 'Lands', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'Plots', label: 'Plots', icon: PlusSquare, color: 'text-teal-500', bg: 'bg-teal-50' },
  { id: 'Shops', label: 'Shops', icon: Store, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'Offices', label: 'Offices', icon: Building, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'All', label: 'View All', icon: ArrowRight, color: 'text-gray-600', bg: 'bg-gray-100' },
] as const;

export const SuperCards: React.FC<SuperCardsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 w-full overflow-x-auto no-scrollbar">
      <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-10 gap-4 sm:gap-6 min-w-max sm:min-w-0">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as SuperCardCategory)}
              className={`flex flex-col items-center justify-start gap-2 sm:gap-3 transition-all transform hover:-translate-y-1 w-20 sm:w-auto ${
                isSelected ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-sm transition-all border-[3px] relative overflow-hidden ${
                  isSelected
                    ? `border-indigo-500 shadow-md ${cat.bg}`
                    : `border-transparent ${cat.bg} hover:shadow-md hover:border-gray-200`
                }`}
              >
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
                
                <Icon
                  strokeWidth={isSelected ? 2.5 : 2}
                  className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors relative z-10 ${
                    isSelected ? 'text-indigo-600' : cat.color
                  }`}
                />
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold text-center leading-tight ${
                  isSelected ? 'text-indigo-700' : 'text-gray-700'
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
