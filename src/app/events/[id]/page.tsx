'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Calendar, Clock, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { MOCK_EVENTS } from '@/constants';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function EventDetailPage() {
  const params = useParams();
  const event = MOCK_EVENTS.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#013220] mb-4">Event Not Found</h1>
          <Link
            href="/events"
            className="inline-flex items-center text-[#C5A059] hover:text-[#013220] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-[#013220] mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              {/* Map */}
              {event.lat && event.lng && (
                <div className="bg-white rounded-xl p-8 shadow-md mt-8">
                  <h2 className="text-2xl font-bold text-[#013220] mb-4">Location</h2>
                  <Map
                    center={[event.lat, event.lng]}
                    zoom={15}
                    markers={[
                      {
                        lat: event.lat,
                        lng: event.lng,
                        title: event.location,
                        description: event.title,
                      },
                    ]}
                    className="h-[300px] rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-lg font-semibold text-[#013220] mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#013220]">Date</div>
                      <div className="text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#013220]">Time</div>
                      <div className="text-gray-600">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#013220]">Location</div>
                      <div className="text-gray-600">{event.location}</div>
                    </div>
                  </div>
                </div>

                {event.website_url && (
                  <a
                    href={event.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-[#C5A059] text-[#013220] font-semibold rounded-lg hover:bg-[#d4af6a] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
