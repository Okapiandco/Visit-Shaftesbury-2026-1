
import React, { useState, useEffect } from 'react';
import { ExternalLink, Bed, Home, MapPin } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Place } from '../types';
import SEO from '../components/SEO';

const Stay: React.FC = () => {
  const [stayPlaces, setStayPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStayPlaces = async () => {
      try {
        const { data, error } = await supabase
          .from('places_stay')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setStayPlaces(data || []);
      } catch (err) {
        setError('Failed to load accommodations');
        console.error('Error fetching stay places:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStayPlaces();
  }, []);

  const accommodationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Places to Stay in Shaftesbury",
    "itemListElement": stayPlaces.map((place, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LodgingBusiness",
        "name": place.name,
        "image": place.image_url,
        "url": place.website_url,
        "description": place.feature,
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
        title="Places to Stay in Shaftesbury"
        description="Find the perfect accommodation in Shaftesbury, Dorset. Choose from luxury hotels, charming B&Bs, historic inns, glamping pods, and country houses. Book your Shaftesbury stay today."
        schema={accommodationSchema}
        image="https://i.postimg.cc/yx5T0rNJ/20240505_141626.jpg"
        keywords="Shaftesbury hotels, Dorset accommodation, Shaftesbury B&B, Royal Chase Hotel, Grosvenor Arms, glamping Shaftesbury, boutique hotels Dorset, Shaftesbury lodging"
        canonical="https://visitshaftesbury.co.uk/stay"
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/yx5T0rNJ/20240505_141626.jpg" 
            alt="Beautiful accommodations in Shaftesbury, Dorset" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Hilltop Hospitality</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Stay</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            From historic coaching inns and luxury country houses to boutique B&Bs and charming glamping pods.
          </p>
        </div>
      </div>

      {/* Intro section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">Wake Up to the Vale</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                There is something magical about waking up on the edge of the hill. Whether you're staying in the heart of our Saxon town or in the rolling countryside of the Blackmore Vale, Shaftesbury offers a sanctuary for every traveler.
              </p>
              <p>
                Our curated selection of accommodations ranges from award-winning hotels with Georgian elegance to cozy glamping retreats where you can sleep under the stars. Whatever your style, a warm Dorset welcome awaits.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Bed className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Heritage Hotels</h3>
              <p className="text-sm text-gray-500">Stay in historic buildings steeped in Dorset charm.</p>
            </div>
            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Home className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Boutique B&Bs</h3>
              <p className="text-sm text-gray-300">Personal service and locally-sourced hilltop breakfasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-heritage-gold/20 pb-8">
          <div>
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">Curated Escapes</span>
            <h2 className="text-4xl font-serif font-bold text-heritage-green">Where to Stay</h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{stayPlaces.length} Unique Locations</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-heritage-gold"></div>
            <p className="mt-4 text-gray-500 text-sm uppercase tracking-widest">Loading accommodations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-sm p-8">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stayPlaces.map((place) => (
            <div key={place.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={place.image_url} 
                  alt={`Stay at ${place.name}`} 
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
                <div className="flex items-center text-gray-500 text-sm mb-8">
                  <MapPin className="w-4 h-4 mr-2 text-heritage-gold" aria-hidden="true" />
                  <span className="font-light italic">{place.feature}</span>
                </div>
                <div className="mt-auto">
                  <a 
                    href={place.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold transition-colors border-b border-heritage-gold/50 pb-1"
                  >
                    Check Availability <ExternalLink className="w-3 h-3 ml-2" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </section>

      {/* Guide Note */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Plan Ahead</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Shaftesbury's historic charm means many of our stays have limited capacity. We recommend booking well in advance for weekend visits and local festival dates.
          </p>
          <div className="flex justify-center">
            <div className="h-px w-24 bg-heritage-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stay;
