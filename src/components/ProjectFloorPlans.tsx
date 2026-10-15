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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div 
          onClick={() => handleWhatsAppInquiry('View Floor Plan')}
          className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-center items-center h-48 overflow-hidden relative cursor-pointer group hover:border-blue-400 hover:bg-blue-50/30 transition-all"
        >
          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-blue-400 rounded bg-gray-50/50 group-hover:bg-blue-50/20 transition-all">
            <span className="text-blue-600 font-bold text-sm mb-1 group-hover:scale-105 transition-transform">Tap to Request Floor Plan</span>
            <span className="text-gray-400 text-xs">Delivered instantly on WhatsApp</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            {activeConfig.label}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Super Built-up Area</p>
              <p className="font-bold text-[#0a192f]">On request</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Price</p>
              <p className="font-bold text-[#0a192f] text-xl">{activeConfig.price}</p>
            </div>
            <button 
              onClick={() => handleWhatsAppInquiry('Price Breakup')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-md shadow-emerald-600/20 transition-all self-start text-sm flex items-center gap-2"
            >
              <span>Get Price Breakup on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
