
import React from 'react';
import { ExternalLink, MapPin, Clock, Phone, Mail, BookOpen, Camera, Award } from 'lucide-react';
import SEO from '../components/SEO';

const GoldHillMuseum: React.FC = () => {
  const museumSchema = {
    "@context": "https://schema.org",
    "@type": "Museum",
    "name": "Gold Hill Museum",
    "description": "Local history museum at the top of Gold Hill featuring Shaftesbury's heritage, including Dorset's oldest hand-drawn fire engine and an award-winning cottage garden.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gold Hill",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "postalCode": "SP7 8JW",
      "addressCountry": "GB"
    },
    "telephone": "+44-1747-852157",
    "email": "enquiries@goldhillmuseum.org.uk",
    "url": "https://goldhillmuseum.org.uk",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "opens": "10:30",
      "closes": "16:30",
      "description": "Open daily from 1 April 2025"
    }
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Gold Hill Museum"
        description="Visit Gold Hill Museum in Shaftesbury - a volunteer-run local history museum featuring Dorset's oldest hand-drawn fire engine, Saxon and medieval artifacts, and an award-winning cottage garden. Free entry with fascinating exhibits at the top of England's most famous cobbled street."
        schema={museumSchema}
        image="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
        keywords="Gold Hill Museum, Shaftesbury museum, Dorset history, local museum, fire engine Dorset, Gold Hill Shaftesbury, museum garden, research library, Shaftesbury heritage"
        canonical="https://visitshaftesbury.co.uk/gold-hill-museum"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
            alt="Gold Hill Museum at the top of Shaftesbury's iconic cobbled street"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/70 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Local Heritage</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Gold Hill Museum</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            Shaftesbury's story told through centuries of local history and heritage.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">A Window into the Past</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Perched at the top of England's most photographed street, Gold Hill Museum brings Shaftesbury's rich history to life through captivating displays and artifacts spanning Saxon times to the present day.
              </p>
              <p>
                Set in two historic buildings at the famous Gold Hill viewpoint, our volunteer-run museum houses an eclectic collection that tells the story of this hilltop Saxon town. From archaeological finds to domestic life, from industry to the famous Hovis advert, the museum captures the essence of Shaftesbury across the centuries.
              </p>
              <p>
                The star attraction is Dorset's oldest hand-drawn fire engine, a magnificent piece of local firefighting history. Beyond the exhibits, visitors can explore our award-winning cottage garden, use our research library facilities, and enjoy the same breathtaking views that have made Gold Hill a beloved landmark.
              </p>
              <p>
                Free entry with donations welcomed, Gold Hill Museum is a labor of love maintained by dedicated volunteers committed to preserving and sharing Shaftesbury's heritage.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Award className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Historic Collections</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Featuring Dorset's oldest hand-drawn fire engine plus Saxon artifacts, medieval relics, and local history exhibits.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Camera className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Gold Hill Location</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Situated at the top of the iconic Hovis Hill with spectacular views over the Blackmore Vale.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <BookOpen className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Research Library</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Access our research facilities for local and family history. Contact library@goldhillmuseum.org.uk for appointments.
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
                  Gold Hill Museum<br />
                  Gold Hill, Shaftesbury<br />
                  Dorset SP7 8JW<br />
                  (At the top of Gold Hill)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Opening Hours</h3>
                <p className="text-gray-600 text-sm">
                  <strong>2025 Season:</strong> Daily 10:30am - 4:30pm<br />
                  From Tuesday 1 April 2025<br />
                  Latest admission: 4:10pm<br />
                  <strong>Free Entry</strong> (donations welcome)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Contact</h3>
                <p className="text-gray-600 text-sm">
                  Tel: 01747 852157<br />
                  General: enquiries@goldhillmuseum.org.uk<br />
                  Research: library@goldhillmuseum.org.uk
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ExternalLink className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Official Website</h3>
                <a
                  href="https://goldhillmuseum.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heritage-gold hover:text-heritage-green transition-colors text-sm underline"
                >
                  goldhillmuseum.org.uk
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-heritage-cream border border-heritage-gold/20 rounded-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">Special Events & Seasons</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              <strong>February Half Term (14-22 Feb 2026):</strong> Open for the Snowdrop Festival, except for lectures and special events. Check the website for specific opening times during this period.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              <strong>Main Season:</strong> Open every day from 1 April until 31 October. The museum also hosts educational lectures and special programs throughout the season.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Award-Winning Garden:</strong> Don't miss the beautiful cottage garden, which has won multiple awards for its design and planting. The perfect complement to your museum visit with stunning valley views.
            </p>
          </div>
        </div>
      </section>

      {/* Museum Highlights */}
      <section className="py-16 bg-heritage-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-heritage-green mb-8 text-center">Museum Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 shadow-sm border-l-2 border-heritage-gold">
              <h3 className="font-bold text-heritage-green mb-3">Dorset's Oldest Fire Engine</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Marvel at this historic hand-drawn fire engine, the oldest of its kind in Dorset and a centerpiece of the museum's collection.
              </p>
            </div>
            <div className="bg-white p-6 shadow-sm border-l-2 border-heritage-gold">
              <h3 className="font-bold text-heritage-green mb-3">Saxon & Medieval Artifacts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover archaeological treasures from Shaftesbury's founding by King Alfred through to medieval prosperity.
              </p>
            </div>
            <div className="bg-white p-6 shadow-sm border-l-2 border-heritage-gold">
              <h3 className="font-bold text-heritage-green mb-3">Local Life Displays</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experience daily life through the centuries with domestic artifacts, tools, and photographs from Shaftesbury's past.
              </p>
            </div>
            <div className="bg-white p-6 shadow-sm border-l-2 border-heritage-gold">
              <h3 className="font-bold text-heritage-green mb-3">Research Facilities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access our library for local history research and family history investigations by appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Discover Shaftesbury's Story</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            From Saxon foundations to the famous Hovis advert, Gold Hill Museum preserves and shares the fascinating heritage of England's hilltop town.
          </p>
          <a
            href="https://goldhillmuseum.org.uk"
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

export default GoldHillMuseum;
