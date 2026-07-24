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
import { Home as HomeIcon, CheckCircle2, Search } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <div className="relative flex items-center justify-center">
              <HomeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-700" strokeWidth={2.5} />
              <div className="absolute -bottom-0 -right-0 bg-white rounded-full">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" fill="currentColor" stroke="white" />
              </div>
            </div>
            <span className="text-[17px] sm:text-[22px] font-extrabold text-gray-900 tracking-tight ml-0.5 sm:ml-1 leading-none">
              Homes & Rents
            </span>
          </Link>
          <div className="flex items-center flex-shrink-0">
            {!user && (
              <button 
                onClick={onLoginClick}
                className="text-[13px] sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors mr-2 sm:mr-4 whitespace-nowrap"
              >
                <span className="sm:hidden">Login</span>
                <span className="hidden sm:inline">Login / Signup</span>
              </button>
            )}
            <Link to="/post" className="flex items-center gap-1.5 bg-[#8b45f7] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[12px] sm:text-sm whitespace-nowrap">
              <span>List</span>
              <span className="bg-white/30 text-white text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded shadow-sm">FREE</span>
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

const TAGLINES = [
  "Verified homes. Zero confusion. Faster decisions.",
  "Helping Bangalore Find Home.",
  "Find Your Next Home in Minutes.",
  "Finding Home Should Feel Easy."
];

const SearchHero = ({ activeTab = 'Sale', setActiveTab }: { activeTab?: 'Rent' | 'Sale', setActiveTab?: (tab: 'Rent' | 'Sale') => void }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-3 sm:px-4 pt-3 sm:pt-6 pb-8 sm:pb-12 w-full shadow-2xl relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-600/20 rounded-full blur-[80px] sm:blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/20 rounded-full blur-[80px] sm:blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
      
      <div className="flex flex-col max-w-3xl mx-auto w-full relative z-10">
        
        {/* Popular Hubs Marquee */}
        <div className="mb-4 sm:mb-6 overflow-hidden relative w-full rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-2 sm:p-3 shadow-xl">
          <div className="text-[9px] sm:text-[10px] font-bold text-indigo-200/80 uppercase tracking-[0.2em] mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-300/50"></span>
            <span>Popular Bangalore Hubs</span>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-indigo-300/50"></span>
          </div>
          <div className="flex animate-marquee gap-2 sm:gap-3 w-max items-center">
            {[...['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar'], ...['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar']].map((loc, i) => (
              <span key={i} className="px-3 sm:px-5 py-1 sm:py-2 bg-white/5 hover:bg-white/15 text-indigo-50 text-[11px] sm:text-[13px] font-semibold rounded-xl sm:rounded-2xl whitespace-nowrap flex-shrink-0 border border-white/10 transition-all cursor-default shadow-sm">
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Taglines */}
        <div className="text-center min-h-[60px] sm:min-h-[80px] flex flex-col justify-center items-center mb-4 sm:mb-6">
          <h1 
            key={taglineIndex}
            className="text-xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300 drop-shadow-sm text-center px-1 sm:px-2 tracking-tight leading-tight sm:leading-tight" 
            style={{animation: "fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1)"}}
          >
            {TAGLINES[taglineIndex]}
          </h1>
        </div>

        {/* Feature Tags */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
          <span className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl sm:rounded-2xl text-[10px] sm:text-[13px] font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            <span className="text-emerald-400 text-sm sm:text-lg leading-none">🚆</span> Near Metro
          </span>
          <span className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-pink-500/10 border border-pink-500/20 text-pink-300 rounded-xl sm:rounded-2xl text-[10px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-pink-500"></span>
            </span>
            Zero Brokerage
          </span>
          <span className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-xl sm:rounded-2xl text-[10px] sm:text-[13px] font-bold flex items-center gap-1 sm:gap-1.5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            <span className="text-blue-400 text-sm sm:text-lg leading-none">🛡️</span> Gated Community
          </span>
        </div>

        {/* Action Area (Toggle + Search) */}
        <div className="bg-white/10 backdrop-blur-xl p-2.5 sm:p-5 rounded-2xl sm:rounded-[2rem] border border-white/20 shadow-2xl">
          {/* Toggle */}
          <div className="bg-slate-900/50 p-1 sm:p-1.5 rounded-xl sm:rounded-3xl flex mb-2.5 sm:mb-4 border border-white/5">
            <button 
              onClick={() => setActiveTab?.('Rent')}
              className={`flex-1 rounded-lg sm:rounded-2xl py-2 sm:py-3 font-extrabold text-[13px] sm:text-sm transition-all ${activeTab === 'Rent' ? 'bg-white text-indigo-950 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]' : 'text-indigo-200 hover:text-white hover:bg-white/5'}`}
            >
              Rent homes
            </button>
            <button 
              onClick={() => setActiveTab?.('Sale')}
              className={`flex-1 rounded-lg sm:rounded-2xl py-2 sm:py-3 font-extrabold text-[13px] sm:text-sm transition-all ${activeTab === 'Sale' ? 'bg-white text-indigo-950 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]' : 'text-indigo-200 hover:text-white hover:bg-white/5'}`}
            >
              Buy homes
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl flex items-center px-3 sm:px-6 shadow-inner focus-within:ring-4 focus-within:ring-indigo-500/30 transition-all border border-gray-100">
              <input 
                type="text" 
                placeholder="Search locality..." 
                className="w-full outline-none text-[13px] sm:text-[15px] text-gray-800 bg-transparent placeholder-gray-400 py-2.5 sm:py-4.5 font-semibold" 
              />
            </div>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] flex-shrink-0 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center">
              <Search className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
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
      <SearchHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow w-full relative z-20 -mt-8 sm:-mt-12 px-2 sm:px-0">
        <div className="bg-gray-50 rounded-t-[2rem] pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 pb-6 max-w-5xl mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100">
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
        </div>
      </main>
    </div>
  );
};



const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
