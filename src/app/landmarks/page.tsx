import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { LANDMARKS } from '@/constants';

export const metadata: Metadata = {
  title: 'Landmarks & Attractions',
  description: 'Explore the historic landmarks and natural attractions of Shaftesbury, Dorset. From Gold Hill to Shaftesbury Abbey, discover what makes our town special.',
};

export default function LandmarksPage() {
  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#013220] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <MapPin className="h-8 w-8 text-[#C5A059] mr-3" />
            <h1 className="text-4xl font-bold">Explore Shaftesbury</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Discover our historic landmarks, scenic viewpoints, and natural
            attractions. From the iconic Gold Hill to tranquil nature reserves.
          </p>
        </div>
      </section>

      {/* Landmarks Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LANDMARKS.map((landmark) => (
              <Link
                key={landmark.id}
                href={`/landmarks/${landmark.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={landmark.image_url || '/placeholder.jpg'}
                    alt={landmark.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {landmark.type && (
                    <div className="absolute top-4 left-4 bg-[#C5A059] text-[#013220] px-3 py-1 rounded-full text-sm font-medium">
                      {landmark.type}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#013220] group-hover:text-[#C5A059] transition-colors mb-2">
                    {landmark.name}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {landmark.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 text-[#C5A059]" />
                    {landmark.distance}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
