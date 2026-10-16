import React, { useState } from 'react';
import { Upload, X, MapPin, Sliders, Sparkles, Check, ShieldCheck, Eye, Clock, Phone, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { RentalApprovalModal } from '../components/RentalApprovalModal';
import { SECTION_DEFINITIONS, DEFAULT_SECTION_VISIBILITY } from '../data/sectionVisibility';
import type { SectionVisibilityMap } from '../data/sectionVisibility';
import { MASTER_AMENITIES, DEFAULT_PROJECT_AMENITIES } from '../data/amenities';
import { getUserRegistrationStatus } from '../data/userRegistrations';
import { RegistrationModal } from '../components/RegistrationModal';

export const PostProperty = () => {
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]); // Preview URLs
  const navigate = useNavigate();
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  const isAdmin = user?.email === 'admin@homesandrents.com';

  // Super Admin Toggles State
  const [sectionToggles, setSectionToggles] = useState<SectionVisibilityMap>({
    ...DEFAULT_SECTION_VISIBILITY
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(DEFAULT_PROJECT_AMENITIES);
  const [amenitySearch, setAmenitySearch] = useState('');
  const [badges, setBadges] = useState({
    verified: true,
    zeroBrokerage: true,
    rera: true,
    featured: false
  });

  const toggleSection = (key: keyof SectionVisibilityMap) => {
    setSectionToggles(prev => ({
      ...prev,
      [key]: prev[key] === false ? true : false
    }));
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  // Form State
  const [formData, setFormData] = useState({
    type: 'Rent out',
    propertyType: 'Apartment',
    bhk: '2',
    price: '',
    location: '',
    title: '',
    description: '',
    status: 'Ready to Move' // Admin can choose 'New Launch', 'Under Construction', 'Ready to Move', 'Pre Launch'
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageFiles([...imageFiles, ...newFiles]);
      setImages([...images, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a property!");
      return;
    }
    
    // If it's a rental or lease, require approval first
    if (formData.type === 'Rent out' || formData.type === 'Lease') {
      setIsRentalModalOpen(true);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    if (!user) return;
    
    setLoading(true);

    let latitude = null;
    let longitude = null;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        latitude = parseFloat(data[0].lat);
        longitude = parseFloat(data[0].lon);
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    }
    
    const uploadedUrls: string[] = [];
    
    // Upload images to Supabase Storage
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);
        
      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setLoading(false);
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);
        
      uploadedUrls.push(publicUrl);
    }

    // Prepare data
    const insertData = {
      title: formData.title,
      description: formData.description,
      price: formData.type === 'Rent out' ? `₹${formData.price} / month` : `₹${formData.price}`, 
      location: formData.location,
      bhk: formData.bhk,
      type: formData.type === 'Rent out' ? 'Rent' : formData.type,
      images: uploadedUrls,
      latitude,
      longitude,
      user_id: user.id
    };

    const { data, error } = await supabase.from('properties').insert([insertData]).select();

    if (error) {
      alert('Error posting property: ' + error.message);
      setLoading(false);
    } else {
      const newId = data?.[0]?.id?.toString();
      if (newId) {
        localStorage.setItem(`admin_section_visibility_${newId}`, JSON.stringify(sectionToggles));
        localStorage.setItem(`admin_overview_toggle_${newId}`, JSON.stringify(sectionToggles.overview !== false));
        localStorage.setItem(`admin_amenities_${newId}`, JSON.stringify(selectedAmenities));

        if (badges.featured) {
          try {
            const currentOrder: string[] = JSON.parse(localStorage.getItem('admin_property_order') || '[]');
            if (!currentOrder.includes(newId)) {
              localStorage.setItem('admin_property_order', JSON.stringify([newId, ...currentOrder]));
            }
          } catch {
            // ignore
          }
        }
      }

      alert("Property Posted Successfully with your configured Section & Amenity Toggles!");
      navigate(newId ? `/project/${newId}` : '/');
    }
  };

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const regStatus = getUserRegistrationStatus(user?.email);

  if (!user) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="bg-orange-100 text-orange-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Registration Required</h2>
          <p className="text-gray-600 mb-6 text-sm">
            You must have an approved account to post properties on the Homes and Rents portal.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
            >
              Register to Post Property (Free)
            </button>
            <button onClick={() => navigate('/')} className="text-gray-500 font-medium hover:underline text-sm">
              Back to Home
            </button>
          </div>
        </div>

        <RegistrationModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </div>
    );
  }

  // If not super admin and not approved, display pending verification notice or register prompt
  if (!isAdmin && regStatus.status !== 'Approved') {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-lg w-full border border-gray-100">
          {regStatus.status === 'Pending Verification' ? (
            <>
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                Status: Pending Verification
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Under Review</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Thank you for submitting your registration. Your account is currently under review by our verification team. Our team will verify your details within <strong>60 minutes</strong>.
              </p>
              <div className="bg-amber-50 rounded-xl p-4 text-xs text-amber-900 text-left border border-amber-200 mb-6 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Representative Call Expected</span>
                </div>
                <p>
                  A representative from Homes and Rents will call you on your registered mobile number (<strong>{regStatus.registration?.mobile || 'submitted number'}</strong>) shortly.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/919739063840?text=${encodeURIComponent(`Hi Homes and Rents Admin, I have submitted my registration for property posting with email: ${user.email}. Please approve my account.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Fast-Track on WhatsApp
                </a>
                <button onClick={() => navigate('/')} className="text-gray-500 font-medium hover:underline text-sm">
                  Back to Home
                </button>
              </div>
            </>
          ) : regStatus.status === 'Rejected' ? (
            <>
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                Status: Registration Rejected
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Not Approved</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your registration could not be approved at this time. Please contact our support desk for clarification or resubmit with verified credentials.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                >
                  Resubmit Registration
                </button>
                <button onClick={() => navigate('/')} className="text-gray-500 font-medium hover:underline text-sm">
                  Back to Home
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Profile Registration</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                To post properties on Homes and Rents, please complete the 9-point user registration form. Our admin team will verify and approve your profile within 60 minutes.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm"
                >
                  Complete Registration Form Now
                </button>
                <button onClick={() => navigate('/')} className="text-gray-500 font-medium hover:underline text-sm">
                  Back to Home
                </button>
              </div>
            </>
          )}
        </div>

        <RegistrationModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-700 px-8 py-6 text-white text-center relative">
            {isAdmin && (
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="absolute left-4 top-4 sm:left-6 sm:top-6 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-white/20"
              >
                ← Admin Menu
              </button>
            )}
            <h1 className="text-2xl font-bold">{isAdmin ? 'Admin Post Property' : 'Post Your Property'}</h1>
            <p className="text-indigo-200 text-sm mt-1">
              {isAdmin ? 'Upload and feature listings across Bangalore' : 'List your property for Rent, Sale, or Lease for FREE'}
            </p>
          </div>
          
          <form className="p-8 space-y-8" onSubmit={handleInitialSubmit}>
            
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
                  <input type="file" multiple className="hidden" accept="image/*,video/*" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-gray-500">You can upload up to 20 photos and 1 video. High quality images improve your ad's visibility.</p>
            </div>

            {/* Super Admin Control Center & Property Toggles */}
            {isAdmin && (
              <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 text-white space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        Super Admin Property Toggles
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold uppercase">SuperAdmin</span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Turn ON/OFF sections, choose badges, and configure amenities for this specific listing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSectionToggles({
                        whyConsider: true,
                        overview: true,
                        constructionStatus: true,
                        startingPrice: true,
                        unitPricing: true,
                        floorPlans: true,
                        topFacilities: true,
                        about: true,
                        neighborhoodMap: true,
                        keyLandmarks: true
                      })}
                      className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition-colors cursor-pointer"
                    >
                      Turn All ON
                    </button>
                    <button
                      type="button"
                      onClick={() => setSectionToggles({
                        whyConsider: false,
                        overview: false,
                        constructionStatus: false,
                        startingPrice: false,
                        unitPricing: false,
                        floorPlans: false,
                        topFacilities: false,
                        about: false,
                        neighborhoodMap: false,
                        keyLandmarks: false
                      })}
                      className="text-xs font-bold px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition-colors cursor-pointer"
                    >
                      Turn All OFF
                    </button>
                  </div>
                </div>

                {/* 1. The 9 Section Visibility Toggles */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> 1. Section Visibility Toggles (9 Sections)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SECTION_DEFINITIONS.map((def) => {
                      const isVisible = sectionToggles[def.id as keyof SectionVisibilityMap] !== false;
                      return (
                        <div
                          key={def.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            isVisible 
                              ? 'bg-slate-800/80 border-slate-700/80 shadow-sm' 
                              : 'bg-slate-950/60 border-slate-850 opacity-60'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border ${
                                isVisible 
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              }`}>
                                {isVisible ? 'ON' : 'OFF'}
                              </span>
                              <p className="text-xs font-extrabold text-white truncate">{def.label}</p>
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{def.desc}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleSection(def.id as keyof SectionVisibilityMap)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              isVisible
                                ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                            }`}
                          >
                            {isVisible ? 'Turn OFF' : 'Turn ON'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Super Admin Badges & Flags */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> 2. Badges & Priority Flags
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      badges.verified ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}>
                      <span className="text-xs font-bold">Verified Badge</span>
                      <input 
                        type="checkbox" 
                        checked={badges.verified} 
                        onChange={(e) => setBadges({ ...badges, verified: e.target.checked })} 
                        className="rounded accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      badges.zeroBrokerage ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}>
                      <span className="text-xs font-bold">Zero Brokerage</span>
                      <input 
                        type="checkbox" 
                        checked={badges.zeroBrokerage} 
                        onChange={(e) => setBadges({ ...badges, zeroBrokerage: e.target.checked })} 
                        className="rounded accent-purple-500 cursor-pointer"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      badges.rera ? 'bg-teal-500/10 border-teal-500/30 text-teal-300' : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}>
                      <span className="text-xs font-bold">RERA Approved</span>
                      <input 
                        type="checkbox" 
                        checked={badges.rera} 
                        onChange={(e) => setBadges({ ...badges, rera: e.target.checked })} 
                        className="rounded accent-teal-500 cursor-pointer"
                      />
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      badges.featured ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}>
                      <span className="text-xs font-bold">Top Priority Card</span>
                      <input 
                        type="checkbox" 
                        checked={badges.featured} 
                        onChange={(e) => setBadges({ ...badges, featured: e.target.checked })} 
                        className="rounded accent-amber-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* 3. Amenities Selector (35+ Catalog) */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> 3. Select Amenities ({selectedAmenities.length} selected of {MASTER_AMENITIES.length})
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAmenities([...MASTER_AMENITIES])}
                        className="text-[11px] font-bold text-indigo-300 hover:underline cursor-pointer"
                      >
                        Select All (35+)
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        type="button"
                        onClick={() => setSelectedAmenities(DEFAULT_PROJECT_AMENITIES)}
                        className="text-[11px] font-bold text-indigo-300 hover:underline cursor-pointer"
                      >
                        Default (Top 8)
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        type="button"
                        onClick={() => setSelectedAmenities([])}
                        className="text-[11px] font-bold text-slate-400 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Search amenities (e.g. gym, pool, security, clubhouse)..."
                    value={amenitySearch}
                    onChange={(e) => setAmenitySearch(e.target.value)}
                    className="w-full text-xs bg-slate-950/60 border border-slate-800 text-white rounded-xl px-3.5 py-2 mb-3 outline-none focus:border-indigo-500"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                    {MASTER_AMENITIES.filter(a => a.toLowerCase().includes(amenitySearch.toLowerCase())).map((name) => {
                      const isChecked = selectedAmenities.includes(name);
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleAmenity(name)}
                          className={`p-2 rounded-xl border text-left text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-indigo-600/30 border-indigo-500/60 text-white'
                              : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <span className="truncate">{name}</span>
                          <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-1 text-[9px] ${
                            isChecked ? 'bg-indigo-500 text-white' : 'border border-slate-700'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

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
      <RentalApprovalModal 
        isOpen={isRentalModalOpen} 
        onClose={() => setIsRentalModalOpen(false)} 
        onVerifySuccess={handleFinalSubmit}
      />
    </div>
  );
};
