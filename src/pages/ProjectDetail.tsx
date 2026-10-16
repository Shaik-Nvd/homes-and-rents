import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, Heart, ChevronRight, Download, Image as ImageIcon, X, Info, ChevronLeft, Building2, Wallet } from 'lucide-react';
import { ProjectOverview } from '../components/ProjectOverview';
import { ProjectFloorPlans } from '../components/ProjectFloorPlans';
import { ProjectAmenities } from '../components/ProjectAmenities';
import { ProjectAbout } from '../components/ProjectAbout';
import { ProjectLocation } from '../components/ProjectLocation';
import { SiteVisitModal } from '../components/SiteVisitModal';
import { BrochureModal } from '../components/BrochureModal';
import { RentalAmenities } from '../components/RentalAmenities';
import { projects, applyPropertyOverrides } from '../data/projects';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';
import type { ProjectData } from '../data/projects';
import { useAuth } from '../contexts/AuthContext';
import { 
  getSectionVisibility, 
  setSectionVisibility, 
  SECTION_DEFINITIONS,
  getWhyConsiderData,
  setWhyConsiderData,
  DEFAULT_WHY_CONSIDER_POINTS
} from '../data/sectionVisibility';
import type { SectionVisibilityMap, WhyConsiderConfig } from '../data/sectionVisibility';
import { Sliders, Edit3 } from 'lucide-react';
import { EditPropertyModal } from '../components/EditPropertyModal';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(() => {
    const found = projects.find((p) => p.id === id);
    return found ? applyPropertyOverrides(found) : null;
  });
  const [loading, setLoading] = useState(!project);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const handleOverrideUpdate = () => {
      if (id) {
        const found = projects.find((p) => p.id === id);
        if (found) {
          setProject(applyPropertyOverrides(found));
        }
      }
    };
    window.addEventListener('propertyOverrideUpdated', handleOverrideUpdate);
    return () => window.removeEventListener('propertyOverrideUpdated', handleOverrideUpdate);
  }, [id]);

  useEffect(() => {
    // Ensure viewport starts at the top (photos and title/pricing) instead of jumping down
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (!project && id) {
      const fetchProject = async () => {
        // Try fetching from Supabase if not in static list
        const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
        if (!error && data) {
          const rawItem: ProjectData = {
            id: data.id?.toString(),
            title: data.title || 'Untitled Property',
            subtitle: `${data.bhk || 2} BHK in ${data.location || 'Bangalore'}`,
            priceConfigs: [{ label: data.type === 'Rent' ? 'Rent' : 'Price', price: data.price || 'Contact for price' }],
            nearby: [],
            builder: 'Individual Owner',
            status: 'Ready to Move',
            imageSrc: (data.images && data.images.length > 0) ? data.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600',
            imageCount: data.images?.length?.toString() || '1',
            tag: data.type === 'Rent' ? 'Rent' : 'Sale',
            badges: ['Verified'],
            description: data.description,
            galleryImages: data.images || []
          };
          setProject(applyPropertyOverrides(rawItem));
        }
        setLoading(false);
      };
      fetchProject();
    }
  }, [id, project]);

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@homesandrents.com';

  const [sectionVis, setSectionVis] = useState<SectionVisibilityMap>(() => {
    return getSectionVisibility(id || 'global');
  });
  const [isSectionManagerOpen, setIsSectionManagerOpen] = useState(false);
  const [visFeedback, setVisFeedback] = useState<string | null>(null);

  // Why Consider State & Editor
  const [whyConsiderConfig, setWhyConsiderConfig] = useState<WhyConsiderConfig>(() => {
    return getWhyConsiderData(id || 'global');
  });
  const [isWhyConsiderEditorOpen, setIsWhyConsiderEditorOpen] = useState(false);
  const [editWhyTitle, setEditWhyTitle] = useState('');
  const [editWhyParagraphs, setEditWhyParagraphs] = useState('');

  const handleOpenWhyEditor = () => {
    setEditWhyTitle(whyConsiderConfig.title || `Why consider ${project?.title || 'this property'}?`);
    setEditWhyParagraphs(whyConsiderConfig.points.join('\n\n'));
    setIsWhyConsiderEditorOpen(true);
  };

  const handleSaveWhyConsider = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPoints = editWhyParagraphs
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const updatedConfig: WhyConsiderConfig = {
      title: editWhyTitle.trim(),
      points: parsedPoints.length > 0 ? parsedPoints : DEFAULT_WHY_CONSIDER_POINTS
    };

    setWhyConsiderConfig(updatedConfig);
    setWhyConsiderData(id || 'global', updatedConfig);
    setIsWhyConsiderEditorOpen(false);
    setVisFeedback('Why Consider answers & paragraphs saved successfully!');
    setTimeout(() => setVisFeedback(null), 3000);
  };

  const toggleSection = (sectionKey: keyof SectionVisibilityMap) => {
    const currentVal = sectionVis[sectionKey] !== false; // default true
    const updated = { ...sectionVis, [sectionKey]: !currentVal };
    setSectionVis(updated);
    setSectionVisibility(id || 'global', updated);
    setVisFeedback(`${sectionKey} turned ${!currentVal ? 'ON' : 'OFF'}`);
    setTimeout(() => setVisFeedback(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Project not found</h2>
          <p className="text-slate-500 mb-8 font-medium text-lg">The project you are looking for does not exist or has been removed.</p>
          <Link to="/" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            Explore Other Projects
          </Link>
        </div>
      </div>
    );
  }

  // Use project gallery if available, otherwise fallback to project imageSrc
  const allImages = project.galleryImages?.length 
    ? project.galleryImages 
    : [project.imageSrc];
  const allVideos = project.videoLinks || [];

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    const text = `Hi, I am interested in ${project.title}. My name is ${formData.name} and my contact number is ${formData.phone}. Please share the details and images.`;
    window.open(`https://wa.me/919739063840?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{project.title} | {project.subtitle} | Homes and Rents</title>
        <meta name="description" content={`Check out ${project.title}, ${project.subtitle}. Explore price, floor plans, amenities, and more on Homes and Rents.`} />
        <meta property="og:title" content={`${project.title} | Homes and Rents`} />
        <meta property="og:description" content={`Explore ${project.title}. ${project.subtitle}. Starting from ${project.priceConfigs?.[0]?.price || 'On request'}.`} />
        <meta property="og:image" content={project.imageSrc} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": project.title,
            "description": project.description || `Properties at ${project.title}, ${project.subtitle}`,
            "image": project.imageSrc,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": project.priceConfigs?.[0]?.price?.replace(/[^0-9.]/g, '') || "0"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Banner Section */}
      <div className={`relative w-full ${!imageFailed ? 'h-[50vh] md:h-[65vh] min-h-[500px]' : 'min-h-[650px] sm:min-h-[500px] md:h-[65vh]'}`}>
        {!imageFailed ? (
          <img 
            src={allImages[0]} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-start sm:justify-center bg-slate-900 pt-24 sm:pt-10 pb-48 sm:pb-28 px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-8 rounded-3xl w-full max-w-md shadow-2xl z-20 relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">Request Project Details</h3>
              <p className="text-white/70 text-xs sm:text-sm mb-6 text-center">Images for {project.title} are currently being updated. Fill the form below and we will WhatsApp you the details and photos instantly.</p>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Your Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2">
                  Get Details on WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/40 pointer-events-none"></div>
        
        {/* Breadcrumbs over Hero */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-white/90 font-medium whitespace-nowrap overflow-x-auto no-scrollbar drop-shadow-md">
              <Link to="/" className="hover:text-white hover:underline transition-all">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="hover:text-white hover:underline transition-all cursor-pointer">Projects in Bangalore</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-white font-bold">{project.title}</span>
            </div>
          </div>
        </div>

        {/* Floating Glassmorphism Info Card */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="backdrop-blur-xl bg-white/85 border border-white/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden group hover:bg-white/95 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {project.badges?.map((badge, idx) => (
                    <span key={idx} className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm ${
                      badge === 'RERA' ? 'bg-teal-50 text-teal-700 border border-teal-200/60' : 
                      badge === 'ZERO BROKERAGE' ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 
                      'bg-blue-50 text-blue-700 border border-blue-200/60'
                    }`}>
                      {badge === 'RERA' && <Info className="w-3.5 h-3.5" />}
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{project.title}</h1>
                  <button className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2.5 rounded-full shadow-sm border border-slate-100 hover:scale-110 hover:shadow-md duration-200 mt-1 md:mt-0">
                    <Heart className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl">
                  {project.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-slate-700">
                   Developed By <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{project.builder}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 shrink-0">
                <button 
                  onClick={() => setShowGallery(true)}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <ImageIcon className="w-4 h-4" />
                  View Gallery ({allImages.length + allVideos.length})
                </button>
                <button 
                  onClick={() => setIsSiteVisitModalOpen(true)}
                  className="px-8 py-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Schedule Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-48 sm:mt-36 md:mt-28">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
          
          {/* Main Content (Left) */}
          <div className="lg:w-[65%] xl:w-[68%] space-y-12">
            
            {/* Super Admin Section Visibility Quick Bar */}
            {isAdmin && (
              <div className="bg-slate-900 border border-slate-700/80 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-white text-xs shadow-md">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold">Super Admin Page Controls:</span>
                  <span className="text-slate-300">Edit details, pricing, or toggle 10 sections</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black px-4 py-1.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-purple-200" /> Edit Property Details & Prices
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSectionManagerOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-3.5 py-1.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" /> Toggle Sections ON/OFF
                  </button>
                </div>
              </div>
            )}

            {/* Edit Property Modal for Super Admin */}
            {project && isEditModalOpen && (
              <EditPropertyModal
                isOpen={isEditModalOpen}
                project={project}
                onClose={() => setIsEditModalOpen(false)}
                onSaved={() => {
                  setVisFeedback('Property Details & Prices Updated Successfully!');
                  setTimeout(() => setVisFeedback(null), 3000);
                  const updated = applyPropertyOverrides(project);
                  setProject(updated);
                  setSectionVis(getSectionVisibility(project.id));
                }}
              />
            )}

            {visFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl animate-pulse">
                ✓ {visFeedback}
              </div>
            )}
            
            {/* Construction Status & Pricing Cards */}
            {((sectionVis.constructionStatus !== false) || (sectionVis.startingPrice !== false)) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                {sectionVis.constructionStatus !== false && (
                  <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-3xl p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity transform group-hover:scale-110 duration-500">
                        <Building2 className="w-24 h-24 text-blue-800" />
                     </div>
                     <p className="text-xs text-blue-600 font-extrabold tracking-widest uppercase mb-4 opacity-80">Construction Status</p>
                     <p className="text-slate-900 font-black text-2xl sm:text-3xl mb-2">{project.status.split('·')[0].trim()}</p>
                     <p className="text-slate-600 text-sm font-medium flex items-center gap-1.5">
                       <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                       {project.status.split('·')[1]?.trim()}
                     </p>
                  </div>
                )}
                
                {sectionVis.startingPrice !== false && (
                  <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-white rounded-3xl p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity transform group-hover:scale-110 duration-500">
                        <Wallet className="w-24 h-24 text-purple-800" />
                     </div>
                     <div>
                       <p className="text-xs text-purple-600 font-extrabold tracking-widest uppercase mb-4 opacity-80">Starting Price</p>
                       <div className="flex flex-wrap items-end gap-3">
                         <span className="text-slate-900 font-black text-2xl sm:text-3xl leading-none">{project.priceConfigs?.[0]?.price || "Price on Request"}</span>
                         <span className="text-purple-700 text-[10px] font-bold bg-purple-100/50 px-2.5 py-1 rounded-md shadow-sm backdrop-blur-sm border border-purple-200/50">+ Charges</span>
                       </div>
                     </div>
                     <div className="mt-6 flex gap-3 relative z-10">
                        <button 
                          type="button"
                          onClick={() => setIsBrochureModalOpen(true)}
                          className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Brochure
                        </button>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Details List */}
            {project.tag !== 'Rent' && sectionVis.unitPricing !== false && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Unit Floor Plans & Pricing</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {project.priceConfigs?.map((config, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between relative z-10 bg-slate-50/50">
                        <h4 className="text-slate-900 font-extrabold text-sm flex items-baseline gap-1.5">
                          <span className="text-blue-600 text-xl font-black">{config.label.split(' ')[0]}</span> 
                          <span className="text-slate-600">{config.label.split(' ').slice(1).join(' ')}</span>
                        </h4>
                        <div className="w-8 h-8 bg-white border border-blue-100 text-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 shadow-sm">
                           <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="p-6 flex flex-col justify-between h-[120px] relative z-10">
                        <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase mb-1">Estimated Cost</p>
                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-slate-900 text-2xl font-black">{config.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Sections with ON/OFF visibility toggles */}
            <div className="flex flex-col gap-12 mt-4">
              {sectionVis.overview !== false && <ProjectOverview project={project} />}
              {project.tag !== 'Rent' && sectionVis.floorPlans !== false && <ProjectFloorPlans project={project} />}
              {sectionVis.topFacilities !== false && (
                project.tag === 'Rent' ? (
                  <RentalAmenities />
                ) : (
                  <ProjectAmenities projectId={project.id} />
                )
              )}
              {sectionVis.about !== false && <ProjectAbout project={project} />}
              {(sectionVis.neighborhoodMap !== false || sectionVis.keyLandmarks !== false) && (
                <ProjectLocation 
                  project={project} 
                  showMap={sectionVis.neighborhoodMap !== false} 
                  showLandmarks={sectionVis.keyLandmarks !== false} 
                />
              )}
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[35%] xl:w-[32%] relative mt-8 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Why consider (Super Admin Toggleable) */}
              {sectionVis.whyConsider !== false && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
                  
                  <div className="flex items-start justify-between gap-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="text-orange-500 mt-1 bg-orange-50 p-2 rounded-xl">
                        <Home className="w-5 h-5" fill="currentColor" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight">
                        {whyConsiderConfig.title || `Why consider ${project.title}?`}
                      </h4>
                    </div>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={handleOpenWhyEditor}
                        className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-black border border-orange-200/80 shadow-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                        title="Edit Why Consider points and builder paragraphs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Answers</span>
                      </button>
                    )}
                  </div>
                  
                  <ul className="space-y-5 mb-8">
                    {whyConsiderConfig.points.slice(0, 3).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-[14px] text-slate-600 font-medium leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 ring-4 ring-slate-100"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setShowAllFeatures(true)}
                    className="w-full text-blue-600 font-bold text-[14px] hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    View all {whyConsiderConfig.points.length} highlights <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Developer Info */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1.5">Developed By</p>
                      <p className="text-[15px] font-black text-slate-900">{project.builder}</p>
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                      <span className="text-sm font-black uppercase text-slate-500">{project.builder.substring(0,2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Expanded Drawer for "Why Consider" */}
      {showAllFeatures && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAllFeatures(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-1 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                  <Home className="w-5 h-5" fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 leading-tight">
                    {whyConsiderConfig.title || `Why consider ${project.title}?`}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">Developer: {project.builder}</p>
                </div>
              </div>
              <button onClick={() => setShowAllFeatures(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 bg-white rounded-full shadow-sm border border-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <ul className="space-y-6">
                {whyConsiderConfig.points.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-[15px] text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 shadow-sm shadow-blue-500/50"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-white">
              <button 
                onClick={() => window.open(`https://wa.me/919739063840?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(project.title)}`, '_blank')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-black text-[15px] hover:shadow-lg hover:shadow-blue-500/30 transition-all shadow-sm"
              >
                Request Callback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
          <div className="flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent text-white fixed top-0 w-full z-10">
            <span className="font-bold text-lg tracking-wide">Gallery ({allImages.length + allVideos.length})</span>
            <button onClick={() => setShowGallery(false)} className="hover:text-gray-300 p-2 bg-white/10 rounded-full backdrop-blur-md">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-24 pb-12 px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {allVideos.map((url, idx) => {
                const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                return (
                  <div key={`vid-${idx}`} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl">
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full h-full absolute inset-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
              {allImages.map((src, idx) => (
                <div 
                  key={`img-${idx}`} 
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 cursor-pointer hover:border-gray-500 transition-colors shadow-xl group"
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={src} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Individual Image */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">
          <button 
            onClick={() => setSelectedImageIndex(null)} 
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-3 z-10 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImages.length - 1))}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4 z-10 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <div className="w-full h-full p-4 sm:p-24 flex items-center justify-center">
            <img 
              src={allImages[selectedImageIndex]} 
              alt="Full screen view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          <button 
            onClick={() => setSelectedImageIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : 0))}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-4 z-10 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-8 text-white font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Super Admin Section Visibility Modal */}
      {isAdmin && isSectionManagerOpen && (
        <div className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Section Visibility Controls</h3>
                  <p className="text-xs text-slate-400">Customize sections for {project.title} (small/individual property)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSectionManagerOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-3 bg-slate-950/30 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400">Quick Actions:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allOn: SectionVisibilityMap = {
                      whyConsider: true,
                      overview: true,
                      constructionStatus: true,
                      startingPrice: true,
                      unitPricing: true,
                      floorPlans: true,
                      topFacilities: true,
                      about: true,
                      neighborhoodMap: true,
                      keyLandmarks: true,
                    };
                    setSectionVis(allOn);
                    setSectionVisibility(id || 'global', allOn);
                  }}
                  className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30"
                >
                  Turn All ON
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const allOff: SectionVisibilityMap = {
                      whyConsider: false,
                      overview: false,
                      constructionStatus: false,
                      startingPrice: false,
                      unitPricing: false,
                      floorPlans: false,
                      topFacilities: false,
                      about: false,
                      neighborhoodMap: false,
                      keyLandmarks: false,
                    };
                    setSectionVis(allOff);
                    setSectionVisibility(id || 'global', allOff);
                  }}
                  className="text-xs font-bold px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg hover:bg-rose-500/30"
                >
                  Turn All OFF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (id) {
                      localStorage.removeItem(`admin_section_visibility_${id}`);
                    }
                    setSectionVis(getSectionVisibility(id || 'global'));
                  }}
                  className="text-xs font-bold px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              {SECTION_DEFINITIONS.map((def) => {
                const isVisible = sectionVis[def.id as keyof SectionVisibilityMap] !== false;
                return (
                  <div 
                    key={def.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isVisible 
                        ? 'bg-slate-800/60 border-slate-700/80' 
                        : 'bg-slate-950/60 border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                          isVisible 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}>
                          {isVisible ? 'Visible (ON)' : 'Hidden (OFF)'}
                        </span>
                        <h4 className="text-white font-extrabold text-sm">{def.label}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{def.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSection(def.id as keyof SectionVisibilityMap)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap ${
                        isVisible
                          ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                      }`}
                    >
                      {isVisible ? 'Turn OFF' : 'Turn ON'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs text-slate-400">Settings save automatically to device storage</span>
              <button
                type="button"
                onClick={() => setIsSectionManagerOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Admin Why Consider Answers Editor Modal */}
      {isAdmin && isWhyConsiderEditorOpen && (
        <div className="fixed inset-0 z-[85] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Edit "Why Consider" Answers & Highlights</h3>
                  <p className="text-xs text-slate-400">Customize paragraphs and builder selling points for {project.title}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsWhyConsiderEditorOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWhyConsider} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Section Headline / Question
                </label>
                <input
                  type="text"
                  required
                  value={editWhyTitle}
                  onChange={(e) => setEditWhyTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 font-bold"
                  placeholder={`Why consider ${project.title}?`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Answers & Selling Points (Paragraphs)
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditWhyParagraphs(DEFAULT_WHY_CONSIDER_POINTS.join('\n\n'))}
                    className="text-[11px] font-bold text-indigo-400 hover:underline cursor-pointer"
                  >
                    Reset to Default Paragraphs
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Enter each answer or selling point as a paragraph (press Enter to separate points):
                </p>
                <textarea
                  rows={8}
                  required
                  value={editWhyParagraphs}
                  onChange={(e) => setEditWhyParagraphs(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-white outline-none focus:border-indigo-500 font-medium leading-relaxed resize-y"
                  placeholder="Easily find Zen with yoga spaces and vast green covers.&#10;&#10;Vastu compliant spacious homes with modern amenities.&#10;&#10;Excellent connectivity to major IT hubs and transit."
                />
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-indigo-300">💡 Super Admin Formatting Tip:</p>
                <p>The top 3 paragraphs will be highlighted in the sidebar card, and all paragraphs will appear in the "View all highlights" drawer.</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsWhyConsiderEditorOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 cursor-pointer"
                >
                  Save Answers & Paragraphs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BrochureModal 
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        project={project}
      />

      <SiteVisitModal 
        isOpen={isSiteVisitModalOpen} 
        onClose={() => setIsSiteVisitModalOpen(false)} 
        project={project} 
      />
    </div>
  );
};
