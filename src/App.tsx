import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, User, Building2, Home as HomeIcon } from 'lucide-react';
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
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 transition-colors shadow-sm border border-indigo-500">
              <HomeIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
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
    }, 4000); // Change tagline every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-[450px] flex flex-col justify-center items-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Rotating Tagline */}
        <div className="min-h-[100px] md:min-h-[80px] flex items-center justify-center mb-8">
          <h1 
            key={taglineIndex} 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl tracking-tight animate-fade-in-up"
            style={{ animation: 'fadeInUp 0.8s ease-out' }}
          >
            {TAGLINES[taglineIndex]}
          </h1>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl flex items-center shadow-2xl border border-white/20 transform transition-all duration-300 hover:shadow-indigo-500/20 hover:scale-[1.01]">
          <Search className="text-gray-400 h-6 w-6 ml-4 mr-3 flex-shrink-0" />
          <input 
            type="text" 
            placeholder='Search "Raj High Gardens Hosur Road ..."'
            className="w-full outline-none text-gray-800 py-4 text-base sm:text-lg bg-transparent font-medium placeholder-gray-400"
          />
          <button className="p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex-shrink-0 shadow-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center text-sm font-medium text-white/90 whitespace-nowrap drop-shadow-md">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Recent Search
          </div>
          <span className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors shadow-lg">Rent in Bangalore Central</span>
          <span className="bg-white/10 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors shadow-lg">All Recent Searches</span>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }: { property: any }) => (
  <Link to={`/property/${property.id}`} className="block group w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow relative h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 left-2 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
          ✓ Verified
        </div>
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
        
        <div className="absolute bottom-2 left-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 max-w-[90%]">
          <div className="font-bold text-gray-900 truncate">{property.price}</div>
          <div className="text-[10px] text-gray-500">Deposit - 6 month(s) rent</div>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{property.bhk} BHK {property.propertyType || 'Residential Apartment'}</h3>
        <p className="text-gray-500 text-xs mb-3 truncate">In {property.location}</p>
        <div className="text-gray-400 text-[10px] mt-auto">
          Posted by Owner <span className="text-green-600 font-medium">Just now</span>
        </div>
      </div>
    </div>
  </Link>
);

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

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
    <div className="flex justify-between px-6 py-2">
      <Link to="/" className="flex flex-col items-center gap-1 text-gray-900">
        <HomeIcon className="h-5 w-5" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center gap-1 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        <span className="text-[10px] font-medium">Buy Homes</span>
      </Link>
      <Link to="/search" className="flex flex-col items-center gap-1 text-gray-500">
        <Building2 className="h-5 w-5" />
        <span className="text-[10px] font-medium">Rent Homes</span>
      </Link>
      <button className="flex flex-col items-center gap-1 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        <span className="text-[10px] font-medium">Menu</span>
      </button>
    </div>
  </div>
);

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
        <BottomNav />
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
