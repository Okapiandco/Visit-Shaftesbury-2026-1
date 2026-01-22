
import React from 'react';
import { Train, Bus, Car, Map as MapIcon, ChevronRight } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import SEO from '../components/SEO';

const Transport: React.FC = () => {
  const transportSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to get to Shaftesbury, Dorset",
    "description": "Travel guide for reaching Shaftesbury via train, bus, and car.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "By Train",
        "text": "The nearest station is Gillingham (Dorset), 4 miles away. Direct trains run from London Waterloo."
      },
      {
        "@type": "HowToStep",
        "name": "By Bus",
        "text": "Take the X2 from Salisbury or the 25 from Gillingham Station."
      },
      {
        "@type": "HowToStep",
        "name": "By Car",
        "text": "Access via the A30 or A350. Park at Bell Street or Angel Lane."
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Plan Your Visit to Shaftesbury"
        description="Complete guide to visiting Shaftesbury, Dorset. Travel information including train from Gillingham station, bus routes (X2, 25), parking at Bell Street and Angel Lane, plus local attractions map."
        schema={transportSchema}
        image="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
        keywords="visit Shaftesbury, getting to Shaftesbury, Gillingham station, Shaftesbury parking, Dorset travel, Shaftesbury map, plan your visit, Shaftesbury directions, public transport Shaftesbury"
        canonical="https://visitshaftesbury.co.uk/plan"
      />

      {/* Hero */}
      <div className="relative h-[40vh] bg-heritage-green flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Dorset countryside" />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl font-serif font-bold mb-4">Plan Your Visit</h1>
          <p className="text-heritage-gold uppercase tracking-[0.3em] font-bold">Getting to Shaftesbury</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Rail */}
          <div className="space-y-6">
            <div className="w-16 h-16 bg-heritage-cream flex items-center justify-center text-heritage-green rounded-full">
              <Train className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-heritage-green">By Train</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-light">
              <p>Shaftesbury does not have its own station. The nearest rail link is at <span className="font-bold text-heritage-green">Gillingham (Dorset)</span>, just 4 miles away.</p>
              <p>Direct services run from London Waterloo (2 hours) and Exeter St Davids.</p>
              <a href="https://www.nationalrail.co.uk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-heritage-gold font-bold uppercase tracking-widest text-xs hover:text-heritage-green transition-colors">
                Book Tickets <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Bus */}
          <div className="space-y-6">
            <div className="w-16 h-16 bg-heritage-cream flex items-center justify-center text-heritage-green rounded-full">
              <Bus className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-heritage-green">By Bus</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-light">
              <p>Frequent bus services connect Shaftesbury to surrounding towns and the rail station.</p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><span className="font-bold text-heritage-green">X2 Route:</span> Salisbury - Shaftesbury</li>
                <li><span className="font-bold text-heritage-green">Route 25:</span> Gillingham Station - Shaftesbury</li>
              </ul>
              <a href="https://www.morebus.co.uk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-heritage-gold font-bold uppercase tracking-widest text-xs hover:text-heritage-green transition-colors">
                View Timetables <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Car */}
          <div className="space-y-6">
            <div className="w-16 h-16 bg-heritage-cream flex items-center justify-center text-heritage-green rounded-full">
              <Car className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-heritage-green">By Car</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-light">
              <p>Shaftesbury is located at the intersection of the A30 (London to Penzance) and A350 (Poole to Warminster).</p>
              <div className="bg-heritage-cream p-6 border-l-4 border-heritage-gold">
                <h4 className="font-bold text-sm text-heritage-green uppercase mb-3">Central Parking</h4>
                <ul className="text-xs space-y-2 font-medium">
                  <li className="flex justify-between"><span>Bell Street</span> <span className="text-heritage-gold">SP7 8AR</span></li>
                  <li className="flex justify-between"><span>Angel Lane</span> <span className="text-heritage-gold">SP7 8AT</span></li>
                  <li className="flex justify-between"><span>Longmead</span> <span className="text-heritage-gold">SP7 8PL</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive map section */}
        <section className="mt-24">
          <div className="bg-heritage-green p-8 md:p-12 text-center rounded-sm shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
            <MapIcon className="w-12 h-12 text-heritage-gold mx-auto mb-6" aria-hidden="true" />
            <h3 className="text-white text-3xl font-serif font-bold mb-4">Interactive Visitors Map</h3>
            <p className="text-gray-300 max-w-lg mx-auto mb-10 font-light">
              Explore key landmarks, historic sites, and public facilities. Click on a marker to learn more about each location.
            </p>
            <div className="aspect-video bg-white rounded-sm overflow-hidden shadow-2xl border border-white/10 min-h-[400px]">
              <InteractiveMap />
            </div>
            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
              Navigate the hilltop using our live gateway
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Transport;