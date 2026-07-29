import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, Heart, ChevronRight, Download, Image as ImageIcon, X, Info, ChevronLeft, Building2, Wallet } from 'lucide-react';
import { ProjectOverview } from '../components/ProjectOverview';
import { ProjectFloorPlans } from '../components/ProjectFloorPlans';
import { ProjectAmenities } from '../components/ProjectAmenities';
import { ProjectAbout } from '../components/ProjectAbout';
import { ProjectLocation } from '../components/ProjectLocation';
import { ProjectReviews } from '../components/ProjectReviews';
import { SiteVisitModal } from '../components/SiteVisitModal';
import { projects } from '../data/projects';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

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

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    const text = `Hi, I am interested in ${project.title}. My name is ${formData.name} and my contact number is ${formData.phone}. Please share the details and images.`;
    window.open(`https://wa.me/919739063840?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] min-h-[500px]">
        {!imageFailed ? (
          <img 
            src={allImages[0]} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 pt-10 pb-28 px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl w-full max-w-md shadow-2xl z-20 relative">
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
            
            {/* Construction Status & Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
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
                    <a href={`https://wa.me/919739063840?text=Hi%2C%20I%20would%20like%20to%20request%20the%20brochure%20for%20${encodeURIComponent(project.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md">
                      <Download className="w-3.5 h-3.5" /> Get Brochure
                    </a>
                 </div>
              </div>
            </div>

            {/* Pricing Details List */}
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
                        <span className="text-blue-700 bg-blue-50 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100">Details</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Sections */}
            <div className="flex flex-col gap-12 mt-4">
              <ProjectOverview />
              <ProjectFloorPlans project={project} />
              <ProjectAmenities />
              <ProjectAbout project={project} />
              <ProjectLocation project={project} />
              <ProjectReviews />
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[35%] xl:w-[32%] relative mt-8 lg:mt-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Why consider */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="flex items-start gap-3 mb-8">
                  <div className="text-orange-500 mt-1 bg-orange-50 p-2 rounded-xl">
                    <Home className="w-5 h-5" fill="currentColor" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 leading-tight">
                    Why consider {project.title}?
                  </h4>
                </div>
                
                <ul className="space-y-5 mb-8">
                  <li className="flex items-start gap-4 text-[14px] text-slate-600 font-medium leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 ring-4 ring-slate-100"></span>
                    Easily find Zen with yoga spaces and vast green covers.
                  </li>
                  <li className="flex items-start gap-4 text-[14px] text-slate-600 font-medium leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 ring-4 ring-slate-100"></span>
                    Vastu compliant spacious homes with modern amenities.
                  </li>
                  <li className="flex items-start gap-4 text-[14px] text-slate-600 font-medium leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0 ring-4 ring-slate-100"></span>
                    Excellent connectivity to major IT hubs and transit.
                  </li>
                </ul>
                
                <button 
                  onClick={() => setShowAllFeatures(true)}
                  className="w-full text-blue-600 font-bold text-[14px] hover:text-blue-800 bg-blue-50/50 hover:bg-blue-50 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  View all highlights <ChevronRight className="w-4 h-4" />
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
                <h4 className="text-xl font-black text-slate-900 leading-tight">
                  Why you should consider {project.title}?
                </h4>
              </div>
              <button onClick={() => setShowAllFeatures(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 bg-white rounded-full shadow-sm border border-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <ul className="space-y-6">
                {[
                  "Easily find Zen with dedicated yoga and meditation spaces.",
                  "Vastu compliant spacious homes with modern amenities.",
                  "Prime connectivity to major hubs, schools, and hospitals.",
                  "High-end co-working spaces within the resident community.",
                  "360-degree ventilation for abundant natural light and air.",
                  "24/7 security with 100% power backup available."
                ].map((feature, idx) => (
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

      <SiteVisitModal 
        isOpen={isSiteVisitModalOpen} 
        onClose={() => setIsSiteVisitModalOpen(false)} 
        project={project} 
      />
    </div>
  );
};
