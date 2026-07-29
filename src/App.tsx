import { useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

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
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, CheckCircle2, Search, MapPin } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { projects } from './data/projects';
import { SearchPage } from './pages/Search';
import { PropertyDetail } from './pages/PropertyDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { PostProperty } from './pages/PostProperty';
import { ProjectCard } from './components/ProjectCard';
import { SuperCards } from './components/SuperCards';
import type { SuperCardCategory } from './components/SuperCards';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';

// Mock Data removed, using Supabase

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
          <div className="flex items-center flex-shrink-0">
            {!user && (
              <button 
                onClick={onLoginClick}
                className="text-[13px] sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors mr-2 sm:mr-4 whitespace-nowrap"
              >
                <span className="sm:hidden">Login</span>
                <span className="hidden sm:inline">Login / Signup</span>
              </button>
            )}
            <Link to="/post" className="flex items-center gap-1.5 bg-[#8b45f7] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-[12px] sm:text-sm whitespace-nowrap">
              <span>List</span>
              <span className="bg-white/30 text-white text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded shadow-sm">FREE</span>
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

  const POPULAR_LOCALITIES = ['Whitefield', 'HSR Layout', 'Koramangala', 'BTM Layout', 'JP Nagar', 'Electronic City', 'Marathahalli', 'Sarjapur Road', 'Bellandur', 'Hebbal', 'Thanisandra', 'Yelahanka', 'Indiranagar'];
  const filteredLocalities = POPULAR_LOCALITIES.filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));

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
                        setSearchQuery?.(loc);
                        setShowSuggestions(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
                      {loc}
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
  const [activeTab, setActiveTab] = useState<'Rent' | 'Sale'>('Sale');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilder, setSelectedBuilder] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SuperCardCategory>('All');

  // Extract unique builders
  const builders = Array.from(new Set(projects.map(p => p.builder))).filter(Boolean);

  let filteredProjects = projects;
  
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

  if (selectedCategory !== 'All' && selectedCategory !== 'Location') {
    filteredProjects = filteredProjects.filter(p => {
      const target = selectedCategory.toLowerCase();
      // Check in subtitle and price configs
      const inSubtitle = p.subtitle?.toLowerCase().includes(target);
      const inPriceConfigs = p.priceConfigs?.some(c => c.label.toLowerCase().includes(target));
      const inTitle = p.title.toLowerCase().includes(target);
      return inSubtitle || inPriceConfigs || inTitle;
    });
  }

  useEffect(() => {
    const handleTabChange = (e: any) => setActiveTab(e.detail);
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SearchHero activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow w-full relative z-20 -mt-8 sm:-mt-12 px-2 sm:px-0">
        <div className="bg-gray-50 rounded-t-[2rem] pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 pb-6 max-w-5xl mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100">
          
          <SuperCards selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

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
              
              <div className="flex animate-marquee gap-3 w-max items-center hover:[animation-play-state:paused]">
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
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-extrabold text-[#0a192f] tracking-tight">
                {selectedBuilder ? `${selectedBuilder} Projects` : 'Recommended Projects'}
              </h2>
              <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{filteredProjects.length} found</span>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 font-medium">No projects found for {selectedBuilder}.</p>
                <button onClick={() => setSelectedBuilder(null)} className="mt-4 text-[#0078d4] font-bold hover:underline">View all projects</button>
              </div>
            ) : (
              <div className="flex flex-col gap-8 sm:gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
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
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/post" element={<PostProperty />} />
          <Route path="*" element={<div className="p-12 text-center text-xl">Page Under Construction</div>} />
        </Routes>
        <Analytics />
      </div>
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
