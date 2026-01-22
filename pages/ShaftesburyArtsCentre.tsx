
import React from 'react';
import { ExternalLink, MapPin, Clock, Phone, Music, Film, Palette, Theater } from 'lucide-react';
import SEO from '../components/SEO';

const ShaftesburyArtsCentre: React.FC = () => {
  const artsCentreSchema = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    "name": "Shaftesbury Arts Centre",
    "description": "One of the best volunteer membership-led arts centres in South West England, offering theatre, music, film, and art exhibitions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11-13 Bell Street",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "postalCode": "SP7 8AR",
      "addressCountry": "GB"
    },
    "telephone": "+44-1747-854321",
    "url": "https://shaftesburyartscentre.org.uk",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "12:30",
        "description": "Box Office"
      }
    ]
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Shaftesbury Arts Centre"
        description="Experience world-class culture at Shaftesbury Arts Centre, one of South West England's finest volunteer-led arts venues. Enjoy theatre, live music, films, dance, art exhibitions, and workshops in the heart of historic Shaftesbury, Dorset."
        schema={artsCentreSchema}
        image="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=1200"
        keywords="Shaftesbury Arts Centre, Dorset theatre, live music Shaftesbury, art exhibitions Dorset, Shaftesbury cinema, performing arts, cultural events Shaftesbury, Bell Street"
        canonical="https://visitshaftesbury.co.uk/shaftesbury-arts-centre"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=1600"
            alt="Theatre performance at Shaftesbury Arts Centre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/70 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Cultural Hub</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Shaftesbury Arts Centre</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            Award-winning venue bringing world-class culture to the heart of Dorset.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">The Town's Cultural Heart</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Widely recognized as one of the best volunteer membership-led arts centres in South West England, Shaftesbury Arts Centre is the cultural beating heart of our historic hilltop town.
              </p>
              <p>
                Throughout the year, we present a varied and vibrant program featuring professional theatre productions, live music concerts, independent and mainstream films, contemporary art exhibitions, and engaging educational workshops for all ages.
              </p>
              <p>
                Our dedicated team of volunteers ensures that Shaftesbury punches well above its weight culturally, bringing nationally-touring productions, emerging artists, and beloved classics to our intimate venue. Whether you're passionate about drama, music, visual arts, or cinema, there's always something inspiring happening at the Arts Centre.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Theater className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Live Theatre</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional touring productions, local amateur dramatics, and innovative new works grace our stage.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Music className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Music & Dance</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                From classical concerts to contemporary dance, folk to jazz - diverse performances throughout the year.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Film className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Cinema</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Independent films, blockbusters, and classic screenings in our comfortable cinema space.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Palette className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Art Gallery</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Rotating exhibitions featuring local and regional artists. Gallery open daily with free admission.
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
                  11-13 Bell Street<br />
                  Shaftesbury, Dorset SP7 8AR<br />
                  Central Shaftesbury location
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Opening Hours</h3>
                <p className="text-gray-600 text-sm">
                  <strong>Box Office:</strong> Mon-Sat, 10am-12:30pm<br />
                  <strong>Gallery:</strong> Daily, 10am-4pm<br />
                  Free gallery admission
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Contact</h3>
                <p className="text-gray-600 text-sm">
                  Tel: 01747 854321<br />
                  Check website for event calendar
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ExternalLink className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Official Website</h3>
                <a
                  href="https://shaftesburyartscentre.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heritage-gold hover:text-heritage-green transition-colors text-sm underline"
                >
                  shaftesburyartscentre.org.uk
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-heritage-cream border border-heritage-gold/20 rounded-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">What's On</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Our diverse program changes weekly, featuring everything from touring theatre companies and local performances to art-house films and mainstream cinema. The gallery showcases rotating exhibitions from talented regional artists, with new shows opening regularly throughout the year.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Check the online calendar for upcoming events, book tickets in advance, and consider becoming a member to support this vital community resource while enjoying exclusive benefits.
            </p>
            <a
              href="https://shaftesburyartscentre.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold transition-colors border-b border-heritage-gold/50 pb-1"
            >
              View Full Calendar <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Support Local Arts</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Join as a member or volunteer to help keep culture thriving in Shaftesbury. Your support ensures we can continue bringing world-class performances and exhibitions to our community.
          </p>
          <a
            href="https://shaftesburyartscentre.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-heritage-gold text-heritage-green px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
          >
            Visit Website <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ShaftesburyArtsCentre;
