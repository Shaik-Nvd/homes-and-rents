import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

interface LocationSeoPageProps {
  type: 'rent' | 'sale';
}

export const LocationSeoPage = ({ type }: LocationSeoPageProps) => {
  const { location } = useParams<{ location: string }>();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Format the URL slug back into a readable location name
  // e.g., "hsr-layout" -> "HSR Layout"
  const formattedLocation = location
    ? location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Bangalore';

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let dbFiltered: any[] = [];
        
        // Query properties matching the location from Supabase
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .ilike('location', `%${formattedLocation.split(' ')[0]}%`)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          dbFiltered = data.filter(prop => {
            const propType = prop.type?.toLowerCase() || '';
            if (type === 'rent' && propType.includes('rent')) return true;
            if (type === 'sale' && (propType.includes('sale') || propType.includes('buy'))) return true;
            return false;
          }).map(item => ({
            id: item.id?.toString(),
            title: item.title || 'Untitled Property',
            subtitle: `${item.bhk || 2} BHK in ${item.location || formattedLocation}`,
            priceConfigs: [{ label: item.type === 'Rent' ? 'Rent' : 'Price', price: item.price || 'Contact for price' }],
            nearby: [],
            builder: 'Individual Owner',
            status: 'Ready to Move',
            imageSrc: (item.images && item.images.length > 0) ? item.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600',
            imageCount: item.images?.length?.toString() || '1',
            tag: item.type === 'Rent' ? 'Rent' : 'Sale',
            badges: ['Verified'],
            description: item.description,
            galleryImages: item.images || []
          }));
        }

        // Get local mock data
        const locSearch = formattedLocation.split(' ')[0].toLowerCase();
        const localFiltered = projects.filter(prop => {
            const matchesLoc = prop.subtitle?.toLowerCase().includes(locSearch) || prop.title.toLowerCase().includes(locSearch);
            if (!matchesLoc) return false;

            const isRent = prop.tag === 'Rent' || prop.priceConfigs?.some(c => c.label.toLowerCase().includes('rent'));
            if (type === 'rent' && isRent) return true;
            if (type === 'sale' && !isRent) return true;
            return false;
        });

        setProperties([...localFiltered, ...dbFiltered]);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    if (formattedLocation) {
      fetchProperties();
    }
  }, [formattedLocation, type]);

  const pageTitle = type === 'rent' 
    ? `Flats for Rent in ${formattedLocation}, Bangalore | Homes and Rents`
    : `Properties for Sale in ${formattedLocation}, Bangalore | Homes and Rents`;

  const pageDescription = type === 'rent'
    ? `Find the best flats and apartments for rent in ${formattedLocation}, Bangalore. Browse verified listings without brokerage on Homes and Rents.`
    : `Explore premium properties, flats, and villas for sale in ${formattedLocation}, Bangalore. Best real estate investments on Homes and Rents.`;

  const headerTitle = type === 'rent'
    ? `Flats & Apartments for Rent in ${formattedLocation}`
    : `Properties for Sale in ${formattedLocation}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${type === 'rent' ? 'rentals' : 'properties'}, flats in ${formattedLocation}, real estate ${formattedLocation} Bangalore, ${formattedLocation} properties`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        {/* Dynamic Schema for the Listing Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "name": pageTitle,
            "description": pageDescription,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": properties.map((prop, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "RealEstateListing",
                  "name": prop.title,
                  "url": `https://homesandrents.com/property/${prop.id}`
                }
              }))
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4 font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-white transition-colors">Bangalore</Link>
            <span>/</span>
            <span className="text-white">{formattedLocation}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{headerTitle}</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found. {pageDescription.split('.')[0]}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-[400px] shadow-sm"></div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <ProjectCard 
                key={property.id} 
                project={property} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HomeIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
              We couldn't find any properties matching your criteria in {formattedLocation}.
            </p>
            <Link 
              to="/search" 
              className="inline-flex bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
            >
              Explore All Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
