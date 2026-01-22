
import React from 'react';
import { ExternalLink, MapPin, Clock, Trees, Eye, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const ParkWalk: React.FC = () => {
  const parkWalkSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Park Walk Shaftesbury",
    "description": "Historic promenade with panoramic views over the Blackmore Vale, donated to the town in 1753.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Park Walk",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "postalCode": "SP7 8JR",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0041",
      "longitude": "-2.1989"
    }
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Park Walk"
        description="Visit Park Walk in Shaftesbury, Dorset - a historic 18th-century promenade with breathtaking panoramic views over the Blackmore Vale. Donated to the town in 1753, this peaceful walkway features an avenue of trees, war memorial, and stunning sunset views."
        schema={parkWalkSchema}
        image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"
        keywords="Park Walk Shaftesbury, Shaftesbury promenade, Blackmore Vale views, Dorset walks, historic promenade, Robert Dyneley, Shaftesbury viewpoint, Pine Walk"
        canonical="https://visitshaftesbury.co.uk/park-walk"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600"
            alt="Park Walk in Shaftesbury with panoramic views over the Blackmore Vale"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Historic Promenade</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Park Walk</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            An 18th-century gift to Shaftesbury, offering sweeping views of the Blackmore Vale.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">A Promenade Through Time</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Donated to the town in 1753 by Robert Dyneley, the Lord of the Manor, Park Walk is a treasured piece of Shaftesbury's heritage. Dyneley planted an avenue of fashionable sycamore trees to create a shaded promenade for the townspeople, transforming this elevated path into one of Dorset's most scenic walks.
              </p>
              <p>
                Referenced in Upjohn's 1799 map as having "an avenue of trees commanding important views southwards," Park Walk has been celebrated for over two centuries. By 1827, it was described as a 'broad walk or terraces lined with trees,' serving as the town's cherished promenade since the 1760s.
              </p>
              <p>
                Later additions include a bandstand erected in 1866, the Coronation extension and flowerbed in 1953, and a war memorial honoring those who served. Pine Walk, planted during Queen Victoria's reign, extends the experience further.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Eye className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Panoramic Views</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Breathtaking vistas south over the Blackmore Vale make this an ideal sunset viewing spot.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Trees className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Historic Trees</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Walk beneath the original avenue of sycamore trees planted in 1753, connecting to the Victorian-era Pine Walk.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Heart className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Family Friendly</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Flat pavement ideal for children with balance bikes or scooters, with benches and flower beds along the route.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">Visitor Information</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage-green">Plan Your Visit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Location</h3>
                <p className="text-gray-600 text-sm">
                  Park Walk, Shaftesbury, Dorset SP7 8JR<br />
                  Near Bell Street Car Park in central Shaftesbury
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Opening Hours</h3>
                <p className="text-gray-600 text-sm">
                  Open year-round<br />
                  Free to visit
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-heritage-cream border border-heritage-gold/20 rounded-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">Getting There</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Park Walk is easily accessible from Bell Street Car Park in the town centre. The flat, paved promenade is suitable for all ages and abilities, making it perfect for a leisurely stroll with spectacular countryside views.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Best visited at sunset when the Blackmore Vale is bathed in golden light. The benches along the route provide perfect spots to pause and take in the scenery.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Explore More of Shaftesbury</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Discover the other historic landmarks and attractions that make Shaftesbury one of Dorset's most enchanting destinations.
          </p>
          <a
            href="/plan"
            className="inline-flex items-center bg-heritage-gold text-heritage-green px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
          >
            Plan Your Visit <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ParkWalk;
