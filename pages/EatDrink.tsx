
import React from 'react';
import { ExternalLink, UtensilsCrossed, Star, Wine } from 'lucide-react';
import { DINING_PLACES } from '../constants';
import SEO from '../components/SEO';

const EatDrink: React.FC = () => {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Restaurants in Shaftesbury",
    "itemListElement": DINING_PLACES.map((place, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Restaurant",
        "name": place.name,
        "image": place.image_url,
        "url": place.website_url,
        "servesCuisine": place.type,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Shaftesbury",
          "addressRegion": "Dorset",
          "addressCountry": "GB"
        }
      }
    }))
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO 
        title="Eat & Drink"
        description="A guide to the best restaurants, pubs, and cafes in Shaftesbury, Dorset. From fine dining at La Fleur de Lys to traditional pubs like The Mitre."
        schema={restaurantSchema}
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.squarespace-cdn.com/content/v1/597853a8d2b8576d2caa6efa/1741348195018-OE834M9XWD8OIIZ5IVIO/Hungergap-49.jpg?format=2500w" 
            alt="Dining in Shaftesbury, Dorset" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Taste of the Hilltop</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Eat & Drink</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            From historic coaching inns and traditional pubs to award-winning fine dining and farm-to-table garden rooms.
          </p>
        </div>
      </div>

      {/* Intro section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">A Culinary Haven in North Dorset</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                Shaftesbury's dining scene is as rich as its history. Surrounded by the fertile lands of the Blackmore Vale, our local chefs have access to some of the finest produce in the country.
              </p>
              <p>
                Whether you're looking for a hearty pub lunch after a climb up Gold Hill, a sophisticated evening of French-inspired cuisine, or a unique outdoor dining experience in a walled garden, you'll find it here.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Star className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Local Produce</h3>
              <p className="text-sm text-gray-500">Dorset cheeses, locally reared meats, and garden-fresh vegetables.</p>
            </div>
            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Wine className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Crafted Ales</h3>
              <p className="text-sm text-gray-300">Sample traditional West Country ciders and locally brewed ales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-heritage-gold/20 pb-8">
          <div>
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">Our Curated Selection</span>
            <h2 className="text-4xl font-serif font-bold text-heritage-green">Where to Dine</h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-400 text-sm">
            <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
            <span>Showing {DINING_PLACES.length} venues</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DINING_PLACES.map((place) => (
            <div key={place.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={place.image_url} 
                  alt={`Restaurant: ${place.name}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-heritage-green">
                  {place.type}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-heritage-green mb-3 group-hover:text-heritage-gold transition-colors">
                  {place.name}
                </h3>
                <p className="text-gray-600 font-light mb-8 italic leading-relaxed">
                  "{place.feature}"
                </p>
                <div className="mt-auto">
                  <a 
                    href={place.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold transition-colors border-b border-heritage-gold/50 pb-1"
                  >
                    Visit Website <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Note */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Booking Recommended</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Shaftesbury is a popular destination, especially during the summer months and local festivals. To avoid disappointment, we highly recommend booking your table in advance.
          </p>
          <div className="flex justify-center">
            <div className="h-px w-24 bg-heritage-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EatDrink;
