import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Download, 
  Calendar, 
  ChevronRight, 
  Info
} from 'lucide-react';
import { getCustomAreaPageBySlug, getCustomAreaPages } from '../data/customAreaPages';
import type { CustomAreaPage } from '../data/customAreaPages';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { supabase } from '../lib/supabase';
import { LaunchModal } from '../components/LaunchModal';

export const CustomAreaDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pageData, setPageData] = useState<CustomAreaPage | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEoiModalOpen, setIsEoiModalOpen] = useState(false);
  const [eoiForm, setEoiForm] = useState({
    name: '',
    phone: '',
    bhk: '3 BHK',
    budget: '₹80 Lakh - ₹1.5 Cr'
  });
  const [eoiSubmitted, setEoiSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!slug) return;
    const found = getCustomAreaPageBySlug(slug);
    setPageData(found);

    const loadProjects = async () => {
      setLoading(true);
      try {
        const areaTerm = found ? found.areaName.toLowerCase() : slug.replace(/^new-launch-projects-in-/, '').replace(/-/g, ' ');

        // Check local projects
        const localMatches = projects.filter(p => {
          const sub = (p.subtitle || '').toLowerCase();
          const title = (p.title || '').toLowerCase();
          const nearby = (p.nearby || []).join(' ').toLowerCase();
          return sub.includes(areaTerm) || title.includes(areaTerm) || nearby.includes(areaTerm);
        });

        // Check Supabase
        const { data: dbData } = await supabase
          .from('properties')
          .select('*')
          .ilike('location', `%${areaTerm}%`)
          .limit(10);

        const mappedDb = (dbData || []).map(item => ({
          id: item.id?.toString(),
          title: item.title || 'Exclusive New Launch',
          subtitle: `${item.bhk || 2} BHK in ${item.location || areaTerm}`,
          priceConfigs: [{ label: 'Starting Price', price: item.price || 'Contact for Price' }],
          nearby: [item.location || areaTerm, 'Upcoming Metro', 'Tech Corridor'],
          builder: 'Homes and Rents Partner Builder',
          status: 'New Launch · EOI Open',
          imageSrc: item.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
          imageCount: item.images?.length?.toString() || '1',
          tag: 'NEW LAUNCH',
          badges: ['RERA', 'ZERO BROKERAGE', '3D']
        }));

        const combined = [...localMatches, ...mappedDb];
        // If empty, fallback to 3 top featured projects
        if (combined.length === 0) {
          setRelatedProjects(projects.slice(0, 3));
        } else {
          setRelatedProjects(combined);
        }
      } catch (err) {
        console.error('Error fetching area projects:', err);
        setRelatedProjects(projects.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [slug]);

  if (!pageData) {
    return null; // Let the caller fallback or render 404
  }

  const allPages = getCustomAreaPages().filter(p => p.id !== pageData.id);
  const sameZonePages = allPages.filter(p => p.zone === pageData.zone).slice(0, 6);

  const handleEoiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Homes & Rents! I would like to get the New Launch Price, EOI details, and Brochure for projects in ${pageData.areaName}.\n\nName: ${eoiForm.name}\nPhone: ${eoiForm.phone}\nInterested BHK: ${eoiForm.bhk}\nBudget: ${eoiForm.budget}`;
    const whatsappUrl = `https://wa.me/919739063840?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setEoiSubmitted(true);
    setTimeout(() => {
      setEoiSubmitted(false);
      setIsEoiModalOpen(false);
      setEoiForm({ name: '', phone: '', bhk: '3 BHK', budget: '₹80 Lakh - ₹1.5 Cr' });
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-16">
      <Helmet>
        <title>{pageData.title} | Verified Price & EOI on Homes and Rents</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageData.customKeywords?.join(', ') || `${pageData.title}, new projects in ${pageData.areaName}, bangalore real estate`} />
        <link rel="canonical" href={`https://homesandrents.com/${pageData.slug}`} />
        <meta property="og:title" content={`${pageData.title} - Homes & Rents`} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/search" className="hover:text-white transition-colors">{pageData.zone}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{pageData.areaName}</span>
            {pageData.priorityTag && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                {pageData.priorityTag}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {pageData.title}
              </h1>
              <p className="text-lg text-indigo-200 font-semibold mb-3">
                {pageData.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-6">
                {pageData.heroSnippet}
              </p>

              {/* Price & Status Highlights */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">Indicative Price Range</span>
                  <span className="text-emerald-400 font-black text-base">{pageData.indicativePriceRange}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">Market Status</span>
                  <span className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    EOI & Pre-Launch Open
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">Last Verified</span>
                  <span className="text-slate-200 font-bold text-sm flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                    {pageData.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick EOI Action Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 shadow-2xl text-slate-900 border border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Priority Channel Partner Desk
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Get Launch Price & EOI
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Direct official developer allotments, early-bird rates & zero brokerage support in {pageData.areaName}.
                </p>

                <form onSubmit={handleEoiSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={eoiForm.name}
                      onChange={e => setEoiForm({ ...eoiForm, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">WhatsApp / Phone</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 98765 43210"
                      value={eoiForm.phone}
                      onChange={e => setEoiForm({ ...eoiForm, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Configuration</label>
                      <select
                        value={eoiForm.bhk}
                        onChange={e => setEoiForm({ ...eoiForm, bhk: e.target.value })}
                        className="w-full text-xs px-2.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                      >
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="Luxury Villa">Luxury Villa</option>
                        <option value="Plotted Layout">Plotted Layout</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Budget</label>
                      <select
                        value={eoiForm.budget}
                        onChange={e => setEoiForm({ ...eoiForm, budget: e.target.value })}
                        className="w-full text-xs px-2.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                      >
                        <option value="₹50L - ₹80L">₹50L - ₹80L</option>
                        <option value="₹80L - ₹1.5 Cr">₹80L - ₹1.5 Cr</option>
                        <option value="₹1.5 Cr - ₹2.5 Cr">₹1.5 Cr - ₹2.5 Cr</option>
                        <option value="₹2.5 Cr+">₹2.5 Cr+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Get New Launch Price & EOI Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {eoiSubmitted && (
                    <p className="text-[11px] text-emerald-600 font-bold text-center animate-pulse">
                      Request sent! Connecting to Homes & Rents Specialist on WhatsApp...
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Why Invest & Connectivity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Why Invest Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-900">
                  Why Invest in {pageData.areaName}?
                </h2>
              </div>
              <ul className="space-y-2.5">
                {pageData.whyInvest.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Capital Appreciation Forecast</span>
              <span className="text-emerald-600 font-black">14% - 22% p.a.</span>
            </div>
          </div>

          {/* Connectivity Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-900">
                  Connectivity & Infrastructure
                </h2>
              </div>
              <ul className="space-y-2.5">
                {pageData.connectivityHighlights.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Key Road Arteries</span>
              <span className="text-indigo-600 font-black">STRR · Metro · Expressways</span>
            </div>
          </div>
        </div>

        {/* Available New Launch & Pre-Launch Projects */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Verified Channel Partner Projects</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Projects in {pageData.areaName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Hand-picked pre-launch & upcoming residential developments with approved floor plans
              </p>
            </div>

            <button
              onClick={() => setIsEoiModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master Brochure & Cost Sheet</span>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-3xl h-96 shadow-sm"></div>
              ))}
            </div>
          ) : relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-100 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-black text-slate-900">Upcoming Launches in {pageData.areaName}</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
                New RERA approvals are currently being registered for {pageData.areaName}. Register for confidential early-bird EOI access before public unveil.
              </p>
              <button
                onClick={() => setIsEoiModalOpen(true)}
                className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
              >
                Register for Pre-Launch Allotments
              </button>
            </div>
          )}
        </div>

        {/* Nearby Localities & Corridors for Internal Linking */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg mb-12">
          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            Explore More Growth Corridors in {pageData.zone}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Compare new launch and pre-launch apartment investments across Bangalore’s major residential clusters
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {sameZonePages.map(p => (
              <Link
                key={p.id}
                to={`/${p.slug}`}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-100 hover:border-indigo-200 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 block">{p.indicativePriceRange.split('|')[0]}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
            ))}
          </div>

          {/* Quick links to 2 BHK, 3 BHK, 4 BHK */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-700">Explore by BHK in {pageData.areaName}:</span>
            <Link 
              to={`/2-bhk-flats-in-${pageData.areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bangalore-north-ffid`}
              className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors"
            >
              2 BHK in {pageData.areaName}
            </Link>
            <Link 
              to={`/3-bhk-flats-in-${pageData.areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bangalore-north-ffid`}
              className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors"
            >
              3 BHK in {pageData.areaName}
            </Link>
            <Link 
              to={`/4-bhk-flats-in-${pageData.areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bangalore-north-ffid`}
              className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white font-bold transition-colors"
            >
              4 BHK in {pageData.areaName}
            </Link>
          </div>
        </div>

        {/* Regulatory & Disclaimer Banner */}
        <div className="bg-slate-100/80 rounded-2xl p-4 sm:p-5 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-700">Disclaimer & RERA Compliance Note:</strong> Homes and Rents is an authorized real estate channel partner. Project details, launch dates, prices, and possession timelines are indicative and subject to change per official developer communications and Karnataka RERA authorizations. Always verify applicable Karnataka RERA registration numbers before booking. Last updated: {pageData.lastUpdated}.
          </div>
        </div>

      </div>

      {/* Reusable Launch Modal for EOI / Brochure */}
      <LaunchModal
        isOpen={isEoiModalOpen}
        onClose={() => setIsEoiModalOpen(false)}
        category="New Launch"
        count={relatedProjects.length}
      />
    </div>
  );
};
