import React, { useState } from 'react';
import { Upload, X, MapPin, Sliders, Sparkles, Check, ShieldCheck, Eye, Clock, Phone, MessageSquare, Edit3, Globe, PlusCircle, Search, Link2, ExternalLink, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { RentalApprovalModal } from '../components/RentalApprovalModal';
import { SECTION_DEFINITIONS, DEFAULT_SECTION_VISIBILITY } from '../data/sectionVisibility';
import type { SectionVisibilityMap } from '../data/sectionVisibility';
import { MASTER_AMENITIES, DEFAULT_PROJECT_AMENITIES } from '../data/amenities';
import { getUserRegistrationStatus } from '../data/userRegistrations';
import { RegistrationModal } from '../components/RegistrationModal';
import { EditPropertyModal } from '../components/EditPropertyModal';
import { projects, applyPropertyOverrides, setPropertyOverride } from '../data/projects';
import type { ProjectData } from '../data/projects';
import { setWhyConsiderData } from '../data/sectionVisibility';
import { getCustomAreaPages, saveCustomAreaPage, deleteCustomAreaPage } from '../data/customAreaPages';
import type { CustomAreaPage } from '../data/customAreaPages';

export const PostProperty = () => {
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]); // Preview URLs
  const navigate = useNavigate();
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  const isAdmin = user?.email === 'admin@homesandrents.com';

  // Custom URLs Manager Modal State
  const [isCustomUrlsModalOpen, setIsCustomUrlsModalOpen] = useState(false);
  const [customPagesList, setCustomPagesList] = useState<CustomAreaPage[]>(() => getCustomAreaPages());
  const [editingCustomPage, setEditingCustomPage] = useState<Partial<CustomAreaPage> | null>(null);
  const [isCustomPageEditorOpen, setIsCustomPageEditorOpen] = useState(false);
  const [customUrlSearch, setCustomUrlSearch] = useState('');
  const [customUrlZoneFilter, setCustomUrlZoneFilter] = useState('All');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const refreshCustomPages = () => {
    setCustomPagesList(getCustomAreaPages());
  };

  const handleCopyUrl = (slug: string) => {
    const full = `https://homesandrents.com/${slug}`;
    navigator.clipboard.writeText(full);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleSaveCustomPageModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomPage?.slug || !editingCustomPage?.title) {
      alert('Please fill out Page Title and URL Slug');
      return;
    }

    const cleanSlug = editingCustomPage.slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9-/]+/g, '-');

    const payload: CustomAreaPage = {
      id: editingCustomPage.id || `page_${Date.now()}`,
      slug: cleanSlug,
      title: editingCustomPage.title.trim(),
      zone: (editingCustomPage.zone as any) || 'North Bangalore',
      areaName: editingCustomPage.areaName?.trim() || editingCustomPage.title.replace(/^New Launch Projects in\s+/i, '').trim(),
      priorityTag: editingCustomPage.priorityTag || 'High Priority',
      tagline: editingCustomPage.tagline?.trim() || 'Upcoming Residential Projects & Metro Corridor',
      metaDescription: editingCustomPage.metaDescription?.trim() || `Explore new launch projects in ${editingCustomPage.areaName || 'Bangalore'} on Homes and Rents.`,
      heroSnippet: editingCustomPage.heroSnippet?.trim() || `${editingCustomPage.areaName || 'This corridor'} is one of Bangalore’s high-growth investment locations.`,
      whyInvest: Array.isArray(editingCustomPage.whyInvest) 
        ? editingCustomPage.whyInvest 
        : typeof editingCustomPage.whyInvest === 'string'
        ? (editingCustomPage.whyInvest as string).split('\n').map((s: string) => s.trim()).filter(Boolean)
        : ['High capital appreciation driven by tech corridors', 'Rapid infrastructure and upcoming Metro line expansion', 'High rental demand from corporate executives'],
      connectivityHighlights: Array.isArray(editingCustomPage.connectivityHighlights)
        ? editingCustomPage.connectivityHighlights
        : typeof editingCustomPage.connectivityHighlights === 'string'
        ? (editingCustomPage.connectivityHighlights as string).split('\n').map((s: string) => s.trim()).filter(Boolean)
        : ['Direct highway & expressway transit access', 'Upcoming Namma Metro line access', 'Reputed schools and healthcare within 15 minutes'],
      indicativePriceRange: editingCustomPage.indicativePriceRange?.trim() || '₹65 Lakh - ₹2.50 Cr',
      lastUpdated: 'October 2026',
      status: (editingCustomPage.status as any) || 'Published',
      customKeywords: Array.isArray(editingCustomPage.customKeywords)
        ? editingCustomPage.customKeywords
        : typeof editingCustomPage.customKeywords === 'string'
        ? (editingCustomPage.customKeywords as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : [editingCustomPage.title.trim()]
    };

    saveCustomAreaPage(payload);
    refreshCustomPages();
    setIsCustomPageEditorOpen(false);
    setEditingCustomPage(null);
    alert(`Custom URL "/${payload.slug}" saved successfully!`);
  };

  const handleDeleteCustomPageModal = (id: string, slug: string) => {
    if (!window.confirm(`Are you sure you want to delete the custom URL "/${slug}"?`)) return;
    deleteCustomAreaPage(id);
    refreshCustomPages();
  };

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
  const [editingExistingProject, setEditingExistingProject] = useState<ProjectData | null>(null);

  // Super Admin custom section content fields
  const [customSlugInput, setCustomSlugInput] = useState('');
  const [builderName, setBuilderName] = useState('');
  const [aboutProjectText, setAboutProjectText] = useState('');
  const [keyLandmarksInput, setKeyLandmarksInput] = useState('');
  const [whyConsiderParagraphs, setWhyConsiderParagraphs] = useState(
    'Easily find Zen with yoga spaces and vast green covers.\nVastu compliant spacious homes with modern amenities.\nExcellent connectivity to major IT hubs and transit.'
  );

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
    category: 'Ready to Move' as 'Pre Launch' | 'New Launch' | 'Ready to Move' | 'Under Construction' | 'Plots & Lands' | 'Resale Properties' | 'Commercial',
    status: 'Ready to Move' // Construction status description
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
    const trimmedPrice = formData.price.trim();
    const cleanPrice = trimmedPrice.startsWith('₹') ? trimmedPrice : `₹${trimmedPrice}`;
    const formattedPrice = (formData.type === 'Rent out' && !cleanPrice.toLowerCase().includes('month'))
      ? `${cleanPrice} / month`
      : cleanPrice;

    const insertData = {
      title: formData.title,
      description: formData.description,
      price: formattedPrice, 
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

        // Save detailed property overrides (Builder, About Project, Key Landmarks, Pricing)
        const landmarksList = keyLandmarksInput
          .split(',')
          .map(l => l.trim())
          .filter(l => l.length > 0);

        setPropertyOverride(newId, {
          title: formData.title,
          subtitle: `${formData.bhk} BHK ${formData.propertyType} in ${formData.location}`,
          builder: builderName.trim() || 'Homes and Rents Partner Developer',
          status: `${formData.status} · Completion in 2026-2028`,
          description: formData.description,
          aboutText: aboutProjectText.trim() || formData.description,
          nearby: landmarksList.length > 0 ? landmarksList : [formData.location, 'Metro Station', 'Tech Park', 'School'],
          priceConfigs: [
            { label: `${formData.bhk} BHK ${formData.propertyType}`, price: cleanPrice }
          ],
          customSlug: customSlugInput.trim() ? customSlugInput.trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9-/]+/g, '-') : undefined,
          category: formData.category,
          badges: [
            badges.rera ? 'RERA' : '',
            badges.zeroBrokerage ? 'ZERO BROKERAGE' : '',
            '3D'
          ].filter(Boolean)
        });

        // Save Why Consider Builder Points
        const whyPoints = whyConsiderParagraphs
          .split('\n')
          .map(p => p.trim())
          .filter(p => p.length > 0);

        if (whyPoints.length > 0) {
          setWhyConsiderData(newId, {
            title: `Why consider ${builderName.trim() || formData.title}?`,
            points: whyPoints
          });
        }

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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Expected Price</label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const val = formData.price.trim();
                          if (!val.toLowerCase().includes('cr')) setFormData({ ...formData, price: `${val} Cr`.trim() });
                        }}
                        className="text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded border border-indigo-200 transition-colors"
                      >
                        + Cr
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const val = formData.price.trim();
                          if (!val.toLowerCase().includes('lk') && !val.toLowerCase().includes('lakh')) setFormData({ ...formData, price: `${val} Lk`.trim() });
                        }}
                        className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200 transition-colors"
                      >
                        + Lk
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const val = formData.price.trim();
                          if (!val.toLowerCase().includes('k')) setFormData({ ...formData, price: `${val}k / month`.trim() });
                        }}
                        className="text-[10px] bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded border border-purple-200 transition-colors"
                      >
                        + k/mo
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">₹</span>
                    <input 
                      type="text" 
                      placeholder="e.g. 1.25 Cr, 85 Lk, or 45,000" 
                      className="w-full pl-7 pr-3 border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary p-2.5 border text-sm font-semibold text-gray-900" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Accepts text with words like <strong>1.5 Cr</strong>, <strong>75 Lk</strong>, <strong>₹95 Lakhs</strong>, or exact numbers.
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-indigo-900 mb-1 flex items-center justify-between">
                    <span>Project Category (Mapping for Homepage Filter)</span>
                    <span className="text-xs text-indigo-600 font-normal">SuperCards & Search Category</span>
                  </label>
                  <select 
                    className="w-full border-indigo-300 rounded-lg shadow-sm focus:border-indigo-600 focus:ring-indigo-600 p-2.5 border bg-indigo-50/40 text-gray-900 font-semibold text-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Pre Launch">Pre Launch</option>
                    <option value="New Launch">New Launch</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Plots & Lands">Plots & Lands</option>
                    <option value="Resale Properties">Resale Properties</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Select which category tab this property will be mapped and discovered under on the homepage and search filters.
                  </p>
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

                {/* Edit Existing Properties Selector */}
                <div className="bg-gradient-to-r from-purple-950/60 to-indigo-950/60 p-4 rounded-2xl border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-purple-400" />
                      <span className="font-extrabold text-sm text-white">Edit Any Existing Property Details</span>
                    </div>
                    <p className="text-xs text-purple-200/80 mt-0.5">
                      Super admin can edit starting prices (numbers & texts), overview, construction status, 10 section toggles, amenities, and builder info for any property.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) return;
                        const found = projects.find(p => p.id === selectedId);
                        if (found) {
                          setEditingExistingProject(applyPropertyOverrides(found));
                        }
                        e.target.value = '';
                      }}
                      className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl border border-purple-400/40 outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="">Select Property to Edit...</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.builder})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Area URLs Quick Access & Direct Modal */}
                <div className="bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-cyan-950/70 p-5 rounded-2xl border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <span className="font-extrabold text-sm text-white">Customizable SEO URLs & Area Pages (40+ Active Corridors)</span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">Live</span>
                    </div>
                    <p className="text-xs text-blue-200/80 mt-1 max-w-xl">
                      Create, edit and manage custom Google ranking URLs for Devanahalli, Yelahanka, Sarjapur Road, Whitefield, Budigere Cross, Koramangala & more directly from here or in the dedicated Admin tab.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        refreshCustomPages();
                        setIsCustomUrlsModalOpen(true);
                      }}
                      className="text-xs font-black px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Manage URLs Here</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/admin?tab=custom_urls')}
                      className="text-xs font-bold px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>Open in Admin</span>
                    </button>
                  </div>
                </div>

                {/* 1. The Section Visibility Toggles */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> 1. Section Visibility Toggles (All Sections)
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

                {/* 2. Super Admin Section Content & Text Editor */}
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4" /> 2. Edit Section Details & Texts
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Developer / Builder Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Prestige Group / Sobha Limited / Brigade"
                        value={builderName}
                        onChange={(e) => setBuilderName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Key Landmarks & Connectivity (Comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Silk Board Metro, Manipal Hospital, Outer Ring Road, Forum Mall"
                        value={keyLandmarksInput}
                        onChange={(e) => setKeyLandmarksInput(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Custom URL Slug for this Property (Optional)
                    </label>
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-1.5 focus-within:border-indigo-500">
                      <span className="text-xs text-slate-500 font-mono select-none">https://homesandrents.com/</span>
                      <input
                        type="text"
                        placeholder="e.g. prestige-parklane-devanahalli"
                        value={customSlugInput}
                        onChange={(e) => setCustomSlugInput(e.target.value)}
                        className="w-full bg-transparent text-xs text-indigo-400 outline-none font-mono py-1 ml-1"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Allows visitors to view this project directly using this clean URL.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      About Project & Master Plan Narrative
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Write an expansive, high-converting overview of the architecture, green acreage, and lifestyle..."
                      value={aboutProjectText}
                      onChange={(e) => setAboutProjectText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Why Consider Builder Highlights (Paragraphs)
                      </label>
                      <button
                        type="button"
                        onClick={() => setWhyConsiderParagraphs(
                          'Easily find Zen with yoga spaces and vast green covers.\nVastu compliant spacious homes with modern amenities.\nExcellent connectivity to major IT hubs and transit.'
                        )}
                        className="text-[10px] text-indigo-400 hover:underline font-bold"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Enter paragraphs describing why buyers should consider this builder / property..."
                      value={whyConsiderParagraphs}
                      onChange={(e) => setWhyConsiderParagraphs(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-medium"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Tip: Separate distinct selling points with a new line or paragraph break.
                    </p>
                  </div>
                </div>

                {/* 3. Super Admin Badges & Flags */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> 3. Badges & Priority Flags
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

      {editingExistingProject && (
        <EditPropertyModal
          isOpen={!!editingExistingProject}
          project={editingExistingProject}
          onClose={() => setEditingExistingProject(null)}
          onSaved={() => {
            alert('Property details and pricing updated successfully!');
          }}
        />
      )}

      {/* Super Admin Direct Custom URLs Manager Modal */}
      {isCustomUrlsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Customizable SEO URLs & Area Pages</h2>
                    <span className="text-[10px] bg-blue-500/20 text-cyan-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                      {customPagesList.length} Active Corridors
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-md">
                    Create, edit, copy links and verify live landing pages for Bangalore corridors.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCustomPage({
                      id: `page_${Date.now()}`,
                      title: 'New Launch Projects in ',
                      slug: 'new-launch-projects-in-',
                      zone: 'North Bangalore',
                      areaName: '',
                      priorityTag: 'High Priority',
                      tagline: 'Upcoming Residential Projects & Rapid Growth Corridor',
                      metaDescription: 'Explore verified new launch apartments and gated communities on Homes and Rents.',
                      heroSnippet: 'High-potential investment corridor with rapid transit, RERA approved towers and top amenities.',
                      whyInvest: [
                        'High capital appreciation driven by infrastructure expansion',
                        'Proximity to major tech parks and employment hubs',
                        'Exceptional rental returns and buyer demand'
                      ],
                      connectivityHighlights: [
                        'Direct highway & expressway transit access',
                        'Upcoming Metro connectivity',
                        'Reputed schools and healthcare within 15 minutes'
                      ],
                      indicativePriceRange: '₹75 Lakh - ₹2.50 Cr',
                      status: 'Published',
                      customKeywords: ['New launch projects in Bangalore']
                    });
                    setIsCustomPageEditorOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomUrlsModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
                {['All', 'North Bangalore', 'East Bangalore', 'South Bangalore', 'West Bangalore', 'Central and Established Bangalore', 'General Bangalore'].map(z => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setCustomUrlZoneFilter(z)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      customUrlZoneFilter === z 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {z === 'Central and Established Bangalore' ? 'Central' : z === 'General Bangalore' ? 'General' : z.replace(' Bangalore', '')}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search URLs, areas, titles..."
                  value={customUrlSearch}
                  onChange={(e) => setCustomUrlSearch(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* URL List Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {customPagesList
                .filter(p => {
                  const matchesZone = customUrlZoneFilter === 'All' || p.zone === customUrlZoneFilter;
                  const q = customUrlSearch.toLowerCase();
                  const matchesSearch = !q || 
                    p.title.toLowerCase().includes(q) || 
                    p.slug.toLowerCase().includes(q) || 
                    p.areaName.toLowerCase().includes(q) ||
                    p.zone.toLowerCase().includes(q);
                  return matchesZone && matchesSearch;
                })
                .map(page => (
                  <div
                    key={page.id}
                    className="rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 p-4 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">
                          {page.zone}
                        </span>
                        {page.priorityTag && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {page.priorityTag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-black text-white leading-snug mb-1">
                        {page.title}
                      </h3>

                      {/* Clean URL link */}
                      <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono mb-2 truncate">
                        <Link2 className="w-3 h-3 shrink-0 text-slate-500" />
                        <span className="truncate">/{page.slug}</span>
                      </div>

                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {page.tagline}
                      </p>

                      <div className="bg-slate-900 rounded-xl p-2 border border-slate-800 text-[10px] space-y-1 mb-3">
                        <div className="flex justify-between items-center text-slate-400">
                          <span>Price Range:</span>
                          <span className="text-emerald-400 font-bold">{page.indicativePriceRange.split('|')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-bold transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                          <span>Live</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(page.slug)}
                          className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                          title="Copy Full URL"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedSlug === page.slug ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCustomPage(page);
                            setIsCustomPageEditorOpen(true);
                          }}
                          className="px-2 py-0.5 text-[11px] font-bold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/20 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomPageModal(page.id, page.slug)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete URL"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Modal Footer with quick link to Admin */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span>Showing {customPagesList.length} total customized landing pages</span>
              <button
                type="button"
                onClick={() => {
                  setIsCustomUrlsModalOpen(false);
                  navigate('/admin?tab=custom_urls');
                }}
                className="text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Full Screen Admin Editor</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Area Page Create / Edit Editor Drawer */}
      {isCustomPageEditorOpen && editingCustomPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  {editingCustomPage.id && customPagesList.some(p => p.id === editingCustomPage.id) ? 'Edit Custom Area URL' : 'Create New Custom Area URL'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure Google search SEO URL, titles, price range, and why invest points
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomPageEditorOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomPageModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Bangalore Zone</label>
                  <select
                    value={editingCustomPage.zone || 'North Bangalore'}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, zone: e.target.value as any })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="North Bangalore">North Bangalore (Airport Corridor)</option>
                    <option value="East Bangalore">East Bangalore (IT Corridor)</option>
                    <option value="South Bangalore">South Bangalore (Metro / Silk Board)</option>
                    <option value="West Bangalore">West Bangalore (Expressway / Metro)</option>
                    <option value="Central and Established Bangalore">Central Bangalore (Koramangala, etc.)</option>
                    <option value="General Bangalore">General Bangalore (Macro searches)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Priority Badge</label>
                  <select
                    value={editingCustomPage.priorityTag || 'High Priority'}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, priorityTag: e.target.value as any })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500 font-bold"
                  >
                    <option value="High Priority">High Priority</option>
                    <option value="Growth Corridor">Growth Corridor</option>
                    <option value="Prime Investment">Prime Investment</option>
                    <option value="Hot Corridor">Hot Corridor</option>
                    <option value="Established Metro">Established Metro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Page Title (H1 Tag for Google) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingCustomPage.title || ''}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, title: e.target.value })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500 font-bold"
                    placeholder="e.g. New Launch Projects in Devanahalli"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Area Name
                  </label>
                  <input
                    type="text"
                    value={editingCustomPage.areaName || ''}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, areaName: e.target.value })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500"
                    placeholder="e.g. Devanahalli"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Custom URL Slug <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 focus-within:border-blue-500">
                  <span className="text-xs text-slate-500 font-mono select-none">https://homesandrents.com/</span>
                  <input
                    type="text"
                    value={editingCustomPage.slug || ''}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, slug: e.target.value })}
                    className="w-full text-xs bg-transparent text-cyan-400 outline-none font-mono py-1 ml-1"
                    placeholder="new-launch-projects-in-devanahalli"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingCustomPage.tagline || ''}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, tagline: e.target.value })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500"
                    placeholder="e.g. Aerotropolis, KIADB Aerospace SEZ & STRR Highway Corridor"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Indicative Price Range</label>
                  <input
                    type="text"
                    value={editingCustomPage.indicativePriceRange || ''}
                    onChange={(e) => setEditingCustomPage({ ...editingCustomPage, indicativePriceRange: e.target.value })}
                    className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-blue-500"
                    placeholder="e.g. ₹65 Lakh - ₹3.50 Cr | ₹7,500 - ₹12,000 / sq.ft."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Google Meta Description</label>
                <textarea
                  rows={2}
                  value={editingCustomPage.metaDescription || ''}
                  onChange={(e) => setEditingCustomPage({ ...editingCustomPage, metaDescription: e.target.value })}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-blue-500 leading-relaxed"
                  placeholder="Meta description for search engine ranking..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Why Invest Points (One per line)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingCustomPage.whyInvest) ? editingCustomPage.whyInvest.join('\n') : (editingCustomPage.whyInvest || '')}
                  onChange={(e) => setEditingCustomPage({ ...editingCustomPage, whyInvest: e.target.value.split('\n') })}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-blue-500 leading-relaxed font-mono"
                  placeholder="Proximity to Airport\nKIADB Phase 1 and 2 SEZ\nHigh rental yields"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomPageEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Save & Publish Custom URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
