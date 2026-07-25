import { Dumbbell, Waves, ShieldCheck, Car, TreePine, Coffee } from 'lucide-react';

export const ProjectAmenities = () => {
  const amenities = [
    { icon: <Dumbbell className="w-6 h-6 text-indigo-500" />, label: 'Gymnasium' },
    { icon: <Waves className="w-6 h-6 text-blue-500" />, label: 'Swimming Pool' },
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, label: '24/7 Security' },
    { icon: <Car className="w-6 h-6 text-gray-700" />, label: 'Covered Parking' },
    { icon: <TreePine className="w-6 h-6 text-green-600" />, label: 'Landscaped Gardens' },
    { icon: <Coffee className="w-6 h-6 text-orange-500" />, label: 'Clubhouse' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0a192f]">Top Facilities</h2>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View all 15+</a>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-gray-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors text-center group cursor-pointer">
            <div className="bg-gray-50 group-hover:bg-white p-3 rounded-full transition-colors shadow-sm">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
