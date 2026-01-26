'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Calendar, MapPin, Users, Plus, ArrowLeft, Clock, Check, X, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { UserProfile, ShaftesburyEvent } from '@/types';

export default function AdminPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingEvents, setPendingEvents] = useState<ShaftesburyEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          is_admin: true,
          full_name: session.user.user_metadata?.full_name,
        });
        fetchPendingEvents();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const fetchPendingEvents = async () => {
    setLoadingEvents(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingEvents(data || []);
    } catch (error) {
      console.error('Error fetching pending events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const approveEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'published' })
        .eq('id', eventId);

      if (error) throw error;
      fetchPendingEvents();
    } catch (error) {
      console.error('Error approving event:', error);
    }
  };

  const rejectEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to reject this event? This action cannot be undone.')) {
      return;
    }
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      fetchPendingEvents();
    } catch (error) {
      console.error('Error rejecting event:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#013220] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#013220] mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              Please log in to access the admin dashboard.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-3 px-4 bg-[#013220] text-white font-semibold rounded-lg hover:bg-[#014a2d] transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Pending Events', value: pendingEvents.length.toString(), icon: Clock },
    { label: 'Landmarks', value: '11', icon: MapPin },
    { label: 'Total Events', value: '12', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Header */}
      <div className="bg-[#013220] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Website
          </Link>
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-[#C5A059] mr-3" />
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300">Welcome, {user.full_name || user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#013220] mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-[#F9F7F2] rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-[#C5A059]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Events */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#013220]">Pending Event Submissions</h2>
            <button
              onClick={fetchPendingEvents}
              className="text-sm text-[#013220] hover:text-[#C5A059] transition-colors"
            >
              Refresh
            </button>
          </div>

          {loadingEvents ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-[#013220] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : pendingEvents.length === 0 ? (
            <div className="text-center py-8 bg-[#F9F7F2] rounded-lg">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No pending events</p>
              <p className="text-sm text-gray-500 mt-1">
                New event submissions will appear here for review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#C5A059] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#013220] text-lg">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-[#C5A059]" />
                          {new Date(event.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-[#C5A059]" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-[#C5A059]" />
                          {event.location}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveEvent(event.id)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        title="Approve"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => rejectEvent(event.id)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Reject"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-[#013220] mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/submit-event"
              className="flex items-center justify-center p-4 bg-[#013220] text-white rounded-lg hover:bg-[#014a2d] transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Event
            </Link>
            <Link
              href="/events"
              className="flex items-center justify-center p-4 bg-[#C5A059] text-[#013220] rounded-lg hover:bg-[#d4af6a] transition-colors"
            >
              <Eye className="h-5 w-5 mr-2" />
              View Events
            </Link>
            <Link
              href="/landmarks"
              className="flex items-center justify-center p-4 border-2 border-[#013220] text-[#013220] rounded-lg hover:bg-[#013220] hover:text-white transition-colors"
            >
              <MapPin className="h-5 w-5 mr-2" />
              View Landmarks
            </Link>
            <button className="flex items-center justify-center p-4 border-2 border-[#013220] text-[#013220] rounded-lg hover:bg-[#013220] hover:text-white transition-colors">
              <Users className="h-5 w-5 mr-2" />
              View Users
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#013220] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-[#F9F7F2] rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-[#013220]">New event submitted</p>
                <p className="text-sm text-gray-600">Awaiting review</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-[#F9F7F2] rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-[#013220]">New user registration</p>
                <p className="text-sm text-gray-600">john.smith@example.com</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-[#F9F7F2] rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-[#013220]">Event approved</p>
                <p className="text-sm text-gray-600">Morning Market at the High Street</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
