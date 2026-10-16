import React, { useState } from 'react';
import { 
  Dumbbell, 
  Waves, 
  ShieldCheck, 
  Car, 
  TreePine, 
  Coffee, 
  Plus, 
  X, 
  Sliders, 
  Check, 
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { MASTER_AMENITIES, DEFAULT_PROJECT_AMENITIES } from '../data/amenities';
import { useAuth } from '../contexts/AuthContext';

interface ProjectAmenitiesProps {
  projectId?: string;
}

export const ProjectAmenities: React.FC<ProjectAmenitiesProps> = ({ projectId = 'global' }) => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@homesandrents.com';

  const storageKey = `admin_amenities_${projectId}`;
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
      // Fallback to global setting if project specific isn't customized yet
      const globalSaved = localStorage.getItem('admin_amenities_global');
      if (globalSaved) return JSON.parse(globalSaved);
      return DEFAULT_PROJECT_AMENITIES;
    } catch {
      return DEFAULT_PROJECT_AMENITIES;
    }
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const toggleAmenity = (name: string) => {
    const updated = selectedAmenities.includes(name)
      ? selectedAmenities.filter(item => item !== name)
      : [...selectedAmenities, name];
    setSelectedAmenities(updated);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(selectedAmenities));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
    setIsEditorOpen(false);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const trimmed = customInput.trim();
    if (!selectedAmenities.includes(trimmed)) {
      setSelectedAmenities([...selectedAmenities, trimmed]);
    }
    setCustomInput('');
  };

  const getAmenityIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('gym')) return <Dumbbell className="w-6 h-6 text-indigo-500" />;
    if (lower.includes('pool') || lower.includes('swim')) return <Waves className="w-6 h-6 text-blue-500" />;
    if (lower.includes('security') || lower.includes('cctv')) return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
    if (lower.includes('parking') || lower.includes('ev') || lower.includes('car')) return <Car className="w-6 h-6 text-slate-700" />;
    if (lower.includes('garden') || lower.includes('park') || lower.includes('tree')) return <TreePine className="w-6 h-6 text-green-600" />;
    if (lower.includes('club') || lower.includes('cafe') || lower.includes('coffee')) return <Coffee className="w-6 h-6 text-orange-500" />;
    if (lower.includes('power') || lower.includes('solar')) return <Zap className="w-6 h-6 text-amber-500" />;
    if (lower.includes('tennis') || lower.includes('badminton') || lower.includes('cricket') || lower.includes('court') || lower.includes('pitch')) {
      return <Activity className="w-6 h-6 text-rose-500" />;
    }
    return <Award className="w-6 h-6 text-indigo-500" />;
  };

  const filteredMaster = MASTER_AMENITIES.filter(a => 
    a.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm relative">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0a192f]">Top Facilities & Amenities</h2>
          <p className="text-xs text-gray-500 mt-0.5">Premium features for modern comfort & security</p>
        </div>

        <div className="flex items-center gap-3">
          {selectedAmenities.length > 6 && (
            <button 
              onClick={() => setShowAllModal(true)} 
              className="text-blue-600 text-xs sm:text-sm font-bold hover:underline"
            >
              View all ({selectedAmenities.length})
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 shadow-sm transition-all"
              title="Super Admin: Add or edit amenities for this property"
            >
              <Sliders className="w-3.5 h-3.5" /> Manage Amenities ({selectedAmenities.length})
            </button>
          )}
        </div>
      </div>

      {savedFeedback && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-pulse">
          <Check className="w-4 h-4" /> Amenities updated successfully!
        </div>
      )}
      
      {/* Amenities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6">
        {selectedAmenities.slice(0, 9).map((label, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-gray-50/60 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all text-center group"
          >
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              {getAmenityIcon(label)}
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-indigo-950 transition-colors">
              {label}
            </span>
          </div>
        ))}
      </div>

      {selectedAmenities.length > 9 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-800 bg-blue-50/60 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
          >
            + Show {selectedAmenities.length - 9} more amenities
          </button>
        </div>
      )}

      {/* Super Admin Modal: Add & Manage 30+ Amenities */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-300">
                  Super Admin Control
                </span>
                <h3 className="text-lg font-black mt-1">Configure Amenities (30+ Available)</h3>
                <p className="text-xs text-indigo-200">
                  Toggle on/off any amenities or add custom features for this property.
                </p>
              </div>
              <button 
                onClick={() => setIsEditorOpen(false)} 
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Selector */}
            <div className="p-6 overflow-y-auto flex-grow space-y-5">
              {/* Add Custom Feature */}
              <form onSubmit={handleAddCustom} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom amenity (e.g. Golf Simulator, Helipad...)"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-grow text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 shadow-sm whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>

              {/* Search Filter */}
              <div>
                <input
                  type="text"
                  placeholder="Search among 35+ amenities..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 outline-none focus:bg-white focus:border-indigo-600"
                />
              </div>

              {/* Master Amenities Selection Chips */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Catalog Amenities ({selectedAmenities.length} Selected)
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAmenities([...MASTER_AMENITIES])}
                      className="text-[11px] font-bold text-indigo-600 hover:underline"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => setSelectedAmenities([])}
                      className="text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1">
                  {filteredMaster.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`text-left p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                          isChecked
                            ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-indigo-600 text-white' : 'border border-gray-300'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          {amenity}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">
                {selectedAmenities.length} facilities active for this listing
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-colors"
                >
                  Save Amenities
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View All Amenities Modal for Visitors */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black">All Amenities & Facilities</h3>
                <p className="text-xs text-slate-300">Total {selectedAmenities.length} amenities available in this project</p>
              </div>
              <button 
                onClick={() => setShowAllModal(false)} 
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-2 gap-3">
              {selectedAmenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="bg-white p-2 rounded-lg shadow-xs">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
