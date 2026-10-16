import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  PlusCircle, 
  EyeOff, 
  ArrowUpDown, 
  Layers, 
  MessageSquare, 
  Search, 
  Download, 
  BarChart3, 
  Home, 
  LogOut, 
  Sparkles, 
  CheckCircle,
  Building2,
  Trash2,
  RefreshCw,
  ExternalLink,
  Calendar,
  Rocket,
  Store,
  Tag,
  MapPin,
  DollarSign,
  Database,
  ShieldCheck,
  Eye,
  Sliders,
  Check,
  UserCheck,
  Users,
  Clock,
  XCircle,
  Phone,
  Mail,
  BookOpen,
  Edit3,
  Globe,
  Link2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { projects } from '../data/projects';
import { 
  getUserRegistrations, 
  updateUserRegistrationStatus,
  ADMIN_NOTIFICATION_EMAIL
} from '../data/userRegistrations';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from '../data/blogs';
import type { BlogPost } from '../data/blogs';
import type { UserRegistration, RegistrationStatus } from '../data/userRegistrations';

import { 
  getCustomAreaPages, 
  saveCustomAreaPage, 
  deleteCustomAreaPage
} from '../data/customAreaPages';
import type { CustomAreaPage } from '../data/customAreaPages';

import { MASTER_AMENITIES, DEFAULT_PROJECT_AMENITIES } from '../data/amenities';
import { 
  SECTION_DEFINITIONS, 
  DEFAULT_SECTION_VISIBILITY, 
  getSectionVisibility, 
  setSectionVisibility 
} from '../data/sectionVisibility';
import type { SectionVisibilityMap } from '../data/sectionVisibility';

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTabParam = searchParams.get('tab') as any;

  const [activeTab, setActiveTab] = useState<'hub' | 'hidden' | 'db_properties' | 'overview' | 'amenities' | 'sections' | 'registrations' | 'blogs' | 'custom_urls'>(
    initialTabParam || 'hub'
  );

  useEffect(() => {
    const tabParam = searchParams.get('tab') as any;
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: typeof activeTab) => {
    setActiveTab(newTab);
    setSearchParams(newTab === 'hub' ? {} : { tab: newTab });
  };
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [customOrder, setCustomOrder] = useState<string[]>([]);
  const [dbProperties, setDbProperties] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // User Registrations & Approvals State
  const [registrations, setRegistrations] = useState<UserRegistration[]>(() => getUserRegistrations());
  const [regFilter, setRegFilter] = useState<'All' | 'Pending Verification' | 'Approved' | 'Rejected'>('All');
  const [regSearch, setRegSearch] = useState('');

  const refreshRegistrations = () => {
    setRegistrations(getUserRegistrations());
  };

  const handleUpdateRegStatus = (id: string, status: RegistrationStatus) => {
    const success = updateUserRegistrationStatus(id, status);
    if (success) {
      refreshRegistrations();
      notify(`User status updated to "${status}"`);
    } else {
      notify('Failed to update user status');
    }
  };

  // Blogs Management State
  const [blogList, setBlogList] = useState<BlogPost[]>(() => getBlogPosts());
  const [blogSearch, setBlogSearch] = useState('');
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);

  const refreshBlogs = () => {
    setBlogList(getBlogPosts());
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?.title || !editingBlog?.content) {
      alert('Please provide at least a title and content for the blog post.');
      return;
    }

    const payload = {
      id: editingBlog.id,
      title: editingBlog.title.trim(),
      slug: editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: editingBlog.category || 'Rental Market',
      readTime: editingBlog.readTime || '5 min read',
      author: editingBlog.author || 'Homes and Rents Editorial Desk',
      coverImage: editingBlog.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
      excerpt: editingBlog.excerpt || editingBlog.content.substring(0, 160) + '...',
      content: editingBlog.content,
      tags: typeof editingBlog.tags === 'string' 
        ? (editingBlog.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean)
        : (editingBlog.tags || ['Homes and Rents', 'Bangalore Real Estate'])
    };

    saveBlogPost(payload);
    refreshBlogs();
    setIsBlogEditorOpen(false);
    setEditingBlog(null);
    notify('Blog article published successfully!');
  };

  const handleDeleteBlog = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    deleteBlogPost(id);
    refreshBlogs();
    notify('Blog post deleted');
  };

  // Custom Area Pages & URLs State
  const [customPages, setCustomPages] = useState<CustomAreaPage[]>(() => getCustomAreaPages());
  const [urlSearch, setUrlSearch] = useState('');
  const [urlZoneFilter, setUrlZoneFilter] = useState<string>('All');
  const [editingPage, setEditingPage] = useState<Partial<CustomAreaPage> | null>(null);
  const [isPageEditorOpen, setIsPageEditorOpen] = useState(false);

  const refreshCustomPages = () => {
    setCustomPages(getCustomAreaPages());
  };

  const handleSaveCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.slug) {
      alert('Please provide at least a Page Title and URL Slug.');
      return;
    }

    const cleanSlug = editingPage.slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9-/]+/g, '-');

    const payload: CustomAreaPage = {
      id: editingPage.id || `page_${Date.now()}`,
      slug: cleanSlug,
      title: editingPage.title.trim(),
      zone: (editingPage.zone as any) || 'North Bangalore',
      areaName: editingPage.areaName?.trim() || editingPage.title.replace(/^New Launch Projects in\s+/i, '').trim(),
      priorityTag: editingPage.priorityTag || 'High Priority',
      tagline: editingPage.tagline?.trim() || 'Upcoming Residential Developments & Metro Corridor',
      metaDescription: editingPage.metaDescription?.trim() || `Explore new launch projects in ${editingPage.areaName || 'Bangalore'}. Verified prices and floor plans on Homes and Rents.`,
      heroSnippet: editingPage.heroSnippet?.trim() || `${editingPage.areaName} is one of Bangalore’s high-growth corridors attracting premier residential and commercial developments.`,
      whyInvest: Array.isArray(editingPage.whyInvest) 
        ? editingPage.whyInvest 
        : typeof editingPage.whyInvest === 'string'
        ? (editingPage.whyInvest as string).split('\n').map((s: string) => s.trim()).filter(Boolean)
        : ['High rental demand from tech employees', 'Rapid infrastructure and metro line expansion', 'Capital appreciation and RERA approved developments'],
      connectivityHighlights: Array.isArray(editingPage.connectivityHighlights)
        ? editingPage.connectivityHighlights
        : typeof editingPage.connectivityHighlights === 'string'
        ? (editingPage.connectivityHighlights as string).split('\n').map((s: string) => s.trim()).filter(Boolean)
        : ['Major expressway & arterial road connectivity', 'Upcoming Namma Metro line access', 'Convenient transit to international airport and business parks'],
      indicativePriceRange: editingPage.indicativePriceRange?.trim() || '₹65 Lakh - ₹2.50 Cr',
      lastUpdated: 'October 2026',
      status: (editingPage.status as any) || 'Published',
      customKeywords: Array.isArray(editingPage.customKeywords)
        ? editingPage.customKeywords
        : typeof editingPage.customKeywords === 'string'
        ? (editingPage.customKeywords as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : [editingPage.title.trim()]
    };

    const ok = saveCustomAreaPage(payload);
    if (ok) {
      refreshCustomPages();
      setIsPageEditorOpen(false);
      setEditingPage(null);
      notify(`Custom URL "/${payload.slug}" successfully saved & published!`);
    } else {
      notify('Failed to save custom page');
    }
  };

  const handleDeleteCustomPage = (id: string, slug: string) => {
    if (!window.confirm(`Are you sure you want to delete the custom URL "/${slug}"?`)) return;
    deleteCustomAreaPage(id);
    refreshCustomPages();
    notify(`Custom URL "/${slug}" deleted`);
  };

  // Overview Toggles State: { [projectId: string]: boolean }
  const [overviewToggles, setOverviewToggles] = useState<{ [key: string]: boolean }>(() => {
    try {
      const allKeys = Object.keys(localStorage).filter(k => k.startsWith('admin_overview_toggle_'));
      const stateObj: { [key: string]: boolean } = {};
      allKeys.forEach(key => {
        const id = key.replace('admin_overview_toggle_', '');
        const val = localStorage.getItem(key);
        stateObj[id] = val !== null ? JSON.parse(val) : true;
      });
      return stateObj;
    } catch {
      return {};
    }
  });

  // Global & Per-Project Amenities State
  const [activeAmenityProject, setActiveAmenityProject] = useState<string>('global');
  const [configuredAmenities, setConfiguredAmenities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('admin_amenities_global');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECT_AMENITIES;
    } catch {
      return DEFAULT_PROJECT_AMENITIES;
    }
  });
  const [amenitySearch, setAmenitySearch] = useState('');
  const [newCustomAmenity, setNewCustomAmenity] = useState('');

  // Section Visibility State (All Properties & Per-Property)
  const [activeSectionProject, setActiveSectionProject] = useState<string>('global');
  const [currentSectionVis, setCurrentSectionVis] = useState<SectionVisibilityMap>(() => {
    return getSectionVisibility('global');
  });

  const handleSelectSectionProject = (pId: string) => {
    setActiveSectionProject(pId);
    setCurrentSectionVis(getSectionVisibility(pId));
  };

  const toggleSectionItem = (sectionKey: keyof SectionVisibilityMap) => {
    const currentVal = currentSectionVis[sectionKey] !== false; // default true
    const updated = { ...currentSectionVis, [sectionKey]: !currentVal };
    setCurrentSectionVis(updated);
    setSectionVisibility(activeSectionProject, updated);
    notify(`${sectionKey} set to ${!currentVal ? 'ON (Visible)' : 'OFF (Hidden)'} for ${activeSectionProject === 'global' ? 'All Properties (Default)' : 'this property'}`);
  };

  const handleApplySectionToAll = () => {
    if (!window.confirm('Apply this 9-section configuration to ALL properties globally?')) return;
    setSectionVisibility('global', currentSectionVis);
    projects.forEach(p => setSectionVisibility(p.id, currentSectionVis));
    dbProperties.forEach(p => setSectionVisibility(p.id?.toString(), currentSectionVis));
    notify('Successfully applied 9-section visibility to ALL properties!');
  };

  const handleTurnAllSections = (val: boolean) => {
    const updated: SectionVisibilityMap = {
      whyConsider: val,
      overview: val,
      constructionStatus: val,
      startingPrice: val,
      unitPricing: val,
      floorPlans: val,
      topFacilities: val,
      about: val,
      neighborhoodMap: val,
      keyLandmarks: val,
    };
    setCurrentSectionVis(updated);
    setSectionVisibility(activeSectionProject, updated);
    notify(`All sections turned ${val ? 'ON' : 'OFF'} for ${activeSectionProject === 'global' ? 'All Properties' : 'this property'}`);
  };

  const handleResetSectionDefaults = () => {
    if (activeSectionProject === 'global') {
      localStorage.removeItem('admin_section_visibility_global');
      setCurrentSectionVis(DEFAULT_SECTION_VISIBILITY);
      notify('Global section visibility reset to default (All ON)');
    } else {
      localStorage.removeItem(`admin_section_visibility_${activeSectionProject}`);
      setCurrentSectionVis(getSectionVisibility(activeSectionProject));
      notify('Property override cleared, reverting to global default');
    }
  };

  const isAdmin = user?.email === 'admin@homesandrents.com';

  useEffect(() => {
    if (user && !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    try {
      const savedHidden = localStorage.getItem('admin_hidden_properties');
      if (savedHidden) setHiddenIds(JSON.parse(savedHidden));

      const savedOrder = localStorage.getItem('admin_property_order');
      if (savedOrder) setCustomOrder(JSON.parse(savedOrder));
    } catch {
      // ignore
    }
    fetchDbProperties();
  }, []);

  const fetchDbProperties = async () => {
    setLoadingDb(true);
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (data) setDbProperties(data);
    setLoadingDb(false);
  };

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleUnhide = (id: string) => {
    const updated = hiddenIds.filter(item => item !== id);
    setHiddenIds(updated);
    localStorage.setItem('admin_hidden_properties', JSON.stringify(updated));
    notify('Property unhidden and restored to live site');
  };

  const handleDeleteDbProperty = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this listing?')) return;
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setDbProperties(prev => prev.filter(p => p.id !== id));
      notify('Property deleted from database');
    } else {
      alert('Error deleting: ' + error.message);
    }
  };

  const handleResetAllOrder = () => {
    if (!window.confirm('Reset homepage properties to default priority order?')) return;
    localStorage.removeItem('admin_property_order');
    setCustomOrder([]);
    notify('Homepage property ordering reset to default');
  };

  const handleUnhideAll = () => {
    if (!window.confirm('Unhide all hidden properties?')) return;
    localStorage.removeItem('admin_hidden_properties');
    setHiddenIds([]);
    notify('All properties unhidden');
  };

  // Toggle Overview ON/OFF for any property
  const toggleProjectOverview = (projectId: string) => {
    const currentVal = overviewToggles[projectId] !== false; // default true
    const updatedVal = !currentVal;
    const updatedMap = { ...overviewToggles, [projectId]: updatedVal };
    setOverviewToggles(updatedMap);
    localStorage.setItem(`admin_overview_toggle_${projectId}`, JSON.stringify(updatedVal));
    notify(`Overview section turned ${updatedVal ? 'ON (Visible)' : 'OFF (Hidden)'} for this property`);
  };

  // Load amenities for specific project or global
  const handleSelectAmenityProject = (pId: string) => {
    setActiveAmenityProject(pId);
    const key = `admin_amenities_${pId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setConfiguredAmenities(JSON.parse(saved));
      } else {
        const globalSaved = localStorage.getItem('admin_amenities_global');
        setConfiguredAmenities(globalSaved ? JSON.parse(globalSaved) : DEFAULT_PROJECT_AMENITIES);
      }
    } catch {
      setConfiguredAmenities(DEFAULT_PROJECT_AMENITIES);
    }
  };

  // Toggle amenity inclusion
  const toggleAmenitySelection = (name: string) => {
    const updated = configuredAmenities.includes(name)
      ? configuredAmenities.filter(item => item !== name)
      : [...configuredAmenities, name];
    setConfiguredAmenities(updated);
  };

  // Save amenities configuration
  const saveAmenitiesConfiguration = () => {
    const key = `admin_amenities_${activeAmenityProject}`;
    localStorage.setItem(key, JSON.stringify(configuredAmenities));
    notify(`Saved ${configuredAmenities.length} amenities for ${activeAmenityProject === 'global' ? 'All Projects (Default)' : 'selected project'}`);
  };

  // Add custom amenity
  const handleAddCustomAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomAmenity.trim()) return;
    const trimmed = newCustomAmenity.trim();
    if (!configuredAmenities.includes(trimmed)) {
      setConfiguredAmenities([...configuredAmenities, trimmed]);
    }
    setNewCustomAmenity('');
  };

  // 20 Relevant Action Buttons Config
  const adminActions = [
    // --- 1. CORE LISTINGS MANAGEMENT ---
    {
      id: 'post',
      title: 'Post New Property',
      desc: 'Add apartment, villa, plot, commercial or resale listing',
      icon: PlusCircle,
      gradient: 'from-purple-600 to-indigo-600',
      action: () => navigate('/post')
    },
    {
      id: 'reorder',
      title: 'Reorder Homepage Listings',
      desc: 'Set Top 1-10 priority ranks or drag cards on live site',
      icon: ArrowUpDown,
      gradient: 'from-blue-600 to-cyan-600',
      badge: customOrder.length > 0 ? `${customOrder.length} prioritized` : undefined,
      action: () => navigate('/')
    },
    {
      id: 'hidden',
      title: 'Hidden Properties',
      desc: 'Review and restore properties hidden from public',
      icon: EyeOff,
      gradient: 'from-amber-600 to-orange-600',
      badge: hiddenIds.length > 0 ? `${hiddenIds.length} hidden` : '0 hidden',
      action: () => setActiveTab('hidden')
    },
    {
      id: 'db_listings',
      title: 'Database Listings',
      desc: 'View & delete properties posted by users or admin',
      icon: Building2,
      gradient: 'from-emerald-600 to-teal-600',
      badge: `${dbProperties.length} active`,
      action: () => setActiveTab('db_properties')
    },

    // --- 2. LEADS, CONVERSIONS & ENGAGEMENT ---
    {
      id: 'whatsapp_leads',
      title: 'WhatsApp Enquiries',
      desc: 'Open direct WhatsApp chat portal (+91 97390 63840)',
      icon: MessageSquare,
      gradient: 'from-green-600 to-emerald-700',
      action: () => window.open('https://wa.me/919739063840?text=Hi+Homes+%26+Rents+Admin+Lead+Inquiry', '_blank')
    },
    {
      id: 'launch_popup',
      title: 'Pop-Up & Launch VIPs',
      desc: 'Test VIP pre-launch modal and enquiry conversion flow',
      icon: Sparkles,
      gradient: 'from-pink-600 to-rose-600',
      action: () => navigate('/')
    },
    {
      id: 'section_controls',
      title: 'Sections ON/OFF (All Properties)',
      desc: 'Toggle 9 key sections (Landmarks, Map, Floor Plans, Price...) across all or small properties',
      icon: Sliders,
      gradient: 'from-cyan-600 to-blue-700',
      action: () => setActiveTab('sections')
    },
    {
      id: 'site_visits',
      title: 'Site Visit Scheduling',
      desc: 'Schedule customer tours & inspect property locations',
      icon: Calendar,
      gradient: 'from-violet-600 to-indigo-700',
      action: () => window.open('https://wa.me/919739063840?text=Schedule+Site+Visit+Customer+Assistance', '_blank')
    },

    // --- 3. CATEGORIES & BUILDER HUBS ---
    {
      id: 'pre_launch_hub',
      title: 'Pre-Launch & New Launch',
      desc: 'Inspect newly added upcoming builder developments',
      icon: Rocket,
      gradient: 'from-rose-600 to-orange-500',
      action: () => navigate('/?category=New%20Launch')
    },
    {
      id: 'commercial_resale',
      title: 'Plots & Commercial Deals',
      desc: 'Filter plots, lands, shops and resale inventory',
      icon: Store,
      gradient: 'from-amber-500 to-yellow-600',
      action: () => navigate('/?category=Commercial')
    },
    {
      id: 'builder_showcase',
      title: 'Builder Marquee Audit',
      desc: 'Audit Prestige, Godrej, Sobha, Brigade showcase logos',
      icon: Tag,
      gradient: 'from-teal-600 to-emerald-700',
      action: () => navigate('/?builder=Prestige%20Group')
    },

    // --- 4. PROGRAMMATIC SEO & DISCOVERY ---
    {
      id: 'seo_routes',
      title: '99acres SEO Pages',
      desc: 'Preview dynamic BHK & locality landing pages',
      icon: Layers,
      gradient: 'from-indigo-600 to-blue-700',
      action: () => navigate('/2-bhk-flats-in-hebbal-bangalore-north-ffid')
    },
    {
      id: 'locality_hub',
      title: 'Locality & Metro Links',
      desc: 'Audit Hebbal, Whitefield, HSR & Koramangala hubs',
      icon: MapPin,
      gradient: 'from-blue-600 to-violet-700',
      action: () => navigate('/flats-for-rent/whitefield')
    },
    {
      id: 'search_audit',
      title: 'Search & Auto-Suggest Audit',
      desc: 'Verify builder filters, categories & keyword index',
      icon: Search,
      gradient: 'from-purple-600 to-pink-600',
      action: () => navigate('/search')
    },
    {
      id: 'price_trends',
      title: 'Price Configuration Audit',
      desc: 'Verify BHK pricing labels & rent vs. buy configurations',
      icon: DollarSign,
      gradient: 'from-emerald-600 to-green-700',
      action: () => navigate('/search?q=lakhs')
    },

    // --- 5. SYSTEM, SECURITY & DATA MANAGEMENT ---
    {
      id: 'export_data',
      title: 'Backup & Export Listings',
      desc: 'Download all project data & Supabase properties as JSON',
      icon: Download,
      gradient: 'from-slate-700 to-slate-900',
      action: () => {
        const fullBackup = {
          exportDate: new Date().toISOString(),
          staticProjects: projects,
          supabaseProperties: dbProperties,
          customOrder,
          hiddenIds
        };
        const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `homes-and-rents-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        notify('Backup downloaded successfully');
      }
    },
    {
      id: 'db_sync',
      title: 'Sync Supabase Database',
      desc: 'Pull latest database entries & refresh cache',
      icon: Database,
      gradient: 'from-blue-700 to-slate-800',
      action: () => {
        fetchDbProperties();
        notify('Database synchronized successfully');
      }
    },
    {
      id: 'reset_system',
      title: 'Reset Site Priorities',
      desc: 'Revert custom card ordering back to standard ranking',
      icon: RefreshCw,
      gradient: 'from-rose-600 to-red-700',
      action: handleResetAllOrder
    },
    {
      id: 'security_audit',
      title: 'Admin Credentials & Access',
      desc: 'Manage admin security, sessions and authentication',
      icon: ShieldCheck,
      gradient: 'from-slate-800 to-slate-950',
      action: () => navigate('/admin/login')
    },
    {
      id: 'analytics_summary',
      title: 'Site Traffic & Analytics',
      desc: 'Review visitor metrics and real-time page engagement',
      icon: BarChart3,
      gradient: 'from-fuchsia-600 to-purple-800',
      action: () => {
        window.open('https://vercel.com/analytics', '_blank');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight flex items-center gap-1.5">
                  Homes & Rents <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>
                </span>
                <p className="text-[11px] text-slate-400 -mt-0.5">Control Center</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> View Live Site
            </Link>
            <button 
              onClick={signOut}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex-grow w-full">
        {/* Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/90 border border-indigo-500/20 p-6 sm:p-8 mb-6 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Logged In as Super Admin
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Admin Control Dashboard
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Super Admin command center: manage listings, customize SEO URLs & area pages, approve users, and configure section visibility.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/post')}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center gap-2.5 transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" /> Post New Property
              </button>
            </div>
          </div>
        </div>

        {/* Clean, Organized Navigation Tabs Bar */}
        <div className="bg-slate-900/80 border border-slate-800 p-2 rounded-2xl sm:rounded-3xl shadow-xl mb-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleTabChange('hub')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'hub'
                ? 'bg-white text-slate-950 shadow-md scale-100'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            <span>All Actions</span>
          </button>

          <button
            onClick={() => { refreshCustomPages(); handleTabChange('custom_urls'); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'custom_urls'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Custom URLs & SEO Pages</span>
            <span className="bg-blue-400/20 text-blue-300 border border-blue-400/30 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {customPages.length}
            </span>
          </button>

          <button
            onClick={() => { refreshRegistrations(); handleTabChange('registrations'); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'registrations'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>User Approvals</span>
            {registrations.filter(r => r.status === 'Pending Verification').length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {registrations.filter(r => r.status === 'Pending Verification').length}
              </span>
            )}
          </button>

          <button
            onClick={() => { refreshBlogs(); handleTabChange('blogs'); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer relative ${
              activeTab === 'blogs'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Blogs ({blogList.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('sections')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Sections ON/OFF</span>
          </button>

          <button
            onClick={() => handleTabChange('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Overview ON/OFF</span>
          </button>

          <button
            onClick={() => handleTabChange('amenities')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'amenities'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Amenities (30+)</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-5 h-5" /> {feedback}
          </div>
        )}

        {/* TAB 1: 20 Core Action Buttons Grid */}
        {activeTab === 'hub' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" /> Admin Command Hub (20 Relevant Actions)
              </h2>
              <span className="text-xs text-slate-400 font-medium">Quick actions & management</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {adminActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="group text-left p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top gradient highlight on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${action.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {action.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-white text-base group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span> {action.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {action.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                      <span>Launch Tool</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Hidden Properties Panel */}
        {activeTab === 'hidden' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="text-xs text-indigo-400 hover:underline mb-1 font-bold block"
                >
                  ← Back to Admin Command Hub
                </button>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-amber-400" /> Hidden Properties ({hiddenIds.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  These properties are hidden from public visitors. Click Unhide to restore them.
                </p>
              </div>

              {hiddenIds.length > 0 && (
                <button
                  onClick={handleUnhideAll}
                  className="text-xs font-bold px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl transition-colors"
                >
                  Unhide All ({hiddenIds.length})
                </button>
              )}
            </div>

            {hiddenIds.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">No Hidden Properties</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  All properties are currently visible to visitors on the website. Use the "Hide" button on any card to remove it from public view.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hiddenIds.map((id) => {
                  const matchStatic = projects.find(p => p.id === id);
                  const matchDb = dbProperties.find(p => p.id?.toString() === id);
                  const title = matchStatic?.title || matchDb?.title || `Property ID: ${id}`;
                  const subtitle = matchStatic?.subtitle || matchDb?.location || 'Bangalore';
                  const price = matchStatic?.priceConfigs?.[0]?.price || matchDb?.price || 'Price on request';

                  return (
                    <div 
                      key={id}
                      className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          Hidden
                        </span>
                        <h4 className="font-extrabold text-white text-sm mt-1">{title}</h4>
                        <p className="text-xs text-slate-400">{subtitle} • <span className="text-indigo-300 font-bold">{price}</span></p>
                      </div>

                      <button
                        onClick={() => handleUnhide(id)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors whitespace-nowrap shadow-md"
                      >
                        Unhide & Restore
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Database Properties */}
        {activeTab === 'db_properties' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="text-xs text-indigo-400 hover:underline mb-1 font-bold block"
                >
                  ← Back to Admin Command Hub
                </button>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" /> Database Listings ({dbProperties.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Properties saved in Supabase backend database.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchDbProperties}
                  className="text-xs font-bold px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingDb ? 'animate-spin' : ''}`} /> Refresh
                </button>
                <button
                  onClick={() => navigate('/post')}
                  className="text-xs font-bold px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Post New
                </button>
              </div>
            </div>

            {dbProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm">No user-posted properties in database yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase font-bold text-[11px] border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">BHK</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {dbProperties.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-bold text-white">{item.title}</td>
                        <td className="py-3 px-4">{item.type || 'Sale'}</td>
                        <td className="py-3 px-4">{item.bhk} BHK</td>
                        <td className="py-3 px-4">{item.location}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-400">{item.price}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteDbProperty(item.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Delete listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: Section Visibility Manager (All Properties & Individual) */}
        {activeTab === 'sections' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="text-xs text-indigo-400 hover:underline mb-1 font-bold block"
                >
                  ← Back to Admin Command Hub
                </button>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-blue-400" /> All Properties Section Visibility Manager
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Super Admin power to toggle ON and OFF sections for <strong>All Properties</strong> globally or for small/individual properties:
                  Key Landmarks, Explore Neighborhood, Floor Plan &amp; Pricing, Overview, Construction Status, Starting Price, Unit Floor Plans &amp; Pricing, Top Facilities, About.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleTurnAllSections(true)}
                  className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition-colors"
                >
                  Turn All 9 ON
                </button>
                <button
                  onClick={() => handleTurnAllSections(false)}
                  className="text-xs font-bold px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition-colors"
                >
                  Turn All 9 OFF
                </button>
                <button
                  onClick={handleApplySectionToAll}
                  className="text-xs font-extrabold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-colors"
                >
                  Apply to ALL Properties
                </button>
                <button
                  onClick={handleResetSectionDefaults}
                  className="text-xs font-bold px-3 py-1.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            {/* Target Property Picker */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="text-xs font-bold text-slate-300 whitespace-nowrap">Editing Sections For:</label>
                <select
                  value={activeSectionProject}
                  onChange={(e) => handleSelectSectionProject(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-blue-500 min-w-[280px]"
                >
                  <option value="global">★ Global Default (Applies to All Properties)</option>
                  <optgroup label="Static Projects">
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.builder})</option>
                    ))}
                  </optgroup>
                  {dbProperties.length > 0 && (
                    <optgroup label="Database Properties">
                      {dbProperties.map(p => (
                        <option key={p.id} value={p.id}>{p.title || `Property #${p.id}`}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {activeSectionProject !== 'global' && (
                  <Link
                    to={`/project/${activeSectionProject}`}
                    target="_blank"
                    className="text-xs font-bold text-blue-300 hover:text-white px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Preview Property Page
                  </Link>
                )}
                <span className="text-xs text-blue-300 font-bold bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl">
                  Target: {activeSectionProject === 'global' ? 'All Properties (Global)' : 'Custom Property Override'}
                </span>
              </div>
            </div>

            {/* The 9 Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {SECTION_DEFINITIONS.map((def) => {
                const isVisible = currentSectionVis[def.id as keyof SectionVisibilityMap] !== false;
                return (
                  <div
                    key={def.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isVisible
                        ? 'bg-slate-800/60 border-slate-700/80 shadow-md'
                        : 'bg-rose-950/20 border-rose-500/40 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                          isVisible
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}>
                          {isVisible ? 'ON (Visible)' : 'OFF (Hidden)'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">ID: {def.id}</span>
                      </div>
                      <h4 className="font-extrabold text-white text-base">{def.label}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{def.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-400">
                        {isVisible ? 'Section renders on page' : 'Section is hidden'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSectionItem(def.id as keyof SectionVisibilityMap)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                          isVisible
                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                        }`}
                      >
                        {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isVisible ? 'Turn OFF' : 'Turn ON'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Properties Overview Matrix */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h3 className="text-base font-extrabold text-white mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" /> Property Section Management Matrix
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Click any property below to switch editor to that property, or open its page to test live:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...projects, ...dbProperties.map(p => ({
                  id: p.id?.toString(),
                  title: p.title || 'DB Property',
                  subtitle: p.location || 'Bangalore'
                }))].map((item) => {
                  const hasCustom = typeof localStorage !== 'undefined' && !!localStorage.getItem(`admin_section_visibility_${item.id}`);
                  const isCurrent = activeSectionProject === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isCurrent
                          ? 'bg-blue-600/20 border-blue-500'
                          : 'bg-slate-850/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="min-w-0">
                        <h5 className="font-extrabold text-xs text-white truncate">{item.title}</h5>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            hasCustom ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {hasCustom ? 'Custom Override' : 'Using Global'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSelectSectionProject(item.id)}
                          className={`text-[10px] font-black px-2.5 py-1 rounded-lg transition-colors ${
                            isCurrent
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isCurrent ? 'Editing' : 'Edit'}
                        </button>
                        <Link
                          to={`/project/${item.id}`}
                          target="_blank"
                          className="p-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
                          title="Open Property Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Overview ON/OFF Toggle per Property */}
        {activeTab === 'overview' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="text-xs text-indigo-400 hover:underline mb-1 font-bold block"
                >
                  ← Back to Admin Command Hub
                </button>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-400" /> Property "Overview" ON / OFF Manager
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Turn the Project Overview section ON or OFF individually for each property listing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // Turn all ON
                    projects.forEach(p => localStorage.setItem(`admin_overview_toggle_${p.id}`, JSON.stringify(true)));
                    dbProperties.forEach(p => localStorage.setItem(`admin_overview_toggle_${p.id}`, JSON.stringify(true)));
                    const allOn: any = {};
                    projects.forEach(p => allOn[p.id] = true);
                    dbProperties.forEach(p => allOn[p.id] = true);
                    setOverviewToggles(allOn);
                    notify('All property overviews turned ON');
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition-colors"
                >
                  Turn All ON
                </button>
                <button
                  onClick={() => {
                    // Turn all OFF
                    projects.forEach(p => localStorage.setItem(`admin_overview_toggle_${p.id}`, JSON.stringify(false)));
                    dbProperties.forEach(p => localStorage.setItem(`admin_overview_toggle_${p.id}`, JSON.stringify(false)));
                    const allOff: any = {};
                    projects.forEach(p => allOff[p.id] = false);
                    dbProperties.forEach(p => allOff[p.id] = false);
                    setOverviewToggles(allOff);
                    notify('All property overviews turned OFF');
                  }}
                  className="text-xs font-bold px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition-colors"
                >
                  Turn All OFF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...projects, ...dbProperties.map(p => ({
                id: p.id?.toString(),
                title: p.title || 'DB Property',
                subtitle: p.location || 'Bangalore',
                priceConfigs: [{ label: p.type || 'Price', price: p.price || 'Contact for price' }]
              }))].map((item) => {
                const isOverviewOn = overviewToggles[item.id] !== false; // default ON
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isOverviewOn
                        ? 'bg-slate-800/60 border-slate-700/80'
                        : 'bg-amber-950/20 border-amber-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                          isOverviewOn 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {isOverviewOn ? 'Overview: ON' : 'Overview: OFF (Hidden)'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-white text-sm mt-1.5">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/project/${item.id}`}
                        target="_blank"
                        className="p-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors flex items-center gap-1"
                        title="Preview Property Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => toggleProjectOverview(item.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                          isOverviewOn
                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                        }`}
                      >
                        {isOverviewOn ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isOverviewOn ? 'Turn OFF' : 'Turn ON'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: Manage Amenities (30+ Catalog) */}
        {activeTab === 'amenities' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="text-xs text-indigo-400 hover:underline mb-1 font-bold block"
                >
                  ← Back to Admin Command Hub
                </button>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> Master Amenities Control (35+ Catalog)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select, add, or toggle amenities for all properties or customize for a specific project.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={saveAmenitiesConfiguration}
                  className="text-xs font-extrabold px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Amenities ({configuredAmenities.length})
                </button>
              </div>
            </div>

            {/* Target Property Picker */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Editing Amenities For:</label>
                <select
                  value={activeAmenityProject}
                  onChange={(e) => handleSelectAmenityProject(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-indigo-500"
                >
                  <option value="global">★ Default (All Projects)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.builder})</option>
                  ))}
                  {dbProperties.map(p => (
                    <option key={p.id} value={p.id}>{p.title || `Property #${p.id}`}</option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-indigo-300 font-bold bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-xl">
                Currently Selected: {configuredAmenities.length} of {MASTER_AMENITIES.length} amenities
              </div>
            </div>

            {/* Custom Amenity Adder */}
            <form onSubmit={handleAddCustomAmenity} className="mb-5 flex gap-2">
              <input
                type="text"
                placeholder="Add custom amenity (e.g. Squash Court, Helipad, Bowling Alley...)"
                value={newCustomAmenity}
                onChange={(e) => setNewCustomAmenity(e.target.value)}
                className="flex-grow text-xs bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors whitespace-nowrap"
              >
                + Add Custom Amenity
              </button>
            </form>

            {/* Search filter for amenities */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search amenities (e.g. pool, gym, security)..."
                value={amenitySearch}
                onChange={(e) => setAmenitySearch(e.target.value)}
                className="w-full text-xs bg-slate-900/60 border border-slate-800 text-white rounded-xl px-4 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Master Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {MASTER_AMENITIES.filter(a => a.toLowerCase().includes(amenitySearch.toLowerCase())).map((name) => {
                const isSelected = configuredAmenities.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleAmenitySelection(name)}
                    className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-500/60 text-white shadow-sm ring-1 ring-indigo-500/30'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{name}</span>
                    <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[11px] ${
                      isSelected ? 'bg-indigo-500 text-white' : 'border border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: User Registrations & Approvals */}
        {activeTab === 'registrations' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/20">
                  <UserCheck className="w-3.5 h-3.5" /> Homes & Rents Approval Desk
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  User Registration & Access Approvals
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review new user requests, verify credentials, call applicants within 60 minutes, and grant property posting access.
                  Submissions are also dispatched to <strong className="text-emerald-400">{ADMIN_NOTIFICATION_EMAIL}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={refreshRegistrations}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh List
                </button>
              </div>
            </div>

            {/* Filter Pills and Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-2xl border border-slate-800">
                {(['All', 'Pending Verification', 'Approved', 'Rejected'] as const).map(tab => {
                  const count = tab === 'All' 
                    ? registrations.length 
                    : registrations.filter(r => r.status === tab).length;
                  const isActive = regFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setRegFilter(tab)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                        isActive
                          ? tab === 'Pending Verification'
                            ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                            : tab === 'Approved'
                            ? 'bg-emerald-600 text-white shadow-md font-black'
                            : tab === 'Rejected'
                            ? 'bg-rose-600 text-white shadow-md font-black'
                            : 'bg-white text-slate-950 shadow-md font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{tab}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isActive ? 'bg-black/20 text-current' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, RERA..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="text-xs bg-slate-950/80 border border-slate-800 text-white rounded-xl pl-9 pr-4 py-2 outline-none focus:border-emerald-500 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Registrations Table */}
            {(() => {
              const filtered = registrations
                .filter(r => regFilter === 'All' ? true : r.status === regFilter)
                .filter(r => {
                  if (!regSearch.trim()) return true;
                  const q = regSearch.toLowerCase();
                  return (
                    r.fullName.toLowerCase().includes(q) ||
                    r.email.toLowerCase().includes(q) ||
                    r.mobile.includes(q) ||
                    r.whatsapp.includes(q) ||
                    (r.companyName && r.companyName.toLowerCase().includes(q)) ||
                    (r.reraNumber && r.reraNumber.toLowerCase().includes(q))
                  );
                });

              if (filtered.length === 0) {
                return (
                  <div className="py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-medium">No registrations found matching the criteria.</p>
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto rounded-2xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/70 text-slate-400 uppercase font-bold text-[11px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Applicant & Role</th>
                        <th className="px-4 py-3">Contact (Call / WA)</th>
                        <th className="px-4 py-3">Company & RERA</th>
                        <th className="px-4 py-3">City</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Registered At</th>
                        <th className="px-4 py-3 text-right">Approval Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filtered.map(r => (
                        <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-white text-sm">{r.fullName}</div>
                            <div className="text-slate-400 text-[11px]">{r.email}</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold">
                              {r.userType}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <a 
                                href={`tel:${r.mobile}`}
                                className="text-slate-200 hover:text-emerald-400 font-semibold flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3 text-slate-500" /> +91 {r.mobile}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <a
                                href={`https://wa.me/91${r.whatsapp}?text=${encodeURIComponent(`Hi ${r.fullName}, this is Homes & Rents Admin regarding your property portal registration.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <MessageSquare className="w-3 h-3" /> WA: +91 {r.whatsapp}
                              </a>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="text-slate-200 font-medium">{r.companyName || '—'}</div>
                            {r.reraNumber ? (
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5 bg-slate-800 px-1.5 py-0.5 rounded w-max">
                                RERA: {r.reraNumber}
                              </div>
                            ) : (
                              <div className="text-[10px] text-slate-500">No RERA</div>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-slate-300 font-medium">{r.city}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              r.status === 'Approved'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : r.status === 'Pending Verification'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            }`}>
                              {r.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                              {r.status === 'Pending Verification' && <Clock className="w-3 h-3" />}
                              {r.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                            {new Date(r.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {r.status !== 'Approved' && (
                                <button
                                  onClick={() => handleUpdateRegStatus(r.id, 'Approved')}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-md transition-colors flex items-center gap-1"
                                >
                                  <Check className="w-3.5 h-3.5" /> Approve
                                </button>
                              )}
                              {r.status !== 'Rejected' && (
                                <button
                                  onClick={() => handleUpdateRegStatus(r.id, 'Rejected')}
                                  className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold px-3 py-1.5 rounded-lg text-xs border border-rose-500/30 transition-colors flex items-center gap-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                </button>
                              )}
                              <a
                                href={`mailto:${r.email}?subject=Homes%20and%20Rents%20Account%20Update&body=Hi%20${encodeURIComponent(r.fullName)},%0A%0AWe%20have%20reviewed%20your%20registration%20request%20on%20Homes%20and%20Rents.`}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB: Blogs Management & SEO Articles */}
        {activeTab === 'blogs' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-bold mb-2 border border-rose-500/20">
                  <BookOpen className="w-3.5 h-3.5" /> High-Authority SEO Engine
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  Homes and Rents — Articles & SEO Blog Manager ({blogList.length} Articles)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Write, edit, and publish search-optimized articles targeting top 3 Google rankings. 
                  Loaded with <strong className="text-rose-400">"Homes and Rents"</strong> keyword density across Bangalore localities.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/blogs"
                  target="_blank"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Public Blogs
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog({
                      title: '',
                      slug: '',
                      category: 'Rental Market',
                      readTime: '5 min read',
                      author: 'Homes and Rents Editorial Desk',
                      coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
                      excerpt: '',
                      content: `Finding the perfect home in Bangalore has never been easier with **Homes and Rents**.\n\n### Why Choose Homes and Rents\n**Homes and Rents** delivers 100% verified listings with zero brokerage friction.\n\nBrowse verified properties on **Homes and Rents** today.`,
                      tags: ['Homes and Rents', 'Bangalore Real Estate', 'Rental Market']
                    });
                    setIsBlogEditorOpen(true);
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> + Write New Article
                </button>
              </div>
            </div>

            {/* Search filter for blogs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search articles by title, locality or category..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="text-xs bg-slate-950/80 border border-slate-800 text-white rounded-xl pl-9 pr-4 py-2 outline-none focus:border-rose-500 w-full"
                />
              </div>

              <span className="text-xs text-slate-400">
                Displaying <strong>{blogList.filter(b => !blogSearch.trim() || b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.category.toLowerCase().includes(blogSearch.toLowerCase())).length}</strong> of {blogList.length} articles
              </span>
            </div>

            {/* Articles Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/70 text-slate-400 uppercase font-bold text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Article Title & Slug</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Publish Date</th>
                    <th className="px-4 py-3">Read Time</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {blogList
                    .filter(b => !blogSearch.trim() || b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.category.toLowerCase().includes(blogSearch.toLowerCase()))
                    .map((post) => (
                      <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm max-w-md line-clamp-1">{post.title}</div>
                          <div className="text-slate-500 text-[11px] font-mono mt-0.5">/blog/{post.slug}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] font-bold">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {post.date}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {post.readTime}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
                              title="View Article Live"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingBlog({
                                  ...post,
                                  tags: Array.isArray(post.tags) ? post.tags : []
                                });
                                setIsBlogEditorOpen(true);
                              }}
                              className="p-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-lg border border-indigo-500/30 transition-colors"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBlog(post.id)}
                              className="p-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 rounded-lg border border-rose-500/30 transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Super Admin Blog Composer / Editor */}
            {isBlogEditorOpen && editingBlog && (
              <div 
                className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-hidden"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full shadow-2xl flex flex-col text-white max-h-[90vh] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-rose-400" />
                        {editingBlog.id ? 'Edit Blog Article' : 'Compose New SEO Article'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Optimize for Google Top 3 rankings using <strong>"Homes and Rents"</strong> keyword naturally.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBlogEditorOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Article Title</label>
                      <input
                        type="text"
                        value={editingBlog.title || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
                        placeholder="e.g. Top 10 Localities to Rent Flats in Bangalore with Homes and Rents"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={editingBlog.slug || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
                          placeholder="e.g. top-localities-to-rent-bangalore"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingBlog.category || 'Rental Market'}
                          onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
                          placeholder="Rental Market, Home Buying, RERA, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={editingBlog.coverImage || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Read Time</label>
                        <input
                          type="text"
                          value={editingBlog.readTime || '5 min read'}
                          onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
                          placeholder="5 min read"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Short Excerpt (Meta Description)</label>
                      <textarea
                        rows={2}
                        value={editingBlog.excerpt || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-rose-500"
                        placeholder="Brief summary appearing on Google search and card preview..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Article Content (Markdown supported)</label>
                      <textarea
                        rows={10}
                        value={editingBlog.content || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-rose-500 font-mono leading-relaxed"
                        placeholder="Write article here. Use ### Section Heading and **Homes and Rents** for SEO ranking..."
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsBlogEditorOpen(false)}
                        className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-black bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-md transition-colors"
                      >
                        Publish Article on Homes and Rents
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: Custom URLs & SEO Area Pages Management */}
        {activeTab === 'custom_urls' && (
          <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-wider mb-2">
                  <Globe className="w-3.5 h-3.5" /> High-Intent Locality URLs & Area Landing Pages
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  Customizable URLs & Google SEO Pages
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Super Admin can create, edit, customize slugs, titles, connectivity, and investment points for individual corridor pages across North, East, South, West & Central Bangalore.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setEditingPage({
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
                    setIsPageEditorOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Custom URL Page</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              {/* Zone Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {['All', 'North Bangalore', 'East Bangalore', 'South Bangalore', 'West Bangalore', 'Central and Established Bangalore', 'General Bangalore'].map(z => (
                  <button
                    key={z}
                    onClick={() => setUrlZoneFilter(z)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      urlZoneFilter === z 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search URLs, areas, titles..."
                  value={urlSearch}
                  onChange={(e) => setUrlSearch(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* URL Pages Grid / Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customPages
                .filter(p => {
                  const matchesZone = urlZoneFilter === 'All' || p.zone === urlZoneFilter;
                  const q = urlSearch.toLowerCase();
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
                    className="rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">
                          {page.zone}
                        </span>
                        {page.priorityTag && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {page.priorityTag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-extrabold text-white leading-snug mb-1 group-hover:text-blue-300 transition-colors">
                        {page.title}
                      </h3>

                      {/* Clean URL Link */}
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono mb-3 truncate">
                        <Link2 className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        <span className="truncate">/{page.slug}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {page.tagline}
                      </p>

                      <div className="bg-slate-900 rounded-xl p-2.5 border border-slate-800 text-[11px] space-y-1 mb-4">
                        <div className="flex justify-between items-center text-slate-400">
                          <span>Price Range:</span>
                          <span className="text-emerald-400 font-bold">{page.indicativePriceRange.split('|')[0]}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400">
                          <span>Why Invest Points:</span>
                          <span className="text-white font-bold">{page.whyInvest.length} key points</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <Link
                        to={`/${page.slug}`}
                        target="_blank"
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-bold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span>Live Page</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPage(page);
                            setIsPageEditorOpen(true);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/20 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCustomPage(page.id, page.slug)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                          title="Delete URL"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Custom URL Editor Modal */}
            {isPageEditorOpen && editingPage && (
              <div 
                className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-hidden"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        {editingPage.id && customPages.some(p => p.id === editingPage.id) ? 'Edit Custom Area URL' : 'Create New Custom Area URL'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Define high-intent Google ranking URL parameters, titles, connectivity, and investment details
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPageEditorOpen(false)}
                      className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveCustomPage} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
                    {/* Zone & Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Bangalore Zone</label>
                        <select
                          value={editingPage.zone || 'North Bangalore'}
                          onChange={(e) => setEditingPage({ ...editingPage, zone: e.target.value as any })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 font-bold"
                        >
                          <option value="North Bangalore">North Bangalore (Airport Corridor & High Priority)</option>
                          <option value="East Bangalore">East Bangalore (IT Corridor & Residential Growth)</option>
                          <option value="South Bangalore">South Bangalore (Metro, Electronic City & Arteries)</option>
                          <option value="West Bangalore">West Bangalore (Expressway, Metro & RR Nagar)</option>
                          <option value="Central and Established Bangalore">Central and Established Bangalore (Koramangala, Indiranagar, etc.)</option>
                          <option value="General Bangalore">General Bangalore (Macro Searches: 2026 Launches, EOI)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Priority Badge</label>
                        <select
                          value={editingPage.priorityTag || 'High Priority'}
                          onChange={(e) => setEditingPage({ ...editingPage, priorityTag: e.target.value as any })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 font-bold"
                        >
                          <option value="High Priority">High Priority</option>
                          <option value="Growth Corridor">Growth Corridor</option>
                          <option value="Prime Investment">Prime Investment</option>
                          <option value="Hot Corridor">Hot Corridor</option>
                          <option value="Established Metro">Established Metro</option>
                        </select>
                      </div>
                    </div>

                    {/* Page Title & Area Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Page Title (H1 Tag for Google) <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={editingPage.title || ''}
                          onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500 font-bold"
                          placeholder="e.g. New Launch Projects in Devanahalli"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Area / Corridor Name
                        </label>
                        <input
                          type="text"
                          value={editingPage.areaName || ''}
                          onChange={(e) => setEditingPage({ ...editingPage, areaName: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500"
                          placeholder="e.g. Devanahalli"
                        />
                      </div>
                    </div>

                    {/* URL Slug */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Custom URL Slug (Live at: homesandrents.com/slug) <span className="text-rose-400">*</span>
                      </label>
                      <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-1.5 focus-within:border-blue-500">
                        <span className="text-xs text-slate-500 font-mono select-none">https://homesandrents.com/</span>
                        <input
                          type="text"
                          value={editingPage.slug || ''}
                          onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                          className="w-full text-xs bg-transparent text-blue-400 outline-none font-mono py-1 ml-1"
                          placeholder="new-launch-projects-in-devanahalli"
                          required
                        />
                      </div>
                    </div>

                    {/* Tagline & Indicative Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Tagline / Key Feature</label>
                        <input
                          type="text"
                          value={editingPage.tagline || ''}
                          onChange={(e) => setEditingPage({ ...editingPage, tagline: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500"
                          placeholder="e.g. Aerotropolis, KIADB Aerospace SEZ & STRR Highway Corridor"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Indicative Price Range</label>
                        <input
                          type="text"
                          value={editingPage.indicativePriceRange || ''}
                          onChange={(e) => setEditingPage({ ...editingPage, indicativePriceRange: e.target.value })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500"
                          placeholder="e.g. ₹65 Lakh - ₹3.50 Cr | ₹7,500 - ₹12,000 / sq.ft."
                        />
                      </div>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Google Meta Description</label>
                      <textarea
                        rows={2}
                        value={editingPage.metaDescription || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, metaDescription: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 leading-relaxed"
                        placeholder="Google search description snippet..."
                      />
                    </div>

                    {/* Hero Snippet */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Hero Introduction Paragraph</label>
                      <textarea
                        rows={2}
                        value={editingPage.heroSnippet || ''}
                        onChange={(e) => setEditingPage({ ...editingPage, heroSnippet: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 leading-relaxed"
                        placeholder="Comprehensive introductory paragraph explaining why this corridor is in high demand..."
                      />
                    </div>

                    {/* Why Invest Points (Line by Line) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Why Invest Points (One per line)</label>
                        <textarea
                          rows={4}
                          value={Array.isArray(editingPage.whyInvest) ? editingPage.whyInvest.join('\n') : (editingPage.whyInvest || '')}
                          onChange={(e) => setEditingPage({ ...editingPage, whyInvest: e.target.value.split('\n') })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 leading-relaxed font-mono"
                          placeholder="Multi-billion dollar IT park\nHigh rental demand from techies\nUpcoming Metro connectivity"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Connectivity Highlights (One per line)</label>
                        <textarea
                          rows={4}
                          value={Array.isArray(editingPage.connectivityHighlights) ? editingPage.connectivityHighlights.join('\n') : (editingPage.connectivityHighlights || '')}
                          onChange={(e) => setEditingPage({ ...editingPage, connectivityHighlights: e.target.value.split('\n') })}
                          className="w-full text-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-blue-500 leading-relaxed font-mono"
                          placeholder="Direct 30 mins access to Airport\nSTRR satellite ring road link\nPurple line metro interchange"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPageEditorOpen(false)}
                        className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                      >
                        Save & Publish Custom URL Page
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
