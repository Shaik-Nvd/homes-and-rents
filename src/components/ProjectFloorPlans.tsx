import { useState } from 'react';
import type { ProjectData } from './ProjectCard';

export const ProjectFloorPlans = ({ project }: { project: ProjectData }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!project || !project.priceConfigs || project.priceConfigs.length === 0) return null;

  const activeConfig = project.priceConfigs[activeTabIndex];

  const handleWhatsAppInquiry = (_actionType?: string) => {
    const text = `Hi Homes & Rents, I am interested in the floor plan & price breakup for ${project.title} (${activeConfig.label} - ${activeConfig.price}). Please share the details!`;
    const whatsappUrl = `https://wa.me/919739063840?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0a192f]">Floor Plan & Pricing</h2>
        <button 
          onClick={() => handleWhatsAppInquiry('Download All Plans')}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Download all plans on WhatsApp
        </button>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
        {project.priceConfigs.map((config, index) => {
          const tabLabel = config.label.replace(' Apartment', '').trim();
          return (
            <button 
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTabIndex === index ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sample Architectural Floor Plan Card */}
        <div 
          onClick={() => handleWhatsAppInquiry('View Floor Plan')}
          className="bg-slate-900 rounded-2xl p-1 border border-slate-200 overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          {/* Floor Plan Blueprint / Sample Graphic Preview */}
          <div className="relative aspect-[4/3] w-full bg-[#0d1b2a] rounded-xl overflow-hidden flex items-center justify-center">
            {/* SVG Sample Floor Plan Blueprint illustration */}
            <svg 
              className="w-full h-full p-4 opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" 
              viewBox="0 0 400 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary wall */}
              <rect x="20" y="20" width="360" height="260" rx="4" stroke="#60a5fa" strokeWidth="3" fill="#1e293b" fillOpacity="0.4" />
              
              {/* Master Bedroom */}
              <rect x="25" y="25" width="160" height="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" fill="#0f172a" fillOpacity="0.6" />
              <text x="50" y="85" fill="#93c5fd" fontSize="12" fontWeight="bold" fontFamily="sans-serif">MASTER BEDROOM</text>
              <text x="65" y="105" fill="#64748b" fontSize="10" fontFamily="sans-serif">14'0" x 12'0"</text>
              
              {/* Attached Bathroom */}
              <rect x="185" y="25" width="70" height="60" stroke="#38bdf8" strokeWidth="1.5" fill="#0f172a" fillOpacity="0.4" />
              <text x="195" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">TOILET</text>
              
              {/* Balcony */}
              <rect x="25" y="155" width="60" height="125" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" fill="#064e3b" fillOpacity="0.2" />
              <text x="32" y="225" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 32,225)">BALCONY</text>

              {/* Living & Dining Area */}
              <rect x="85" y="155" width="200" height="125" stroke="#38bdf8" strokeWidth="2" fill="#0f172a" fillOpacity="0.6" />
              <text x="125" y="210" fill="#93c5fd" fontSize="13" fontWeight="bold" fontFamily="sans-serif">LIVING / DINING</text>
              <text x="145" y="230" fill="#64748b" fontSize="10" fontFamily="sans-serif">20'0" x 14'6"</text>

              {/* Kitchen & Utility */}
              <rect x="285" y="155" width="95" height="125" stroke="#38bdf8" strokeWidth="1.5" fill="#0f172a" fillOpacity="0.5" />
              <text x="305" y="215" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily="sans-serif">KITCHEN</text>
              <text x="312" y="233" fill="#64748b" fontSize="9" fontFamily="sans-serif">10'0" x 8'6"</text>

              {/* Bedroom 2 / Guest Bedroom */}
              <rect x="255" y="25" width="125" height="130" stroke="#38bdf8" strokeWidth="2" fill="#0f172a" fillOpacity="0.6" />
              <text x="278" y="85" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily="sans-serif">BEDROOM</text>
              <text x="288" y="103" fill="#64748b" fontSize="10" fontFamily="sans-serif">12'0" x 11'0"</text>

              {/* Architectural dimension lines */}
              <path d="M 20 15 L 380 15" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrow)" />
              <circle cx="20" cy="15" r="2" fill="#3b82f6" />
              <circle cx="380" cy="15" r="2" fill="#3b82f6" />
            </svg>

            {/* "Sample Floor Plan Preview" Watermark */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 shadow-md flex items-center gap-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200">
                Sample Floor Plan Preview
              </span>
            </div>

            {/* Floating Unlock Overlay On Hover / Action */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center group-hover:bg-slate-950/75 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <h4 className="text-white font-extrabold text-sm sm:text-base drop-shadow-sm">
                Get Actual High-Res Plan
              </h4>
              <p className="text-slate-300 text-xs mt-1 max-w-[240px]">
                Tap to receive official blueprint & measurements directly on WhatsApp
              </p>
              <div className="mt-3 px-3 py-1.5 rounded-full bg-[#25D366] text-slate-950 font-black text-xs inline-flex items-center gap-1.5 shadow-md">
                <span>Request on WhatsApp</span> →
              </div>
            </div>
          </div>
        </div>
        
        {/* Unit Info & Pricing */}
        <div className="flex flex-col justify-between p-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">
                Verified Configuration
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                Vastu Compliant
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-xl sm:text-2xl mb-1">
              {activeConfig.label}
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Available in multiple tower facings and floor layouts
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Super Built-up Area</p>
                <p className="font-extrabold text-[#0a192f] text-base mt-0.5">Approx. 1,180 - 1,650 sq.ft</p>
                <p className="text-[11px] text-gray-400">Customized by wing</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Expected Price</p>
                <p className="font-black text-emerald-600 text-xl sm:text-2xl mt-0.5">{activeConfig.price}</p>
                <p className="text-[11px] text-gray-400">+ Registration & taxes</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button 
              onClick={() => handleWhatsAppInquiry('Price Breakup')}
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold py-3.5 px-5 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Get Actual Plan & Price Breakup on WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-gray-400">
              Instant PDF blueprint & tower unit availability sent directly to your phone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
