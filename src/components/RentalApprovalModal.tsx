import { useState } from 'react';
import { X, Mail, Phone, User, CreditCard } from 'lucide-react';

interface RentalApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifySuccess?: () => void;
}

export const RentalApprovalModal = ({ isOpen, onClose, onVerifySuccess }: RentalApprovalModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    aadhar: '',
    otp: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOtpError('');
    // Mock verifying OTP (e.g. valid if '1234')
    setTimeout(() => {
      setLoading(false);
      if (formData.otp === '1234') {
        setSubmitted(true);
        if (onVerifySuccess) {
          onVerifySuccess();
        }
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setStep(1);
          setFormData({ name: '', phone: '', email: '', aadhar: '', otp: '' });
        }, 3000);
      } else {
        setOtpError('Invalid OTP. Please enter 1234 for testing.');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0a192f]">List Your Property</h2>
              <p className="text-gray-500 text-sm mt-1">Get verified to list your property for rent</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verification Complete!</h3>
              <p className="text-gray-600">Your details have been forwarded to homesandrentss@gmail.com. We will contact you soon.</p>
            </div>
          ) : step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter 10-digit number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="12-digit Aadhar number"
                    value={formData.aadhar}
                    onChange={e => setFormData({ ...formData, aadhar: e.target.value })}
                  />
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0078d4] text-white py-3 rounded-lg font-bold text-[15px] hover:bg-blue-700 transition-colors shadow-sm mt-6 flex justify-center items-center"
              >
                {loading ? 'Sending OTP...' : 'Get OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  An OTP has been sent to <strong>{formData.email}</strong>. (For testing, enter <strong>1234</strong>)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center tracking-widest text-lg"
                  placeholder="----"
                  maxLength={4}
                  value={formData.otp}
                  onChange={e => setFormData({ ...formData, otp: e.target.value })}
                />
                {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold text-[15px] hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0078d4] text-white py-3 rounded-lg font-bold text-[15px] hover:bg-blue-700 transition-colors shadow-sm"
                >
                  {loading ? 'Verifying...' : 'Verify & Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
