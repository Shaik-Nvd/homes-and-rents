import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, Phone } from 'lucide-react';

interface PromoPopup {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  whatsappMessage: string;
}

const POPUPS: PromoPopup[] = [
  {
    id: 1,
    image: '/popups/popup-1-rera-approved.jpg',
    title: '100% RERA Approved Properties for Sale & Rent',
    subtitle: 'Apartments, Luxury Villas, Plots, Commercial Shops & PG Co-living in Bangalore.',
    badge: '100% RERA VERIFIED',
    badgeColor: 'bg-amber-500 text-slate-950',
    whatsappMessage: 'Hi Homes and Rents, I am looking for 100% RERA approved properties for Sale / Rent in Bangalore. Please assist me with verified options!'
  },
  {
    id: 2,
    image: '/popups/popup-2-prestige-luxury.jpg',
    title: 'Prestige Group & Premium Luxury Apartments',
    subtitle: 'Find your dream luxury apartment with world-class clubhouse amenities and scenic lakeside views.',
    badge: 'LUXURY LIVING',
    badgeColor: 'bg-emerald-600 text-white',
    whatsappMessage: 'Hi Homes and Rents, I am interested in Prestige Group and luxury apartments in Bangalore. Please send me pricing and brochures.'
  },
  {
    id: 3,
    image: '/popups/popup-3-sobha-free-visit.jpg',
    title: 'Shoba Villa: 1st Property Search with Site Visit Completely FREE',
    subtitle: 'Schedule a free guided physical site visit with dedicated property managers without any brokerage.',
    badge: 'FREE SITE VISIT',
    badgeColor: 'bg-blue-600 text-white',
    whatsappMessage: 'Hi Homes and Rents, I want to book a FREE site visit for villas / apartments in Bangalore. Please connect me with a specialist.'
  },
  {
    id: 4,
    image: '/popups/popup-4-brigade-trusted-portal.jpg',
    title: 'Tired of Brokers & Fake Listings? Homes and Rents is Bangalore’s Trusted Portal',
    subtitle: 'Zero fake listings, zero spam calls. Direct access to verified owners, top developers, and personal support.',
    badge: 'ZERO BROKERAGE & SPAM',
    badgeColor: 'bg-rose-600 text-white',
    whatsappMessage: 'Hi Homes and Rents, I want genuine, broker-free verified properties in Bangalore with personalized assistance.'
  }
];

const POPUP_DURATION_MS = 5000; // 5 seconds per popup as requested

export const PromotionalPopups: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger popups when user opens website
  useEffect(() => {
    // Check if user dismissed it in this browser session
    const hasDismissed = sessionStorage.getItem('hnr_promo_popups_dismissed');
    if (!hasDismissed) {
      // Small 600ms grace period after page load before displaying
      const initialTimer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(initialTimer);
    }
  }, []);

  // Handle automatic 5-second rotation & progress bar
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const intervalTime = 50; // update progress every 50ms
    const step = 100 / (POPUP_DURATION_MS / intervalTime);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % POPUPS.length);
    }, POPUP_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpen, currentIndex, isPaused]);

  if (!isOpen) return null;

  const currentPopup = POPUPS[currentIndex];

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hnr_promo_popups_dismissed', 'true');
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(0);
    setCurrentIndex((prev) => (prev === 0 ? POPUPS.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % POPUPS.length);
  };

  const handleEnquireWhatsApp = () => {
    const url = `https://wa.me/919739063840?text=${encodeURIComponent(currentPopup.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Progress indicator across all 4 popups */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1.5 p-3 bg-gradient-to-b from-black/70 to-transparent">
          {POPUPS.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => {
                setProgress(0);
                setCurrentIndex(idx);
              }}
              className="h-1.5 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:bg-white/50 transition-colors"
            >
              <div 
                className="h-full bg-amber-400 transition-all duration-75"
                style={{ 
                  width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%' 
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close promotion"
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95 shadow-lg border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge and Duration countdown indicator */}
        <div className="absolute top-8 left-4 z-30 flex items-center gap-2">
          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg ${currentPopup.badgeColor}`}>
            {currentPopup.badge}
          </span>
          <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
            {currentIndex + 1} of 4 • 5s
          </span>
        </div>

        {/* Image Display */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={handleEnquireWhatsApp}>
          <img
            key={currentPopup.image}
            src={currentPopup.image}
            alt={currentPopup.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 animate-in fade-in zoom-in-95"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous popup"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-white/20 shadow-md"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next popup"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-white/20 shadow-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-black text-slate-900 truncate">
              {currentPopup.title}
            </h4>
            <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
              {currentPopup.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleEnquireWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/30 transition-all hover:shadow-lg active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </button>

            <a
              href="tel:+919739063840"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
              title="Call Homes and Rents Support"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
