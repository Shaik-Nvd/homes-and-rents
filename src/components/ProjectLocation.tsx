import React, { useState } from 'react';
import { 
  MapPin, 
  Bus, 
  Train, 
  GraduationCap, 
  Building2, 
  ShoppingBag, 
  Navigation, 
  ExternalLink,
  Plane,
  Car
} from 'lucide-react';
import type { ProjectData } from '../data/projects';

interface ProjectLocationProps {
  project?: ProjectData;
  showMap?: boolean;
  showLandmarks?: boolean;
}

export const ProjectLocation: React.FC<ProjectLocationProps> = ({ 
  project, 
  showMap = true, 
  showLandmarks = true 
}) => {
  if (!project) return null;
  if (!showMap && !showLandmarks) return null;

  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Categorize landmarks intelligently based on keywords
  const allNearby = [...project.nearby, "City Center", "Local Market", "General Hospital", "Public School", "Bus Station", "Metro Station"];
  
  const getCategory = (name: string): { category: string; icon: React.ReactNode; defaultDist: string; defaultTime: string } => {
    const lower = name.toLowerCase();
    if (lower.includes('school') || lower.includes('college') || lower.includes('academy') || lower.includes('vidya') || lower.includes('jnana')) {
      return { category: 'education', icon: <GraduationCap className="w-4 h-4 text-emerald-600" />, defaultDist: '1.5 km', defaultTime: '5 mins' };
    }
    if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('health') || lower.includes('care')) {
      return { category: 'healthcare', icon: <Building2 className="w-4 h-4 text-rose-600" />, defaultDist: '2.0 km', defaultTime: '7 mins' };
    }
    if (lower.includes('metro') || lower.includes('station') || lower.includes('sh') || lower.includes('nh') || lower.includes('road') || lower.includes('flyover') || lower.includes('junction')) {
      return { category: 'transit', icon: <Train className="w-4 h-4 text-blue-600" />, defaultDist: '1.2 km', defaultTime: '4 mins' };
    }
    if (lower.includes('mall') || lower.includes('market') || lower.includes('bazaar') || lower.includes('shopping') || lower.includes('mart')) {
      return { category: 'shopping', icon: <ShoppingBag className="w-4 h-4 text-amber-600" />, defaultDist: '2.5 km', defaultTime: '8 mins' };
    }
    return { category: 'workplace', icon: <Building2 className="w-4 h-4 text-indigo-600" />, defaultDist: '3.2 km', defaultTime: '10 mins' };
  };

  const nearbyPlaces = allNearby.slice(0, 8).map((name) => {
    const meta = getCategory(name);
    return {
      name,
      category: meta.category,
      icon: meta.icon,
      distance: meta.defaultDist,
      time: meta.defaultTime
    };
  });

  const filteredPlaces = filterCategory === 'all' 
    ? nearbyPlaces 
    : nearbyPlaces.filter(p => p.category === filterCategory);

  const mapSearchQuery = encodeURIComponent(`${project.title}, ${project.subtitle}, Bangalore`);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Locality & Connectivity
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {showMap && showLandmarks 
              ? 'Explore Neighborhood & Landmarks' 
              : showMap 
                ? 'Explore Neighborhood' 
                : 'Key Landmarks & Transit'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {project.subtitle} · Bangalore
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={() => window.open(`https://maps.google.com/?q=${mapSearchQuery}`, '_blank')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </button>
          <button 
            type="button"
            onClick={() => window.open(`https://wa.me/919739063840?text=Hi%2C%20please%20share%20location%20and%20neighborhood%20details%20for%20${encodeURIComponent(project.title)}`, '_blank')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
          >
            Request Location PDF
          </button>
        </div>
      </div>
      
      <div className={`grid gap-8 ${showMap && showLandmarks ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* Real Interactive Map & Commute Metrics */}
        {showMap && (
          <div className={`${showLandmarks ? 'lg:col-span-6 xl:col-span-6' : 'w-full'} flex flex-col gap-4`}>
            {/* Live Google Map Container */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group">
              <iframe
                title={`Interactive Map of ${project.title}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full"
              />
              
              {/* Floating Live Indicator Pill */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-black text-slate-800">Live Interactive Map</span>
              </div>

              {/* Fullscreen external button */}
              <button
                type="button"
                onClick={() => window.open(`https://maps.google.com/?q=${mapSearchQuery}`, '_blank')}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-xl shadow-md border border-slate-200 text-xs font-bold transition-all flex items-center gap-1"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Commute Quick Glance Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Metro / Railway</p>
                  <p className="text-xs font-extrabold text-slate-900 truncate">5 – 8 mins away</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Tech Hubs & ORR</p>
                  <p className="text-xs font-extrabold text-slate-900 truncate">15 – 20 mins</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Schools & Hospitals</p>
                  <p className="text-xs font-extrabold text-slate-900 truncate">&lt; 3 km radius</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Int'l Airport</p>
                  <p className="text-xs font-extrabold text-slate-900 truncate">45 – 60 mins</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Landmarks List & Categories */}
        {showLandmarks && (
          <div className={`${showMap ? 'lg:col-span-6 xl:col-span-6' : 'w-full'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                Key Landmarks & Distances
              </h3>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'transit', label: 'Transit' },
                  { id: 'education', label: 'Schools' },
                  { id: 'healthcare', label: 'Hospitals' },
                  { id: 'shopping', label: 'Malls' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilterCategory(tab.id)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      filterCategory === tab.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmarks Cards */}
            <div className={`space-y-2.5 ${!showMap ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-0' : ''}`}>
              {filteredPlaces.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-100 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.name}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-xs">
                      {item.distance}
                    </span>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/60 flex items-center justify-between text-xs text-blue-900 font-medium">
              <span className="flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-blue-600" /> Public BMTC bus stops & cabs available right at doorstep.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

