import React, { useState } from 'react';
import { X, Sparkles, Rocket, Phone, CheckCircle2 } from 'lucide-react';
import type { SuperCardCategory } from './SuperCards';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: SuperCardCategory | null;
  count: number;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({
  isOpen,
  onClose,
  category,
  count
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    preferredLocation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !category) return null;

  const isPreLaunch = category === 'Pre Launch';
  const title = isPreLaunch ? 'Exclusive Pre-Launch Access' : 'New Launch Opportunities';
  const subtitle = isPreLaunch
    ? 'Get early bird pricing and priority unit selection before the public launch!'
    : 'Discover the latest hand-picked residential & commercial launches across Bangalore.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hi Homes & Rents, I am interested in ${isPreLaunch ? 'Pre-Launch' : 'New Launch'} projects!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nPreferred Location: ${formData.preferredLocation || 'Bangalore'}\nBudget: ${formData.budget || 'Flexible'}`;
    const whatsappUrl = `https://wa.me/919739063840?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', phone: '', budget: '', preferredLocation: '' });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient banner */}
        <div
          className={`px-6 py-6 text-white relative ${
            isPreLaunch
              ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700'
              : 'bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
            {isPreLaunch ? <Sparkles className="w-3.5 h-3.5" /> : <Rocket className="w-3.5 h-3.5" />}
            <span>{isPreLaunch ? 'VIP Pre-Launch' : 'Just Launched'}</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          <p className="text-white/90 text-xs sm:text-sm mt-1">{subtitle}</p>

          <div className="mt-3 inline-block px-3 py-1 bg-black/25 rounded-lg text-xs font-semibold">
            {count} {count === 1 ? 'project' : 'projects'} available on the platform
          </div>
        </div>

        {/* Content & Inquiry Form */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Enquiry Submitted!</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Our property specialist will contact you with pre-launch brochures, floor plans, and VIP price lists.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 font-medium">
                Leave your details below to receive instant brochures & early bird offers on WhatsApp:
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹80L - 1.5 Cr"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Locality
                </label>
                <input
                  type="text"
                  placeholder="e.g. Whitefield, Sarjapur, Hebbal"
                  value={formData.preferredLocation}
                  onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    isPreLaunch
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/25'
                      : 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 shadow-rose-500/25'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Request VIP Pricing & Brochure</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl font-semibold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Browse Listings
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
