import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Globe, 
  Ticket, 
  ExternalLink, 
  Check, 
  ChevronRight,
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon,
  Map as MapIcon,
  Loader2
} from 'lucide-react';
import { ShaftesburyEvent } from '../types';
import { MOCK_PUBLISHED_EVENTS } from '../constants';
import { supabase } from '../supabaseClient';
import SEO from '../components/SEO';
import EventMap from '../components/EventMap';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<ShaftesburyEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [otherEvents, setOtherEvents] = useState<ShaftesburyEvent[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        // Try live Supabase first
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (data) {
          setEvent(data);
        } else {
          // Try mock fallback
          const foundMock = MOCK_PUBLISHED_EVENTS.find(e => e.id === id);
          if (foundMock) setEvent(foundMock);
        }

        // Load some recommendations
        const { data: recommendations } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')
          .neq('id', id)
          .limit(4);
        
        if (recommendations && recommendations.length > 0) {
          setOtherEvents(recommendations);
        } else {
          setOtherEvents(MOCK_PUBLISHED_EVENTS.filter(e => e.id !== id).slice(0, 4));
        }
      } catch (err) {
        console.error("Fetch event error:", err);
        const foundMock = MOCK_PUBLISHED_EVENTS.find(e => e.id === id);
        if (foundMock) setEvent(foundMock);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  const eventUrl = window.location.href;
  const shareText = event ? `Check out this event in Shaftesbury: ${event.title}` : '';

  const handleNativeShare = async () => {
    if (!event) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Visit Shaftesbury: ${event.title}`,
          text: shareText,
          url: eventUrl,
        });
      } catch (err) {
        console.debug('User cancelled or share failed', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
        <Loader2 className="w-10 h-10 text-heritage-gold animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream px-4" role="alert" aria-live="polite">
        <SEO title="Event Not Found" description="The requested event could not be found." />
        <div className="text-center">
          <h2 className="text-3xl font-serif text-heritage-green mb-4">Event Not Found</h2>
          <p className="text-gray-700 mb-8">The event you are looking for might have passed or been removed.</p>
          <Link to="/events" className="bg-heritage-green text-white px-8 py-3 font-bold uppercase tracking-widest text-xs focus:ring-2 focus:ring-heritage-gold outline-none">
            Back to All Events
          </Link>
        </div>
      </div>
    );
  }

  const detailedEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.date,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shaftesbury",
        "addressRegion": "Dorset",
        "postalCode": "SP7",
        "addressCountry": "GB"
      }
    },
    "image": [event.image_url],
    "description": event.description,
    "organizer": {
      "@type": "Organization",
      "name": "Visit Shaftesbury",
      "url": "https://visitshaftesbury.co.uk"
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ', Shaftesbury, Dorset')}`;

  return (
    <article className="bg-white min-h-screen pb-24">
      <SEO 
        title={event.title}
        description={`Details for ${event.title} in Shaftesbury, Dorset. Find out about location, timing, and ticket information.`}
        schema={detailedEventSchema}
      />
      
      {/* Immersive Header */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src={event.image_url} 
          alt="" 
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" aria-hidden="true"></div>
        
        <div className="absolute top-8 left-4 md:left-8 z-20">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Return to previous page"
            className="flex items-center text-white bg-heritage-green hover:bg-heritage-gold hover:text-heritage-green transition-all px-5 py-2.5 rounded-sm shadow-xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-white outline-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back
          </button>
        </div>

        <div className="absolute bottom-12 left-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="bg-heritage-gold inline-block px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-heritage-green mb-4">
              <span className="sr-only">Date of event: </span>
              {new Date(event.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 shadow-xl rounded-sm">
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
              <div className="flex space-x-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Date</span>
                  <div className="flex items-center text-heritage-green font-semibold">
                    <Calendar className="w-4 h-4 mr-2 text-heritage-gold" aria-hidden="true" />
                    <span className="sr-only">This event occurs on </span>
                    {event.date}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Time</span>
                  <div className="flex items-center text-heritage-green font-semibold">
                    <Clock className="w-4 h-4 mr-2 text-heritage-gold" aria-hidden="true" />
                    <span className="sr-only">Starting at </span>
                    {event.time}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleNativeShare}
                aria-label={copied ? "Event link copied to clipboard" : "Share this event via system dialog"}
                aria-live="polite"
                className={`flex items-center transition-colors text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-heritage-gold outline-none px-3 py-2 rounded-sm border border-transparent hover:border-heritage-gold ${copied ? 'text-green-700' : 'text-gray-600 hover:text-heritage-gold'}`}
              >
                {copied ? <Check className="w-4 h-4 mr-2" aria-hidden="true" /> : <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />}
                {copied ? 'Link Copied' : 'Share'}
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 font-light leading-relaxed space-y-6">
              <p className="text-xl text-heritage-green font-medium font-serif leading-relaxed italic border-l-4 border-heritage-gold pl-6 py-2">
                Join us for this special occasion in the heart of Shaftesbury.
              </p>
              <p>{event.description}</p>
              
              {event.website_url && (
                <section className="bg-heritage-cream/50 border border-heritage-gold/20 p-6 rounded-sm mt-8" aria-labelledby="resources-heading">
                  <h2 id="resources-heading" className="text-lg font-serif font-bold text-heritage-green mb-2 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-heritage-gold" aria-hidden="true" /> 
                    Official Event Resources
                  </h2>
                  <p className="text-sm text-gray-700 mb-4 font-normal">
                    For further information, full schedules, and organizers' updates, please visit the official event page:
                  </p>
                  <a 
                    href={event.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`Visit official website for ${event.title} (opens in a new tab)`}
                    className="text-heritage-green hover:text-heritage-gold transition-colors font-bold break-all flex items-center underline decoration-heritage-green/40 hover:decoration-heritage-gold"
                  >
                    {event.website_url} <ExternalLink className="w-3.5 h-3.5 ml-2" aria-hidden="true" />
                  </a>
                </section>
              )}

              <p className="mt-8">
                Shaftesbury's events are known for their community spirit and historic backdrop. Whether it's the 
                winding cobbles of Gold Hill or the majestic ruins of the Abbey, our town provides an 
                unforgettable setting for every gathering.
              </p>
            </div>

            {/* Event Location & Map Section */}
            <section className="mt-12 pt-12 border-t border-gray-100" aria-labelledby="location-heading">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 id="location-heading" className="font-serif font-bold text-heritage-green text-2xl mb-4">Venue Details</h2>
                  <div className="flex items-start text-gray-700 bg-heritage-cream p-5 rounded-sm">
                    <MapPin className="w-5 h-5 mr-3 text-heritage-gold shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-heritage-green">{event.location}</p>
                      <p className="text-sm mt-1">Shaftesbury, Dorset, SP7</p>
                      <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-heritage-green mt-4 hover:text-heritage-gold transition-colors focus:ring-1 focus:ring-heritage-gold outline-none"
                      >
                        Open in Google Maps <span className="sr-only">(opens in a new window)</span> <ExternalLink className="w-3.5 h-3.5 ml-2" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="bg-heritage-green p-6 text-white rounded-sm shadow-lg">
                    <h3 className="font-serif font-bold text-white text-lg mb-2">Need Assistance?</h3>
                    <p className="text-sm text-gray-200 mb-4">Contact the Tourist Information Centre for more details about this event.</p>
                    <a href="tel:+441747853514" aria-label="Call Tourist Information on 01747 853514" className="text-heritage-gold font-bold text-base hover:text-white transition-colors focus:ring-1 focus:ring-heritage-gold outline-none">01747 853514</a>
                  </div>
                </div>
              </div>

              {/* Interactive Map Component */}
              {event.lat && event.lng && (
                <div className="space-y-4">
                  <div className="flex items-center text-heritage-green">
                    <MapIcon className="w-4 h-4 mr-2 text-heritage-gold" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-widest">Interactive Location Map</span>
                  </div>
                  <div className="h-[400px] border border-gray-100 rounded-sm overflow-hidden shadow-inner">
                    <EventMap lat={event.lat} lng={event.lng} locationName={event.location} />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8" aria-label="Event information summary">
            <div className="bg-heritage-green p-8 text-white rounded-sm shadow-xl lg:sticky lg:top-32">
              <h2 className="text-2xl font-serif font-bold mb-6">Event Snapshot</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-heritage-gold transition-colors">
                    <Ticket className="w-5 h-5 text-heritage-gold group-hover:text-heritage-green" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-300">Admission</p>
                    <p className="text-sm font-semibold">Free Entry / Pay at Gate</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-heritage-gold transition-colors">
                    <Globe className="w-5 h-5 text-heritage-gold group-hover:text-heritage-green" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-300">Organizer</p>
                    <p className="text-sm font-semibold truncate max-w-[140px]">
                      {event.website_url ? new URL(event.website_url).hostname : 'Local Partner'}
                    </p>
                  </div>
                </div>
              </div>

              {event.website_url && (
                <a 
                  href={event.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit official organizer website for ${event.title} (opens in a new tab)`}
                  className="w-full bg-heritage-gold text-heritage-green py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all mb-4 flex items-center justify-center focus:ring-2 focus:ring-white outline-none"
                >
                  Visit Official Website <ExternalLink className="w-3.5 h-3.5 ml-2" aria-hidden="true" />
                </a>
              )}

              {/* Social Share Icons */}
              <div className="pt-6 border-t border-white/10 mt-6" aria-label="Share on social media">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-300 mb-4 text-center">Spread the word</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share this event on Facebook"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold hover:text-heritage-green transition-all focus:ring-2 focus:ring-heritage-gold outline-none"
                  >
                    <Facebook className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share this event on X/Twitter"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold hover:text-heritage-green transition-all focus:ring-2 focus:ring-heritage-gold outline-none"
                  >
                    <Twitter className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + eventUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share this event on WhatsApp"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-heritage-gold hover:text-heritage-green transition-all focus:ring-2 focus:ring-heritage-gold outline-none"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    aria-label={copied ? "Link successfully copied" : "Copy event link to your clipboard"}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all focus:ring-2 focus:ring-heritage-gold outline-none ${copied ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-heritage-gold hover:text-heritage-green'}`}
                  >
                    {copied ? <Check className="w-5 h-5" aria-hidden="true" /> : <LinkIcon className="w-5 h-5" aria-hidden="true" />}
                  </button>
                </div>
              </div>
              
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-8">
                Verified: Visit Shaftesbury Approved
              </p>
            </div>

            <section className="bg-heritage-cream p-8 rounded-sm border border-heritage-gold/20" aria-labelledby="stay-longer-heading">
              <h3 id="stay-longer-heading" className="font-serif font-bold text-heritage-green text-xl mb-4">Extend Your Visit</h3>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed font-normal">
                Why not make a weekend of it? Shaftesbury is surrounded by the stunning Blackmore Vale and home to the world-famous Gold Hill.
              </p>
              <Link 
                to="/plan" 
                className="text-xs font-bold uppercase tracking-widest text-heritage-green border-b-2 border-heritage-gold pb-1 hover:text-heritage-gold transition-colors focus:ring-2 focus:ring-heritage-gold outline-none"
              >
                Plan Your Full Day
              </Link>
            </section>
          </aside>
        </div>

        {/* Discovery Carousel Section */}
        <section className="mt-24 border-t border-gray-100 pt-20" aria-labelledby="related-events-heading">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-heritage-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2">More To Experience</span>
              <h2 id="related-events-heading" className="text-3xl md:text-4xl font-serif font-bold text-heritage-green">Discover More Events</h2>
            </div>
            <Link 
              to="/events" 
              className="text-heritage-green font-bold uppercase tracking-widest text-xs hover:text-heritage-gold flex items-center focus:ring-2 focus:ring-heritage-gold outline-none px-2 py-1"
            >
              Explore All <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative">
            <div 
              className="flex overflow-x-auto pb-8 gap-6 snap-x no-scrollbar scroll-smooth"
              role="list"
              aria-label="Browse more events"
              aria-roledescription="carousel"
            >
              {otherEvents.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/events/${item.id}`}
                  role="listitem"
                  aria-label={`View details for ${item.title}`}
                  className="min-w-[280px] md:min-w-[350px] group bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 snap-start focus:ring-2 focus:ring-heritage-gold outline-none"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt="" 
                      aria-hidden="true"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-heritage-green text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md">
                      <span className="sr-only">Occurs on: </span>
                      {new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg text-heritage-green mb-2 group-hover:text-heritage-gold transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-heritage-gold" aria-hidden="true" />
                      <span className="sr-only">Location: </span>
                      {item.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default EventDetail;