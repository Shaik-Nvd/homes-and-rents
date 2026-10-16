import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Building2, 
  DollarSign, 
  Plus, 
  Trash2, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import type { ProjectData, PriceConfig, PropertyOverrideData } from '../data/projects';
import { getPropertyOverride, setPropertyOverride } from '../data/projects';
import { 
  SECTION_DEFINITIONS, 
  getSectionVisibility, 
  setSectionVisibility,
  getWhyConsiderData,
  setWhyConsiderData
} from '../data/sectionVisibility';
import type { SectionVisibilityMap } from '../data/sectionVisibility';
import { MASTER_AMENITIES, DEFAULT_PROJECT_AMENITIES } from '../data/amenities';

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData;
  onSaved?: () => void;
}

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  project,
  onSaved
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'pricing' | 'sections' | 'amenities' | 'whyConsider'>('content');

  // Basic Information
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle);
  const [builder, setBuilder] = useState(project.builder);
  const [status, setStatus] = useState(project.status);
  const [description, setDescription] = useState(project.description || '');
  const [aboutText, setAboutText] = useState(project.aboutText || '');
  const [imageSrc, setImageSrc] = useState(project.imageSrc || '');
  
  // Landmarks / Nearby (comma separated or array)
  const [nearbyInput, setNearbyInput] = useState((project.nearby || []).join(', '));

  // Pricing Configurations (Starting Price & Unit Floor Plans & Pricing)
  const [priceConfigs, setPriceConfigs] = useState<PriceConfig[]>(
    project.priceConfigs && project.priceConfigs.length > 0
      ? JSON.parse(JSON.stringify(project.priceConfigs))
      : [
          { label: '2 BHK Apartment', price: '₹75 L' },
          { label: '3 BHK Apartment', price: '₹1.15 Cr' }
        ]
  );

  // Section Toggles (All 10 sections requested by user)
  const [sectionToggles, setSectionToggles] = useState<SectionVisibilityMap>(() => 
    getSectionVisibility(project.id)
  );

  // Amenities for this property
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`admin_amenities_${project.id}`);
      if (saved) return JSON.parse(saved);
      const globalSaved = localStorage.getItem('admin_amenities_global');
      return globalSaved ? JSON.parse(globalSaved) : DEFAULT_PROJECT_AMENITIES;
    } catch {
      return DEFAULT_PROJECT_AMENITIES;
    }
  });

  // Why Consider Builder Data
  const [whyConsiderTitle, setWhyConsiderTitle] = useState('');
  const [whyConsiderParagraphs, setWhyConsiderParagraphs] = useState('');

  // Overview quick facts
  const [overviewArea, setOverviewArea] = useState('2 Acres');
  const [overviewSizes, setOverviewSizes] = useState('1000 - 1500 sq.ft.');
  const [overviewUnits, setOverviewUnits] = useState('200 Units');
  const [overviewLaunch, setOverviewLaunch] = useState('Jan, 2023');
  const [overviewAvgPrice, setOverviewAvgPrice] = useState('₹5.5k/sq.ft.');

  // Load existing overrides on open
  useEffect(() => {
    if (isOpen && project) {
      const override = getPropertyOverride(project.id);
      setTitle(override?.title ?? project.title);
      setSubtitle(override?.subtitle ?? project.subtitle);
      setBuilder(override?.builder ?? project.builder);
      setStatus(override?.status ?? project.status);
      setDescription(override?.description ?? project.description ?? '');
      setAboutText(override?.aboutText ?? project.aboutText ?? '');
      setImageSrc(override?.imageSrc ?? project.imageSrc ?? '');
      setNearbyInput((override?.nearby ?? project.nearby ?? []).join(', '));

      if (override?.priceConfigs && override.priceConfigs.length > 0) {
        setPriceConfigs(JSON.parse(JSON.stringify(override.priceConfigs)));
      } else {
        setPriceConfigs(
          project.priceConfigs && project.priceConfigs.length > 0
            ? JSON.parse(JSON.stringify(project.priceConfigs))
            : [{ label: 'Starting Price', price: '₹75 L' }]
        );
      }

      setSectionToggles(getSectionVisibility(project.id));

      const why = getWhyConsiderData(project.id);
      setWhyConsiderTitle(why.title || `Why consider ${project.builder || project.title}?`);
      setWhyConsiderParagraphs(why.points.join('\n\n'));

      try {
        const ovData = localStorage.getItem(`admin_overview_data_${project.id}`);
        if (ovData) {
          const parsed = JSON.parse(ovData);
          if (parsed.area) setOverviewArea(parsed.area);
          if (parsed.sizes) setOverviewSizes(parsed.sizes);
          if (parsed.units) setOverviewUnits(parsed.units);
          if (parsed.launch) setOverviewLaunch(parsed.launch);
          if (parsed.avgPrice) setOverviewAvgPrice(parsed.avgPrice);
        }
      } catch {
        // default
      }
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const toggleSection = (key: keyof SectionVisibilityMap) => {
    setSectionToggles(prev => ({
      ...prev,
      [key]: prev[key] === false ? true : false
    }));
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleAddPriceRow = () => {
    setPriceConfigs([...priceConfigs, { label: 'New Unit / BHK', price: '₹1.00 Cr' }]);
  };

  const handleRemovePriceRow = (idx: number) => {
    setPriceConfigs(priceConfigs.filter((_, i) => i !== idx));
  };

  const handlePriceChange = (index: number, field: 'label' | 'price', val: string) => {
    const updated = [...priceConfigs];
    updated[index][field] = val;
    setPriceConfigs(updated);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save property content & prices override
    const cleanNearby = nearbyInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const overridePayload: PropertyOverrideData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      builder: builder.trim(),
      status: status.trim(),
      description: description.trim(),
      aboutText: aboutText.trim(),
      imageSrc: imageSrc.trim(),
      priceConfigs: priceConfigs.filter(p => p.label.trim() && p.price.trim()),
      nearby: cleanNearby
    };

    setPropertyOverride(project.id, overridePayload);

    // 2. Save Section Toggles
    setSectionVisibility(project.id, sectionToggles);
    localStorage.setItem(`admin_overview_toggle_${project.id}`, JSON.stringify(sectionToggles.overview !== false));

    // 3. Save Amenities
    localStorage.setItem(`admin_amenities_${project.id}`, JSON.stringify(selectedAmenities));

    // 4. Save Why Consider Builder highlights
    const whyPoints = whyConsiderParagraphs
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);
    setWhyConsiderData(project.id, {
      title: whyConsiderTitle.trim() || `Why consider ${builder.trim() || title.trim()}?`,
      points: whyPoints.length > 0 ? whyPoints : [
        "Easily find Zen with yoga spaces and vast green covers.",
        "Vastu compliant spacious homes with modern amenities.",
        "Excellent connectivity to major IT hubs and transit."
      ]
    });

    // 5. Save Overview details
    localStorage.setItem(`admin_overview_data_${project.id}`, JSON.stringify({
      area: overviewArea,
      sizes: overviewSizes,
      units: overviewUnits,
      launch: overviewLaunch,
      avgPrice: overviewAvgPrice
    }));

    if (onSaved) onSaved();
    onClose();
  };

  const handleResetToDefault = () => {
    if (!window.confirm('Reset this property to its default original values?')) return;
    localStorage.removeItem(`admin_property_override_${project.id}`);
    localStorage.removeItem(`admin_section_visibility_${project.id}`);
    localStorage.removeItem(`admin_overview_toggle_${project.id}`);
    localStorage.removeItem(`admin_amenities_${project.id}`);
    localStorage.removeItem(`admin_why_consider_${project.id}`);
    localStorage.removeItem(`admin_overview_data_${project.id}`);
    window.dispatchEvent(new Event('propertyOverrideUpdated'));
    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Super Admin Edit Property</h2>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                  Live Customizer
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                Editing: <strong className="text-white">{project.title}</strong> (ID: {project.id})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-xl border border-rose-500/20 hover:bg-rose-500/10 flex items-center gap-1 transition-colors"
              title="Reset all edits to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Default
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Details & Status
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'bg-purple-600 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Starting Price & Unit Pricing
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sections'
                ? 'bg-blue-600 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> 10 Section Toggles (ON/OFF)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('amenities')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'amenities'
                ? 'bg-teal-600 text-white shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Top Facilities (Amenities)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whyConsider')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'whyConsider'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Why Consider ({builder || 'Builder'})
          </button>
        </div>

        {/* Tab Body */}
        <form onSubmit={handleSaveAll} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: General Content & Status */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Property Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                    placeholder="e.g. Trifecta Veranza"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Developer / Builder Name</label>
                  <input
                    type="text"
                    value={builder}
                    onChange={(e) => setBuilder(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                    placeholder="e.g. Trifecta Projects"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle / Locality</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                  placeholder="e.g. 3, 4 BHK Apartment in East Bangalore, Bangalore"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Construction Status & Completion Date
                  </label>
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                    placeholder="e.g. New Launch · Completion in Dec, 2029"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Format: Status · Date</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Image URL / Cover Path</label>
                  <input
                    type="text"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                    placeholder="e.g. /Trifecta_Veranza.jpg or https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Key Landmarks & Nearby (Comma-separated)
                </label>
                <input
                  type="text"
                  value={nearbyInput}
                  onChange={(e) => setNearbyInput(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-indigo-500"
                  placeholder="e.g. The International School, Wipro SEZ, NH 948A, Greenwood High"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">About Project (Detailed Narrative)</label>
                <textarea
                  rows={4}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500"
                  placeholder="Describe the architecture, master plan, and living experience..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Overview Quick Facts</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Project Area</span>
                    <input
                      type="text"
                      value={overviewArea}
                      onChange={(e) => setOverviewArea(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white"
                      placeholder="2 Acres"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Sizes</span>
                    <input
                      type="text"
                      value={overviewSizes}
                      onChange={(e) => setOverviewSizes(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white"
                      placeholder="1000 - 1500 sqft"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Project Size</span>
                    <input
                      type="text"
                      value={overviewUnits}
                      onChange={(e) => setOverviewUnits(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white"
                      placeholder="200 Units"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Launch Date</span>
                    <input
                      type="text"
                      value={overviewLaunch}
                      onChange={(e) => setOverviewLaunch(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white"
                      placeholder="Jan, 2023"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Avg. Price</span>
                    <input
                      type="text"
                      value={overviewAvgPrice}
                      onChange={(e) => setOverviewAvgPrice(e.target.value)}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white"
                      placeholder="₹5.5k/sq.ft."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Starting Price & Unit Pricing */}
          {activeTab === 'pricing' && (
            <div className="space-y-5">
              <div className="bg-purple-950/40 border border-purple-800/50 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-purple-200">Starting Price & Unit Floor Plans</h4>
                  <p className="text-xs text-purple-300/80">
                    The 1st row sets the <strong>"Starting Price"</strong> badge on the card and detail banner. All rows display in <strong>"Unit Floor Plans & Pricing"</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPriceRow}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add BHK Row
                </button>
              </div>

              <div className="space-y-3">
                {priceConfigs.map((cfg, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      #{idx + 1}
                    </div>

                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        {idx === 0 ? 'Starting Unit Type (Top Badge)' : 'Unit Floor Plan / BHK'}
                      </label>
                      <input
                        type="text"
                        value={cfg.label}
                        onChange={(e) => handlePriceChange(idx, 'label', e.target.value)}
                        placeholder="e.g. 2 BHK Apartment or Villa"
                        className="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div className="w-48 sm:w-60">
                      <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                        Price (Numbers & Texts allowed)
                      </label>
                      <input
                        type="text"
                        value={cfg.price}
                        onChange={(e) => handlePriceChange(idx, 'price', e.target.value)}
                        placeholder="e.g. ₹1.48 - 1.63 Cr or ₹75.24 L"
                        className="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemovePriceRow(idx)}
                      disabled={priceConfigs.length <= 1}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors disabled:opacity-30 disabled:hover:text-slate-500 shrink-0"
                      title="Remove Row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 10 Section Toggles */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-extrabold text-white">Toggle Sections ON / OFF</h4>
                  <p className="text-xs text-slate-400">
                    Super admin control to toggle sections for this property (ideal for small vs large developments).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSectionToggles({
                      whyConsider: true,
                      overview: true,
                      constructionStatus: true,
                      startingPrice: true,
                      unitPricing: true,
                      floorPlans: true,
                      topFacilities: true,
                      about: true,
                      neighborhoodMap: true,
                      keyLandmarks: true
                    })}
                    className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition-colors"
                  >
                    All ON
                  </button>
                  <button
                    type="button"
                    onClick={() => setSectionToggles({
                      whyConsider: false,
                      overview: false,
                      constructionStatus: false,
                      startingPrice: false,
                      unitPricing: false,
                      floorPlans: false,
                      topFacilities: false,
                      about: false,
                      neighborhoodMap: false,
                      keyLandmarks: false
                    })}
                    className="text-xs font-bold px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition-colors"
                  >
                    All OFF
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTION_DEFINITIONS.map(def => {
                  const isVisible = sectionToggles[def.id as keyof SectionVisibilityMap] !== false;
                  return (
                    <div
                      key={def.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isVisible
                          ? 'bg-indigo-950/40 border-indigo-500/40 text-white ring-1 ring-indigo-500/20'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-xs truncate flex items-center gap-1.5">
                          <span>{def.label}</span>
                          {isVisible ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-black">
                              ON
                            </span>
                          ) : (
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-bold">
                              OFF
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{def.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSection(def.id as keyof SectionVisibilityMap)}
                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          isVisible ? 'bg-indigo-600' : 'bg-slate-800'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                            isVisible ? 'left-6.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Top Facilities (Amenities 35+) */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Top Facilities / Amenities ({selectedAmenities.length} selected)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Select any of the 35+ master amenities or standard packages for this property.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAmenities([...MASTER_AMENITIES])}
                    className="text-xs font-bold text-teal-300 hover:underline"
                  >
                    Select All (35+)
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => setSelectedAmenities(DEFAULT_PROJECT_AMENITIES)}
                    className="text-xs font-bold text-teal-300 hover:underline"
                  >
                    Default (Top 6)
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => setSelectedAmenities([])}
                    className="text-xs font-bold text-slate-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto p-1">
                {MASTER_AMENITIES.map((name) => {
                  const isSelected = selectedAmenities.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleAmenity(name)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-500/50 text-teal-200 ring-1 ring-teal-500/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{name}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-teal-500 text-slate-950' : 'border border-slate-700'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Why Consider Builder */}
          {activeTab === 'whyConsider' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Why Consider Section Title
                </label>
                <input
                  type="text"
                  value={whyConsiderTitle}
                  onChange={(e) => setWhyConsiderTitle(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500"
                  placeholder="e.g. Why consider Trifecta Projects?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Why Consider Paragraphs & Bullet Points (Edit in paragraphs)
                </label>
                <textarea
                  rows={8}
                  value={whyConsiderParagraphs}
                  onChange={(e) => setWhyConsiderParagraphs(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-amber-500 leading-relaxed font-mono"
                  placeholder="Easily find Zen with yoga spaces and vast green covers.&#10;&#10;Vastu compliant spacious homes with modern amenities.&#10;&#10;Excellent connectivity to major IT hubs and transit."
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tip: Separate each key point or selling argument with a blank line (paragraph). Super admin can modify any text at any time.
                </span>
              </div>
            </div>
          )}

          {/* Footer Save Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Changes reflect immediately on Homepage cards and Project Detail page.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 transition-all"
              >
                <Save className="w-4 h-4" /> Save Property Edits
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
