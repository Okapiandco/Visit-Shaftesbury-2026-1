'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MapPin, ArrowLeft, Clock, Info } from 'lucide-react';
import { LANDMARKS } from '@/constants';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function LandmarkDetailPage() {
  const params = useParams();
  const landmark = LANDMARKS.find((l) => l.id === params.id);

  if (!landmark) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#013220] mb-4">Landmark Not Found</h1>
          <Link
            href="/landmarks"
            className="inline-flex items-center text-[#C5A059] hover:text-[#013220] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Landmarks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={landmark.image_url || '/placeholder.jpg'}
          alt={landmark.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/landmarks"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Landmarks
            </Link>
            <div className="flex items-center gap-3 mb-2">
              {landmark.type && (
                <span className="bg-[#C5A059] text-[#013220] px-3 py-1 rounded-full text-sm font-medium">
                  {landmark.type}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{landmark.name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-[#013220] mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {landmark.description}
                </p>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl p-8 shadow-md mt-8">
                <h2 className="text-2xl font-bold text-[#013220] mb-4">Location</h2>
                <Map
                  center={[landmark.lat, landmark.lng]}
                  zoom={15}
                  markers={[
                    {
                      lat: landmark.lat,
                      lng: landmark.lng,
                      title: landmark.name,
                      description: landmark.description,
                    },
                  ]}
                  className="h-[400px] rounded-lg"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-lg font-semibold text-[#013220] mb-4">
                  Visitor Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#013220]">Distance</div>
                      <div className="text-gray-600">{landmark.distance}</div>
                    </div>
                  </div>
                  {landmark.keyInfo && (
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-[#013220]">Key Info</div>
                        <div className="text-gray-600">{landmark.keyInfo}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-[#C5A059] mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-[#013220]">Coordinates</div>
                      <div className="text-gray-600 text-sm">
                        {landmark.lat.toFixed(4)}, {landmark.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-[#013220] mb-3">Getting There</h4>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${landmark.lat},${landmark.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#013220] text-white font-semibold rounded-lg hover:bg-[#014a2d] transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
