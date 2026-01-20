
import React from 'react';
import { ArrowRight, MapPin, History, Utensils, Bed, Compass, Mountain, Trees, Landmark as LandmarkIcon, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LANDMARKS } from '../constants';

const Home: React.FC = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Visit Shaftesbury",
    "url": "https://visitshaftesbury.co.uk",
    "description": "The official tourism guide for Shaftesbury, Dorset. Explore Gold Hill, the Saxon Abbey, and the Blackmore Vale.",
    "publisher": {
      "@type": "Organization",
      "name": "Visit Shaftesbury",
      "logo": "https://visitshaftesbury.co.uk/logo.png"
    }
  };

  const goldHillImageUrl = "https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg";

  // Filter landmarks for the "Must-Sees" (In Town) and "Beyond the Town" explore section
  const mustSees = LANDMARKS.filter(l => l.distance === 'In Town');
  const exploreAttractions = LANDMARKS.filter(l => l.distance !== 'In Town');

  return (
    <div className="flex flex-col">
      <SEO 
        title="Welcome"
        description="Discover Shaftesbury, Dorset's iconic hilltop Saxon town. Home to the world-famous Gold Hill, historic Abbey ruins, and breathtaking views over the Blackmore Vale."
        schema={homeSchema}
      />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={goldHillImageUrl} 
            alt="The iconic view of Gold Hill in Shaftesbury, Dorset" 
            className="w-full h-full object-cover scale-105 animate-[ken-burns_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-heritage-green/80 via-transparent to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
              The original <br/><span className="italic text-heritage-gold">hilltop</span> escape.
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 max-w-lg leading-relaxed text-gray-100">
              Perched high on the edge of the Blackmore Vale, Shaftesbury is one of England’s most beautiful and historic hilltop towns.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events" className="bg-heritage-gold hover:bg-white text-heritage-green px-8 py-4 font-bold uppercase tracking-widest transition-all">
                Discover Events
              </Link>
              <Link to="/plan" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 font-bold uppercase tracking-widest transition-all">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-heritage-gold uppercase tracking-[0.3em] text-sm font-bold block mb-4">Welcome to Shaftesbury</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-heritage-green mb-8">Dorset's Iconic High Point</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light mb-12">
            Steeped in Saxon history and immortalised by Ridley Scott's famous Hovis advert, Shaftesbury offers a unique blend of heritage, artisanal shops, and panoramic views that stretch across the Dorset countryside for miles.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Link to="/history" className="group flex flex-col items-center">
              <div className="w-16 h-16 bg-heritage-cream rounded-full flex items-center justify-center text-heritage-green mb-3 group-hover:bg-heritage-gold transition-colors">
                <History className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Saxon History</span>
            </Link>
            <Link to="/plan" className="group flex flex-col items-center cursor-pointer">
              <div className="w-16 h-16 bg-heritage-cream rounded-full flex items-center justify-center text-heritage-green mb-3 group-hover:bg-heritage-gold transition-colors">
                <MapPin className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Top Views</span>
            </Link>
            <Link to="/eat-drink" className="group flex flex-col items-center cursor-pointer">
              <div className="w-16 h-16 bg-heritage-cream rounded-full flex items-center justify-center text-heritage-green mb-3 group-hover:bg-heritage-gold transition-colors">
                <Utensils className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Eat & Drink</span>
            </Link>
            <Link to="/stay" className="group flex flex-col items-center cursor-pointer">
              <div className="w-16 h-16 bg-heritage-cream rounded-full flex items-center justify-center text-heritage-green mb-3 group-hover:bg-heritage-gold transition-colors">
                <Bed className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Places to Stay</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Landmarks Grid (Must-Sees) */}
      <section className="py-20 bg-heritage-cream px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">Essential Experiences</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage-green">The Must-Sees</h2>
              <p className="text-gray-500 mt-2">Essential landmarks for every visitor to Shaftesbury.</p>
            </div>
            <Link to="/history" className="hidden md:flex items-center text-heritage-green font-bold uppercase tracking-widest text-xs hover:text-heritage-gold">
              Explore History <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mustSees.map((landmark) => (
              <div key={landmark.id} className="relative aspect-[3/4] overflow-hidden group shadow-lg">
                {landmark.image_url ? (
                  <img src={landmark.image_url} alt={landmark.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-heritage-green flex flex-col items-center justify-center p-12 text-center">
                    <LandmarkIcon className="w-16 h-16 text-heritage-gold/30 mb-6" />
                    <h3 className="text-2xl font-serif text-white mb-2">{landmark.name}</h3>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-green/95 via-heritage-green/40 to-transparent flex flex-col justify-end p-8 text-white transition-all duration-500 group-hover:from-heritage-green">
                  <h3 className="text-2xl font-serif mb-2 group-hover:text-heritage-gold transition-colors">{landmark.name}</h3>
                  <p className="text-sm text-gray-300 font-light mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                    {landmark.description}
                  </p>
                  {landmark.keyInfo && (
                    <div className="mb-6 bg-heritage-gold/10 border-l-2 border-heritage-gold p-3 text-xs italic text-heritage-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <div className="flex items-start">
                        <Info className="w-3 h-3 mr-2 mt-0.5 shrink-0" />
                        <span>{landmark.keyInfo}</span>
                      </div>
                    </div>
                  )}
                  <Link to="/plan" className="text-xs font-bold uppercase tracking-widest text-heritage-gold flex items-center mt-auto">
                    Find on Map <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the Town - Explore Area Section */}
      <section className="py-24 bg-white px-4 border-b border-heritage-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-heritage-gold uppercase tracking-[0.4em] text-xs font-bold block mb-4">Explore Further</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-heritage-green">Beyond the Town</h2>
            <div className="w-24 h-1 bg-heritage-gold mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {exploreAttractions.map((attraction) => (
              <div key={attraction.id} className="group bg-heritage-cream/40 p-10 border border-heritage-gold/10 hover:border-heritage-gold transition-all duration-500 hover:shadow-2xl">
                <div className="mb-6 flex justify-between items-start">
                  <div className="bg-heritage-green p-3 text-heritage-gold group-hover:bg-heritage-gold group-hover:text-heritage-green transition-colors">
                    {attraction.type?.includes('Wood') ? <Trees className="w-6 h-6" /> : 
                     attraction.type?.includes('Point') ? <Mountain className="w-6 h-6" /> : 
                     <Compass className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-gold bg-heritage-green px-3 py-1">
                    {attraction.distance}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-heritage-green mb-4 group-hover:text-heritage-gold transition-colors">
                  {attraction.name}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-4">
                  {attraction.type}
                </span>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  {attraction.description}
                </p>
                <Link to="/plan" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold transition-colors">
                  Find on Map <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Teaser */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-heritage-gold/20 rounded-full blur-3xl"></div>
             <img src="https://picsum.photos/seed/history/1000/1200" alt="The ancient history of Shaftesbury" className="w-full h-[600px] object-cover shadow-2xl relative z-10" />
             <div className="absolute bottom-10 -right-10 bg-heritage-green p-10 z-20 hidden lg:block">
                <p className="text-heritage-gold font-serif text-3xl">888 AD</p>
                <p className="text-white uppercase tracking-widest text-xs font-bold mt-2">Founded by King Alfred</p>
             </div>
          </div>
          <div>
            <span className="text-heritage-gold uppercase tracking-[0.3em] text-sm font-bold block mb-4">Deep Roots</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-heritage-green mb-8">Saxon Shaftesbury</h2>
            <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <p>Shaftesbury's story begins with King Alfred the Great, who founded the town as a fortified 'Burh' to defend against Viking incursions.</p>
              <p>For centuries, the town's life revolved around the Benedictine Abbey, which became a place of pilgrimage and immense wealth, hosting royalty and becoming the largest community of women in the kingdom.</p>
            </div>
            <Link to="/history" className="mt-12 inline-flex items-center text-heritage-green font-bold uppercase tracking-widest text-sm border-b-2 border-heritage-gold pb-2 hover:text-heritage-gold transition-colors">
              Explore Our History <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;