
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck, Loader2, CheckCircle } from 'lucide-react';
import { supabase, signInWithGoogle } from '../supabaseClient';
import SEO from '../components/SEO';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Calculate the redirect URL based on current environment
      // This helps prevent the "local machine only" issue
      const redirectTo = `${window.location.origin}${window.location.pathname}#/login`;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-heritage-cream px-4 py-12">
        <SEO title="Registration Successful" description="Your account has been created." />
        <div className="max-w-md w-full bg-white p-12 shadow-2xl rounded-sm border border-heritage-gold/20 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-heritage-green mb-4">Check Your Email</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a verification link to <strong>{email}</strong>. 
            Please click the link in that email to activate your account and start contributing to Shaftesbury.
          </p>
          <div className="space-y-4">
            <Link to="/login" className="block w-full bg-heritage-green text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors">
              Proceed to Login
            </Link>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">
              Note: The link will redirect you to the address configured in your Supabase project settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-heritage-cream px-4 py-12">
      <SEO title="Create Account" description="Join Visit Shaftesbury to share events and explore our Saxon heritage." />
      
      <div className="max-w-md w-full">
        <div className="bg-white p-10 shadow-2xl rounded-sm border border-heritage-gold/20">
          <div className="text-center mb-10">
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4">Community Membership</span>
            <h1 className="text-3xl font-serif font-bold text-heritage-green">Join Our Town</h1>
            <p className="text-gray-500 text-sm mt-2 font-light">Create an account to submit events and contribute to our heritage.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium" aria-live="assertive">
              {error}
            </div>
          )}

          <button 
            onClick={handleGoogleSignup}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 px-4 text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all mb-8 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" aria-hidden="true" />
            Sign up with Google
          </button>

          <div className="relative mb-8" aria-hidden="true">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-gray-400 font-bold">Or with Email</span></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="reg-name" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" aria-hidden="true" />
                <input 
                  id="reg-name"
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" 
                  placeholder="Edward Dorset"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" aria-hidden="true" />
                <input 
                  id="reg-email"
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
              <label htmlFor="reg-password" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" aria-hidden="true" />
                <input 
                  id="reg-password"
                  type="password" 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" 
                  placeholder="Min. 6 characters"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors flex items-center justify-center shadow-lg"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" /> : <UserPlus className="w-4 h-4 mr-2" aria-hidden="true" />}
              Create Account
            </button>
          </form>
          
          <p className="mt-8 text-center text-xs text-gray-500">
            Already have an account? <Link to="/login" className="text-heritage-gold font-bold hover:underline">Login here</Link>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-heritage-gold" aria-hidden="true" />
          <span>Verified Secure Connection</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
