import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, UtensilsCrossed, Bed, Map, History, FileText, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const Sitemap: React.FC = () => {
  const sitePages = [
    {
      category: 'Main Pages',
      icon: Home,
      pages: [
        { name: 'Home', path: '/', description: 'Welcome to Shaftesbury - The Hilltop Saxon Town' },
        { name: 'Events & Festivals', path: '/events', description: 'Discover upcoming events and festivals' },
        { name: 'Eat & Drink', path: '/eat-drink', description: 'Restaurants, pubs, and cafes' },
        { name: 'Places to Stay', path: '/stay', description: 'Hotels, B&Bs, and accommodation' },
        { name: 'Plan Your Visit', path: '/plan', description: 'Travel information and map' },
        { name: 'Our Saxon History', path: '/history', description: 'Explore 1000 years of history' },
      ]
    },
    {
      category: 'Visitor Information',
      icon: MapPin,
      pages: [
        { name: 'Submit an Event', path: '/submit-event', description: 'Share your event with the community' },
      ]
    }
  ];

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Sitemap"
        description="Complete sitemap of Visit Shaftesbury website. Find all pages including events, restaurants, accommodation, history, and visitor information."
        keywords="Shaftesbury sitemap, website navigation, Shaftesbury pages, site directory"
        canonical="https://visitshaftesbury.co.uk/sitemap"
      />

      {/* Header */}
      <div className="bg-heritage-green text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="w-16 h-16 mx-auto mb-6 text-heritage-gold" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Site Map</h1>
          <p className="text-gray-300 text-lg font-light">
            Navigate our complete collection of pages and resources
          </p>
        </div>
      </div>

      {/* Sitemap Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {sitePages.map((section) => {
            const IconComponent = section.icon;
            return (
              <div key={section.category} className="bg-white rounded-sm shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-6 pb-6 border-b border-heritage-gold/20">
                  <div className="bg-heritage-green p-3 rounded-full mr-4">
                    <IconComponent className="w-6 h-6 text-heritage-gold" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-heritage-green">{section.category}</h2>
                </div>

                <nav aria-label={section.category}>
                  <ul className="space-y-4">
                    {section.pages.map((page) => (
                      <li key={page.path}>
                        <Link
                          to={page.path}
                          className="group block p-4 rounded-sm hover:bg-heritage-cream/50 transition-all duration-300 border border-transparent hover:border-heritage-gold/30"
                        >
                          <div className="flex items-start">
                            <div className="flex-grow">
                              <h3 className="font-bold text-heritage-green group-hover:text-heritage-gold transition-colors mb-1">
                                {page.name}
                              </h3>
                              <p className="text-sm text-gray-600 font-light">
                                {page.description}
                              </p>
                            </div>
                            <div className="ml-4 text-heritage-gold opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-sm shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-heritage-green mb-6">Additional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-heritage-cream/30 rounded-sm">
              <h3 className="font-bold text-heritage-green mb-3 flex items-center">
                <Map className="w-5 h-5 mr-2 text-heritage-gold" aria-hidden="true" />
                Interactive Map
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Explore Shaftesbury's landmarks, restaurants, and accommodations on our interactive map.
              </p>
              <Link to="/plan" className="text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold">
                View Map →
              </Link>
            </div>

            <div className="p-6 bg-heritage-cream/30 rounded-sm">
              <h3 className="font-bold text-heritage-green mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-heritage-gold" aria-hidden="true" />
                Events Calendar
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Stay up to date with festivals, markets, and community events happening in Shaftesbury.
              </p>
              <Link to="/events" className="text-xs font-bold uppercase tracking-widest text-heritage-green hover:text-heritage-gold">
                Browse Events →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Can't find what you're looking for?{' '}
            <Link to="/" className="text-heritage-green hover:text-heritage-gold font-medium underline">
              Return to the homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
