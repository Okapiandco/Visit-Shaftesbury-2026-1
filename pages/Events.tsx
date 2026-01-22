import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, Filter, Loader2, RefreshCw, CheckCircle, Lock, Image as ImageIcon, X, Upload } from 'lucide-react';
import EventCard from '../components/EventCard';
import { ShaftesburyEvent } from '../types';
import { syncEvents } from '../services/firecrawlService';
import { MOCK_PUBLISHED_EVENTS } from '../constants';
import { supabase, uploadEventImage } from '../supabaseClient';
import SEO from '../components/SEO';

const Events: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [events, setEvents] = useState<ShaftesburyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Attempt to fetch from real Supabase table
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: true });

      if (error) throw error;

      // Fallback to mock data if the table is empty to keep the UI looking nice initially
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(MOCK_PUBLISHED_EVENTS);
      }
    } catch (err) {
      console.error("Failed to fetch live events:", err);
      setEvents(MOCK_PUBLISHED_EVENTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsSyncing(true);
    try {
      const newEvents = await syncEvents();
      // Remove local IDs and mark as pending for database
      const eventsToInsert = newEvents.map(({ id, ...rest }) => ({ ...rest, status: 'pending', user_id: user.id }));
      
      const { error } = await supabase.from('events').insert(eventsToInsert);
      if (error) throw error;
      
      alert(`${newEvents.length} new events extracted via Firecrawl and sent to Admin Queue!`);
    } catch (err: any) {
      console.error(err);
      alert(`Sync failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOpenSubmit = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowSubmitModal(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be under 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Please upload an image for the event.");
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const imageUrl = await uploadEventImage(selectedFile);
      const newEvent = {
        title: formData.get('title') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        location: formData.get('location') as string,
        description: formData.get('description') as string,
        image_url: imageUrl,
        status: 'pending' as const,
        user_id: user?.id
      };
      const { error: dbError } = await supabase.from('events').insert([newEvent]);
      if (dbError) throw dbError;
      setSubmitted(true);
      setTimeout(() => {
        setShowSubmitModal(false);
        setSubmitted(false);
        clearImage();
      }, 2500);
    } catch (error: any) {
      console.error("Submission failed", error);
      setUploadError(error.message || "Failed to submit event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-heritage-cream min-h-screen pb-24">
      <SEO
        title="Events & Festivals in Shaftesbury"
        description="Discover exciting events and festivals in Shaftesbury, Dorset. From historic festivals and open-air theatre to artisanal markets, live music, and community gatherings."
        image="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1200"
        keywords="Shaftesbury events, Dorset festivals, Shaftesbury markets, live music Shaftesbury, community events, Shaftesbury theatre, what's on Shaftesbury"
        canonical="https://visitshaftesbury.co.uk/events"
        type="website"
      />
      
      {/* Header */}
      <header className="bg-heritage-green text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-4">What's On</h1>
            <p className="text-gray-300 max-w-xl text-lg font-light">
              From historic festivals and open-air theatre to artisanal markets and live music. 
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleOpenSubmit}
              className="flex items-center bg-heritage-gold text-heritage-green px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" aria-hidden="true" /> Submit Event
            </button>
            <button 
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center bg-white/10 border border-white/20 text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />}
              Sync Firecrawl
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20" aria-live="polite">
            <Loader2 className="w-10 h-10 text-heritage-gold animate-spin mb-4" />
            <span className="sr-only">Loading events...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        
        {!isLoading && events.length === 0 && (
          <div className="text-center py-20 bg-white border border-heritage-gold/20">
            <Calendar className="w-12 h-12 text-heritage-gold mx-auto mb-4 opacity-30" />
            <p className="text-gray-500 font-serif text-xl italic">No scheduled events found. Check back soon!</p>
          </div>
        )}
      </div>

      {showSubmitModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
        >
          <div className="absolute inset-0 bg-heritage-green/95 backdrop-blur-sm" onClick={() => !isSubmitting && setShowSubmitModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            {submitted ? (
              <div className="text-center py-16" aria-live="polite">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-heritage-green mb-2">Submission Received</h2>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Your event is now in the queue for admin approval.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-gold mb-2">
                      <Lock className="w-3 h-3 mr-1.5" aria-hidden="true" /> Secure Member Portal
                    </div>
                    <h2 id="submit-modal-title" className="text-3xl font-serif font-bold text-heritage-green">Promote Your Event</h2>
                  </div>
                  <button onClick={() => setShowSubmitModal(false)} aria-label="Close modal" className="text-gray-400 hover:text-heritage-green transition-colors">
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {uploadError && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase tracking-widest" aria-live="assertive">
                    {uploadError}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmitEvent}>
                  {/* Image Upload Area */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Event Poster / Photograph</label>
                    {imagePreview ? (
                      <div className="relative aspect-video rounded-sm overflow-hidden border border-gray-100 shadow-inner group">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview of uploaded event image" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button" 
                            onClick={clearImage}
                            aria-label="Remove uploaded image"
                            className="bg-white text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
                          >
                            <X className="w-5 h-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-heritage-gold hover:bg-heritage-cream/30 transition-all group"
                      >
                        <Upload className="w-10 h-10 text-gray-300 group-hover:text-heritage-gold mb-4 transition-colors" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-heritage-green">Click to upload image</span>
                        <span className="text-[10px] text-gray-300 mt-2">Maximum file size: 5MB (JPG, PNG)</span>
                      </button>
                    )}
                    <input 
                      ref={fileInputRef}
                      id="event-image-upload"
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="event-title" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Event Title</label>
                      <input id="event-title" name="title" type="text" className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="e.g. Summer Solstice Fair" required />
                    </div>
                    <div>
                      <label htmlFor="event-date" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Date</label>
                      <input id="event-date" name="date" type="date" className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" required />
                    </div>
                    <div>
                      <label htmlFor="event-time" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Time</label>
                      <input id="event-time" name="time" type="time" className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" required />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="event-location" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Location</label>
                      <input id="event-location" name="location" type="text" className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="e.g. Park Walk Gates" required />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="event-description" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                      <textarea id="event-description" name="description" rows={4} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/20 text-sm focus:ring-1 focus:ring-heritage-gold outline-none resize-none" placeholder="Provide details for visitors..." required></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-6">
                    <p className="text-[10px] text-gray-400 max-w-[200px] font-medium leading-relaxed uppercase tracking-wider">
                      Your submission will be reviewed by our heritage team within 24 hours.
                    </p>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="flex-grow bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors flex items-center justify-center shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                          Processing...
                        </>
                      ) : (
                        'Submit for Approval'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;