import React, { useState } from 'react';
import { Heart, Download, Info } from 'lucide-react';

export const ProjectCard = () => {
  const [showMoreNearby, setShowMoreNearby] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Left Side: Image Container */}
      <div className="relative h-64 md:h-auto md:w-[40%] flex-shrink-0 bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
          alt="GR Samskruthi"
          className="w-full h-full object-cover"
        />
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="bg-[#0b1b32] text-[#00d8b6] text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <Info className="w-3 h-3" /> RERA
          </span>
          <span className="bg-[#0b1b32] text-[#c9a0ff] text-[10px] font-bold px-2 py-1 rounded">
            ZERO BROKERAGE
          </span>
          <span className="bg-[#0b1b32] text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            3D <div className="w-2 h-2 border border-white ml-0.5"></div>
          </span>
        </div>
        <div className="absolute top-9 left-3">
          <span className="bg-[#0b1b32] text-white text-[10px] font-bold px-2 py-1 rounded">
            SEEN
          </span>
        </div>
        {/* Heart Icon */}
        <div className="absolute top-3 right-3">
          <button className="text-white hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
        {/* Bottom Status */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-2 px-3">
          <p className="text-white text-xs font-medium">
            Under Construction · Completion in Nov, 2025
          </p>
        </div>
      </div>

      {/* Right Side: Content Container */}
      <div className="flex-1 flex flex-col p-4 md:p-5 relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-[22px] font-extrabold text-[#0a192f] leading-tight">
              GR Samskruthi
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold text-gray-900">2, 3 BHK Apartment</span> in Sarjapura Attibele Road, Bangalore
            </p>
          </div>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">
            NEW BOOKING
          </span>
        </div>

        {/* Pricing Config */}
        <div className="flex gap-8 mt-4 mb-5">
          <div>
            <p className="text-xs text-gray-500 mb-1">2 BHK Apartment</p>
            <p className="text-base font-bold text-[#0a192f]">₹75.24 L</p>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div>
            <p className="text-xs text-gray-500 mb-1">3 BHK Apartment</p>
            <p className="text-base font-bold text-[#0a192f]">₹93.09 - 98.69 L</p>
          </div>
        </div>

        {/* Nearby */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm relative">
          <span className="text-[#0a192f] font-semibold">Nearby :</span>
          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">SH 35</span>
          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">Sri Sai Hospitals, Attibele</span>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowMoreNearby(true)}
            onMouseLeave={() => setShowMoreNearby(false)}
          >
            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs cursor-pointer hover:bg-gray-200 transition-colors">
              +3
            </span>
            
            {showMoreNearby && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-3 z-10 flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">Jnana Jyoti Public School</span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">SRT Mall</span>
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs">Anthivadi Stadium</span>
              </div>
            )}
          </div>
        </div>

        {/* Spacer to push footer to bottom on large cards */}
        <div className="flex-grow"></div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 -mx-4 -mb-4 p-4 md:-mx-5 md:-mb-5 md:p-5 rounded-b-2xl md:rounded-br-2xl md:rounded-bl-none">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Builder</p>
            <p className="text-sm font-semibold text-[#0a192f]">GR Constructions</p>
          </div>
          
          <div className="flex w-full sm:w-auto gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4" strokeWidth={2.5} />
              Brochure
            </button>
            <button className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm">
              View Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
