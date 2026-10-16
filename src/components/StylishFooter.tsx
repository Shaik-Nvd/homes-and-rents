import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  CheckCircle2, 
  Heart, 
  ArrowUpRight, 
  Sparkles,
  Lock
} from 'lucide-react';

export const StylishFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80 overflow-hidden font-sans">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Value Proposition Bar */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">100% RERA Verified</h4>
                <p className="text-xs text-slate-400">Strictly verified titles & escrow bank guarantees</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Zero Brokerage Flats</h4>
                <p className="text-xs text-slate-400">Connect directly with authentic property owners</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Free Guided Site Visits</h4>
                <p className="text-xs text-slate-400">Pick-up & dedicated relationship managers</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 shadow-inner">
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Fast WhatsApp Desk</h4>
                <p className="text-xs text-slate-400">Instant brochures, layouts & priority callbacks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand Story & Contact Card */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                  Homes and Rents
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                    Verified
                  </span>
                </span>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
                  Better Info. Smarter Decisions.
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Bangalore's premium real estate discovery and verified rental portal. Connecting home seekers with verified apartments, luxury villas, plots, commercial spaces, and co-living homes across all top IT corridors with zero broker spam.
            </p>

            {/* Quick Contact Chips */}
            <div className="space-y-2.5 pt-2">
              <a
                href="https://wa.me/919739063840?text=Hi%20Homes%20and%20Rents%2C%20I%20would%20like%20assistance%20finding%20a%20property."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all shadow-sm group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +91 97390 63840</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <a 
                  href="tel:+919739063840" 
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>+91 97390 63840</span>
                </a>
                <span>•</span>
                <a 
                  href="mailto:homesandrentss@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>homesandrentss@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Headquarters: Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Col 3: Explore Properties */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800/80 flex items-center gap-1.5">
              <span>Properties</span>
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/flats-for-rent/whitefield" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Flats in Whitefield
                </Link>
              </li>
              <li>
                <Link to="/flats-for-rent/hsr-layout" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Apartments in HSR Layout
                </Link>
              </li>
              <li>
                <Link to="/properties-for-sale/bellandur" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Properties in Bellandur ORR
                </Link>
              </li>
              <li>
                <Link to="/properties-for-sale/electronic-city" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Gated Societies in E-City
                </Link>
              </li>
              <li>
                <Link to="/2-bhk-flats-in-hebbal-bangalore-north-ffid" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Luxury Homes in Hebbal
                </Link>
              </li>
              <li>
                <Link to="/3-bhk-flats-in-indiranagar-bangalore-east-ffid" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Villas & Penthouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Real Estate Guides */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800/80 flex items-center justify-between">
              <span>Real Estate Blogs</span>
              <Link to="/blogs" className="text-[10px] text-indigo-400 hover:underline font-bold">All 28 Guides</Link>
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/blog/top-10-localities-to-rent-flats-in-bangalore" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all line-clamp-1">
                  Top 10 Localities in Bangalore
                </Link>
              </li>
              <li>
                <Link to="/blog/complete-guide-to-buying-apartments-in-whitefield-bangalore" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all line-clamp-1">
                  Whitefield Apartment Buying Guide
                </Link>
              </li>
              <li>
                <Link to="/blog/why-sarjapur-road-is-the-best-hub-for-family-homes-and-rents" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all line-clamp-1">
                  Sarjapur Road Family Living Hub
                </Link>
              </li>
              <li>
                <Link to="/blog/navigating-zero-brokerage-rentals-in-bangalore-with-homes-and-rents" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all line-clamp-1">
                  How Zero Brokerage Rentals Work
                </Link>
              </li>
              <li>
                <Link to="/blog/rera-approved-properties-in-bangalore-why-verification-matters" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all line-clamp-1">
                  RERA Legal Verification Checklist
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-indigo-400 font-bold hover:underline inline-flex items-center gap-1 pt-1">
                  Browse All Blog Articles <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Quick Portals & Admin */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800/80">
              Portals & Services
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/post" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all font-bold text-amber-300">
                  ★ Post Your Property (Free)
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Search Bangalore Properties
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all">
                  Homes and Rents News & Trends
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-300 hover:translate-x-1 inline-flex items-center gap-1 transition-all text-slate-400">
                  <Lock className="w-3 h-3" /> Super Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-indigo-300 hover:translate-x-1 inline-flex items-center gap-1 transition-all text-slate-500">
                  Admin Secure Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* High-Intent New Launch Corridors Section */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-850">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>New Launch & Pre-Launch Residential Corridors</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">SEO Index</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted area searches for upcoming residential apartments, townhouses & luxury villas in Bangalore
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Link to="/new-launch-projects-in-bangalore" className="text-blue-400 hover:text-white font-bold transition-colors">
                New Launch 2026
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/upcoming-projects-in-bangalore" className="text-indigo-400 hover:text-white font-bold transition-colors">
                Upcoming Projects
              </Link>
              <span className="text-slate-600">•</span>
              <Link to="/pre-launch-projects-in-bangalore" className="text-purple-400 hover:text-white font-bold transition-colors">
                Pre-Launch EOI
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-[11px] leading-relaxed">
            {/* North Bangalore */}
            <div>
              <h5 className="font-extrabold text-indigo-300 uppercase tracking-wider mb-2.5">
                North Bangalore
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/new-launch-projects-in-devanahalli" className="hover:text-white transition-colors">Devanahalli Airport</Link></li>
                <li><Link to="/new-launch-projects-in-yelahanka" className="hover:text-white transition-colors">Yelahanka</Link></li>
                <li><Link to="/new-launch-projects-in-thanisandra" className="hover:text-white transition-colors">Thanisandra Main Rd</Link></li>
                <li><Link to="/new-launch-projects-in-jakkur" className="hover:text-white transition-colors">Jakkur Lake</Link></li>
                <li><Link to="/new-launch-projects-in-bagalur" className="hover:text-white transition-colors">Bagalur Aerospace</Link></li>
                <li><Link to="/new-launch-projects-in-hennur" className="hover:text-white transition-colors">Hennur Road</Link></li>
                <li><Link to="/new-launch-projects-in-chikkajala" className="hover:text-white transition-colors">Chikkajala</Link></li>
                <li><Link to="/new-launch-projects-in-doddaballapur-road" className="hover:text-white transition-colors">Doddaballapur STRR</Link></li>
              </ul>
            </div>

            {/* East Bangalore */}
            <div>
              <h5 className="font-extrabold text-blue-300 uppercase tracking-wider mb-2.5">
                East Bangalore
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/new-launch-projects-in-sarjapur-road" className="hover:text-white transition-colors">Sarjapur Road</Link></li>
                <li><Link to="/new-launch-projects-in-whitefield" className="hover:text-white transition-colors">Whitefield ITPL</Link></li>
                <li><Link to="/new-launch-projects-in-gunjur" className="hover:text-white transition-colors">Gunjur Corridor</Link></li>
                <li><Link to="/new-launch-projects-in-panathur" className="hover:text-white transition-colors">Panathur ORR</Link></li>
                <li><Link to="/new-launch-projects-in-varthur" className="hover:text-white transition-colors">Varthur Lake</Link></li>
                <li><Link to="/new-launch-projects-in-budigere-cross" className="hover:text-white transition-colors">Budigere Cross OMR</Link></li>
                <li><Link to="/new-launch-projects-in-kadugodi" className="hover:text-white transition-colors">Kadugodi Metro</Link></li>
                <li><Link to="/new-launch-projects-in-hoskote" className="hover:text-white transition-colors">Hoskote Expressway</Link></li>
                <li><Link to="/new-launch-projects-in-soukya-road" className="hover:text-white transition-colors">Soukya Road</Link></li>
              </ul>
            </div>

            {/* South Bangalore */}
            <div>
              <h5 className="font-extrabold text-emerald-300 uppercase tracking-wider mb-2.5">
                South Bangalore
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/new-launch-projects-in-bannerghatta-road" className="hover:text-white transition-colors">Bannerghatta Road</Link></li>
                <li><Link to="/new-launch-projects-in-kanakapura-road" className="hover:text-white transition-colors">Kanakapura Road</Link></li>
                <li><Link to="/new-launch-projects-in-begur" className="hover:text-white transition-colors">Begur</Link></li>
                <li><Link to="/new-launch-projects-in-hosa-road" className="hover:text-white transition-colors">Hosa Road</Link></li>
                <li><Link to="/new-launch-projects-in-chandapura" className="hover:text-white transition-colors">Chandapura STRR</Link></li>
                <li><Link to="/new-launch-projects-in-bommasandra" className="hover:text-white transition-colors">Bommasandra Metro</Link></li>
                <li><Link to="/new-launch-projects-in-jigani" className="hover:text-white transition-colors">Jigani Industrial</Link></li>
                <li><Link to="/new-launch-projects-in-attibele" className="hover:text-white transition-colors">Attibele</Link></li>
              </ul>
            </div>

            {/* West Bangalore */}
            <div>
              <h5 className="font-extrabold text-amber-300 uppercase tracking-wider mb-2.5">
                West Bangalore
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/new-launch-projects-in-mysore-road" className="hover:text-white transition-colors">Mysore Road</Link></li>
                <li><Link to="/new-launch-projects-in-rajarajeshwari-nagar" className="hover:text-white transition-colors">RR Nagar</Link></li>
                <li><Link to="/new-launch-projects-in-kengeri" className="hover:text-white transition-colors">Kengeri Satellite</Link></li>
                <li><Link to="/new-launch-projects-in-magadi-road" className="hover:text-white transition-colors">Magadi Road</Link></li>
                <li><Link to="/new-launch-projects-in-nagarbhavi" className="hover:text-white transition-colors">Nagarbhavi</Link></li>
                <li><Link to="/new-launch-projects-in-yeshwanthpur" className="hover:text-white transition-colors">Yeshwanthpur WTC</Link></li>
                <li><Link to="/new-launch-projects-in-tumkur-road" className="hover:text-white transition-colors">Tumkur Road</Link></li>
                <li><Link to="/new-launch-projects-in-kanakapura-extension" className="hover:text-white transition-colors">Kanakapura Ext</Link></li>
              </ul>
            </div>

            {/* Central & Established */}
            <div>
              <h5 className="font-extrabold text-rose-300 uppercase tracking-wider mb-2.5">
                Central & Prime
              </h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/new-launch-projects-in-koramangala" className="hover:text-white transition-colors">Koramangala</Link></li>
                <li><Link to="/new-launch-projects-in-indiranagar" className="hover:text-white transition-colors">Indiranagar</Link></li>
                <li><Link to="/new-launch-projects-in-jayanagar" className="hover:text-white transition-colors">Jayanagar</Link></li>
                <li><Link to="/new-launch-projects-in-jp-nagar" className="hover:text-white transition-colors">JP Nagar</Link></li>
                <li><Link to="/new-launch-projects-in-old-airport-road" className="hover:text-white transition-colors">Old Airport Road</Link></li>
                <li><Link to="/new-launch-projects-in-bellandur" className="hover:text-white transition-colors">Bellandur ORR</Link></li>
                <li><Link to="/new-launch-projects-in-kr-puram" className="hover:text-white transition-colors">KR Puram Metro</Link></li>
                <li><Link to="/new-launch-projects-in-mahadevapura" className="hover:text-white transition-colors">Mahadevapura</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stylish Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Homes and Rents Inc.</span>
            <span>•</span>
            <span className="text-slate-400">All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for Home Buyers & Tenants across Bangalore</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">RERA Disclaimers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
