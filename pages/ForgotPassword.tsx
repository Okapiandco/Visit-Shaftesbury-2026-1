import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { resetPassword } from '../supabaseClient';
import SEO from '../components/SEO';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-heritage-cream px-4">
      <SEO title="Reset Password" description="Request a password reset link for your Visit Shaftesbury account." />
      
      <div className="max-w-md w-full">
        <Link to="/login" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Link>

        <div className="bg-white p-10 shadow-2xl rounded-sm border border-heritage-gold/20">
          {sent ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-bold text-heritage-green mb-4">Check Your Inbox</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                We've sent a password reset link to <strong>{email}</strong>. Please check your email to continue.
              </p>
              <button 
                onClick={() => setSent(false)} 
                className="text-xs font-bold uppercase tracking-widest text-heritage-gold hover:underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-heritage-green">Reset Password</h1>
                <p className="text-gray-500 text-sm mt-2 font-light">Enter your email and we'll send you a recovery link.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-gold" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" 
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors flex items-center justify-center"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;