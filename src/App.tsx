import { useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';


import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, CheckCircle2, Search, MapPin, ArrowUp, ArrowDown, GripVertical, RotateCcw, Check, Eye, EyeOff, Edit3 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { projects, applyPropertyOverrides } from './data/projects';
import { SearchPage } from './pages/Search';
import { PropertyDetail } from './pages/PropertyDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { LocationSeoPage } from './pages/LocationSeoPage';
import { PostProperty } from './pages/PostProperty';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLoginPage } from './pages/AdminLogin';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ProjectCard } from './components/ProjectCard';
import { EditPropertyModal } from './components/EditPropertyModal';
import { SuperCards } from './components/SuperCards';
import { LaunchModal } from './components/LaunchModal';
import { PromotionalPopups } from './components/PromotionalPopups';
import { StylishFooter } from './components/StylishFooter';
import { NorthBangaloreBlock } from './components/NorthBangaloreBlock';
import { TrendingNow } from './components/TrendingNow';
import type { SuperCardCategory } from './components/SuperCards';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import type { ProjectData } from './data/projects';
import { supabase } from './lib/supabase';

// Mock Data removed, using Supabase

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
          <div className="flex items-center flex-shrink-0 gap-3 sm:gap-4">
            <Link 
              to="/blogs"
              className="text-[13px] sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span>Blogs</span>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-1.5 py-0.2 rounded-full hidden sm:inline">SEO</span>
            </Link>
            {!user && (
              <button 
                onClick={onLoginClick}
                className="text-[13px] sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                <span className="sm:hidden">Login</span>
                <span className="hidden sm:inline">Login / Signup</span>
              </button>
            )}
            <Link 
              to={user?.email === 'admin@homesandrents.com' ? '/admin' : '/post'} 
              className="flex items-center gap-1.5 bg-[#8b45f7] hover:bg-[#7a35e6] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[12px] sm:text-sm whitespace-nowrap shadow-sm hover:shadow transition-all"
            >
              <span>{user?.email === 'admin@homesandrents.com' ? 'Admin Menu' : 'Post Property'}</span>
              <span className="bg-white/30 text-white text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded shadow-sm">
                {user?.email === 'admin@homesandrents.com' ? 'ADMIN' : 'FREE'}
              </span>
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

