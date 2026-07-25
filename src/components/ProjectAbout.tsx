import { useState } from 'react';

export const ProjectAbout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#0a192f] mb-4">About GR Samskruthi</h2>
      
      <div className={`text-gray-600 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
        <p className="mb-4">
          GR Samskruthi is a premium residential project located on Sarjapura Attibele Road, Bangalore. It is designed to offer a luxurious and serene lifestyle, combining modern architecture with vast open green spaces. Spread across a sprawling 2-acre landscape, the project features meticulously designed 2 and 3 BHK apartments that ensure optimal space utilization, natural light, and ventilation.
        </p>
        <p className="mb-4">
          The development boasts a wide array of world-class amenities designed to cater to all age groups. From a fully equipped gymnasium and a large swimming pool to landscaped gardens and dedicated play areas for children, every aspect of GR Samskruthi is tailored to enhance the living experience of its residents. The clubhouse serves as the perfect community hub for social gatherings and recreational activities.
        </p>
        <p>
          Strategically located, GR Samskruthi offers excellent connectivity to major IT hubs like Electronic City and Whitefield, as well as renowned educational institutions, hospitals, and shopping centers. With its commitment to quality construction and timely delivery, Gr Constructions Builders ensures that every home is a masterpiece of comfort and elegance.
        </p>
      </div>
      
      <button 
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};
