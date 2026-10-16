import React, { useState } from 'react';
import { Maximize2, IndianRupee, Construction, Ruler, Calendar, CheckCircle2, Eye, EyeOff, Sliders } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { ProjectData } from '../data/projects';

interface ProjectOverviewProps {
  project?: ProjectData;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@homesandrents.com';

  const projectId = project?.id || 'default';
  const storageKey = `admin_overview_toggle_${projectId}`;

  // Read toggle state from localStorage: default true (ON)
  const [isOverviewVisible, setIsOverviewVisible] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleOverview = () => {
    const updated = !isOverviewVisible;
    setIsOverviewVisible(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const quickFacts = [
    { icon: <Maximize2 className="w-5 h-5 text-gray-500" />, label: 'Project Area', value: '2 Acres' },
    { icon: <Ruler className="w-5 h-5 text-gray-500" />, label: 'Sizes', value: '1000 - 1500 sq.ft.' },
    { icon: <Construction className="w-5 h-5 text-gray-500" />, label: 'Project Size', value: '200 Units' },
    { icon: <Calendar className="w-5 h-5 text-gray-500" />, label: 'Launch Date', value: 'Jan, 2023' },
    { icon: <IndianRupee className="w-5 h-5 text-gray-500" />, label: 'Avg. Price', value: '₹5.5k/sq.ft.' },
    { icon: <CheckCircle2 className="w-5 h-5 text-gray-500" />, label: 'Status', value: project?.status ? project.status.split('·')[0].trim() : 'Ready to Move' },
  ];

  // If hidden and visitor is NOT admin, hide completely
  if (!isOverviewVisible && !isAdmin) {
    return null;
  }

  return (
    <div className={`rounded-xl border p-6 transition-all relative ${
      !isOverviewVisible 
        ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/50' 
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      {/* Super Admin Control Bar for Overview */}
      {isAdmin && (
        <div className="flex items-center justify-between bg-slate-900 text-white px-4 py-2 rounded-xl mb-5 text-xs font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Admin Overview Control:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black ${
              isOverviewVisible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isOverviewVisible ? 'Visible to Public (ON)' : 'Hidden from Public (OFF)'}
            </span>
          </div>
          
          <button
            type="button"
            onClick={toggleOverview}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-extrabold ${
              isOverviewVisible 
                ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md'
            }`}
          >
            {isOverviewVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isOverviewVisible ? 'Turn OFF Overview' : 'Turn ON Overview'}</span>
          </button>
        </div>
      )}

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