const SearchHero = ({ activeTab = 'Sale', setActiveTab, searchQuery = '', setSearchQuery }: { activeTab?: 'Rent' | 'Sale', setActiveTab?: (tab: 'Rent' | 'Sale') => void, searchQuery?: string, setSearchQuery?: (query: string) => void }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const POPULAR_HUBS = [
    { name: 'Whitefield', label: 'Whitefield (East IT Hub)' },
    { name: 'HSR Layout', label: 'HSR Layout (Startup Capital)' },
    { name: 'Bellandur', label: 'Bellandur / ORR (Financial District & IT Corridor)' },
    { name: 'Electronic City', label: 'Electronic City (South IT Hub)' },
    { name: 'Marathahalli', label: 'Marathahalli (Budget Techie Hub)' },
    { name: 'Koramangala', label: 'Koramangala (Premium Lifestyle & Startups)' },
    { name: 'Indiranagar', label: 'Indiranagar (Premium Lifestyle & Metro)' },
    { name: 'Sarjapur Road', label: 'Sarjapur Road (Gated Community & Family Hub)' },
    { name: 'BTM Layout', label: 'BTM Layout (Bachelor & Co-living Capital)' },
    { name: 'JP Nagar', label: 'JP Nagar (South Family & Metro Hub)' },
    { name: 'Hebbal', label: 'Hebbal / Thanisandra (North Tech / Manyata Hub)' },
    { name: 'Yelahanka', label: 'Yelahanka (Airport Corridor & Green Living)' }
  ];

  const allLocalities = Array.from(new Set(
    projects.map(p => {
      const match = p.subtitle?.match(/ in (.*?)(?:, Bangalore|$)/i);
      return match ? match[1].trim() : null;
    }).filter(Boolean) as string[]
  )).sort();
  
  const allSuggestions = [
    ...POPULAR_HUBS,
    ...allLocalities
      .filter(loc => !POPULAR_HUBS.some(hub => hub.name.toLowerCase() === loc.toLowerCase() || hub.label.toLowerCase().includes(loc.toLowerCase())))
      .map(loc => ({ name: loc, label: loc }))
  ];

  const filteredLocalities = allSuggestions.filter(loc => 
    loc.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-3 sm:px-4 pt-3 sm:pt-6 pb-8 sm:pb-12 w-full shadow-2xl relative z-30">
      {/* Decorative Blur Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-600/20 rounded-full blur-[80px] sm:blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/20 rounded-full blur-[80px] sm:blur-[100px] translate-x-1/4 translate-y-1/4"></div>
      </div>
      
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
              onClick={() => {
                setActiveTab?.('Rent');
              }}
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
          <div className="flex gap-2 sm:gap-3 relative z-50">
            <div className="flex-1 bg-white rounded-xl sm:rounded-2xl flex flex-col shadow-inner focus-within:ring-4 focus-within:ring-indigo-500/30 transition-all border border-gray-100 relative">
              <div className="flex items-center px-3 sm:px-6 h-full">
                <input 
                  type="text" 
                  placeholder="Search locality..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery?.(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full outline-none text-[13px] sm:text-[15px] text-gray-800 bg-transparent placeholder-gray-400 py-2.5 sm:py-4.5 font-semibold h-full" 
                />
              </div>
              {showSuggestions && filteredLocalities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100/50 overflow-hidden z-50 max-h-60 overflow-y-auto">
                  {filteredLocalities.map((loc, i) => (
                    <div 
                      key={i} 
                      className="px-4 sm:px-6 py-3 hover:bg-indigo-50/80 cursor-pointer text-sm font-bold text-gray-700 transition-colors flex items-center border-b border-gray-50 last:border-0"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery?.(loc.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                      {loc.label}
                    </div>
                  ))}
                </div>
              )}
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


const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@homesandrents.com';
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'Rent' | 'Sale'>(() => {
    const tabParam = searchParams.get('tab');
    return tabParam === 'Rent' || tabParam === 'Sale' ? tabParam : 'Sale';
  });
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [selectedBuilder, setSelectedBuilder] = useState<string | null>(() => searchParams.get('builder'));
  const [selectedCategory, setSelectedCategory] = useState<SuperCardCategory>(() => {
    const cat = searchParams.get('category');
    return (cat as SuperCardCategory) || 'All';
  });
  const [dbProjects, setDbProjects] = useState<ProjectData[]>([]);
  const [customOrder, setCustomOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('admin_property_order');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [hiddenProjects, setHiddenProjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('admin_hidden_properties');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHiddenToAdmin, setShowHiddenToAdmin] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

  const toggleHideProperty = (id: string) => {
    const isCurrentlyHidden = hiddenProjects.includes(id);
    const updated = isCurrentlyHidden 
      ? hiddenProjects.filter(item => item !== id)
      : [...hiddenProjects, id];
    
    setHiddenProjects(updated);
    localStorage.setItem('admin_hidden_properties', JSON.stringify(updated));
    setSaveFeedback(isCurrentlyHidden ? 'Property Unhidden' : 'Property Hidden');
    setTimeout(() => setSaveFeedback(null), 2000);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const mapped: ProjectData[] = data.map(item => ({
          id: item.id?.toString() || Math.random().toString(),
          title: item.title || 'Untitled Property',
          subtitle: `${item.bhk || 2} BHK in ${item.location || 'Bangalore'}`,
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
        setDbProjects(mapped);
      }
    };
    fetchProperties();
  }, []);

  const [overrideVersion, setOverrideVersion] = useState(0);

  useEffect(() => {
    const handleOverrideUpdate = () => setOverrideVersion(v => v + 1);
    window.addEventListener('propertyOverrideUpdated', handleOverrideUpdate);
    return () => window.removeEventListener('propertyOverrideUpdated', handleOverrideUpdate);
  }, []);

  const rawProjects = overrideVersion >= 0 ? [...projects, ...dbProjects].map(p => applyPropertyOverrides(p)) : [];

  // Apply custom order if present
  const allProjects = [...rawProjects].sort((a, b) => {
    const indexA = customOrder.indexOf(a.id);
    const indexB = customOrder.indexOf(b.id);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const saveOrder = (newOrder: string[]) => {
    setCustomOrder(newOrder);
    localStorage.setItem('admin_property_order', JSON.stringify(newOrder));
    setSaveFeedback('Order Saved');
    setTimeout(() => setSaveFeedback(null), 2000);
  };

  const handleMove = (id: string, direction: 'up' | 'down', currentList: ProjectData[]) => {
    const currentIndex = currentList.findIndex(p => p.id === id);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    // Create a new sequence of all project IDs maintaining current rendered ordering
    const fullOrderList = allProjects.map(p => p.id);
    const fromIndexInFull = fullOrderList.indexOf(id);
    const toId = currentList[targetIndex].id;
    const toIndexInFull = fullOrderList.indexOf(toId);

    if (fromIndexInFull === -1 || toIndexInFull === -1) return;

    const updated = [...fullOrderList];
    const [moved] = updated.splice(fromIndexInFull, 1);
    updated.splice(toIndexInFull, 0, moved);

    saveOrder(updated);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = draggedId || e.dataTransfer.getData('text/plain');
    if (!sourceId || sourceId === targetId) {
      setDraggedId(null);
      return;
    }

    const fullOrderList = allProjects.map(p => p.id);
    const fromIndex = fullOrderList.indexOf(sourceId);
    const toIndex = fullOrderList.indexOf(targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const updated = [...fullOrderList];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      saveOrder(updated);
    }
    setDraggedId(null);
  };

  const handleResetOrder = () => {
    if (window.confirm('Reset all properties back to default order?')) {
      setCustomOrder([]);
      localStorage.removeItem('admin_property_order');
      setSaveFeedback('Order Reset');
      setTimeout(() => setSaveFeedback(null), 2000);
    }
  };

  // Extract unique builders
  const builders = Array.from(new Set(allProjects.map(p => p.builder))).filter(Boolean);

  let filteredProjects = allProjects;

  // Filter out hidden properties for general visitors; for admin, filter unless showHiddenToAdmin toggle is on
  if (!isAdmin || !showHiddenToAdmin) {
    filteredProjects = filteredProjects.filter(p => !hiddenProjects.includes(p.id));
  }

  if (activeTab === 'Rent') {
    filteredProjects = filteredProjects.filter(p => p.tag === 'Rent' || p.priceConfigs?.some(c => c.label.toLowerCase().includes('rent')));
  } else {
    filteredProjects = filteredProjects.filter(p => p.tag !== 'Rent' && !p.priceConfigs?.some(c => c.label.toLowerCase().includes('rent')));
  }
  
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredProjects = filteredProjects.filter(p => 
      p.subtitle?.toLowerCase().includes(q) || 
      p.title.toLowerCase().includes(q) ||
      p.builder.toLowerCase().includes(q)
    );
  }

  if (selectedBuilder) {
    filteredProjects = filteredProjects.filter(p => p.builder === selectedBuilder);
  }

  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [activeLaunchCategory, setActiveLaunchCategory] = useState<SuperCardCategory | null>(null);

  const handleCategorySelect = (category: SuperCardCategory) => {
    setSelectedCategory(category);
    if (category === 'New Launch' || category === 'Pre Launch') {
      setActiveLaunchCategory(category);
      setIsLaunchModalOpen(true);
    }
  };

  if (selectedCategory !== 'All') {
    filteredProjects = filteredProjects.filter(p => {
      // Direct explicit category match
      if (p.category && p.category === selectedCategory) {
        return true;
      }

      if (selectedCategory === 'New Launch') {
        const isNew = p.status?.toLowerCase().includes('new launch') || 
                      p.tag?.toLowerCase().includes('new') ||
                      p.badges?.some(b => b.toLowerCase().includes('new'));
        return isNew;
      }
      if (selectedCategory === 'Pre Launch') {
        const isPre = p.status?.toLowerCase().includes('pre launch') || 
                      p.status?.toLowerCase().includes('under construction') ||
                      p.tag?.toLowerCase().includes('pre') ||
                      p.title?.toLowerCase().includes('pre-launch');
        return isPre;
      }

      if (selectedCategory === 'Ready to Move') {
        return p.status?.toLowerCase().includes('ready') || p.subtitle?.toLowerCase().includes('ready');
      }
      if (selectedCategory === 'Under Construction') {
        return p.status?.toLowerCase().includes('construction') || p.subtitle?.toLowerCase().includes('construction');
      }
      if (selectedCategory === 'Plots & Lands') {
        return p.subtitle?.toLowerCase().includes('plot') || 
               p.subtitle?.toLowerCase().includes('land') || 
               p.title?.toLowerCase().includes('plot') || 
               p.title?.toLowerCase().includes('land');
      }
      if (selectedCategory === 'Resale Properties') {
        return p.tag?.toLowerCase().includes('re-sell') || 
               p.tag?.toLowerCase().includes('resell') || 
               p.tag?.toLowerCase().includes('re-sale') || 
               p.tag?.toLowerCase().includes('resale') || 
               p.title?.toLowerCase().includes('resale') || 
               p.title?.toLowerCase().includes('re-sell') ||
               p.title?.toLowerCase().includes('re-sale') ||
               p.builder?.toLowerCase().includes('individual') ||
               p.tag === 'Sale';
      }
      if (selectedCategory === 'Commercial') {
        return p.subtitle?.toLowerCase().includes('shop') || 
               p.subtitle?.toLowerCase().includes('office') || 
               p.subtitle?.toLowerCase().includes('commercial') || 
               p.title?.toLowerCase().includes('shop') || 
               p.title?.toLowerCase().includes('commercial');
      }

      return true;
    });
  }

  useEffect(() => {
    const handleTabChange = (e: any) => setActiveTab(e.detail);
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat as SuperCardCategory);

    const b = searchParams.get('builder');
    if (b) setSelectedBuilder(b);

    const t = searchParams.get('tab');
    if (t === 'Rent' || t === 'Sale') setActiveTab(t);

    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Homes and Rents | Top Properties in Bangalore</title>
        <meta name="description" content="Find the best flats for rent, new projects, and properties in Bangalore and Karnataka. Browse thousands of verified listings on Homes and Rents." />
        <meta name="keywords" content="Bangalore real estate, flats for rent Bangalore, new projects Bangalore, Karnataka properties" />
        <meta property="og:title" content="Homes and Rents | Top Properties in Bangalore" />
        <meta property="og:description" content="Find the best flats for rent, new projects, and properties in Bangalore and Karnataka." />
        <meta property="og:type" content="website" />
      </Helmet>
      <SearchHero activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow w-full relative z-20 -mt-8 sm:-mt-12 px-2 sm:px-0">
        <div className="bg-gray-50 rounded-t-[2rem] pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 pb-6 max-w-5xl mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100">
          
          <SuperCards selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

          <LaunchModal 
            isOpen={isLaunchModalOpen} 
            onClose={() => setIsLaunchModalOpen(false)} 
            category={activeLaunchCategory}
            count={filteredProjects.length}
          />

          {/* Builder Filter Section */}
          <div className="mb-8">
            <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-3">
              <span>Browse by Builder</span>
              <span className="flex-grow h-[1px] bg-gray-200"></span>
            </div>
            
            <div className="overflow-hidden relative w-full pb-2">
              {/* Fade masks for smooth edges */}
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-marquee gap-3 w-max items-center hover:[animation-play-state:paused]" style={{ animationDuration: '250s' }}>
                {[...[null, ...builders], ...[null, ...builders]].map((builder, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedBuilder(builder)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-colors flex items-center gap-2 ${
                      selectedBuilder === builder 
                        ? 'bg-[#0078d4] text-white border-[#0078d4]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm hover:border-gray-300'
                    }`}
                  >
                    {builder === null ? (
                      <span>All Projects</span>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] font-extrabold text-gray-800">
                          {builder.substring(0, 2).toUpperCase()}
                        </div>
                        {builder}
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Projects Section */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 mb-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0a192f] tracking-tight">
                  {selectedBuilder ? `${selectedBuilder} Projects` : 'Recommended Projects'}
                </h2>
                {isAdmin && (
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5 flex items-center gap-1.5">
                    <GripVertical className="w-3.5 h-3.5 inline" />
                    Admin Mode: Drag cards or use ↑ / ↓ buttons to reorder listings.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {saveFeedback && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
                    <Check className="w-3.5 h-3.5" /> Order Saved
                  </span>
                )}
                {isAdmin && hiddenProjects.length > 0 && (
                  <button 
                    onClick={() => setShowHiddenToAdmin(!showHiddenToAdmin)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border ${
                      showHiddenToAdmin 
                        ? 'bg-amber-100 text-amber-900 border-amber-300' 
                        : 'bg-gray-100 text-gray-700 hover:text-amber-700 hover:bg-amber-50 border-gray-200'
                    }`}
                    title={showHiddenToAdmin ? "Hide the hidden listings from view" : "Show hidden listings"}
                  >
                    {showHiddenToAdmin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showHiddenToAdmin ? `Showing Hidden (${hiddenProjects.length})` : `Show Hidden (${hiddenProjects.length})`}
                  </button>
                )}
                {isAdmin && customOrder.length > 0 && (
                  <button 
                    onClick={handleResetOrder}
                    className="text-xs font-bold text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 border border-gray-200 hover:border-red-200 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors"
                    title="Reset to default order"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Order
                  </button>
                )}
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{filteredProjects.length} found</span>
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 font-medium">No projects found for {selectedBuilder}.</p>
                <button onClick={() => setSelectedBuilder(null)} className="mt-4 text-[#0078d4] font-bold hover:underline">View all projects</button>
              </div>
            ) : (
              <div className="flex flex-col gap-8 sm:gap-6">
                {filteredProjects.map((project, index) => {
                  const isHidden = hiddenProjects.includes(project.id);
                  return (
                  <div
                    key={project.id}
                    draggable={isAdmin}
                    onDragStart={(e) => isAdmin && handleDragStart(e, project.id)}
                    onDragOver={(e) => isAdmin && handleDragOver(e)}
                    onDrop={(e) => isAdmin && handleDrop(e, project.id)}
                    className={`relative transition-all duration-200 ${
                      isAdmin ? 'group/admin hover:ring-2 hover:ring-indigo-400 rounded-3xl' : ''
                    } ${draggedId === project.id ? 'opacity-40 scale-[0.98]' : ''} ${
                      isHidden ? 'opacity-70 ring-2 ring-amber-400/80 rounded-3xl' : ''
                    }`}
                  >
                    {/* Admin Move, Drag & Hide Controls Overlay */}
                    {isAdmin && (
                      <div className={`flex items-center justify-between text-white px-4 py-1.5 rounded-t-2xl text-xs font-bold z-30 mb-[-10px] relative shadow-md ${
                        isHidden 
                          ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border-b border-amber-500/30' 
                          : 'bg-gradient-to-r from-slate-900 to-indigo-950'
                      }`}>
                        <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-indigo-200 hover:text-white">
                          <GripVertical className="w-4 h-4" />
                          <span>Position #{index + 1} • Drag to move</span>
                          {isHidden && (
                            <span className="ml-2 bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-wide">
                              Hidden from Public
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Top 10 Priority Quick Jump */}
                          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px]">
                            <span className="text-amber-300 font-extrabold">Top:</span>
                            <select
                              value={index < 10 ? index + 1 : ''}
                              onChange={(e) => {
                                const targetRank = parseInt(e.target.value, 10);
                                if (!targetRank) return;
                                const fullOrderList = allProjects.map(p => p.id);
                                const fromIdx = fullOrderList.indexOf(project.id);
                                const targetProject = filteredProjects[targetRank - 1];
                                if (!targetProject) return;
                                const toIdx = fullOrderList.indexOf(targetProject.id);
                                if (fromIdx !== -1 && toIdx !== -1) {
                                  const updated = [...fullOrderList];
                                  const [moved] = updated.splice(fromIdx, 1);
                                  updated.splice(toIdx, 0, moved);
                                  saveOrder(updated);
                                }
                              }}
                              className="bg-slate-900 text-white rounded px-1 py-0.5 text-[11px] font-bold border border-white/20 outline-none cursor-pointer"
                            >
                              <option value="">Set Priority...</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rank => (
                                <option key={rank} value={rank}>Rank #{rank}</option>
                              ))}
                            </select>
                          </div>
                          <span className="text-gray-500">|</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMove(project.id, 'up', filteredProjects);
                            }}
                            disabled={index === 0}
                            className="p-1 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-1 text-[11px]"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" /> Up
                          </button>
                          <span className="text-gray-500">|</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMove(project.id, 'down', filteredProjects);
                            }}
                            disabled={index === filteredProjects.length - 1}
                            className="p-1 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-1 text-[11px]"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" /> Down
                          </button>
                          {/* Super Admin Edit Property Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setEditingProject(project);
                            }}
                            className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 hover:bg-indigo-600 hover:text-white border border-indigo-400/40 flex items-center gap-1 text-[11px] font-bold transition-all shadow-sm"
                            title="Edit this property details, prices, and 10 section toggles"
                          >
                            <Edit3 className="w-3 h-3 text-indigo-300" />
                            <span>Edit</span>
                          </button>
                          <span className="text-gray-500">|</span>
                          {/* Hide / Unhide Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleHideProperty(project.id);
                            }}
                            className={`px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-bold transition-colors ${
                              isHidden 
                                ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-sm' 
                                : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 hover:text-white border border-rose-500/30'
                            }`}
                            title={isHidden ? "Unhide this property (make visible to all)" : "Hide this property from public"}
                          >
                            {isHidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{isHidden ? 'Unhide' : 'Hide'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <ProjectCard project={project} />
                  </div>
                );
              })}
              </div>
            )}

            {/* Super Admin Edit Property Modal */}
            {editingProject && (
              <EditPropertyModal
                isOpen={!!editingProject}
                project={editingProject}
                onClose={() => setEditingProject(null)}
                onSaved={() => {
                  setSaveFeedback('Property Updated Successfully');
                  setTimeout(() => setSaveFeedback(null), 2500);
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Internal SEO Links for Localities */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Localities in Bangalore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-slate-700 mb-3">Flats for Rent</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/2-bhk-flats-in-hebbal-bangalore-north-ffid" className="text-blue-600 hover:underline">2 BHK Flats in Hebbal</Link></li>
                <li><Link to="/3-bhk-flats-in-hebbal-bangalore-north-ffid" className="text-blue-600 hover:underline">3 BHK Flats in Hebbal</Link></li>
                <li><Link to="/4-bhk-flats-in-hebbal-bangalore-north-ffid" className="text-blue-600 hover:underline">4 BHK Flats in Hebbal</Link></li>
                <li><Link to="/flats-for-rent/whitefield" className="text-blue-600 hover:underline">Flats in Whitefield</Link></li>
                <li><Link to="/flats-for-rent/hsr-layout" className="text-blue-600 hover:underline">Flats in HSR Layout</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 mb-3">Popular Configurations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/2-bhk-flats-in-whitefield-bangalore-east-ffid" className="text-blue-600 hover:underline">2 BHK in Whitefield</Link></li>
                <li><Link to="/3-bhk-flats-in-whitefield-bangalore-east-ffid" className="text-blue-600 hover:underline">3 BHK in Whitefield</Link></li>
                <li><Link to="/2-bhk-flats-in-koramangala-bangalore-south-ffid" className="text-blue-600 hover:underline">2 BHK in Koramangala</Link></li>
                <li><Link to="/3-bhk-flats-in-indiranagar-bangalore-east-ffid" className="text-blue-600 hover:underline">3 BHK in Indiranagar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 mb-3">Properties for Sale</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/properties-for-sale/whitefield" className="text-blue-600 hover:underline">Sale in Whitefield</Link></li>
                <li><Link to="/properties-for-sale/electronic-city" className="text-blue-600 hover:underline">Sale in Electronic City</Link></li>
                <li><Link to="/properties-for-sale/marathahalli" className="text-blue-600 hover:underline">Sale in Marathahalli</Link></li>
                <li><Link to="/properties-for-sale/bellandur" className="text-blue-600 hover:underline">Sale in Bellandur</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 mb-3 flex items-center justify-between">
                <span>Homes & Rents Blog</span>
                <Link to="/blogs" className="text-xs text-indigo-600 hover:underline font-bold">View All</Link>
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog/top-10-localities-to-rent-flats-in-bangalore" className="text-blue-600 hover:underline">Top 10 Rental Localities</Link></li>
                <li><Link to="/blog/complete-guide-to-buying-apartments-in-whitefield-bangalore" className="text-blue-600 hover:underline">Whitefield Buying Guide</Link></li>
                <li><Link to="/blog/why-sarjapur-road-is-the-best-hub-for-family-homes-and-rents" className="text-blue-600 hover:underline">Sarjapur Road Family Hub</Link></li>
                <li><Link to="/blog/navigating-zero-brokerage-rentals-in-bangalore-with-homes-and-rents" className="text-blue-600 hover:underline">Zero Brokerage Tips</Link></li>
                <li><Link to="/blog/rera-approved-properties-in-bangalore-why-verification-matters" className="text-blue-600 hover:underline">RERA Verification Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* High Authority North Bangalore 2BHK, 3BHK, 4BHK Hub */}
      <NorthBangaloreBlock />

      <TrendingNow />
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
          <Route path="/flats-for-rent/:location" element={<LocationSeoPage type="rent" />} />
          <Route path="/properties-for-sale/:location" element={<LocationSeoPage type="sale" />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/post" element={<PostProperty />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          {/* 99acres style SEO URL pattern: e.g. /2-bhk-flats-in-hebbal-bangalore-north-ffid */}
          <Route path="/:slug" element={<LocationSeoPage />} />
          <Route path="*" element={<div className="p-12 text-center text-xl">Page Under Construction</div>} />
        </Routes>
        <StylishFooter />
        <Analytics />
      </div>
      <PromotionalPopups />
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
