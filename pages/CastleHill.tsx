
import React from 'react';
import { ExternalLink, MapPin, Clock, TreeDeciduous, Bird, Mountain, Shield } from 'lucide-react';
import SEO from '../components/SEO';

const CastleHill: React.FC = () => {
  const castleHillSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Castle Hill Shaftesbury",
    "description": "Medieval fortified site with spectacular views and rich wildlife. A Scheduled Monument from the English civil war era (1135-1154).",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Access via Bimport (between house numbers 35 and 37)",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "postalCode": "SP7 8AX",
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
        title="Castle Hill"
        description="Explore Castle Hill in Shaftesbury - a medieval Scheduled Monument with spectacular panoramic views across Dorset, Somerset, and Wiltshire. Site of a 12th-century fortified castle from the English civil war, featuring rich wildlife habitats with 130+ plant species and 40 bird species."
        schema={castleHillSchema}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200"
        keywords="Castle Hill Shaftesbury, medieval castle Dorset, Boltbury Shaftesbury, Scheduled Monument, King Stephen, Empress Matilda, wildlife Shaftesbury, Blackmore Vale views, heritage trail"
        canonical="https://visitshaftesbury.co.uk/castle-hill"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600"
            alt="Castle Hill Shaftesbury - Medieval monument with panoramic countryside views"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Medieval Monument</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Castle Hill</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            A Scheduled Ancient Monument with breathtaking views and centuries of history.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">A Fortress from the Anarchy</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Castle Hill, also known as Boltbury, stands as a powerful reminder of England's turbulent medieval past. This fortified site was constructed during the first English civil war (1135-1154), known as "The Anarchy," when Empress Matilda and King Stephen battled for the throne.
              </p>
              <p>
                Perched on a small steep promontory at the western end of Shaftesbury's hilltop, the castle's defensive position was enhanced by a deep artificial ditch that transformed it into a triangular enclosure with inner banks along all three sides. Archaeological excavations by E. Jervoise in 1947-9 uncovered remains of 12th-13th century pottery and a halfpenny of Stephen, confirming the site's medieval military significance.
              </p>
              <p>
                Today, Castle Hill is protected as a Scheduled Monument and forms an important stop on the Shaftesbury Heritage Trail. The site has evolved into a haven for wildlife while maintaining its commanding views across three counties.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Mountain className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Spectacular Views</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                North-facing slopes overlook Dorset, Somerset, and Wiltshire. On clear days, spot King Alfred's Tower, Penselwood Ridge, and even Glastonbury Tor.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Bird className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Rich Wildlife</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Over 130 plant species and 40 bird species recorded. Home to dragonflies, damselflies, and butterflies across grassy slopes, wetlands, and woodland.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Shield className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Heritage Trail</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Part of the Shaftesbury Heritage Trail with information boards detailing the site's medieval military history.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <TreeDeciduous className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Natural Habitats</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Diverse ecosystems including grassy slopes, wetland areas, and well-developed woodland create a nature lover's paradise.
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
                <h3 className="font-bold text-heritage-green mb-2">Location & Access</h3>
                <p className="text-gray-600 text-sm">
                  Access via public footpath next to the Ambulance Station on Bimport (between house numbers 35 and 37)<br />
                  Postcode: SP7 8AX
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Opening Hours</h3>
                <p className="text-gray-600 text-sm">
                  Open year-round<br />
                  Free to visit<br />
                  Outdoor heritage site
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-heritage-cream border border-heritage-gold/20 rounded-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">Getting There & Visiting Tips</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Castle Hill is within easy walking distance of the town centre. Free parking is available on Bimport at the entrance to the public footpath, or you can walk via flat pavement from Bell Street car park.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The site is ideal for picnics with its spectacular countryside views and peaceful atmosphere. Heritage Trail information boards on-site provide fascinating details about the medieval fortification.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Wildlife Watching:</strong> Bring binoculars to spot the diverse bird species. Spring and summer months offer the best opportunities to see wildflowers, butterflies, and dragonflies.
            </p>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-16 bg-heritage-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-heritage-green mb-8 text-center">The Anarchy: England's Civil War</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              The period between 1135-1154 was one of the most chaotic in English history. When King Henry I died without a male heir, his daughter Empress Matilda and nephew King Stephen plunged England into civil war. Across the country, nobles built "adulterine castles" - unlicensed fortifications like Castle Hill - to secure their territories and control strategic positions.
            </p>
            <p>
              Shaftesbury's hilltop location made it a prized strategic asset, and Castle Hill's steep promontory provided natural defensive advantages. The deep ditch and triangular earthwork banks that can still be traced today show the sophisticated military engineering of the medieval period.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Explore Shaftesbury's Heritage</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Castle Hill is just one stop on the Shaftesbury Heritage Trail. Discover over 1000 years of Saxon and medieval history throughout our historic hilltop town.
          </p>
          <a
            href="/history"
            className="inline-flex items-center bg-heritage-gold text-heritage-green px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
          >
            Discover Our History <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CastleHill;
