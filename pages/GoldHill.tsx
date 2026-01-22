
import React from 'react';
import { ExternalLink, MapPin, Camera, Film, Mountain, Crown } from 'lucide-react';
import SEO from '../components/SEO';

const GoldHill: React.FC = () => {
  const goldHillSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Gold Hill Shaftesbury",
    "description": "England's iconic cobbled street, famous for the 1973 Hovis bread advert directed by Ridley Scott. Fifth steepest street in England with stunning views.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gold Hill",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0041",
      "longitude": "-2.1989"
    },
    "url": "https://goldhillshaftesbury.co.uk"
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Gold Hill - England's Most Iconic Cobbled Street"
        description="Visit Gold Hill in Shaftesbury - England's most photographed cobbled street and setting for the famous 1973 Hovis 'Boy on Bike' advert directed by Ridley Scott. The fifth steepest street in England offers breathtaking views over the Blackmore Vale and historic thatched cottages."
        schema={goldHillSchema}
        image="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
        keywords="Gold Hill Shaftesbury, Hovis advert, Hovis Hill, Boy on Bike, Ridley Scott, Dorset cobbled street, steepest streets England, Shaftesbury Abbey, St Peter's Church, iconic England"
        canonical="https://visitshaftesbury.co.uk/gold-hill"
      />

      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
            alt="Gold Hill Shaftesbury - England's most iconic cobbled street from the Hovis advert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/50 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">England's Most Romantic Sight</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Gold Hill</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            The cobbled street that captured the heart of a nation.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">"One of the Most Romantic Sights in England"</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Gold Hill is more than just a steep cobbled street - it's an enduring symbol of English heritage and nostalgia. Described as "one of the most romantic sights in England," this iconic slope has become one of the most photographed and visited streets in Britain.
              </p>
              <p>
                The street achieved worldwide fame as the main setting for the legendary 1973 "Boy on Bike" television advertisement for Hovis bread, voted Britain's favourite advertisement of all time. Directed by a young Ridley Scott (who would go on to create Blade Runner and Alien), the advert featured 13-year-old Carl Barlow pushing his bicycle laden with bread up the steep hill before freewheeling triumphantly back down, all set to the slow movement of Dvořák's Symphony No. 9.
              </p>
              <p>
                The enduring popularity of the Hovis advert has made Gold Hill synonymous with traditional English charm. Many visitors still know it affectionately as "Hovis Hill," and the scene continues to evoke powerful emotions of nostalgia and simpler times.
              </p>
              <p>
                Beyond its advertising fame, Gold Hill boasts genuine historical significance. At the top stands the 14th-century St Peter's Church, one of the few buildings remaining from before the 18th century. The cobbled street runs beside the buttressed walls of Shaftesbury Abbey's precinct grounds - the royal Saxon abbey founded by King Alfred the Great in 888 AD.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Film className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Britain's Favourite Advert</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The 1973 Hovis "Boy on Bike" commercial directed by Ridley Scott was voted Britain's favourite advertisement of all time.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Mountain className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Fifth Steepest Street</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Ranked as England's fifth steepest street, the dramatic gradient creates the iconic viewpoint beloved by photographers worldwide.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Camera className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Photographer's Paradise</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                One of Britain's most photographed streets with historic thatched cottages and sweeping views over the Blackmore Vale.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Crown className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Saxon Heritage</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Historic cobbles run beside the ancient walls of Shaftesbury Abbey, founded by King Alfred the Great in 888 AD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Hovis Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">Cultural Icon</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage-green">The Hovis Advert Legacy</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              The 1973 Hovis advertisement captured something ineffable about English identity. The sight of young Carl Barlow toiling up the steep cobbles with his delivery basket, accompanied by Dvořák's New World Symphony, created a perfect tableau of hardworking values and timeless tradition.
            </p>
            <p className="mb-6">
              Director Ridley Scott chose Gold Hill for its unspoiled period charm - the thatched cottages, cobbled surface, and abbey walls created an authentic vision of "old England" that resonated deeply with viewers. The advert's success wasn't just about selling bread; it sold a dream of continuity and heritage that continues to draw visitors from around the world.
            </p>
            <p>
              Today, Gold Hill remains remarkably unchanged from its 1973 appearance. Visitors can stand at the same viewpoint, walk the same cobbles, and experience the same breathtaking panorama that made the Hovis advert an enduring piece of British cultural history.
            </p>
          </div>
        </div>
      </section>

      {/* Visitor Information */}
      <section className="py-16 bg-heritage-cream">
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
                  Gold Hill<br />
                  Shaftesbury, Dorset<br />
                  Central town location<br />
                  (Near town centre and abbey)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Camera className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Best Photography</h3>
                <p className="text-gray-600 text-sm">
                  Early morning or late afternoon for best light<br />
                  Classic viewpoint from the bottom looking up<br />
                  Valley views from the top
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white border border-heritage-gold/20 rounded-sm shadow-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">Visiting Gold Hill</h3>
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Free to Visit:</strong> Gold Hill is a public street open year-round. Walk up and down at your leisure.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Steep Cobbles:</strong> The gradient is challenging - wear appropriate footwear and take care on the historic cobbled surface.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Historic Cottages:</strong> The thatched cottages lining the street are private residences. Please be respectful of residents' privacy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>St Peter's Church:</strong> The 14th-century church at the top is worth exploring for its medieval architecture and heritage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Gold Hill Museum:</strong> Located at the top with free entry, award-winning gardens, and local history exhibits.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Abbey Walls:</strong> The buttressed walls alongside are part of Shaftesbury Abbey's precinct - founded by King Alfred the Great.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Blackmore Vale Views:</strong> From the top, enjoy panoramic countryside views across three counties.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://goldhillshaftesbury.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold transition-colors border-b border-heritage-gold/50 pb-1"
            >
              Learn More About Gold Hill <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Experience the Icon</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Walk in the footsteps of the Hovis Boy and discover why this cobbled street has captivated millions. Gold Hill awaits at the heart of Shaftesbury's Saxon heritage.
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

export default GoldHill;
