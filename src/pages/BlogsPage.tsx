import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  TrendingUp,
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import { getBlogPosts } from '../data/blogs';
import type { BlogPost } from '../data/blogs';
import { useAuth } from '../contexts/AuthContext';

export const BlogsPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@homesandrents.com';

  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleUpdate = () => setPosts(getBlogPosts());
    window.addEventListener('blogsUpdated', handleUpdate);
    return () => window.removeEventListener('blogsUpdated', handleUpdate);
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      post.title.toLowerCase().includes(q) || 
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];
  const regularPosts = searchQuery || selectedCategory !== 'All' 
    ? filteredPosts 
    : filteredPosts.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <Helmet>
        <title>Homes and Rents Blog | Real Estate Trends, Rental Guides & Investment Tips in Bangalore</title>
        <meta 
          name="description" 
          content="Read high-authority real estate guides, price trends, locality reviews, and zero brokerage rental advice from Homes and Rents Bangalore." 
        />
        <meta 
          name="keywords" 
          content="Homes and Rents, Bangalore real estate, flats for rent in Bangalore, buy apartments Bangalore, RERA verified homes, zero brokerage" 
        />
        <link rel="canonical" href="https://homesandrents.com/blogs" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Homes and Rents Real Estate Blog",
            "description": "Leading real estate guides, market trends, and verified property insights by Homes and Rents.",
            "url": "https://homesandrents.com/blogs",
            "publisher": {
              "@type": "Organization",
              "name": "Homes and Rents",
              "logo": {
                "@type": "ImageObject",
                "url": "https://homesandrents.com/favicon.ico"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Admin Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-800">Homes and Rents Blog</span>
          </div>

          {isAdmin && (
            <Link
              to="/admin?tab=blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" /> Manage & Write Blogs in Super Admin
            </Link>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Homes and Rents Knowledge Hub
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Better Info. Smarter Decisions.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Welcome to the official <strong>Homes and Rents</strong> real estate blog. Discover deep-dive research on Bangalore locality trends, verified rental strategies, RERA legal frameworks, and expert investment analysis curated by <strong>Homes and Rents</strong>.
            </p>

            {/* Live Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search articles on Whitefield, RERA, rental yields, HSR Layout..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/80 text-white rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Top Story (When no search query is active) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-12">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Featured Homes and Rents Editorial
            </div>
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden bg-slate-100">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/gr-samskruthi.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      By {featuredPost.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Read Full Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" /> Latest Real Estate Articles ({filteredPosts.length})
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Updated daily on Homes and Rents
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-700">No articles match your search</h4>
              <p className="text-sm text-slate-500 mt-1">Try searching for other keywords like "HSR Layout", "RERA", or "Rental Yield".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-xs font-bold px-4 py-2 bg-indigo-600 text-white rounded-xl shadow"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden bg-slate-100 block">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Keya_The_Urban_Forest.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mb-2.5">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2.5 line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Homes and Rents
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* SEO CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black mb-2">Looking for Verified Properties on Homes and Rents?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Explore thousands of zero-brokerage apartments, villas, and commercial spaces across Bangalore.
              Schedule free site visits and download authentic architectural brochures directly on <strong>Homes and Rents</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/search"
              className="px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black text-sm text-center shadow-lg transition-all"
            >
              Browse Homes and Rents
            </Link>
            <a
              href="https://wa.me/919739063840?text=Hi+Homes+and+Rents+Team+I+read+your+blog+and+need+assistance"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-white/20 text-white rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
