import { Metadata } from 'next';
import { Car, Train, Bus, Plane, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Getting Here',
  description: 'Plan your journey to Shaftesbury, Dorset. Find information on driving routes, public transport, and nearby airports.',
};

export default function TransportPage() {
  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#013220] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Car className="h-8 w-8 text-[#C5A059] mr-3" />
            <h1 className="text-4xl font-bold">Getting to Shaftesbury</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Plan your journey to our historic hilltop town. Whether by car,
            train, or bus, we&apos;ll help you find the best route.
          </p>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* By Car */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#013220] rounded-full flex items-center justify-center mr-4">
                  <Car className="h-6 w-6 text-[#C5A059]" />
                </div>
                <h2 className="text-2xl font-bold text-[#013220]">By Car</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Shaftesbury is easily accessible by road, located at the junction
                  of the A30 and A350.
                </p>
                <div className="bg-[#F9F7F2] rounded-lg p-4">
                  <h3 className="font-semibold text-[#013220] mb-2">From Major Cities:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>London: 2 hours via M3/A303</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>Bristol: 1 hour via A37/A350</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>Southampton: 45 mins via A36/A350</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>Bournemouth: 40 mins via A350</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  Parking is available in the town centre car parks. Most are pay
                  and display.
                </p>
              </div>
            </div>

            {/* By Train */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#013220] rounded-full flex items-center justify-center mr-4">
                  <Train className="h-6 w-6 text-[#C5A059]" />
                </div>
                <h2 className="text-2xl font-bold text-[#013220]">By Train</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  The nearest railway stations are Gillingham (Dorset) and
                  Tisbury, both on the London Waterloo to Exeter line.
                </p>
                <div className="bg-[#F9F7F2] rounded-lg p-4">
                  <h3 className="font-semibold text-[#013220] mb-2">Nearest Stations:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Train className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Gillingham (Dorset)
                      </span>
                      <span className="text-gray-500">5 miles</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Train className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Tisbury
                      </span>
                      <span className="text-gray-500">7 miles</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Train className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Templecombe
                      </span>
                      <span className="text-gray-500">8 miles</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  Taxi services are available from all stations to Shaftesbury.
                </p>
              </div>
            </div>

            {/* By Bus */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#013220] rounded-full flex items-center justify-center mr-4">
                  <Bus className="h-6 w-6 text-[#C5A059]" />
                </div>
                <h2 className="text-2xl font-bold text-[#013220]">By Bus</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Regular bus services connect Shaftesbury with surrounding
                  towns and villages.
                </p>
                <div className="bg-[#F9F7F2] rounded-lg p-4">
                  <h3 className="font-semibold text-[#013220] mb-2">Bus Routes:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Bus className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>X2: Salisbury - Shaftesbury - Blandford</span>
                    </li>
                    <li className="flex items-center">
                      <Bus className="h-4 w-4 mr-2 text-[#C5A059]" />
                      <span>309: Gillingham - Shaftesbury - Sturminster</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  The main bus stop is located on the High Street near the Town Hall.
                </p>
              </div>
            </div>

            {/* By Air */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#013220] rounded-full flex items-center justify-center mr-4">
                  <Plane className="h-6 w-6 text-[#C5A059]" />
                </div>
                <h2 className="text-2xl font-bold text-[#013220]">By Air</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Several airports are within reasonable distance of Shaftesbury,
                  with good onward transport links.
                </p>
                <div className="bg-[#F9F7F2] rounded-lg p-4">
                  <h3 className="font-semibold text-[#013220] mb-2">Nearest Airports:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Plane className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Bournemouth
                      </span>
                      <span className="text-gray-500">35 miles</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Plane className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Southampton
                      </span>
                      <span className="text-gray-500">45 miles</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Plane className="h-4 w-4 mr-2 text-[#C5A059]" />
                        Bristol
                      </span>
                      <span className="text-gray-500">50 miles</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  Car hire is recommended for travelling from airports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#013220] mb-4">Plan Your Route</h2>
          <p className="text-gray-600 mb-8">
            Shaftesbury is located at coordinates 51.0057°N, 2.1985°W
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=51.0057,-2.1985"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#013220] text-white font-semibold rounded-lg hover:bg-[#014a2d] transition-colors"
          >
            <MapPin className="h-5 w-5 mr-2" />
            Get Directions on Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
