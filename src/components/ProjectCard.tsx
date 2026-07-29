import { useState } from 'react';
import { Heart, Download, Info, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteVisitModal } from './SiteVisitModal';

export interface PriceConfig {
  label: string;
  price: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  priceConfigs: PriceConfig[];
  nearby: string[];
  builder: string;
  status: string;
  imageSrc: string;
  imageCount: string;
  tag: string;
  badges: string[];
  description?: string;
}

export const ProjectCard = ({ project }: { project?: ProjectData }) => {
  const [showMoreNearby, setShowMoreNearby] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);

  // Default to GR Samskruthi if no project is provided (backward compatibility)
  const data: ProjectData = project || {
    id: "gr-samskruthi",
    title: "GR Samskruthi",
    subtitle: "2, 3 BHK Apartment in Sarjapura Attibele Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹75.24 L" },
      { label: "3 BHK Apartment", price: "₹93.09 - 98.69 L" }
    ],
    nearby: ["SH 35", "Sri Sai Hospitals, Attibele", "Jnana Jyoti Public School", "SRT Mall", "Anthivadi Stadium"],
    builder: "GR Constructions",
    status: "Under Construction · Completion in Nov, 2025",
    imageSrc: "/gr-samskruthi.jpg",
    imageCount: "",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"]
  };

  const visibleNearby = data.nearby.slice(0, 2);
  const hiddenNearby = data.nearby.slice(2);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative group">
      {/* Clickable Overlay */}
      <Link to={`/project/${data.id}`} className="absolute inset-0 z-[5]"></Link>
      
      {/* Left Side: Image Container */}
      <div className="relative h-72 sm:h-80 md:h-auto md:w-[40%] flex-shrink-0 bg-slate-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
        {data.imageSrc ? (
          <img 
            src={data.imageSrc} 
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            onError={(e) => {
              // Fallback to gradient if image fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 group-hover:scale-105 transition-transform duration-700 ease-in-out ${data.imageSrc ? 'hidden' : ''}`}>
          <Building2 className="w-20 h-20 text-white/40 mb-3" strokeWidth={1.5} />
          <span className="text-white/60 font-medium text-lg px-6 text-center">{data.title}</span>
        </div>
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {data.badges.includes("RERA") && (
            <span className="backdrop-blur-md bg-[#0b1b32]/90 border border-white/10 text-[#00d8b6] text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              <Info className="w-3.5 h-3.5" /> RERA
            </span>
          )}
          {data.badges.includes("ZERO BROKERAGE") && (
            <span className="backdrop-blur-md bg-[#0b1b32]/90 border border-white/10 text-[#c9a0ff] text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
              ZERO BROKERAGE
            </span>
          )}
          {data.badges.includes("3D") && (
            <span className="backdrop-blur-md bg-[#0b1b32]/90 border border-white/10 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
              3D <div className="w-2.5 h-2.5 border-1.5 border-white ml-0.5 rounded-sm"></div>
            </span>
          )}
        </div>
        {data.badges.includes("SEEN") && (
          <div className="absolute top-12 left-4 z-10 mt-1">
            <span className="backdrop-blur-md bg-[#0b1b32]/90 border border-white/10 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
              SEEN
            </span>
          </div>
        )}
        {/* Heart Icon (ensure it stays on top of the link overlay) */}
        <div className="absolute top-4 right-4 z-20">
          <button className="text-white hover:text-red-500 transition-colors drop-shadow-md hover:scale-110 duration-200">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
          </button>
        </div>
        {/* Bottom Status */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pt-12 pb-3 px-4 flex justify-between items-end z-10">
          <p className="text-white text-xs sm:text-sm font-semibold tracking-wide text-shadow-sm">
            {data.status}
          </p>
          {data.imageCount && (
            <span className="backdrop-blur-md bg-black/60 border border-white/20 text-white text-xs px-2.5 py-1 rounded-md font-medium">
              {data.imageCount}
            </span>
          )}
        </div>
      </div>

      {/* Right Side: Content Container */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 md:p-7 relative bg-white rounded-b-3xl md:rounded-br-3xl md:rounded-bl-none">
        <div className="flex justify-between items-start mb-3 gap-4">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 leading-tight tracking-tight mb-1.5 group-hover:text-blue-600 transition-colors">
              {data.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-500">
              {(() => {
                const parts = data.subtitle.split(" in ");
                return parts.length > 1 ? (
                  <>
                    <span className="font-bold text-slate-800">{parts[0]}</span> <span className="mx-0.5 text-slate-400">in</span> <span className="font-medium text-slate-600">{parts[1]}</span>
                  </>
                ) : (
                  <span className="font-bold text-slate-800">{data.subtitle}</span>
                );
              })()}
            </p>
          </div>
          {data.tag && (
            <span className="bg-blue-50/80 border border-blue-100 text-blue-600 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
              {data.tag}
            </span>
          )}
        </div>

        {/* Pricing Config */}
        <div className="flex flex-wrap items-center gap-y-4 gap-x-3 sm:gap-x-4 md:gap-x-6 mt-4 mb-5">
          {data.priceConfigs.map((config, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <div>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-1 whitespace-nowrap">{config.label}</p>
                <p className="text-sm sm:text-base font-bold text-[#0a192f] whitespace-nowrap">{config.price}</p>
              </div>
              {index < data.priceConfigs.length - 1 && (
                <div className="h-8 sm:h-10 w-px bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Nearby */}
        {data.nearby && data.nearby.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm relative">
            <span className="text-[#0a192f] font-semibold">Nearby :</span>
            {visibleNearby.map((loc, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">{loc}</span>
            ))}
            
            {hiddenNearby.length > 0 && (
              <div 
                className="relative z-20"
                onMouseEnter={() => setShowMoreNearby(true)}
                onMouseLeave={() => setShowMoreNearby(false)}
              >
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs cursor-pointer hover:bg-gray-200 transition-colors">
                  +{hiddenNearby.length}
                </span>
                
                {showMoreNearby && (
                  <div className="absolute top-full left-0 mt-2 w-max max-w-xs bg-white border border-gray-200 shadow-xl rounded-lg p-3 z-10 flex flex-wrap gap-2">
                    {hiddenNearby.map((loc, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">{loc}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {data.description && (
          <div className="mb-4 text-sm text-gray-600 flex justify-between items-center group cursor-pointer">
             <span>{data.description}</span>
             <span className="text-gray-400 group-hover:text-gray-600">▼</span>
          </div>
        )}

        {/* Spacer to push footer to bottom on large cards */}
        <div className="flex-grow"></div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 -mx-4 -mb-4 p-4 md:-mx-5 md:-mb-5 md:p-5 rounded-b-2xl md:rounded-br-2xl md:rounded-bl-none z-20 relative">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Builder</p>
            <p className="text-sm font-semibold text-[#0a192f]">{data.builder}</p>
          </div>
          
          <div className="flex w-full sm:w-auto gap-3">
            <a 
              href={`https://wa.me/919739063840?text=Hi%2C%20I%20would%20like%20to%20request%20the%20brochure%20for%20${encodeURIComponent(data.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              Brochure
            </a>
            <button 
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Site Visit
            </button>
          </div>
        </div>
      </div>

      <SiteVisitModal 
        isOpen={isSiteVisitModalOpen} 
        onClose={() => setIsSiteVisitModalOpen(false)} 
        project={data} 
      />
    </div>
  );
};
