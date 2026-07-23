import { useEffect, useState, useMemo } from 'react';
import { MapPin, Filter, Home as HomeIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedBhks, setSelectedBhks] = useState<string[]>([]);

  useEffect(() => {
    // Parse initial URL params
    const typeParam = searchParams.get('type');
    if (typeParam === 'rent') setSelectedCategories(['For Rent']);
    else if (typeParam === 'buy') setSelectedCategories(['For Sale']);
    
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching properties:', error);
      } else if (data) {
        setProperties(data);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []); // Only run once on mount

  // Client-side filtering
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Category filter
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some(cat => {
          if (cat === 'For Rent' && prop.type?.toLowerCase().includes('rent')) return true;
          if (cat === 'For Sale' && (prop.type?.toLowerCase().includes('sale') || prop.type?.toLowerCase().includes('buy'))) return true;
          if (cat === 'For Lease' && prop.type?.toLowerCase().includes('lease')) return true;
          return false;
        });
        if (!matchesCategory) return false;
      }

      // Location filter
      if (selectedLocations.length > 0) {
        const matchesLocation = selectedLocations.some(loc => 
          prop.location?.toLowerCase().includes(loc.toLowerCase())
        );
        if (!matchesLocation) return false;
      }

      // BHK filter
      if (selectedBhks.length > 0) {
        const matchesBhk = selectedBhks.some(bhk => {
          if (bhk === '4+') return parseInt(prop.bhk) >= 4;
          return parseInt(prop.bhk) === parseInt(bhk);
        });
        if (!matchesBhk) return false;
      }

      return true;
    });
  }, [properties, selectedCategories, selectedLocations, selectedBhks]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleBhk = (bhk: string) => {
    setSelectedBhks(prev => 
      prev.includes(bhk) ? prev.filter(b => b !== bhk) : [...prev, bhk]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-fit md:sticky md:top-24">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 uppercase text-xs tracking-wider">Categories</h3>
            <div className="space-y-2">
              {['For Rent', 'For Sale', 'For Lease'].map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  /> {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 uppercase text-xs tracking-wider">Locations in Bangalore</h3>
            <div className="space-y-2">
              {['Koramangala', 'Whitefield', 'Indiranagar', 'HSR Layout', 'Jayanagar', 'Malleshwaram'].map(loc => (
                <label key={loc} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  /> {loc}
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3 uppercase text-xs tracking-wider">Bedrooms</h3>
            <div className="flex gap-2 flex-wrap">
              {['1', '2', '3', '4+'].map(bhk => (
                <button 
                  key={bhk} 
                  onClick={() => toggleBhk(bhk)}
                  className={`px-3 py-1 border rounded-md text-sm transition-colors ${selectedBhks.includes(bhk) ? 'bg-primary text-white border-primary' : 'hover:bg-primary hover:text-white hover:border-primary'}`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Properties in Bangalore</h1>
            <p className="text-gray-500">{loading ? 'Loading...' : `${filteredProperties.length} results found`}</p>
          </div>
          {loading ? (
             <div className="text-center py-12 text-gray-500">Loading properties...</div>
          ) : filteredProperties.length === 0 ? (
             <div className="text-center py-12 text-gray-500">No properties found matching your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <Link to={`/property/${property.id}`} key={property.id} className="block group">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
