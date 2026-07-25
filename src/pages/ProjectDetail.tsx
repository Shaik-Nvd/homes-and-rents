import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, ChevronRight, ChevronDown, Download, Image as ImageIcon, PlayCircle, X, Info } from 'lucide-react';

export const ProjectDetail = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const allImages = [
    '/GR%20Samskruthi/gr-samskruthi.jpg',
    '/GR%20Samskruthi/Gemini_Generated_Image_netgznnetgznnetg.png',
    '/GR%20Samskruthi/Gemini_Generated_Image_xtui3sxtui3sxtui.png',
    '/GR%20Samskruthi/Gemini_Generated_Image_yxk4kkyxk4kkyxk4.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025156.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025208.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025217.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025231.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025243.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025251.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025300.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025311.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025319.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025328.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025337.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025344.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025352.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025359.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025407.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025456.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025511.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025533.png',
    '/GR%20Samskruthi/Screenshot%202026-07-26%20025547.png'
  ];

  return (
    <div className="bg-white min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 mb-4 sm:mb-6 whitespace-nowrap overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-gray-900 transition-colors cursor-pointer">Projects in Bangalore</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-gray-900 transition-colors cursor-pointer">Sarjapura Attibele Road</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">GR Samskruthi</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
          
          {/* Main Content (Left) */}
          <div className="lg:w-[65%] xl:w-[68%] space-y-6 sm:space-y-8">
            
            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-[250px] sm:h-[300px] md:h-[350px] rounded-lg overflow-hidden" onClick={() => setShowGallery(true)}>
              <div className="sm:col-span-2 relative h-full bg-gray-200 group cursor-pointer">
                <img 
                  src={allImages[0]} 
                  alt="GR Samskruthi" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white font-medium text-sm">
                  <span>All Photos & Videos</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3" /> {allImages.length}
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-2 h-full">
                <div className="h-1/2 relative bg-gray-200 group cursor-pointer overflow-hidden">
                  <img 
                    src={allImages[1]} 
                    alt="Video" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white/90" strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-2 left-2 text-white font-medium text-xs">Videos</div>
                  <div className="absolute bottom-2 right-2 text-white font-medium text-xs flex items-center gap-1">
                    <PlayCircle className="w-3 h-3" /> 3
                  </div>
                </div>
                <div className="h-1/2 relative bg-gray-200 group cursor-pointer overflow-hidden">
                  <img 
                    src={allImages[2]} 
                    alt="Outdoors" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white font-medium text-xs">Outdoors</div>
                  <div className="absolute bottom-2 right-2 text-white font-medium text-xs flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> 4
                  </div>
                </div>
              </div>
            </div>

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 border-b border-gray-100 pb-6">
              <div className="flex gap-4">
                <div className="w-20 h-12 bg-[#1a1a1a] flex items-center justify-center border border-gray-200 rounded shrink-0">
                  <span className="text-[9px] text-white tracking-widest uppercase">GR Samskruthi</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-extrabold text-[#0a192f]">GR Samskruthi</h1>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Sarjapura Attibele Road, Bangalore
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto bg-[#0078d4] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
                View Number
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-[11px] font-medium">
              <span className="bg-[#00d8b6] text-white px-2 py-1 rounded flex items-center gap-1">
                <span className="text-[10px]">✓</span> RERA <Info className="w-3 h-3" />
              </span>
              <span className="bg-[#e6f7ef] text-[#00a859] px-2 py-1 rounded">
                No Brokerage
              </span>
              <span className="bg-[#f0ebf8] text-[#8b45f7] px-2 py-1 rounded flex items-center gap-1">
                <span className="border border-[#8b45f7] rounded-sm p-[1px] text-[8px] leading-none">3D</span> 3D Floor Plans Available
              </span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +10 Top Facilities
              </span>
            </div>

            {/* Construction Status */}
            <div className="bg-[#f2f8fc] rounded-xl p-5 border border-blue-50/50 cursor-pointer group hover:bg-[#ebf4fa] transition-colors flex justify-between items-center">
              <div>
                <p className="text-[11px] text-gray-500 font-bold tracking-wider uppercase mb-2">Construction Status</p>
                <p className="text-[#0a192f] font-bold text-lg">Under Construction</p>
                <p className="text-gray-600 text-sm">Completion in Nov, 2025</p>
              </div>
              <ChevronDown className="w-5 h-5 text-[#0078d4] group-hover:translate-y-0.5 transition-transform" />
            </div>

            {/* Pricing Details */}
            <div className="border-t border-gray-100 pt-8 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 text-[#0a192f] text-2xl font-extrabold">
                    <span>₹ 75.24 - 98.69 L</span>
                    <span className="text-[#0078d4] text-xs font-bold bg-blue-50 px-2 py-0.5 rounded cursor-pointer">+ Charges</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Price Range</p>
                </div>
                <a href="/GR%20Samskruthi/GR%20Samskruthi_Brouchure.pdf" download target="_blank" rel="noreferrer" className="flex items-center gap-1.5 border border-[#0078d4] text-[#0078d4] px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                  Download Brochure
                </a>
              </div>

              <h3 className="text-[#0a192f] font-bold mb-4">2, 3 BHK Apartment</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 2 BHK Card */}
                <div className="border border-blue-100 bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-[#f9faff] px-4 py-3 border-b border-blue-50">
                    <h4 className="text-[#0a192f] font-bold text-sm"><span className="text-[#0078d4]">2 BHK</span> Apartment</h4>
                  </div>
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Super Built-up Area</p>
                      <p className="text-xs text-gray-700 flex items-center gap-1">
                        1075 sqft <span className="text-gray-400">(99.87 sqm)</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-[#0a192f] font-extrabold">₹ 75.24 L</p>
                      <span className="text-[#0078d4] text-[10px] font-bold cursor-pointer">+ Charges</span>
                    </div>
                  </div>
                </div>

                {/* 3 BHK Card */}
                <div className="border border-blue-100 bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-[#f9faff] px-4 py-3 border-b border-blue-50">
                    <h4 className="text-[#0a192f] font-bold text-sm"><span className="text-[#0078d4]">3 BHK</span> Apartment</h4>
                  </div>
                  <div className="p-4 flex flex-col justify-between h-32">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Super Built-up Area</p>
                      <p className="text-xs text-gray-700 flex items-center gap-1">
                        1330 - 1410 sqft <span className="text-gray-400">(123.56 - 130.99 sqm)</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-[#0a192f] font-extrabold">₹ 93.09 - 98.69 L</p>
                      <span className="text-[#0078d4] text-[10px] font-bold cursor-pointer">+ Charges</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[35%] xl:w-[32%] relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Why consider */}
              <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-gray-100 p-6">
                <div className="flex items-start gap-3 mb-6">
                  <div className="text-[#f29f43] mt-1">
                    <Home className="w-6 h-6" fill="currentColor" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0a192f] leading-tight">
                    Why you should consider GR Samskruthi?
                  </h4>
                </div>
                
                <ul className="space-y-5 mb-6 pl-1">
                  <li className="flex items-start gap-3 text-[14px] text-[#3a4556] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                    Easily find Zen with GR Samskruthi's yoga spaces.
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-[#3a4556] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                    Vastu compliant 2 & 3 bhk spacious home with modern amenities
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-[#3a4556] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                    20 min to Electronic City; 10 min to Bommasandra metro.
                  </li>
                </ul>
                
                <button 
                  onClick={() => setShowAllFeatures(true)}
                  className="text-[#0078d4] font-medium text-[15px] hover:underline flex items-center gap-1"
                >
                  View 3 more <span className="text-xl leading-none">&rarr;</span>
                </button>

                {/* Developer Info */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Developed By</p>
                    <p className="text-[15px] font-bold text-[#0a192f]">Gr Constructions Builders</p>
                  </div>
                  <div className="w-20 h-10 flex items-center justify-center opacity-70">
                    <span className="text-xs font-bold uppercase tracking-tighter text-[#f29f43] border border-[#f29f43] px-1 py-0.5 rounded-sm">GR</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {/* Expanded Modal/Drawer for "Why Consider" */}
      {showAllFeatures && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAllFeatures(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="text-[#f29f43] mt-1">
                  <Home className="w-6 h-6" fill="currentColor" />
                </div>
                <h4 className="text-xl font-bold text-[#0a192f] leading-tight">
                  Why you should consider GR Samskruthi?
                </h4>
              </div>
              <button onClick={() => setShowAllFeatures(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-6 pl-1">
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  Easily find Zen with GR Samskruthi's yoga spaces.
                </li>
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  Vastu compliant 2 & 3 bhk spacious home with modern amenities
                </li>
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  20 min to Electronic City; 10 min to Bommasandra metro.
                </li>
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  High-end co-working space within the resident community
                </li>
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  360 ventilation
                </li>
                <li className="flex items-start gap-4 text-[15px] text-[#3a4556] leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  Properties with 100% power backup available
                </li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-white">
              <button className="w-full bg-[#0078d4] text-white py-3.5 rounded-lg font-bold text-[15px] hover:bg-blue-700 transition-colors shadow-sm">
                I'm interested in this project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/50 text-white fixed top-0 w-full z-10">
            <span className="font-medium text-lg">All Photos & Videos ({allImages.length})</span>
            <button onClick={() => setShowGallery(false)} className="hover:text-gray-300 p-2">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-20 pb-10 px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {allImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                  <img src={src} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
