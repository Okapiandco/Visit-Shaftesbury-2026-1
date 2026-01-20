
import React from 'react';
import SEO from '../components/SEO';
import { History, Shield, Heart, Camera } from 'lucide-react';

const HistoryPage: React.FC = () => {
  return (
    <div className="bg-heritage-cream min-h-screen">
      <SEO 
        title="Our Saxon History" 
        description="Explore the 1000-year history of Shaftesbury, from King Alfred the Great to the iconic Hovis Hill."
      />
      
      {/* Immersive Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Ancient stonework" 
        />
        <div className="absolute inset-0 bg-heritage-green/70 backdrop-blur-sm"></div>
        <div className="relative text-center px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Founded 888 AD</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">Saxon Shaftesbury</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Timeline Style Content */}
        <div className="space-y-32 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-heritage-gold/20 hidden md:block"></div>

          {/* Era 1 */}
          <section className="relative group">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:text-right pr-8 mb-8 md:mb-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heritage-green text-heritage-gold mb-6 md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10 shadow-xl border-4 border-heritage-cream">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-heritage-green mb-4">The King's Fort</h2>
                <p className="text-gray-600 leading-relaxed font-light">
                  King Alfred the Great established Shaftesbury as a fortified 'burh' to defend against Viking incursions. It was one of the few places in England that never fell to the Danes.
                </p>
              </div>
              <div className="aspect-square overflow-hidden shadow-2xl rounded-sm">
                <img src="https://picsum.photos/seed/fortress/800/800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Fortress ruins" />
              </div>
            </div>
          </section>

          {/* Era 2 */}
          <section className="relative group">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:order-2 md:pl-8 mb-8 md:mb-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heritage-green text-heritage-gold mb-6 md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10 shadow-xl border-4 border-heritage-cream">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-heritage-green mb-4">A Sacred Pilgrimage</h2>
                <p className="text-gray-600 leading-relaxed font-light">
                  The Abbey became the wealthiest in England after receiving the remains of King Edward the Martyr. Pilgrims flocked here for centuries, building the town's prosperity.
                </p>
              </div>
              <div className="md:order-1 aspect-square overflow-hidden shadow-2xl rounded-sm">
                <img src="https://picsum.photos/seed/monastery/800/800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Abbey foundation" />
              </div>
            </div>
          </section>

          {/* Era 3 */}
          <section className="relative group">
            <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
              <div className="md:text-right pr-8 mb-8 md:mb-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heritage-green text-heritage-gold mb-6 md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10 shadow-xl border-4 border-heritage-cream">
                  <Camera className="w-6 h-6" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-heritage-green mb-4">The Hovis Hill</h2>
                <p className="text-gray-600 leading-relaxed font-light">
                  In 1973, Ridley Scott immortalized Gold Hill in the Hovis 'Boy on the Bike' advert. Today, it remains one of the most photographed streets in Britain.
                </p>
              </div>
              <div className="aspect-square overflow-hidden shadow-2xl rounded-sm">
                <img src="https://picsum.photos/seed/hovis-hill/800/800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Gold Hill" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-32 p-12 bg-heritage-green text-white text-center rounded-sm shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
           <History className="w-12 h-12 text-heritage-gold mx-auto mb-6 opacity-20" />
           <h3 className="text-3xl font-serif font-bold mb-6 italic">"A town that feels as if time itself has slowed down to appreciate the view."</h3>
           <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Discover our museums at the top of Gold Hill</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
