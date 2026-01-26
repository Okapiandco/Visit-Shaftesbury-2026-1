import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#013220] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-[#C5A059]" />
              <span className="text-xl font-bold">Visit Shaftesbury</span>
            </div>
            <p className="text-gray-300 text-sm">
              Discover the historic hilltop town of Shaftesbury, home to the iconic Gold Hill
              and centuries of English heritage.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[#C5A059] font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/landmarks/gold-hill" className="text-gray-300 hover:text-white transition-colors">
                  Gold Hill
                </Link>
              </li>
              <li>
                <Link href="/landmarks/shaftesbury-abbey" className="text-gray-300 hover:text-white transition-colors">
                  Shaftesbury Abbey
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-300 hover:text-white transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          {/* Plan Your Visit */}
          <div>
            <h3 className="text-[#C5A059] font-semibold mb-4">Plan Your Visit</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dining" className="text-gray-300 hover:text-white transition-colors">
                  Where to Eat
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="text-gray-300 hover:text-white transition-colors">
                  Where to Stay
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-gray-300 hover:text-white transition-colors">
                  Getting Here
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#C5A059] font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@visitshaftesbury.co.uk</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+44 (0) 1onal 123 4567</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Shaftesbury, Dorset, SP7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Visit Shaftesbury. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
