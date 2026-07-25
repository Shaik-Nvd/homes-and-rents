import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const ProjectDetail = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // In a real app, you would fetch project details by ID here.
  // We're mocking it for 'gr-samskruthi' for now.

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:w-2/3 space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm h-96 relative">
              <img 
                src="/gr-samskruthi.jpg" 
                alt="GR Samskruthi" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mb-2">GR Samskruthi</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Sarjapura Attibele Road, Bangalore
              </p>
              
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-semibold text-[#0a192f]">Under Construction</p>
                  <p className="text-xs text-gray-500 mt-1">Completion in Nov, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Configuration</p>
                  <p className="font-semibold text-[#0a192f]">2, 3 BHK Apartments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-1/3 space-y-6">
            
            {/* Why consider */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start gap-3 mb-5">
                <div className="bg-[#f29f43] p-1.5 rounded-md text-white mt-0.5">
                  <Home className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-[#0a192f] leading-tight">
                  Why you should consider GR Samskruthi?
                </h4>
              </div>
              
              <ul className="space-y-4 mb-4 pl-1">
                <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  Easily find Zen with GR Samskruthi's yoga spaces.
                </li>
                <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  Vastu compliant 2 & 3 bhk spacious home with modern amenities
                </li>
                <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                  20 min to Electronic City; 10 min to Bommasandra metro.
                </li>
                {showAllFeatures && (
                  <>
                    <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                      High-end co-working space within the resident community
                    </li>
                    <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                      360 ventilation
                    </li>
                    <li className="flex items-start gap-3 text-[15px] text-[#3a4556]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5a6a7c] flex-shrink-0"></span>
                      Properties with 100% power backup available
                    </li>
                  </>
                )}
              </ul>
              
              {!showAllFeatures && (
                <button 
                  onClick={() => setShowAllFeatures(true)}
                  className="text-[#0066cc] font-semibold text-[15px] hover:underline flex items-center gap-1 pl-1"
                >
                  View 3 more <span className="text-xl leading-none">&rarr;</span>
                </button>
              )}

              {/* Developer Info */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Developed By</p>
                  <p className="text-lg font-bold text-[#0a192f]">Gr Constructions Builders</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
