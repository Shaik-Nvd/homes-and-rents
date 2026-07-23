import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Home as HomeIcon, CheckCircle2, Phone, MessageSquare, Share2, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Mock property removed

export const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching property:', error);
      } else if (data) {
        setProperty(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen py-12 text-center">Loading property details...</div>;
  }

  if (!property) {
    return <div className="bg-gray-50 min-h-screen py-12 text-center">Property not found.</div>;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col gap-2 p-2">
              <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100">
                <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200'} alt="Main" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-2 h-[200px]">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                   {property.images?.[1] && <img src={property.images[1]} alt="Gallery 1" className="w-full h-full object-cover" />}
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                   {property.images?.[2] && <img src={property.images[2]} alt="Gallery 2" className="w-full h-full object-cover" />}
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.price}</h1>
                  <h2 className="text-xl text-gray-600 mb-2">{property.title}</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4 py-4 border-y my-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg min-w-[100px]">
                  <HomeIcon className="h-6 w-6 text-primary mb-1" />
                  <span className="text-sm font-semibold">{property.bhk} BHK</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg min-w-[100px]">
                  <span className="text-gray-500 text-xs mb-1">Type</span>
                  <span className="text-sm font-semibold">{property.type}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description || 'No description provided.'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Power Backup', 'Lift', 'Security'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seller Details</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                  U
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">User</h4>
                  <p className="text-xs text-gray-500">Member since today</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                  <Phone className="h-5 w-5" />
                  Show Phone Number
                </button>
                <button className="w-full border-2 border-primary text-primary hover:bg-gray-50 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
