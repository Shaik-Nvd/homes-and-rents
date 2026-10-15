import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Key, ShieldCheck, Home, PlusCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const AdminLoginPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const isAdmin = user?.email === 'admin@homesandrents.com';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfoMsg(null);

    try {
      const { data, error: signInErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (signInErr) {
        // If user doesn't exist, try to sign them up if it's the admin email
        if (signInErr.message.toLowerCase().includes('invalid login credentials') && email.trim() === 'admin@homesandrents.com') {
          setError('Invalid password. If you haven\'t created the admin account yet in Supabase, click "Initialize / Register Admin Account" below.');
        } else {
          setError(signInErr.message);
        }
      } else if (data?.user?.email !== 'admin@homesandrents.com') {
        setError('This account does not have administrator privileges. Please log in with admin@homesandrents.com.');
      } else {
        setInfoMsg('Login successful! Redirecting to Control Panel...');
        setTimeout(() => navigate('/admin'), 800);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdminAccount = async () => {
    if (!password || password.length < 6) {
      setError('Please enter a password with at least 6 characters in the password field first.');
      return;
    }
    setLoading(true);
    setError(null);
    setInfoMsg(null);

    try {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: 'admin@homesandrents.com',
        password: password.trim()
      });

      if (signUpErr) {
        setError(signUpErr.message);
      } else if (data.session) {
        setInfoMsg('Admin account initialized and logged in successfully! Redirecting...');
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        setInfoMsg('Signup registered! If Supabase requires email verification, check your inbox or confirm in Supabase Dashboard.');
      }
    } catch (err: any) {
      setError(err.message || 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/25 mb-4">
            <ShieldCheck className="w-9 h-9 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Backend</h1>
          <p className="text-slate-400 text-sm mt-1">Homes & Rents Management Portal</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {isAdmin ? (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <p className="text-emerald-400 font-bold text-sm">Authenticated as Admin</p>
                <p className="text-slate-300 text-xs mt-1">{user?.email}</p>
              </div>

              <div className="space-y-3">
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Go to Control Panel
                </Link>
                <Link
                  to="/"
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-xl transition-all text-sm"
                >
                  <Home className="w-4 h-4" /> View Live Website
                </Link>
                <button
                  onClick={signOut}
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium py-2 hover:underline"
                >
                  Log out of Admin
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-medium leading-relaxed">
                  {error}
                </div>
              )}
              {infoMsg && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-medium leading-relaxed">
                  {infoMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@homesandrents.com"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : (
                  <>
                    <span>Enter Control Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={handleCreateAdminAccount}
                  disabled={loading}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  First time? Initialize / Register Admin Account
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            ← Return to Homes & Rents Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};
