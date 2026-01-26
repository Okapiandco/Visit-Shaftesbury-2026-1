'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, FileText, Image as ImageIcon, Link as LinkIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SubmitEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image_url: '',
    website_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: submitError } = await supabase
        .from('events')
        .insert([
          {
            ...formData,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

      if (submitError) throw submitError;

      setSuccess(true);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to submit event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#013220] mb-2">Event Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your event. Our team will review it and publish it once approved.
            </p>
            <div className="space-y-3">
              <Link
                href="/events"
                className="block w-full py-3 px-4 bg-[#013220] text-white font-semibold rounded-lg hover:bg-[#014a2d] transition-colors text-center"
              >
                View Events
              </Link>
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    title: '',
                    date: '',
                    time: '',
                    location: '',
                    description: '',
                    image_url: '',
                    website_url: '',
                  });
                }}
                className="block w-full py-3 px-4 border-2 border-[#013220] text-[#013220] font-semibold rounded-lg hover:bg-[#013220] hover:text-white transition-colors text-center"
              >
                Submit Another Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Header */}
      <section className="bg-[#013220] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
          <div className="flex items-center mb-2">
            <Calendar className="h-8 w-8 text-[#C5A059] mr-3" />
            <h1 className="text-3xl font-bold">Submit an Event</h1>
          </div>
          <p className="text-gray-300">
            Share your event with the Shaftesbury community. All submissions are reviewed before publishing.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#013220] mb-2">
                  Event Title *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Summer Festival in the Park"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#013220] mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-[#013220] mb-2">
                    Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="time"
                      name="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#013220] mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Town Hall, High Street"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#013220] mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-[#013220] mb-2">
                  Image URL <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Provide a URL to an image for your event (recommended size: 1200x630px)
                </p>
              </div>

              {/* Website URL */}
              <div>
                <label htmlFor="website_url" className="block text-sm font-medium text-[#013220] mb-2">
                  Website URL <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="website_url"
                    name="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C5A059] focus:border-transparent outline-none transition-all"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-[#C5A059] text-[#013220] font-semibold rounded-lg hover:bg-[#d4af6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? 'Submitting...' : 'Submit Event for Review'}
                </button>
                <p className="mt-3 text-center text-sm text-gray-500">
                  By submitting, you agree that your event information may be published on our website.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
