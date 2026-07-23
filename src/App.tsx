import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, MapPin, User, PlusCircle, Building2, Home as HomeIcon } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SearchPage } from './pages/Search';
import { PropertyDetail } from './pages/PropertyDetail';
import { PostProperty } from './pages/PostProperty';
import { supabase } from './lib/supabase';

// Mock Data removed, using Supabase

const Navbar = () => (
  <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">Homes and Rents</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span className="font-medium hidden sm:block">Login</span>
          </div>
          <Link to="/post" className="flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white px-5 py-2 rounded-full font-medium transition-colors shadow-md">
            <PlusCircle className="h-5 w-5" />
            <span className="hidden sm:block">SELL / RENT</span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const SearchHero = () => (
  <div className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Find your next home in Bangalore
      </h1>
      <div className="bg-white p-2 rounded-full flex flex-col sm:flex-row items-center gap-2 shadow-lg">
        <div className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200 w-full sm:w-1/3">
          <MapPin className="text-gray-400 h-5 w-5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Area, Landmark or Project" 
            className="w-full outline-none text-gray-700 bg-transparent"
            defaultValue="Bangalore"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-3 w-full sm:w-2/3">
          <Search className="text-gray-400 h-5 w-5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search for '2BHK in Whitefield'" 
            className="w-full outline-none text-gray-700 bg-transparent"
          />
          <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-hover transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PropertyCard = ({ property }: { property: any }) => (
  <Link to={`/property/${property.id}`} className="block group">
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
          {property.type}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1">
          <HomeIcon className="h-3 w-3" /> {property.bhk} BHK
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{property.price}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{property.title}</p>
        <div className="flex items-center text-gray-500 text-xs mt-auto">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {property.location}
        </div>
      </div>
    </div>
  </Link>
);

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) {
        console.error('Error fetching properties:', error);
      } else if (data) {
        setProperties(data);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchHero />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fresh recommendations</h2>
            <p className="text-gray-500 mt-1">Properties handpicked for you in Bangalore</p>
          </div>
          <Link to="/search" className="text-secondary font-medium hover:underline text-sm hidden sm:block">View All</Link>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No properties found. Connect your database to see listings!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/post" element={<PostProperty />} />
        <Route path="*" element={<div className="p-12 text-center text-xl">Page Under Construction</div>} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
