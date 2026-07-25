import { Star } from 'lucide-react';

export const ProjectReviews = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0a192f]">Ratings & Reviews</h2>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Write a Review</a>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl sm:w-1/3 border border-gray-100">
          <div className="text-5xl font-bold text-gray-900 mb-2">4.2</div>
          <div className="flex text-yellow-400 mb-2">
            {[1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <Star className="w-5 h-5 text-gray-300 fill-current" />
          </div>
          <div className="text-sm text-gray-500 font-medium">Based on 24 reviews</div>
        </div>
        
        {/* Individual Reviews */}
        <div className="sm:w-2/3 space-y-6">
          <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  AR
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Arun Kumar</h4>
                  <p className="text-xs text-gray-500">2 months ago</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              "Great location and excellent amenities. The construction quality is top-notch. Very happy with my decision to invest here. The sales team was also very cooperative."
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  SP
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Sneha Patil</h4>
                  <p className="text-xs text-gray-500">4 months ago</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <Star className="w-4 h-4 text-gray-300 fill-current" />
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              "Good project with spacious floor plans. The only downside is that the approach road gets a bit congested during peak hours, but overall a solid investment."
            </p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-6 py-3 text-sm font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
        View All Reviews
      </button>
    </div>
  );
};
