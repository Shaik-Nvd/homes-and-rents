import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Compass, 
  ChevronRight, 
  ArrowUpRight, 
  Search,
  Plane
} from 'lucide-react';

export const NorthBangaloreBlock: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | '2bhk' | '3bhk' | '4bhk'>('all');

  const LOCALITIES = [
    { name: 'Hebbal', slug: 'hebbal', tag: 'Manyata Tech Park Hub' },
    { name: 'Thanisandra', slug: 'thanisandra', tag: 'Bhartiya City & Metro' },
    { name: 'Yelahanka', slug: 'yelahanka', tag: 'Airport Corridor & Greenery' },
    { name: 'Hennur Road', slug: 'hennur', tag: 'Premium High-Rise Belt' },
    { name: 'Jakkur', slug: 'jakkur', tag: 'Aerodrome & Lake Living' },
    { name: 'Devanahalli', slug: 'devanahalli', tag: 'Aerotropolis & KIADB SEZ' },
    { name: 'KIADB phase 1 and Phase 2', slug: 'devanahalli', tag: 'Aerospace & IT Tech Park Corridor' },
    { name: 'Dodballapur', slug: 'yelahanka', tag: 'Industrial Corridor & Plotted Townships' },
    { name: 'IVC road', slug: 'devanahalli', tag: 'Luxury Villas & High-Growth Belt' },
    { name: 'STRR', slug: 'devanahalli', tag: 'Satellite Town Ring Road Expressway' },
    { name: 'Sahakar Nagar', slug: 'sahakar-nagar', tag: 'Established Family Locality' },
    { name: 'Bellary Road', slug: 'bellary-road', tag: 'NH 44 Expressway Corridor' }
  ];

  const POPULAR_SEARCH_KEYWORDS = [
    { label: '2 BHK Flats in Hebbal North Bangalore', slug: '2-bhk-flats-in-hebbal-bangalore-north-ffid', count: '140+ Units' },
    { label: '3 BHK Flats in Hebbal North Bangalore', slug: '3-bhk-flats-in-hebbal-bangalore-north-ffid', count: '95+ Units' },
    { label: '4 BHK Luxury Flats in Hebbal North Bangalore', slug: '4-bhk-flats-in-hebbal-bangalore-north-ffid', count: '45+ Units' },
    { label: '2 BHK Flats near KIADB phase 1 and Phase 2 North Bangalore', slug: '2-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '115+ Units' },
    { label: '3 BHK Flats near KIADB phase 1 and Phase 2 North Bangalore', slug: '3-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '85+ Units' },
    { label: '4 BHK Luxury Villas in KIADB phase 1 and Phase 2 North Bangalore', slug: '4-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '40+ Units' },
    { label: '2 BHK Flats in Dodballapur Road North Bangalore', slug: '2-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '90+ Units' },
    { label: '3 BHK Flats in Dodballapur North Bangalore', slug: '3-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '75+ Units' },
    { label: '4 BHK Plots and Villas in Dodballapur North Bangalore', slug: '4-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '35+ Units' },
    { label: '2 BHK Apartments near IVC road North Bangalore', slug: '2-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '80+ Units' },
    { label: '3 BHK Luxury Villas on IVC road North Bangalore', slug: '3-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '95+ Units' },
    { label: '4 BHK Ultra Luxury Villas on IVC road North Bangalore', slug: '4-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '60+ Units' },
    { label: '2 BHK Flats near STRR Corridor North Bangalore', slug: '2-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '70+ Units' },
    { label: '3 BHK Apartments near STRR Satellite Town Ring Road North Bangalore', slug: '3-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '65+ Units' },
    { label: '4 BHK Township Villas connecting STRR and IVC road North Bangalore', slug: '4-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '45+ Units' },
    { label: '2 BHK Flats in Thanisandra North Bangalore', slug: '2-bhk-flats-in-thanisandra-bangalore-north-ffid', count: '120+ Units' },
    { label: '3 BHK Flats in Thanisandra North Bangalore', slug: '3-bhk-flats-in-thanisandra-bangalore-north-ffid', count: '85+ Units' },
    { label: '4 BHK Flats in Thanisandra North Bangalore', slug: '4-bhk-flats-in-thanisandra-bangalore-north-ffid', count: '30+ Units' },
    { label: '2 BHK Apartments in Yelahanka North Bangalore', slug: '2-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '110+ Units' },
    { label: '3 BHK Apartments in Yelahanka North Bangalore', slug: '3-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '90+ Units' },
    { label: '4 BHK Luxury Villas in Yelahanka North Bangalore', slug: '4-bhk-flats-in-yelahanka-bangalore-north-ffid', count: '50+ Units' },
    { label: '2 BHK Flats Near Manyata Tech Park North Bangalore', slug: '2-bhk-flats-in-hebbal-bangalore-north-ffid', count: '160+ Units' },
    { label: '3 BHK Flats Near Manyata Tech Park North Bangalore', slug: '3-bhk-flats-in-hebbal-bangalore-north-ffid', count: '135+ Units' },
    { label: '4 BHK Penthouses in North Bangalore', slug: '4-bhk-flats-in-hebbal-bangalore-north-ffid', count: '25+ Units' },
    { label: '2 BHK Flats in Hennur Road North Bangalore', slug: '2-bhk-flats-in-hennur-bangalore-north-ffid', count: '80+ Units' },
    { label: '3 BHK Flats in Hennur Road North Bangalore', slug: '3-bhk-flats-in-hennur-bangalore-north-ffid', count: '75+ Units' },
    { label: '4 BHK Luxury Homes in Hennur Road North Bangalore', slug: '4-bhk-flats-in-hennur-bangalore-north-ffid', count: '35+ Units' },
    { label: '2 BHK Gated Community Flats in Jakkur North Bangalore', slug: '2-bhk-flats-in-jakkur-bangalore-north-ffid', count: '65+ Units' },
    { label: '3 BHK Gated Community Flats in Jakkur North Bangalore', slug: '3-bhk-flats-in-jakkur-bangalore-north-ffid', count: '55+ Units' },
    { label: '4 BHK Villas in Devanahalli Airport Corridor North Bangalore', slug: '4-bhk-flats-in-devanahalli-bangalore-north-ffid', count: '40+ Units' },
    { label: '2 BHK Flats in Sahakar Nagar North Bangalore', slug: '2-bhk-flats-in-sahakar-nagar-bangalore-north-ffid', count: '70+ Units' },
    { label: '3 BHK Flats in Sahakar Nagar North Bangalore', slug: '3-bhk-flats-in-sahakar-nagar-bangalore-north-ffid', count: '60+ Units' }
  ];

  const BHK_CATEGORIES = [
    {
      bhk: '2 BHK',
      title: '2 BHK Flats & Apartments in North Bangalore',
      desc: 'Ideal for techies, couples & working professionals near Manyata Tech Park, Hebbal & Thanisandra.',
      priceRange: '₹55 Lakh - ₹1.15 Cr (Sale) | ₹22,000 - ₹38,000 / mo (Rent)',
      size: '1,050 - 1,350 sq.ft.',
      badge: 'High Rental Yield (5.8%)',
      links: [
        { name: '2 BHK Flats in Hebbal', path: '/2-bhk-flats-in-hebbal-bangalore-north-ffid' },
        { name: '2 BHK in Thanisandra Main Road', path: '/2-bhk-flats-in-thanisandra-bangalore-north-ffid' },
        { name: '2 BHK Apartments in Yelahanka', path: '/2-bhk-flats-in-yelahanka-bangalore-north-ffid' },
        { name: '2 BHK Near Manyata Embassy Tech Park', path: '/2-bhk-flats-in-hebbal-bangalore-north-ffid' },
        { name: '2 BHK in Hennur & Bagalur Road', path: '/2-bhk-flats-in-hennur-bangalore-north-ffid' },
        { name: '2 BHK Zero Brokerage Flats North Bangalore', path: '/flats-for-rent/hebbal' }
      ]
    },
    {
      bhk: '3 BHK',
      title: '3 BHK Spacious Homes & Luxury Flats in North Bangalore',
      desc: 'Generous 3-bedroom residences with private balconies, study room, clubhouse, and pool in gated societies.',
      priceRange: '₹1.10 Cr - ₹2.35 Cr (Sale) | ₹38,000 - ₹65,000 / mo (Rent)',
      size: '1,450 - 2,150 sq.ft.',
      badge: 'Top Family Choice',
      links: [
        { name: '3 BHK Flats in Hebbal Flyover & Lake', path: '/3-bhk-flats-in-hebbal-bangalore-north-ffid' },
        { name: '3 BHK in Bhartiya City Thanisandra', path: '/3-bhk-flats-in-thanisandra-bangalore-north-ffid' },
        { name: '3 BHK Apartments in Yelahanka New Town', path: '/3-bhk-flats-in-yelahanka-bangalore-north-ffid' },
        { name: '3 BHK in Jakkur Plantation & Aerodrome', path: '/3-bhk-flats-in-jakkur-bangalore-north-ffid' },
        { name: '3 BHK Luxury Towers Bellary Road NH 44', path: '/3-bhk-flats-in-hebbal-bangalore-north-ffid' },
        { name: '3 BHK Gated Community Flats North Bangalore', path: '/properties-for-sale/hebbal' }
      ]
    },
    {
      bhk: '4 BHK',
      title: '4 BHK Luxury Penthouses & Villas in North Bangalore',
      desc: 'Exclusive ultra-luxury apartments, sky villas & independent row houses with panoramic skyline views.',
      priceRange: '₹2.45 Cr - ₹6.50 Cr (Sale) | ₹75,000 - ₹1.80 L / mo (Rent)',
      size: '2,600 - 4,800 sq.ft.',
      badge: 'VIP Elite Living',
      links: [
        { name: '4 BHK Penthouses in Hebbal', path: '/4-bhk-flats-in-hebbal-bangalore-north-ffid' },
        { name: '4 BHK Luxury Villas in Yelahanka', path: '/4-bhk-flats-in-yelahanka-bangalore-north-ffid' },
        { name: '4 BHK Sky Villas Thanisandra', path: '/4-bhk-flats-in-thanisandra-bangalore-north-ffid' },
        { name: '4 BHK Gated Villas Near Airport Expressway', path: '/4-bhk-flats-in-devanahalli-bangalore-north-ffid' },
        { name: '4 BHK Lake View Residences in Jakkur', path: '/4-bhk-flats-in-jakkur-bangalore-north-ffid' },
        { name: '4 BHK Ultra Luxury Homes North Bangalore', path: '/properties-for-sale/yelahanka' }
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-14 sm:py-20 border-t border-b border-indigo-900/40 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-black uppercase tracking-wider mb-3">
              <Plane className="w-3.5 h-3.5 text-blue-400" />
              <span>Kempegowda Airport & Manyata Tech Corridor</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              North Bangalore Real Estate Hub
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore 100% verified <strong>2 BHK, 3 BHK, and 4 BHK flats, apartments & luxury villas</strong> in Hebbal, Thanisandra, Yelahanka, Hennur, and Airport Road on <strong>Homes and Rents</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              All North Bangalore
            </button>
            <button
              onClick={() => setActiveTab('2bhk')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '2bhk' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              2 BHK
            </button>
            <button
              onClick={() => setActiveTab('3bhk')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '3bhk' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              3 BHK
            </button>
            <button
              onClick={() => setActiveTab('4bhk')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '4bhk' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              4 BHK
            </button>
          </div>
        </div>

        {/* 3 Major Configuration Cards (2 BHK, 3 BHK, 4 BHK) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {BHK_CATEGORIES.filter(cat => activeTab === 'all' || activeTab === cat.bhk.toLowerCase().replace(' ', '')).map((cat, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl sm:text-2xl font-black text-indigo-400 font-mono tracking-tight">
                    {cat.bhk}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white leading-snug mb-2 group-hover:text-indigo-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {cat.desc}
                </p>

                {/* Pricing & Area Specs */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 mb-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-semibold">Typical Area:</span>
                    <span className="text-white font-bold">{cat.size}</span>
                  </div>
                  <div className="flex justify-between items-start text-xs pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400 font-semibold">Price Bracket:</span>
                    <span className="text-emerald-400 font-bold text-right text-[11px] leading-tight max-w-[65%]">
                      {cat.priceRange}
                    </span>
                  </div>
                </div>

                {/* SEO Deep Links */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Popular {cat.bhk} Searches in North Bangalore:
                  </p>
                  <ul className="space-y-1.5">
                    {cat.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          to={link.path}
                          className="text-xs text-slate-300 hover:text-indigo-300 hover:underline flex items-center justify-between py-1 border-b border-slate-800/40 group/link"
                        >
                          <span className="line-clamp-1">{link.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover/link:translate-x-1 transition-transform shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/${cat.bhk.toLowerCase().replace(' ', '')}-flats-in-hebbal-bangalore-north-ffid`}
                  className="text-xs font-black text-indigo-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  View All {cat.bhk} Listings <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`https://wa.me/919739063840?text=${encodeURIComponent(`Hi Homes and Rents, I am looking for ${cat.bhk} properties in North Bangalore (Hebbal / Thanisandra / Yelahanka). Please share verified options.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  WhatsApp Specialist
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* High-Intent Locality Grid */}
        <div className="mb-12">
          <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            Top Localities for 2 BHK, 3 BHK & 4 BHK in North Bangalore
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {LOCALITIES.map((loc, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-all hover:bg-slate-800/40"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-extrabold text-sm text-white">{loc.name}</h4>
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <p className="text-[11px] text-slate-400 mb-3">{loc.tag}</p>

                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                  <Link 
                    to={`/2-bhk-flats-in-${loc.slug}-bangalore-north-ffid`}
                    className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/20"
                  >
                    2 BHK
                  </Link>
                  <Link 
                    to={`/3-bhk-flats-in-${loc.slug}-bangalore-north-ffid`}
                    className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/20"
                  >
                    3 BHK
                  </Link>
                  <Link 
                    to={`/4-bhk-flats-in-${loc.slug}-bangalore-north-ffid`}
                    className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/20"
                  >
                    4 BHK
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 20+ Keyword Tag Cloud / SEO Index */}
        <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800/90 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                Quick Keyword Index: 2 BHK, 3 BHK & 4 BHK North Bangalore
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted search queries indexed for instant verified matching on Homes and Rents
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full whitespace-nowrap">
              20+ Indexed Search Queries
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {POPULAR_SEARCH_KEYWORDS.map((kw, idx) => (
              <Link
                key={idx}
                to={`/${kw.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-amber-400 transition-colors"></span>
                <span>{kw.label}</span>
                <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  {kw.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
