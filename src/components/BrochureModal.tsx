import React, { useState } from 'react';
import { X, FileDown, CheckCircle2, User, Phone, Mail, Sparkles, Building2 } from 'lucide-react';
import type { ProjectData } from '../data/projects';
import { supabase } from '../lib/supabase';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectData | null;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, project }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setSubmitting(true);

    const projectTitle = project ? project.title : 'Selected Property';
    const projectLocation = project ? project.subtitle : 'Bangalore';
    const projectPrice = project?.priceConfigs?.[0]?.price || 'Contact for price';

    // Format professional WhatsApp lead inquiry message
    const message = 
      `Hi Homes & Rents,\n` +
      `I would like to download the official brochure for *${projectTitle}*.\n\n` +
      `📋 *Customer Contact Information:*\n` +
      `👤 *Full Name:* ${formData.name.trim()}\n` +
      `📱 *Phone / WhatsApp:* ${formData.phone.trim()}\n` +
      `📧 *Email ID:* ${formData.email.trim()}\n` +
      `🏢 *Property:* ${projectTitle}\n` +
      `📍 *Location:* ${projectLocation}\n` +
      `💰 *Price Range:* ${projectPrice}\n\n` +
      `Please send the complete PDF brochure, master floor plans & detailed price breakdown. Thank you!`;

    const whatsappUrl = `https://wa.me/919739063840?text=${encodeURIComponent(message)}`;

    // Store lead locally in admin backup storage
    try {
      const storedLeads = JSON.parse(localStorage.getItem('admin_brochure_leads') || '[]');
      storedLeads.push({
        id: Date.now().toString(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        project: projectTitle,
        date: new Date().toISOString()
      });
      localStorage.setItem('admin_brochure_leads', JSON.stringify(storedLeads));
    } catch {
      // ignore local storage error
    }

    // Try storing lead in Supabase inquiries/leads if table exists
    try {
      await supabase.from('leads').insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        property_title: projectTitle,
        type: 'Brochure Download',
        created_at: new Date().toISOString()
      });
    } catch {
      // graceful fallback if table not created
    }

    // Launch WhatsApp directly
    window.open(whatsappUrl, '_blank');

    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '' });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative">
          <button 
            type="button"
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
              <FileDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full border border-white/20">
                <Sparkles className="w-3 h-3 text-yellow-300" /> Instant PDF Delivery
              </div>
              <h2 className="text-xl font-black text-white mt-0.5">Download Brochure</h2>
            </div>
          </div>

          {project && (
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 text-xs text-white/90">
              <Building2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />
              <span className="font-bold truncate">{project.title}</span>
              <span className="text-white/60">·</span>
              <span className="text-white/80 truncate text-[11px]">{project.subtitle}</span>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Brochure Request Sent!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Opening WhatsApp now. Your details have been received by our sales team, and the PDF brochure is being dispatched!
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                  WhatsApp: +91 97390 63840
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Enter your details below to receive the complete project brochure, unit blueprints, and price breakup instantly on WhatsApp:
              </p>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" /> Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" /> Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9\s-]/g, '') })}
                    className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> Email ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul.sharma@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                <FileDown className="w-4 h-4" />
                <span>{submitting ? 'Connecting...' : 'Download Brochure on WhatsApp'}</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                🔒 We respect your privacy. No spam. Receive the brochure instantly.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
