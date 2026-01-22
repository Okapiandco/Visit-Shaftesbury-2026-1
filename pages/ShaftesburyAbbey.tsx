
import React from 'react';
import { ExternalLink, MapPin, Clock, Phone, Leaf, Crown, Church } from 'lucide-react';
import SEO from '../components/SEO';

const ShaftesburyAbbey: React.FC = () => {
  const abbeySchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Shaftesbury Abbey Museum & Gardens",
    "description": "Founded by King Alfred the Great in 888 AD, Shaftesbury Abbey was England's second-wealthiest nunnery. Explore the excavated ruins, museum, and award-winning herb garden.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Shaftesbury",
      "addressRegion": "Dorset",
      "addressCountry": "GB"
    },
    "url": "https://www.shaftesburyabbey.org.uk",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "opens": "10:00",
      "closes": "16:00",
      "description": "Open daily from 22 March - 31 October 2025"
    }
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Shaftesbury Abbey Museum & Gardens"
        description="Visit Shaftesbury Abbey, founded by King Alfred the Great in 888 AD. Explore the excavated ruins of England's second-wealthiest nunnery, discover Saxon heritage in the museum, and stroll through the award-winning herb garden. Free entry, open March-October."
        schema={abbeySchema}
        image="https://i.postimg.cc/76r8nm5D/PXL_20230928_120620015.jpg"
        keywords="Shaftesbury Abbey, King Alfred Great, Saxon abbey, Dorset heritage, abbey ruins, medieval nunnery, Æthelgifu, herb garden, abbey museum, Anglo-Saxon England"
        canonical="https://visitshaftesbury.co.uk/shaftesbury-abbey"
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/76r8nm5D/PXL_20230928_120620015.jpg"
            alt="Shaftesbury Abbey ruins and gardens - Founded by King Alfred the Great in 888 AD"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-heritage-green/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <span className="text-heritage-gold uppercase tracking-[0.4em] text-sm font-bold block mb-4">Founded 888 AD</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Shaftesbury Abbey</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-gray-200">
            King Alfred the Great's royal nunnery - 650 years of Saxon and medieval heritage.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-serif font-bold text-heritage-green mb-8">A Royal Foundation</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
              <p>
                In 888 AD, King Alfred the Great founded Shaftesbury Abbey as a Royal Benedictine nunnery, establishing one of the most powerful religious institutions in medieval England. His daughter Æthelgifu became its first abbess, beginning a legacy that would span over 650 years.
              </p>
              <p>
                Alfred granted the abbey 100 hides of land through a royal charter, creating an endowment that would make it the second-wealthiest nunnery in England by the time of the Dissolution - surpassed only by Syon Abbey. A medieval saying captured its extraordinary wealth: "If the abbot of Glastonbury could marry the abbess of Shaftesbury, their heir would hold more land than the king of England."
              </p>
              <p>
                The abbey was likely founded in thanksgiving for Alfred's decisive victory over the Vikings at the Battle of Edington in 878. Positioned on a prominent hilltop within the defenses of a burh (fortified town) that Alfred had established to counter Danish threats, the abbey became both a spiritual center and a symbol of Saxon resilience.
              </p>
              <p>
                After 650 years of continuous operation, the abbey was dissolved under Henry VIII in 1539. Today, visitors can explore the excavated foundations, immerse themselves in the museum's fascinating collections, and wander through the award-winning herb garden that cultivates medicinal plants used since Saxon times.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Crown className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Royal Heritage</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Founded by King Alfred the Great in 888 AD with his daughter as the first abbess. A testament to Saxon royal power and piety.
              </p>
            </div>

            <div className="bg-heritage-green p-8 text-white shadow-lg">
              <Church className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-xl mb-2">Excavated Ruins</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Walk among the foundations of England's second-wealthiest medieval nunnery. Virtual tour available for deeper exploration.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-heritage-gold shadow-sm">
              <Leaf className="text-heritage-gold mb-4 w-8 h-8" aria-hidden="true" />
              <h3 className="font-serif font-bold text-heritage-green text-xl mb-2">Award-Winning Gardens</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Explore medicinal herbs and flora cultivated since Saxon times in our celebrated herb garden. Dogs on leads welcome.
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
                  Shaftesbury Abbey Museum & Gardens<br />
                  Shaftesbury, Dorset<br />
                  Central town location
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Opening Hours</h3>
                <p className="text-gray-600 text-sm">
                  Open daily 10:00am - 4:00pm<br />
                  Season: 22 March - 31 October 2025<br />
                  <strong>Free Entry</strong> (donations welcomed)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Facilities</h3>
                <p className="text-gray-600 text-sm">
                  Museum with Saxon artifacts<br />
                  Refreshments served<br />
                  Dogs on leads welcome in gardens
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <ExternalLink className="w-6 h-6 text-heritage-gold flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-heritage-green mb-2">Official Website</h3>
                <a
                  href="https://www.shaftesburyabbey.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-heritage-gold hover:text-heritage-green transition-colors text-sm underline"
                >
                  shaftesburyabbey.org.uk
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-heritage-cream border border-heritage-gold/20 rounded-sm">
            <h3 className="font-serif font-bold text-heritage-green text-xl mb-4">What to See</h3>
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Excavated Foundations:</strong> Walk through the remains of the Royal Benedictine nunnery and see where generations of nuns lived and worshipped.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Museum Collections:</strong> Discover Saxon and medieval artifacts that bring 650 years of abbey history to life.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Herb Garden:</strong> Stroll through the award-winning garden featuring medicinal plants cultivated since Saxon times.</span>
              </li>
              <li className="flex items-start">
                <span className="text-heritage-gold mr-2">•</span>
                <span><strong>Virtual Tour:</strong> Enhanced digital experience available to explore areas not accessible on foot.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-16 bg-heritage-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-heritage-green mb-8 text-center">King Alfred's Legacy</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              King Alfred the Great (849-899) is the only English monarch to earn the title "the Great." After defeating the Viking Great Heathen Army at Edington in 878, Alfred implemented sweeping reforms to protect Anglo-Saxon England from future invasions.
            </p>
            <p className="mb-4">
              He established a network of fortified burhs (fortified towns) across his kingdom, including Shaftesbury. Within these defensive walls, he founded religious institutions like Shaftesbury Abbey to serve as centers of learning, spirituality, and cultural preservation during the tumultuous Viking Age.
            </p>
            <p>
              The abbey's foundation in 888 AD represented more than religious devotion - it was a strategic assertion of Saxon power and permanence. By placing his daughter Æthelgifu as the first abbess and granting substantial lands, Alfred ensured the abbey would become an enduring symbol of Saxon Christianity and royal authority that would outlast him by over six centuries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mt-24">
        <div className="bg-heritage-green text-white p-12 rounded-sm shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-heritage-gold"></div>
          <h3 className="text-3xl font-serif font-bold mb-6">Step into Saxon England</h3>
          <p className="text-gray-300 font-light text-lg leading-relaxed mb-8">
            Walk where King Alfred's daughter once walked. Experience over 1000 years of English history at this remarkable Saxon abbey site.
          </p>
          <a
            href="https://www.shaftesburyabbey.org.uk"
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

export default ShaftesburyAbbey;
