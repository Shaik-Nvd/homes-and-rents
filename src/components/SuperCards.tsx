import React, { useRef, useState, useEffect } from 'react';
import { Building2, Rocket, Sparkles, CheckCircle2, Hammer, Repeat, PlusSquare, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="py-2 sm:py-4 px-1 sm:px-2 w-full relative group/carousel">
      <div className="relative max-w-5xl mx-auto flex items-center">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-2 sm:-left-4 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 hover:bg-white text-gray-800 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Categories container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex md:grid md:grid-cols-7 items-start justify-start md:justify-items-center gap-3 sm:gap-4 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-3 py-2 w-full"
        >
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

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-2 sm:-right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 hover:bg-white text-gray-800 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};
