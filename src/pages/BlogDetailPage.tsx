import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Tag, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '../data/blogs';
import type { BlogPost } from '../data/blogs';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (slug) {
      const found = getBlogPostBySlug(slug);
      if (found) {
        setPost(found);
      } else {
        navigate('/blogs', { replace: true });
      }
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Loading Homes and Rents Article...</h2>
        </div>
      </div>
    );
  }

  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = relatedPosts.length > 0 ? relatedPosts : allPosts.filter(p => p.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 font-sans">
      <Helmet>
        <title>{post.title} | Homes and Rents</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`Homes and Rents, ${post.tags.join(', ')}`} />
        <link rel="canonical" href={`https://homesandrents.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | Homes and Rents`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.coverImage,
            "datePublished": post.date,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blogs" className="hover:text-indigo-600 transition-colors">Blogs</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 truncate max-w-xs">{post.title}</span>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 md:p-12 mb-12">
          
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider">
              {post.category}
            </span>

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Share Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black flex items-center justify-center text-sm shadow">
                HR
              </div>
              <div>
                <span className="font-extrabold text-xs text-slate-900 block">{post.author}</span>
                <span className="text-[11px] text-slate-500 font-semibold">Official Homes and Rents Research Team</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Link Copied!' : 'Share Article'}
            </button>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden mb-8 h-64 sm:h-96 w-full bg-slate-100 shadow-inner">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/gr-samskruthi.jpg';
              }}
            />
          </div>

          {/* Article Body Content (Markdown style rendered with high SEO authority) */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-black text-slate-900 pt-4 pb-1 border-b border-slate-100">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="my-6 border-slate-200" />;
              }
              if (paragraph.startsWith('1. ') || paragraph.includes('\n2. ')) {
                const listItems = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal pl-5 space-y-2">
                    {listItems.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/^[0-9]+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>') }} />
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p 
                  key={index}
                  className="leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{ 
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-extrabold">$1</strong>') 
                  }}
                />
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-8 mt-10 border-t border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </article>

        {/* WhatsApp & Portal Callback Card */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white mb-12 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Homes and Rents Verified Service
              </div>
              <h3 className="text-2xl font-black mb-2">Need Expert Help Finding Your Next Home?</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Our local Bangalore property specialists on <strong>Homes and Rents</strong> provide free guided site visits, zero brokerage rentals, and direct builder appointments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/919739063840?text=${encodeURIComponent(`Hi Homes and Rents Team, I read your article "${post.title}" and would like to find verified properties.`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link
                to="/search"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-3.5 rounded-xl text-center transition-all"
              >
                Explore Listings
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {fallbackRelated.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-black text-slate-900 mb-6">Related Homes and Rents Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {fallbackRelated.map(item => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
