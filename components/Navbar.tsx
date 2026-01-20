
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Explore', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Eat & Drink', path: '/eat-drink' },
    { name: 'Stay', path: '/stay' },
    { name: 'Plan Your Visit', path: '/plan' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-heritage-green text-white sticky top-0 z-50 shadow-xl" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group" aria-label="Visit Shaftesbury - Return to homepage">
            <div className="flex flex-col items-center">
              <span className="text-xs tracking-[0.3em] font-medium text-heritage-gold uppercase">Visit</span>
              <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-heritage-gold transition-colors">
                SHAFTESBURY
              </span>
              <div className="w-full h-0.5 bg-heritage-gold mt-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`text-sm font-medium uppercase tracking-widest hover:text-heritage-gold transition-colors ${
                  isActive(link.path) ? 'text-heritage-gold border-b border-heritage-gold' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-white/20">
              <button aria-label="Search the site" className="hover:text-heritage-gold transition-colors">
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
              
              {user ? (
                <div className="relative group">
                  <button 
                    aria-label="User account menu"
                    aria-haspopup="true"
                    className="flex items-center space-x-2 p-2 bg-heritage-gold text-heritage-green rounded-full hover:bg-white transition-all"
                  >
                    <User className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-heritage-green shadow-2xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Signed in as</p>
                      <p className="text-xs font-bold truncate">{user.email}</p>
                    </div>
                    <Link to="/admin" className="flex items-center space-x-2 px-4 py-3 hover:bg-heritage-cream text-xs font-bold uppercase tracking-widest transition-colors">
                      <LayoutDashboard className="w-4 h-4" aria-hidden="true" /> <span>Dashboard</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest transition-colors border-t border-gray-50"
                    >
                      <LogOut className="w-4 h-4" aria-hidden="true" /> <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 px-6 py-2 border border-heritage-gold text-heritage-gold hover:bg-heritage-gold hover:text-heritage-green transition-all text-xs font-bold uppercase tracking-widest">
                   Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {!user && (
              <Link to="/login" className="text-heritage-gold text-xs font-bold uppercase tracking-widest">Login</Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-heritage-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden bg-heritage-green border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-white hover:bg-white/5 uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-heritage-gold hover:bg-white/5 uppercase tracking-widest"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full text-left block px-3 py-4 text-base font-medium text-red-400 hover:bg-white/5 uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
