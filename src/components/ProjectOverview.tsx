import { Maximize2, IndianRupee, Construction, Ruler, Calendar, CheckCircle2 } from 'lucide-react';

export const ProjectOverview = () => {
  const quickFacts = [
    { icon: <Maximize2 className="w-5 h-5 text-gray-500" />, label: 'Project Area', value: '2 Acres' },
    { icon: <Ruler className="w-5 h-5 text-gray-500" />, label: 'Sizes', value: '1000 - 1500 sq.ft.' },
    { icon: <Construction className="w-5 h-5 text-gray-500" />, label: 'Project Size', value: '200 Units' },
    { icon: <Calendar className="w-5 h-5 text-gray-500" />, label: 'Launch Date', value: 'Jan, 2023' },
    { icon: <IndianRupee className="w-5 h-5 text-gray-500" />, label: 'Avg. Price', value: '₹5.5k/sq.ft.' },
    { icon: <CheckCircle2 className="w-5 h-5 text-gray-500" />, label: 'Status', value: 'Ready to Move' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#0a192f] mb-6">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {quickFacts.map((fact, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              {fact.icon}
              {fact.label}
            </div>
            <div className="font-semibold text-gray-900 text-base">{fact.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
