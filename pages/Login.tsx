
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { supabase, signInWithGoogle } from '../supabaseClient';
import SEO from '../components/SEO';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/events');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-heritage-cream px-4 py-12">
      <SEO title="Sign In" description="Log in to Visit Shaftesbury to submit events and manage your account." />
      
      <div className="max-w-md w-full">
        <div className="bg-white p-10 shadow-2xl rounded-sm border border-heritage-gold/20">
          <div className="text-center mb-10">
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">Member Access</span>
            <h1 className="text-3xl font-serif font-bold text-heritage-green">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2 font-light">Join the community to contribute to our heritage.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium" aria-live="assertive">
              {error}
            </div>
          )}

          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 px-4 text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all mb-8 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" aria-hidden="true" />
            Sign in with Google
          </button>

          <div className="relative mb-8" aria-hidden="true">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-gray-400 font-bold">Or with Email</span></div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" aria-hidden="true" />
                <input 
                  id="login-email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                {/* Fixed broken label attributes: was missing className and had malformed prop names */}
                <label htmlFor="login-password" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Password</label>
                {/* Removed invalid 'size' prop from Link component */}
                <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-heritage-gold hover:text-heritage-green transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" aria-hidden="true" />
                <input 
                  id="login-password"
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" /> : <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />}
              Sign In
            </button>
          </form>
          
          <p className="mt-8 text-center text-xs text-gray-500">
            Don't have an account? <Link to="/register" className="text-heritage-gold font-bold hover:underline">Register now</Link>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-heritage-gold" aria-hidden="true" />
          <span>Secure AES-256 Encryption by Supabase</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
