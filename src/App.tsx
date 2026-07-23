import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { User, Building2, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SearchPage } from './pages/Search';
import { PropertyDetail } from './pages/PropertyDetail';
import { PostProperty } from './pages/PostProperty';
import { supabase } from './lib/supabase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import excelProperties from './data/excelProperties.json';

// Mock Data removed, using Supabase

const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const { user, signOut } = useAuth();
  
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center">
              <HomeIcon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" strokeWidth={2} />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" fill="currentColor" stroke="white" />
              </div>
            </div>
            <span className="font-jakarta text-2xl font-extrabold text-gray-900 tracking-tight ml-1">
              Homes & Rents
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/post" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm">
              <span className="hidden sm:inline">List Property</span>
              <span className="sm:hidden">List</span>
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider backdrop-blur-sm">Free</span>
            </Link>
            {user ? (
              <div className="flex items-center gap-4 hidden sm:flex">
                <span className="text-sm font-medium text-gray-600">{user.email}</span>
                <button onClick={signOut} className="text-sm text-gray-500 hover:text-gray-800 font-medium">Logout</button>
              </div>
            ) : (
              <div onClick={onLoginClick} className="hidden sm:flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="font-medium">Login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const TAGLINES = [
  "Verified homes. Zero confusion. Faster decisions.",
  "Helping Bangalore Find Home.",
  "Find Your Next Home in Minutes.",
  "Finding Home Should Feel Easy.",
  "Find the Place You'll Love Coming Back To."
];

const SearchHero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-[500px] flex flex-col justify-center items-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000" 
          alt="Bangalore Skyline" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-gray-900/90"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-8">
        <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Find Verified Homes in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Bangalore.</span>
        </h1>
        
        <div className="min-h-[40px] mb-10">
          <p 
            key={taglineIndex}
            className="text-lg md:text-xl text-gray-300 font-medium animate-fade-in-up"
            style={{ animation: 'fadeInUp 0.8s ease-out' }}
          >
            {TAGLINES[taglineIndex]}
          </p>
        </div>

      {/* Quick-Choice Intent Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md border border-white/10">
          <Link to="/search?type=rent" className="px-4 py-1.5 bg-white text-gray-900 font-bold rounded-lg shadow-sm text-sm">Rent</Link>
          <Link to="/search?type=buy" className="px-4 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm">Buy</Link>
          <Link to="/search?type=commercial" className="px-4 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm">Commercial</Link>
        </div>
        <div className="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md border border-white/10">
          <Link to="/search?type=family" className="px-4 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm">Family</Link>
          <Link to="/search?type=bachelor" className="px-4 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm">Bachelor / Co-living</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md border border-white/10">
          <Link to="/search?amenities=furnished" className="px-3 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-1">🛋️ Fully Furnished</Link>
          <Link to="/search?amenities=gated" className="px-3 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-1">🛡️ Gated Community</Link>
          <Link to="/search?amenities=metro" className="px-3 py-1.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-1">🚇 Near Metro</Link>
          <Link to="/search?brokerage=zero" className="px-3 py-1.5 text-emerald-400 font-bold hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-1">🟢 Zero Brokerage</Link>
        </div>
      </div>

      {/* Locality Chips */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Popular Bangalore Hubs</div>
        <div className="flex overflow-x-auto gap-2 pb-2 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar'].map(loc => (
            <Link to={`/search?location=${encodeURIComponent(loc)}`} key={loc} className="px-4 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs rounded-full border border-gray-700 cursor-pointer transition-colors whitespace-nowrap snap-start">
              {loc}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

// Mock Generator for specific Bangalore data since the DB doesn't have it yet
const getMockData = (id: string) => {
  const hash = id.toString().length;
  const isZeroBrokerage = hash % 2 === 0;
  const metroDist = (hash % 10) + 2;
  const pets = hash % 3 === 0 ? 'Pets Allowed 🐶' : 'No Pets 🚫';
  const parking = hash % 2 !== 0 ? 'Covered Parking 🚗' : 'Street Parking';
  return { isZeroBrokerage, metroDist, pets, parking };
};

const PropertyCard = ({ property }: { property: any }) => {
  const mockData = getMockData(property.id);
  
  return (
    <Link to={`/property/${property.id}`} className="block group w-[300px] sm:w-[340px] flex-shrink-0 snap-start">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all relative h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center shadow-md">
              Owner Verified ✅
            </div>
            {mockData.isZeroBrokerage && (
              <div className="bg-white/95 text-emerald-600 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center shadow-md border border-emerald-100">
                Zero Brokerage 🟢
              </div>
            )}
          </div>
          
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-gray-100">
            <div className="font-extrabold text-gray-900">{property.price}</div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-gray-900 text-[15px] mb-1 line-clamp-1">{property.bhk} BHK {property.propertyType || 'Apartment'}</h3>
          <p className="text-gray-500 text-xs mb-4 truncate font-medium">{property.location}</p>
          
          {/* Micro Specs */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
              <span className="text-indigo-600">🚇</span> {mockData.metroDist} mins to Metro
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
              <span className="text-indigo-600">🛜</span> Fiber Ready
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
              <span>{mockData.pets.includes('Allowed') ? '🐶' : '🚫'}</span> {mockData.pets.replace(/🐶|🚫/, '')}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-medium">
              <span>{mockData.parking.includes('Covered') ? '🚗' : '🅿️'}</span> {mockData.parking.replace(/🚗/, '')}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
              Call Owner
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 999999;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Rent' | 'Sale'>('Sale'); // Default to Sale as requested
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const handleTabChange = (e: any) => setActiveTab(e.detail);
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.warn("Location access denied or error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('type', activeTab)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching properties:', error);
      }
      
      const localData = excelProperties.filter(p => p.type === activeTab);
      const combinedData = [...(data || []), ...localData];

      if (combinedData.length > 0) {
        if (userLocation) {
          const sorted = [...combinedData].sort((a, b) => {
             const distA = getDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
             const distB = getDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
             return distA - distB;
          });
          setProperties(sorted);
        } else {
          setProperties(combinedData);
        }
      } else {
        setProperties([]);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [activeTab, userLocation]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchHero />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Recently posted properties
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {userLocation ? `Closest ${activeTab === 'Rent' ? 'rentals' : 'properties for sale'} based on your location` : `Fresh properties, be quick before they rent out`}
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No properties found. Connect your database to see listings!</div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {properties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const BottomNav = ({ onMenuClick, user }: { onMenuClick: () => void, user: any }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden pb-safe">
    <div className="flex justify-between px-6 py-2">
      <Link to="/" className="flex flex-col items-center gap-1 text-gray-900">
        <HomeIcon className="h-5 w-5" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center gap-1 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        <span className="text-[10px] font-medium">Buy</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center gap-1 text-gray-500">
        <Building2 className="h-5 w-5" />
        <span className="text-[10px] font-medium">Rent</span>
      </Link>
      <button onClick={onMenuClick} className="flex flex-col items-center gap-1 text-gray-500">
        <User className="h-5 w-5" />
        <span className="text-[10px] font-medium">{user ? 'Profile' : 'Login'}</span>
      </button>
    </div>
  </div>
);

const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans pb-16 sm:pb-0">
        <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/post" element={<PostProperty />} />
          <Route path="*" element={<div className="p-12 text-center text-xl">Page Under Construction</div>} />
        </Routes>
        <BottomNav onMenuClick={() => setIsAuthModalOpen(true)} user={user} />
        <Analytics />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
