import { useState, useEffect } from 'react';
import { TrendingUp, Clock, ArrowUpRight, Activity } from 'lucide-react';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  source: string;
}

export const TrendingNow = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const queries = [
        'real+estate+india',
        'bangalore+property+real+estate',
        'commercial+real+estate+india'
      ];
      
      const promises = queries.map(q => {
        const rssUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`);
        return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`).then(res => res.json());
      });

      const results = await Promise.all(promises);
      
      let allItems: any[] = [];
      results.forEach(data => {
        if (data.status === 'ok' && data.items) {
          allItems = [...allItems, ...data.items];
        }
      });

      // Remove duplicates by link
      const uniqueItems = Array.from(new Map(allItems.map(item => [item.link, item])).values());

      // Sort by publication date (newest first)
      uniqueItems.sort((a, b) => new Date(b.pubDate.replace(' ', 'T') + 'Z').getTime() - new Date(a.pubDate.replace(' ', 'T') + 'Z').getTime());

      const items = uniqueItems.slice(0, 10).map((item: any) => ({
        title: item.title.split(' - ')[0],
        source: item.title.split(' - ')[1] || 'Real Estate News',
        pubDate: new Date(item.pubDate.replace(' ', 'T') + 'Z').toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' }),
        link: item.link
      }));
      
      setNews(items);
    } catch (error) {
      console.error('Failed to fetch trending news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Update every 30 seconds
    const interval = setInterval(fetchNews, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-100 flex flex-col items-center justify-center">
        <Activity className="w-8 h-8 text-blue-500 animate-spin mb-3" />
        <span className="font-bold text-slate-500 tracking-widest uppercase text-xs">Fetching Live Trends...</span>
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-16 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-500 tracking-wider uppercase">Live Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              Trending Now <TrendingUp className="w-8 h-8 text-blue-600 stroke-[2.5]" />
            </h2>
            <p className="text-slate-500 font-medium mt-2">The latest property & real estate market insights, updated every 30 seconds.</p>
          </div>
        </div>

        {/* Horizontal scrollable cards */}
        <div className="flex overflow-x-auto gap-5 pb-8 pt-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {news.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[280px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 bg-white border border-slate-200 hover:border-blue-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(59,130,246,0.1)] rounded-2xl p-6 group cursor-pointer transition-all duration-300 snap-center hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.source}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-blue-700 transition-colors line-clamp-3">
                  {item.title}
                </h3>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 w-max px-2.5 py-1.5 rounded-lg border border-slate-100">
                <Clock className="w-3.5 h-3.5" />
                {item.pubDate}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
