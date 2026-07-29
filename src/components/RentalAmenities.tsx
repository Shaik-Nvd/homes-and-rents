import { 
  Tv, 
  Power, 
  Lightbulb, 
  Fan, 
  Thermometer, 
  WashingMachine, 
  Zap, 
  ParkingCircle, 
  ArrowUpDown, 
  Brush, 
  Droplets, 
  Wifi, 
  Droplet, 
  Microwave, 
  Refrigerator, 
  Sofa 
} from 'lucide-react';

export const RentalAmenities = () => {
  return (
    <div className="bg-white rounded-xl mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-[#0a192f]">Rent Includes</h2>
        <span className="bg-[#1cb09c] text-white text-xs font-semibold px-3 py-1 rounded-full">Amenities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* House */}
        <div className="flex flex-col h-full">
          <div className="bg-[#fee2e2] text-slate-800 font-semibold p-4 rounded-t-lg">House</div>
          <div className="bg-gray-50/30 p-5 border-l border-r border-b border-gray-100 rounded-b-lg space-y-4 flex-grow">
            <div className="flex items-center gap-4"><Tv className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Tv</span></div>
            <div className="flex items-center gap-4"><Power className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Switch</span></div>
            <div className="flex items-center gap-4"><Lightbulb className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Light</span></div>
            <div className="flex items-center gap-4"><Fan className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Fan</span></div>
            <div className="flex items-center gap-4"><Thermometer className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Geyser</span></div>
            <div className="flex items-center gap-4"><WashingMachine className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Washing machine</span></div>
            <div className="flex items-center gap-4"><Zap className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Power backup</span></div>
            <div className="flex items-center gap-4"><ParkingCircle className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Private parking</span></div>
            <div className="flex items-center gap-4 pl-[36px]"><span className="text-[15px] text-gray-700 font-medium">Ventilation</span></div>
            <div className="flex items-center gap-4"><ArrowUpDown className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Lift</span></div>
            <div className="flex items-center gap-4"><Brush className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">House keeping</span></div>
            <div className="flex items-center gap-4"><Droplets className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Supply water</span></div>
            <div className="flex items-center gap-4"><Wifi className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Wifi</span></div>
            <div className="flex items-center gap-4"><Droplet className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Water supply</span></div>
            <div className="flex items-center gap-4 pl-[36px]"><span className="text-[15px] text-gray-700 font-medium">Common dining area</span></div>
          </div>
        </div>

        {/* Living Room */}
        <div className="flex flex-col h-full">
          <div className="bg-[#ede9fe] text-slate-800 font-semibold p-4 rounded-t-lg">Living Room</div>
          <div className="bg-gray-50/30 p-5 border-l border-r border-b border-gray-100 rounded-b-lg space-y-4 flex-grow">
            <div className="flex items-center gap-4"><WashingMachine className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Washing machine</span></div>
            <div className="flex items-center gap-4"><Wifi className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Wifi</span></div>
            <div className="flex items-center gap-4"><Tv className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Tv</span></div>
            <div className="flex items-center gap-4"><Power className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Switch</span></div>
            <div className="flex items-center gap-4"><Lightbulb className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Light</span></div>
            <div className="flex items-center gap-4"><Fan className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Fan</span></div>
            <div className="flex items-center gap-4"><Sofa className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Sofa</span></div>
          </div>
        </div>

        {/* Kitchen */}
        <div className="flex flex-col h-full">
          <div className="bg-[#d1fae5] text-slate-800 font-semibold p-4 rounded-t-lg">Kitchen</div>
          <div className="bg-gray-50/30 p-5 border-l border-r border-b border-gray-100 rounded-b-lg space-y-4 flex-grow">
            <div className="flex items-center gap-4 pl-[36px]"><span className="text-[15px] text-gray-700 font-medium">Ro system</span></div>
            <div className="flex items-center gap-4"><Microwave className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Microwave</span></div>
            <div className="flex items-center gap-4"><Refrigerator className="w-5 h-5 text-gray-600 stroke-[1.5]" /><span className="text-[15px] text-gray-700 font-medium">Fridge</span></div>
            <div className="flex items-center gap-4 pl-[36px]"><span className="text-[15px] text-gray-700 font-medium">Common kitchen with gas</span></div>
          </div>
        </div>

      </div>
    </div>
  );
};
