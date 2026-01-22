import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X, 
  Edit2, 
  Shield, 
  RefreshCw, 
  Lock, 
  Loader2, 
  CheckCircle, 
  Image as ImageIcon, 
  Globe, 
  Upload,
  Trash2,
  Calendar,
  MapPin,
  ExternalLink,
  Clock
} from 'lucide-react';
import { ShaftesburyEvent, Place, Landmark } from '../types';
import { syncEvents } from '../services/firecrawlService';
import { supabase, uploadEventImage } from '../supabaseClient';
import { Link } from 'react-router-dom';

type TabType = 'events' | 'dining' | 'stay' | 'landmarks';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [pendingEvents, setPendingEvents] = useState<ShaftesburyEvent[]>([]);
  const [diningPlaces, setDiningPlaces] = useState<Place[]>([]);
  const [stayPlaces, setStayPlaces] = useState<Place[]>([]);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Edit State
  const [editingEvent, setEditingEvent] = useState<ShaftesburyEvent | null>(null);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [editingLandmark, setEditingLandmark] = useState<Landmark | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // Simple auth check: any logged in user for this demo.
      setIsAdmin(!!user);
      if (user) {
        if (activeTab === 'events') fetchPendingEvents();
        else if (activeTab === 'dining') fetchDiningPlaces();
        else if (activeTab === 'stay') fetchStayPlaces();
        else if (activeTab === 'landmarks') fetchLandmarks();
      }
    };
    checkAuth();
  }, [activeTab]);

  const fetchPendingEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch pending events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDiningPlaces = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('places_dining')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setDiningPlaces(data || []);
    } catch (err) {
      console.error("Failed to fetch dining places:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStayPlaces = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('places_stay')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setStayPlaces(data || []);
    } catch (err) {
      console.error("Failed to fetch stay places:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLandmarks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('landmarks')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setLandmarks(data || []);
    } catch (err) {
      console.error("Failed to fetch landmarks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncRequest = async () => {
    setIsRefreshing(true);
    try {
      const results = await syncEvents();
      const { data: { user } } = await supabase.auth.getUser();
      // Prepare events for insertion (strip ID to let DB generate it)
      const eventsToInsert = results.map(({ id, ...rest }) => ({ 
        ...rest, 
        status: 'pending', 
        user_id: user?.id 
      }));
      
      const { error } = await supabase.from('events').insert(eventsToInsert);
      if (error) throw error;
      
      await fetchPendingEvents();
    } catch (err: any) {
      console.error(err);
      alert("Sync error: " + err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'published' })
        .eq('id', id);
        
      if (error) throw error;
      
      setPendingEvents(pendingEvents.filter(e => e.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(`Approval failed: ${err.message}`);
    }
  };

  const handleReject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event submission?')) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        setPendingEvents(pendingEvents.filter(e => e.id !== id));
      } catch (err: any) {
        console.error(err);
        alert(`Deletion failed: ${err.message}`);
      }
    }
  };

  const handleEditClick = (event: ShaftesburyEvent) => {
    setEditingEvent({ ...event });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEvent) {
      setIsUploading(true);
      try {
        const publicUrl = await uploadEventImage(file);
        setEditingEvent({ ...editingEvent, image_url: publicUrl });
      } catch (error: any) {
        alert("Image upload failed: " + error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('events')
        .update({
          title: editingEvent.title,
          location: editingEvent.location,
          date: editingEvent.date,
          time: editingEvent.time,
          description: editingEvent.description,
          image_url: editingEvent.image_url,
          website_url: editingEvent.website_url
        })
        .eq('id', editingEvent.id);

      if (error) throw error;

      setPendingEvents(prev => prev.map(ev => ev.id === editingEvent.id ? editingEvent : ev));

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditingEvent(null);
      }, 1500);
    } catch (err: any) {
      console.error("Update failed", err);
      alert(`Update failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlace = async (id: string, table: 'places_dining' | 'places_stay') => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      try {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) throw error;
        if (table === 'places_dining') {
          setDiningPlaces(diningPlaces.filter(p => p.id !== id));
        } else {
          setStayPlaces(stayPlaces.filter(p => p.id !== id));
        }
      } catch (err: any) {
        alert(`Deletion failed: ${err.message}`);
      }
    }
  };

  const handleDeleteLandmark = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this landmark?')) {
      try {
        const { error } = await supabase.from('landmarks').delete().eq('id', id);
        if (error) throw error;
        setLandmarks(landmarks.filter(l => l.id !== id));
      } catch (err: any) {
        alert(`Deletion failed: ${err.message}`);
      }
    }
  };

  const handleUpdatePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlace) return;

    setIsSaving(true);
    try {
      const table = activeTab === 'dining' ? 'places_dining' : 'places_stay';
      const { error } = await supabase
        .from(table)
        .update({
          name: editingPlace.name,
          type: editingPlace.type,
          feature: editingPlace.feature,
          image_url: editingPlace.image_url,
          website_url: editingPlace.website_url
        })
        .eq('id', editingPlace.id);

      if (error) throw error;

      if (activeTab === 'dining') {
        setDiningPlaces(prev => prev.map(p => p.id === editingPlace.id ? editingPlace : p));
      } else {
        setStayPlaces(prev => prev.map(p => p.id === editingPlace.id ? editingPlace : p));
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditingPlace(null);
      }, 1500);
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateLandmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLandmark) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('landmarks')
        .update({
          name: editingLandmark.name,
          lat: editingLandmark.lat,
          lng: editingLandmark.lng,
          description: editingLandmark.description,
          type: editingLandmark.type,
          distance: editingLandmark.distance,
          image_url: editingLandmark.image_url,
          keyInfo: editingLandmark.keyInfo
        })
        .eq('id', editingLandmark.id);

      if (error) throw error;

      setLandmarks(prev => prev.map(l => l.id === editingLandmark.id ? editingLandmark : l));

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditingLandmark(null);
      }, 1500);
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-heritage-cream flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-sm shadow-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-heritage-green mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-8">Please log in to access the administrator dashboard.</p>
          <Link to="/login" className="inline-block bg-heritage-green text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-heritage-cream min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-heritage-gold uppercase tracking-widest text-xs font-bold mb-2">
              <Shield className="w-4 h-4" />
              <span>System Administrator</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-heritage-green">Content Management</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (activeTab === 'events') fetchPendingEvents();
                else if (activeTab === 'dining') fetchDiningPlaces();
                else if (activeTab === 'stay') fetchStayPlaces();
                else if (activeTab === 'landmarks') fetchLandmarks();
              }}
              disabled={isLoading}
              className="flex items-center bg-white border border-heritage-green text-heritage-green px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-heritage-cream transition-all shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {activeTab === 'events' && (
              <button
                onClick={handleSyncRequest}
                disabled={isRefreshing}
                className="flex items-center bg-heritage-green text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-all shadow-lg"
              >
                {isRefreshing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Fetch Remote
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === 'events'
                ? 'bg-heritage-green text-white'
                : 'bg-white text-heritage-green hover:bg-heritage-cream'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('dining')}
            className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === 'dining'
                ? 'bg-heritage-green text-white'
                : 'bg-white text-heritage-green hover:bg-heritage-cream'
            }`}
          >
            Dining Places
          </button>
          <button
            onClick={() => setActiveTab('stay')}
            className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === 'stay'
                ? 'bg-heritage-green text-white'
                : 'bg-white text-heritage-green hover:bg-heritage-cream'
            }`}
          >
            Stay Places
          </button>
          <button
            onClick={() => setActiveTab('landmarks')}
            className={`px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all ${
              activeTab === 'landmarks'
                ? 'bg-heritage-green text-white'
                : 'bg-white text-heritage-green hover:bg-heritage-cream'
            }`}
          >
            Landmarks
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-heritage-green text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                  <tr>
                    <th className="px-6 py-5">Event</th>
                    <th className="px-6 py-5">Schedule</th>
                    <th className="px-6 py-5">Venue</th>
                    <th className="px-6 py-5 text-right">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center">
                        <Loader2 className="w-10 h-10 text-heritage-gold animate-spin mx-auto" />
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-4">Loading database...</p>
                      </td>
                    </tr>
                  ) : pendingEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center text-gray-400 italic font-serif text-lg">
                        Queue is currently empty.
                      </td>
                    </tr>
                  ) : (
                    pendingEvents.map(event => (
                      <tr key={event.id} className="hover:bg-heritage-cream/30 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-5">
                            <img src={event.image_url} className="w-20 h-14 object-cover rounded-sm border border-gray-100" alt="" />
                            <div>
                              <p className="font-bold text-heritage-green group-hover:text-heritage-gold transition-colors">{event.title}</p>
                              <p className="text-[11px] text-gray-500 line-clamp-1 font-light">{event.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-600">
                          <div className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-heritage-gold" />{event.date}</div>
                          <div className="flex items-center mt-1 text-xs text-gray-400"><Clock className="w-3.5 h-3.5 mr-2" />{event.time}</div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-600">
                          <div className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 text-heritage-gold" />{event.location}</div>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => handleApprove(event.id)} className="p-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-full transition-all" title="Publish">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleEditClick(event)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleReject(event.id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dining Places Tab */}
        {activeTab === 'dining' && (
          <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-heritage-green text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                  <tr>
                    <th className="px-6 py-5">Place</th>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Feature</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center">
                        <Loader2 className="w-10 h-10 text-heritage-gold animate-spin mx-auto" />
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-4">Loading database...</p>
                      </td>
                    </tr>
                  ) : diningPlaces.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center text-gray-400 italic font-serif text-lg">
                        No dining places found.
                      </td>
                    </tr>
                  ) : (
                    diningPlaces.map(place => (
                      <tr key={place.id} className="hover:bg-heritage-cream/30 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-5">
                            <img src={place.image_url} className="w-20 h-14 object-cover rounded-sm border border-gray-100" alt="" />
                            <div>
                              <p className="font-bold text-heritage-green group-hover:text-heritage-gold transition-colors">{place.name}</p>
                              <a href={place.website_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 hover:text-heritage-gold flex items-center">
                                <ExternalLink className="w-3 h-3 mr-1" /> Website
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-600">{place.type}</td>
                        <td className="px-6 py-6 text-sm text-gray-600 italic">{place.feature}</td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => setEditingPlace(place)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeletePlace(place.id, 'places_dining')} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stay Places Tab */}
        {activeTab === 'stay' && (
          <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-heritage-green text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                  <tr>
                    <th className="px-6 py-5">Place</th>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Feature</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center">
                        <Loader2 className="w-10 h-10 text-heritage-gold animate-spin mx-auto" />
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-4">Loading database...</p>
                      </td>
                    </tr>
                  ) : stayPlaces.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center text-gray-400 italic font-serif text-lg">
                        No stay places found.
                      </td>
                    </tr>
                  ) : (
                    stayPlaces.map(place => (
                      <tr key={place.id} className="hover:bg-heritage-cream/30 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-5">
                            <img src={place.image_url} className="w-20 h-14 object-cover rounded-sm border border-gray-100" alt="" />
                            <div>
                              <p className="font-bold text-heritage-green group-hover:text-heritage-gold transition-colors">{place.name}</p>
                              <a href={place.website_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-500 hover:text-heritage-gold flex items-center">
                                <ExternalLink className="w-3 h-3 mr-1" /> Website
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-600">{place.type}</td>
                        <td className="px-6 py-6 text-sm text-gray-600 italic">{place.feature}</td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => setEditingPlace(place)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeletePlace(place.id, 'places_stay')} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Landmarks Tab */}
        {activeTab === 'landmarks' && (
          <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-heritage-green text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                  <tr>
                    <th className="px-6 py-5">Landmark</th>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Distance</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center">
                        <Loader2 className="w-10 h-10 text-heritage-gold animate-spin mx-auto" />
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-4">Loading database...</p>
                      </td>
                    </tr>
                  ) : landmarks.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-32 text-center text-gray-400 italic font-serif text-lg">
                        No landmarks found.
                      </td>
                    </tr>
                  ) : (
                    landmarks.map(landmark => (
                      <tr key={landmark.id} className="hover:bg-heritage-cream/30 transition-colors group">
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-5">
                            {landmark.image_url && <img src={landmark.image_url} className="w-20 h-14 object-cover rounded-sm border border-gray-100" alt="" />}
                            <div>
                              <p className="font-bold text-heritage-green group-hover:text-heritage-gold transition-colors">{landmark.name}</p>
                              <p className="text-[11px] text-gray-500 line-clamp-1 font-light">{landmark.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-600">{landmark.type}</td>
                        <td className="px-6 py-6 text-sm text-gray-600">{landmark.distance}</td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button onClick={() => setEditingLandmark(landmark)} className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteLandmark(landmark.id)} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="fixed inset-0 bg-heritage-green/95 backdrop-blur-sm" onClick={() => !isSaving && setEditingEvent(null)}></div>
          <div className="relative bg-white w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
            {saveSuccess ? (
              <div className="text-center py-20">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-serif font-bold text-heritage-green">Record Saved</h2>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-10">
                  <h2 className="text-3xl font-serif font-bold text-heritage-green">Edit Record</h2>
                  <button onClick={() => setEditingEvent(null)} className="text-gray-400 hover:text-heritage-green transition-colors"><X className="w-7 h-7" /></button>
                </div>

                <form className="space-y-8" onSubmit={handleUpdateSubmit}>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Image Management</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="aspect-video bg-heritage-cream rounded-sm overflow-hidden border border-gray-100 flex items-center justify-center relative">
                        {editingEvent.image_url ? <img src={editingEvent.image_url} className="w-full h-full object-cover" /> : <ImageIcon className="w-10 h-10 text-gray-200" />}
                        {isUploading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-heritage-gold" /></div>}
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <button type="button" onClick={() => editFileInputRef.current?.click()} className="w-full bg-heritage-cream text-heritage-green py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-heritage-gold hover:text-white transition-all border border-heritage-gold/20 flex items-center justify-center">
                          <Upload className="w-3.5 h-3.5 mr-2" /> Upload New File
                        </button>
                        <input ref={editFileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <input type="text" value={editingEvent.image_url} onChange={(e) => setEditingEvent({...editingEvent, image_url: e.target.value})} className="w-full px-4 py-2.5 text-xs border border-gray-100 bg-heritage-cream/10 focus:ring-1 focus:ring-heritage-gold outline-none italic text-gray-500" placeholder="Or paste direct URL..." />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Event Title</label>
                      <input type="text" required value={editingEvent.title} onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Venue</label>
                      <input type="text" required value={editingEvent.location} onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Date</label>
                      <input type="date" required value={editingEvent.date} onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Time</label>
                      <input type="time" required value={editingEvent.time} onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Website</label>
                      <input type="url" value={editingEvent.website_url || ''} onChange={(e) => setEditingEvent({...editingEvent, website_url: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                      <textarea rows={4} required value={editingEvent.description} onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none resize-none"></textarea>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex gap-4">
                    <button type="submit" disabled={isSaving || isUploading} className="flex-grow bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-all flex items-center justify-center shadow-xl disabled:opacity-50">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />} Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingEvent(null)} className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-heritage-green">Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Edit Place Modal */}
      {editingPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="fixed inset-0 bg-heritage-green/95 backdrop-blur-sm" onClick={() => !isSaving && setEditingPlace(null)}></div>
          <div className="relative bg-white w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
            {saveSuccess ? (
              <div className="text-center py-20">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-serif font-bold text-heritage-green">Record Saved</h2>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-10">
                  <h2 className="text-3xl font-serif font-bold text-heritage-green">Edit Place</h2>
                  <button onClick={() => setEditingPlace(null)} className="text-gray-400 hover:text-heritage-green transition-colors"><X className="w-7 h-7" /></button>
                </div>

                <form className="space-y-8" onSubmit={handleUpdatePlace}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                      <input type="text" required value={editingPlace.name} onChange={(e) => setEditingPlace({...editingPlace, name: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Type</label>
                      <input type="text" required value={editingPlace.type} onChange={(e) => setEditingPlace({...editingPlace, type: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Website URL</label>
                      <input type="url" required value={editingPlace.website_url} onChange={(e) => setEditingPlace({...editingPlace, website_url: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Feature Description</label>
                      <input type="text" required value={editingPlace.feature} onChange={(e) => setEditingPlace({...editingPlace, feature: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                      <input type="url" required value={editingPlace.image_url} onChange={(e) => setEditingPlace({...editingPlace, image_url: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="https://..." />
                      {editingPlace.image_url && (
                        <img src={editingPlace.image_url} className="mt-4 w-full h-40 object-cover rounded-sm border border-gray-100" alt="Preview" />
                      )}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex gap-4">
                    <button type="submit" disabled={isSaving} className="flex-grow bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-all flex items-center justify-center shadow-xl disabled:opacity-50">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />} Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingPlace(null)} className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-heritage-green">Cancel</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Edit Landmark Modal */}
      {editingLandmark && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-10">
          <div className="fixed inset-0 bg-heritage-green/95 backdrop-blur-sm" onClick={() => !isSaving && setEditingLandmark(null)}></div>
          <div className="relative bg-white w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
            {saveSuccess ? (
              <div className="text-center py-20">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-serif font-bold text-heritage-green">Record Saved</h2>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-10">
                  <h2 className="text-3xl font-serif font-bold text-heritage-green">Edit Landmark</h2>
                  <button onClick={() => setEditingLandmark(null)} className="text-gray-400 hover:text-heritage-green transition-colors"><X className="w-7 h-7" /></button>
                </div>

                <form className="space-y-8" onSubmit={handleUpdateLandmark}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                      <input type="text" required value={editingLandmark.name} onChange={(e) => setEditingLandmark({...editingLandmark, name: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Type</label>
                      <input type="text" value={editingLandmark.type || ''} onChange={(e) => setEditingLandmark({...editingLandmark, type: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Distance</label>
                      <input type="text" value={editingLandmark.distance || ''} onChange={(e) => setEditingLandmark({...editingLandmark, distance: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Latitude</label>
                      <input type="number" step="any" required value={editingLandmark.lat} onChange={(e) => setEditingLandmark({...editingLandmark, lat: parseFloat(e.target.value)})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Longitude</label>
                      <input type="number" step="any" required value={editingLandmark.lng} onChange={(e) => setEditingLandmark({...editingLandmark, lng: parseFloat(e.target.value)})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                      <textarea rows={3} required value={editingLandmark.description} onChange={(e) => setEditingLandmark({...editingLandmark, description: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Key Info (optional)</label>
                      <input type="text" value={editingLandmark.keyInfo || ''} onChange={(e) => setEditingLandmark({...editingLandmark, keyInfo: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL (optional)</label>
                      <input type="url" value={editingLandmark.image_url || ''} onChange={(e) => setEditingLandmark({...editingLandmark, image_url: e.target.value})} className="w-full px-4 py-3 border border-gray-100 bg-heritage-cream/10 text-sm focus:ring-1 focus:ring-heritage-gold outline-none" placeholder="https://..." />
                      {editingLandmark.image_url && (
                        <img src={editingLandmark.image_url} className="mt-4 w-full h-40 object-cover rounded-sm border border-gray-100" alt="Preview" />
                      )}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex gap-4">
                    <button type="submit" disabled={isSaving} className="flex-grow bg-heritage-green text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-heritage-gold transition-all flex items-center justify-center shadow-xl disabled:opacity-50">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />} Save Changes
                    </button>
                    <button type="button" onClick={() => setEditingLandmark(null)} className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-heritage-green">Cancel</button>
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

export default AdminDashboard;