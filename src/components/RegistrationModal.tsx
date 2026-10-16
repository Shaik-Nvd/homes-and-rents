import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { saveUserRegistration, ADMIN_NOTIFICATION_EMAIL } from '../data/userRegistrations';
import type { UserType } from '../data/userRegistrations';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: true,
    email: '',
    userType: 'Homeowner' as UserType,
    companyName: '',
    reraNumber: '',
    city: 'Bangalore',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form validations
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const cleanMobile = formData.mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const whatsappNumber = formData.sameAsMobile ? cleanMobile : formData.whatsapp.replace(/[^0-9]/g, '');
    if (whatsappNumber.length < 10) {
      setError('Please enter a valid WhatsApp number.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // 1. Secure account creation in Supabase Auth (Password is encrypted by Supabase and never emailed)
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            user_type: formData.userType,
            mobile: cleanMobile,
            city: formData.city
          }
        }
      });

      // If user already registered in Supabase auth, we still process or report
      if (authError && !authError.message.toLowerCase().includes('already registered')) {
        console.warn('Supabase auth notice:', authError.message);
      }

      // 2. Save Registration Record to Database & Notify Admin Email (homesandrentss@gmail.com)
      const result = await saveUserRegistration({
        fullName: formData.fullName.trim(),
        mobile: cleanMobile,
        whatsapp: whatsappNumber,
        email: formData.email.trim().toLowerCase(),
        userType: formData.userType,
        companyName: formData.companyName.trim() || undefined,
        reraNumber: formData.reraNumber.trim() || undefined,
        city: formData.city.trim() || 'Bangalore'
      });

      if (!result.success) {
        setError(result.error || 'Failed to submit registration. Please try again.');
        setLoading(false);
        return;
      }

      // 3. Display Confirmation Pop-up as specified in requirement
      setLoading(false);
      setShowConfirmationPopup(true);
      if (onSuccess) onSuccess();

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={() => {
          if (!showConfirmationPopup) onClose();
        }}
      />

      {/* Confirmation Pop-up (Section 3 Requirement) */}
      {showConfirmationPopup ? (
        <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-200 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20 mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Status: Pending Verification
          </span>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Registration Submitted Successfully!
          </h2>

          <div className="text-sm text-slate-600 mt-4 space-y-3 text-left bg-slate-50 p-5 rounded-2xl border border-slate-100 leading-relaxed font-medium">
            <p>Thank you for registering with <strong>Homes and Rents</strong>.</p>
            <p>
              Your registration is currently under review by our verification team. Our team will verify your details within <strong className="text-blue-700">60 minutes</strong>.
            </p>
            <p>
              Once your details have been reviewed, a representative from Homes and Rents will call you on your registered mobile number (<strong>+91 {formData.mobile}</strong>).
            </p>
            <p>You will receive confirmation once your account has been approved.</p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
            <p className="text-xs text-slate-500 font-semibold">Thank you for choosing Homes and Rents.</p>
            <p className="text-xs text-blue-600 font-black italic">Better Info. Smarter Decisions.</p>
            <p className="text-[11px] text-slate-400">Review notification dispatched to: {ADMIN_NOTIFICATION_EMAIL}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowConfirmationPopup(false);
              onClose();
            }}
            className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all text-sm cursor-pointer"
          >
            Acknowledge & Continue
          </button>
        </div>
      ) : (
        /* Section 1: Registration Form Modal */
        <div className="relative bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white relative shrink-0">
            <button 
              type="button"
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full border border-white/20">
                  Verification Process
                </span>
                <h2 className="text-xl font-black text-white mt-1">User Registration & Approval</h2>
              </div>
            </div>

            <p className="text-xs text-blue-100 mt-2 font-medium leading-relaxed">
              Complete the details below to request access to post properties on the Homes and Rents portal. All submissions are manually verified within 60 minutes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" /> 1. Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium placeholder:text-slate-400"
              />
            </div>

            {/* 2 & 3. Mobile Number & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" /> 2. Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ 
                        ...formData, 
                        mobile: val,
                        whatsapp: formData.sameAsMobile ? val : formData.whatsapp 
                      });
                    }}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> 3. WhatsApp No. <span className="text-rose-500">*</span>
                  </label>
                  <label className="flex items-center gap-1 text-[11px] font-bold text-blue-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sameAsMobile}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData({ 
                          ...formData, 
                          sameAsMobile: checked,
                          whatsapp: checked ? formData.mobile : formData.whatsapp 
                        });
                      }}
                      className="rounded accent-blue-600"
                    />
                    Same
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    disabled={formData.sameAsMobile}
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.sameAsMobile ? formData.mobile : formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* 4 & 5. Email ID & User Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> 4. Email ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" /> 5. User Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as UserType })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-bold bg-white cursor-pointer"
                >
                  <option value="Homeowner">Homeowner / Individual Owner</option>
                  <option value="Agent / Broker / Dealer">Real Estate Agent / Broker / Dealer</option>
                  <option value="Builder / Developer">Builder / Developer</option>
                  <option value="Other">Other Property Professional</option>
                </select>
              </div>
            </div>

            {/* 6. Company Name / Dealer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>6. Company / Dealer Name</span>
                <span className="text-[10px] text-slate-400 font-semibold">(If applicable)</span>
              </label>
              <input
                type="text"
                placeholder={formData.userType === 'Homeowner' ? 'e.g. Self (Individual Owner)' : 'e.g. Apex Realty Ventures'}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium placeholder:text-slate-400"
              />
            </div>

            {/* 7 & 8. RERA Registration & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>7. RERA Reg. Number</span>
                  <span className="text-[10px] text-slate-400 font-semibold">(If applicable)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. PRM/KA/RERA/..."
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> 8. City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Bangalore"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-bold"
                />
              </div>
            </div>

            {/* 9. Password / Secure Login */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" /> 9. Password / Secure Login <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Choose a secure password (min 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                🔒 Encrypted securely. Passwords are never sent over email or viewed by staff.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Submitting Registration...' : 'Submit Registration for Verification'}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 text-center leading-relaxed">
              Upon submission, your details will be routed to <strong>{ADMIN_NOTIFICATION_EMAIL}</strong> for review. Our desk will contact you within 60 minutes to verify your account.
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
