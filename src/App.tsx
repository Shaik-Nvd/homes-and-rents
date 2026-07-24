import { useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: '2rem', color: 'red'}}><h1>Something went wrong.</h1><pre>{this.state.error?.toString()}</pre></div>;
    }
    return this.props.children;
  }
}
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Building2, Home as HomeIcon, CheckCircle2, Search, Menu } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SearchPage } from './pages/Search';
import { PropertyDetail } from './pages/PropertyDetail';
import { PostProperty } from './pages/PostProperty';
import { supabase } from './lib/supabase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import excelProperties from './data/excelProperties.json';

// Mock Data removed, using Supabase

const Navbar = () => {
  const { user, signOut } = useAuth();
  
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-1">
            <div className="relative flex items-center justify-center">
              <HomeIcon className="h-8 w-8 text-indigo-700" strokeWidth={2.5} />
              <div className="absolute -bottom-0 -right-0 bg-white rounded-full">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" fill="currentColor" stroke="white" />
              </div>
            </div>
            <span className="text-[22px] font-extrabold text-gray-900 tracking-tight ml-1">
              Homes & Rents
            </span>
          </Link>
          <div className="flex items-center">
            <Link to="/post" className="flex items-center gap-1.5 bg-[#8b45f7] text-white px-4 py-2 rounded-xl font-bold text-sm">
              <span>List</span>
              <span className="bg-white/30 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">FREE</span>
            </Link>
            {user && (
              <div className="items-center gap-4 hidden sm:flex ml-4">
                <span className="text-sm font-medium text-gray-600">{user.email}</span>
                <button onClick={signOut} className="text-sm text-gray-500 hover:text-gray-800 font-medium">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const SearchHero = () => {
  return (
    <div className="bg-white px-4 pt-4 pb-2 flex flex-col max-w-lg mx-auto w-full">
      {/* Popular Hubs */}
      <div className="text-center">
        <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <span>Popular Bangalore Hubs</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="flex animate-marquee gap-2 pb-2 w-max">
            {[...['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar'], ...['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar']].map((loc, i) => (
              <span key={i} className="px-3 py-1 bg-[#1a202c] text-white text-xs rounded-full whitespace-nowrap flex-shrink-0">
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mt-3">
        <h1 className="text-2xl font-extrabold text-gray-600 shadow-sm" style={{textShadow: "0px 1px 1px rgba(0,0,0,0.2)"}}>
          Helping Bangalore Find Home.
        </h1>
        <div className="flex justify-center flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 bg-[#2d3748] text-white rounded-full text-xs font-semibold flex items-center gap-1">
            🚆 Near Metro
          </span>
          <span className="px-3 py-1 bg-[#2d3748] text-white rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span> Zero Brokerage
          </span>
          <span className="px-3 py-1 bg-[#2d3748] text-white rounded-full text-xs font-semibold flex items-center gap-1">
            🛡️ Gated Community
          </span>
        </div>
      </div>

      {/* Toggle */}
      <div className="mt-5 bg-[#4a5568] p-1 rounded-2xl flex">
        <button className="flex-1 bg-white text-gray-900 rounded-xl py-3 font-bold text-sm shadow-sm">
          Rent homes
        </button>
        <button className="flex-1 text-white rounded-xl py-3 font-bold text-sm">
          Buy homes
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-4 flex gap-2">
        <div className="flex-1 border border-gray-200 rounded-xl flex items-center px-4 bg-white shadow-sm">
          <input 
            type="text" 
            placeholder="Search by locality or landmark" 
            className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400" 
          />
        </div>
        <button className="bg-[#fb4b62] text-white p-3 rounded-xl shadow-sm flex-shrink-0">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Banner */}
      <div className="mt-5 bg-[#5c473b] rounded-2xl p-4 pr-32 relative overflow-hidden text-white shadow-md">
        <div className="z-10 relative">
          <h3 className="font-bold text-sm mb-2 text-white/90">Looking for Tenants / Buyers ?</h3>
          <ul className="text-xs space-y-1.5 mb-4 text-white/80">
            <li className="flex items-center gap-1.5">⚡ Faster & Verified Tenants/Buyers</li>
            <li className="flex items-center gap-1.5">◉ Pay ZERO brokerage</li>
          </ul>
          <Link to="/post" className="inline-block bg-[#fb4b62] hover:bg-[#e84155] text-white text-sm font-bold py-2 px-4 rounded-xl shadow-sm transition-colors">
            Post FREE Property Ad
          </Link>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-32 flex items-end">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/hand-giving-house-key-5147822-4301540.png" alt="House Keys" className="w-full object-contain -mr-4 -mb-2" />
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
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-extrabold text-[#0a192f] tracking-tight">
            Recommended Properties
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">
            Curated especially for you
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

const BottomNav = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden pb-safe">
    <div className="flex justify-between px-8 py-3">
      <Link to="/" className="flex flex-col items-center gap-1 text-[#1a202c]">
        <HomeIcon className="h-6 w-6" strokeWidth={2} />
        <span className="text-[11px] font-medium">Home</span>
      </Link>
      <Link to="/search?type=buy" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
        <Building2 className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-[11px] font-medium">Buy</span>
      </Link>
      <Link to="/search?type=rent" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
        <Building2 className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-[11px] font-medium">Rent</span>
      </Link>
      <button onClick={onMenuClick} className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
        <Menu className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-[11px] font-medium">Menu</span>
      </button>
    </div>
  </div>
);

const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans pb-16 sm:pb-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/post" element={<PostProperty />} />
          <Route path="*" element={<div className="p-12 text-center text-xl">Page Under Construction</div>} />
        </Routes>
        <BottomNav onMenuClick={() => setIsAuthModalOpen(true)} />
        <Analytics />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
