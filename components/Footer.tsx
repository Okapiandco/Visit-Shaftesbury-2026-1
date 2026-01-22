
import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-heritage-green text-white py-16 border-t border-heritage-gold/20" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-serif font-bold mb-4 text-heritage-gold">Visit Shaftesbury</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            The historic hilltop gateway to Dorset. Experience the unique Saxon heritage, stunning views, and artisanal charm of our ancient town.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Visit our Facebook page" className="hover:text-heritage-gold transition-colors">
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Visit our Instagram profile" className="hover:text-heritage-gold transition-colors">
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Follow us on Twitter" className="hover:text-heritage-gold transition-colors">
              <Twitter className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="mailto:info@visitshaftesbury.co.uk" aria-label="Email us" className="hover:text-heritage-gold transition-colors">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        
        <nav aria-label="Footer quick links">
          <h4 className="font-bold uppercase tracking-widest mb-4 text-heritage-gold text-sm">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/gold-hill" className="hover:text-white transition-colors">Gold Hill</a></li>
            <li><a href="/shaftesbury-abbey" className="hover:text-white transition-colors">Shaftesbury Abbey</a></li>
            <li><a href="/castle-hill" className="hover:text-white transition-colors">Castle Hill</a></li>
            <li><a href="/park-walk" className="hover:text-white transition-colors">Park Walk</a></li>
            <li><a href="/gold-hill-museum" className="hover:text-white transition-colors">Gold Hill Museum</a></li>
            <li><a href="/shaftesbury-arts-centre" className="hover:text-white transition-colors">Arts Centre</a></li>
          </ul>
        </nav>

        <nav aria-label="Footer visitor info">
          <h4 className="font-bold uppercase tracking-widest mb-4 text-heritage-gold text-sm">Useful Info</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/plan" className="hover:text-white transition-colors">Getting Here</a></li>
            <li><a href="/sitemap" className="hover:text-white transition-colors">Site Map</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Parking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tourist Office</a></li>
          </ul>
        </nav>

        <section aria-label="Newsletter signup">
          <h4 className="font-bold uppercase tracking-widest mb-4 text-heritage-gold text-sm">Join Our Newsletter</h4>
          <p className="text-xs text-gray-400 mb-4">Be the first to know about local festivals and events.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Newsletter Email</label>
            <input 
              id="newsletter-email"
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border-none rounded-l px-4 py-2 w-full text-white text-sm focus:ring-1 focus:ring-heritage-gold"
              required
            />
            <button type="submit" className="bg-heritage-gold text-heritage-green px-4 py-2 rounded-r font-bold text-xs uppercase hover:bg-white transition-colors">
              Join
            </button>
          </form>
        </section>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
        © 2024 Visit Shaftesbury. All Rights Reserved. Inspired by Visit Bath.
      </div>
    </footer>
  );
};

export default Footer;
