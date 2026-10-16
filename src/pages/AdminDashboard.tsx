import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  FileSpreadsheet,
  Calendar,
  Rocket,
  Store,
  Tag,
  MapPin,
  DollarSign,
  Database,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { projects } from '../data/projects';

export const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'hub' | 'hidden' | 'db_properties' | 'leads'>('hub');
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [customOrder, setCustomOrder] = useState<string[]>([]);
  const [dbProperties, setDbProperties] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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
      id: 'floor_plan_enquiries',
      title: 'Floor Plan WhatsApp Flow',
      desc: 'Verify instant brochure & price breakup WhatsApp links',
      icon: FileSpreadsheet,
      gradient: 'from-cyan-600 to-blue-700',
      action: () => navigate('/project/gr-samskruthi')
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
      action: () => navigate('/')
    },
    {
      id: 'commercial_resale',
      title: 'Plots & Commercial Deals',
      desc: 'Filter plots, lands, shops and resale inventory',
      icon: Store,
      gradient: 'from-amber-500 to-yellow-600',
      action: () => navigate('/')
    },
    {
      id: 'builder_showcase',
      title: 'Builder Marquee Audit',
      desc: 'Audit Prestige, Godrej, Sobha, Brigade showcase logos',
      icon: Tag,
      gradient: 'from-teal-600 to-emerald-700',
      action: () => navigate('/')
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16">
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
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/90 border border-indigo-500/20 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
                <CheckCircle className="w-3.5 h-3.5" /> Logged In as Super Admin
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Admin Control Dashboard
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Choose an action below to post listings, control public visibility, reorder featured properties, or audit SEO hubs.
              </p>
            </div>

            {/* Quick Actions Primary */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate('/post')}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <PlusCircle className="w-5 h-5" /> Post New Property
              </button>
              <button
                onClick={() => setActiveTab('hub')}
                className={`text-xs font-bold px-4 py-3 rounded-2xl border transition-colors ${
                  activeTab === 'hub' 
                    ? 'bg-white text-slate-950 border-white' 
                    : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                All 20 Actions
              </button>
            </div>
          </div>
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
      </main>
    </div>
  );
};
