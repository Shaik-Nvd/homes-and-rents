import { useState } from 'react';

export const ProjectFloorPlans = () => {
  const [activeTab, setActiveTab] = useState('2bhk');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0a192f]">Floor Plan & Pricing</h2>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Download all plans</a>
      </div>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('2bhk')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === '2bhk' ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          2 BHK
        </button>
        <button 
          onClick={() => setActiveTab('3bhk')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === '3bhk' ? 'border-[#0078d4] text-[#0078d4]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          3 BHK
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex justify-center items-center h-48 overflow-hidden relative cursor-pointer group">
          <img 
            src="/GR%20Samskruthi/Screenshot%202026-07-26%20025251.png" 
            alt="Floor Plan" 
            className="w-full h-full object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-md">Enlarge</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            {activeTab === '2bhk' ? '2 BHK Apartment' : '3 BHK Apartment'}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Super Built-up Area</p>
              <p className="font-bold text-[#0a192f]">{activeTab === '2bhk' ? '1000 sq.ft.' : '1450 sq.ft.'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Price</p>
              <p className="font-bold text-[#0a192f] text-xl">{activeTab === '2bhk' ? '₹ 55 L - 60 L' : '₹ 75 L - 82 L'}</p>
            </div>
            <button className="bg-blue-50 text-[#0078d4] font-bold py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors self-start text-sm">
              Price Breakup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
