import React, { useState } from 'react';
import { Upload, X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const PostProperty = () => {
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    type: 'Rent out',
    propertyType: 'Apartment',
    bhk: '2',
    price: '',
    location: '',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload
    if (e.target.files && e.target.files.length > 0) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([...images, url]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data
    const insertData = {
      title: formData.title,
      description: formData.description,
      price: `₹${formData.price} / month`, // Simplification
      location: formData.location,
      bhk: formData.bhk,
      type: formData.type === 'Rent out' ? 'Rent' : formData.type,
      images: images // Using local blob URLs for now (in a real app, upload to Supabase Storage first)
    };

    const { error } = await supabase.from('properties').insert([insertData]);

    if (error) {
      alert('Error posting property: ' + error.message);
      setLoading(false);
    } else {
      alert("Property Posted Successfully!");
      navigate('/');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-primary px-8 py-6 text-white text-center">
            <h1 className="text-2xl font-bold">Post your Property</h1>
            <p className="text-primary-hover text-sm mt-1">Rent, Lease or Sell in Bangalore</p>
          </div>
          
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            
            {/* Category & Type */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Looking to</label>
                  <select 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option>Rent out</option>
                    <option>Sell</option>
                    <option>Lease</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  >
                    <option>Apartment</option>
                    <option>Independent House / Villa</option>
                    <option>Builder Floor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms (BHK)</label>
                  <select 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    value={formData.bhk}
                    onChange={(e) => setFormData({...formData, bhk: e.target.value})}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 45000" 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Location in Bangalore</h3>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Locality, Project or Landmark" 
                  className="w-full pl-10 border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Title & Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Beautiful 2BHK in Koramangala" 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={4} 
                    placeholder="Include details like amenities, furnishing, nearby places..." 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Upload Photos & Videos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-primary">Add Photo</span>
                  <input type="file" className="hidden" accept="image/*,video/*" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-gray-500">You can upload up to 20 photos and 1 video. High quality images improve your ad's visibility.</p>
            </div>

            <div className="pt-4 border-t">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary-hover text-white text-lg font-bold py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
              >
                {loading ? 'Posting...' : 'Post Property Ad'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
