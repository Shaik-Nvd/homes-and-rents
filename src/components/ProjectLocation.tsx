import { MapPin, Bus, Train, GraduationCap, Building2, ShoppingBag } from 'lucide-react';
import { ProjectData } from '../data/projects';

export const ProjectLocation = ({ project }: { project?: ProjectData }) => {
  if (!project) return null;
  // Fallback generic items if there are less than 6 nearby places
  const allNearby = [...project.nearby, "City Center", "Local Market", "General Hospital", "Public School", "Bus Station", "Metro Station"];
  
  const nearbyPlaces = [
    { icon: <Train className="w-4 h-4 text-gray-500" />, name: allNearby[0], distance: '1.2 km', time: '5 mins' },
    { icon: <GraduationCap className="w-4 h-4 text-gray-500" />, name: allNearby[1], distance: '2.5 km', time: '8 mins' },
    { icon: <Building2 className="w-4 h-4 text-gray-500" />, name: allNearby[2], distance: '3.0 km', time: '10 mins' },
    { icon: <ShoppingBag className="w-4 h-4 text-gray-500" />, name: allNearby[3], distance: '4.5 km', time: '15 mins' },
    { icon: <Bus className="w-4 h-4 text-gray-500" />, name: allNearby[4], distance: '0.5 km', time: '2 mins' },
    { icon: <Building2 className="w-4 h-4 text-gray-500" />, name: allNearby[5], distance: '5.0 km', time: '18 mins' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#0a192f] mb-6">Explore Neighborhood</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-[#e5e3df]">
            {/* A simple placeholder for a map */}
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-rose-500" />
              <p className="font-medium">Map View</p>
              <p className="text-xs">{project.subtitle}</p>
            </div>
          </div>
          <button className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-bold shadow-md rounded-md hover:bg-gray-50 transition-colors">
            Get Directions
          </button>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            Key Landmarks
          </h3>
          <ul className="space-y-4">
            {nearbyPlaces.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded">{item.distance}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
