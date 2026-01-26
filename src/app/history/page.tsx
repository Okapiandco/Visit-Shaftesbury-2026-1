import { Metadata } from 'next';
import Image from 'next/image';
import { History, Crown, Church, Landmark, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'History',
  description: 'Discover the rich history of Shaftesbury, Dorset. From its founding by King Alfred the Great to the famous Hovis advertisement, explore our heritage.',
};

export default function HistoryPage() {
  const timeline = [
    {
      year: '880 AD',
      title: 'Founded by King Alfred',
      description: 'King Alfred the Great founds Shaftesbury as a fortified hilltop town and establishes a Benedictine nunnery, which becomes Shaftesbury Abbey.',
      icon: Crown,
    },
    {
      year: '988 AD',
      title: 'Relics of Edward the Martyr',
      description: 'The remains of King Edward the Martyr are brought to Shaftesbury Abbey, making it one of the most important pilgrimage sites in England.',
      icon: Church,
    },
    {
      year: '1539',
      title: 'Dissolution of the Abbey',
      description: 'During the Dissolution of the Monasteries, Shaftesbury Abbey is closed. At its peak, it was one of the wealthiest nunneries in England.',
      icon: Landmark,
    },
    {
      year: '1973',
      title: 'The Hovis Advertisement',
      description: 'Director Ridley Scott films the famous Hovis bread advertisement on Gold Hill, making it one of the most iconic streets in England.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
            alt="Historic Shaftesbury - Gold Hill"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#013220]/90 to-[#013220]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <History className="h-8 w-8 text-[#C5A059] mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Our History</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl">
            Over a thousand years of history, from Saxon origins to Victorian
            grandeur. Discover the story of one of England&apos;s most historic towns.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-3xl font-bold text-[#013220] mb-6">
              A Town Steeped in History
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p>
                Perched 700 feet above the Blackmore Vale on a greensand ridge,
                Shaftesbury is one of the few truly ancient hilltop towns in England.
                Its commanding position has made it a place of strategic importance
                since prehistoric times.
              </p>
              <p>
                The town we know today was founded in 880 AD by King Alfred the Great,
                who established it as a fortified settlement to defend against Viking
                invasions. He also founded Shaftesbury Abbey, installing his daughter
                Aethelgifu as its first abbess.
              </p>
              <p>
                For centuries, the abbey was one of the most powerful religious
                institutions in England, and the town grew wealthy from the pilgrims
                who came to venerate the relics of Edward the Martyr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#013220] text-center mb-12">
            Key Moments in History
          </h2>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="bg-[#F9F7F2] rounded-xl p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#013220] rounded-full flex items-center justify-center mr-4">
                        <item.icon className="h-6 w-6 text-[#C5A059]" />
                      </div>
                      <span className="text-2xl font-bold text-[#C5A059]">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#013220] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-4 h-4 bg-[#C5A059] rounded-full" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Hill Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg"
                alt="Gold Hill"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#013220] mb-6">
                The Famous Gold Hill
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  No visit to Shaftesbury is complete without seeing Gold Hill, the
                  steep cobbled street that has become synonymous with rural England.
                </p>
                <p>
                  The street&apos;s fame spread worldwide in 1973 when director Ridley Scott
                  chose it as the location for the Hovis bread advertisement. The
                  commercial, featuring a young boy pushing his bicycle up the hill,
                  captured the essence of traditional English life and became one of
                  the most beloved adverts in British television history.
                </p>
                <p>
                  The view from the top of Gold Hill, looking down the cobbled street
                  with its thatched cottages and buttressed wall, with the patchwork
                  fields of the Blackmore Vale stretching to the horizon, is one of
                  the most photographed scenes in England.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abbey Section */}
      <section className="py-16 bg-[#013220] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Shaftesbury Abbey</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 888 AD by King Alfred the Great, Shaftesbury Abbey was
                  one of the richest and most powerful nunneries in medieval England.
                </p>
                <p>
                  The abbey&apos;s importance grew dramatically when the relics of King
                  Edward the Martyr were brought here in 988 AD. Edward, who was
                  murdered at Corfe Castle in 978, was soon regarded as a saint, and
                  pilgrims flocked to Shaftesbury to visit his shrine.
                </p>
                <p>
                  At its height, the abbey owned lands in seven counties and was so
                  wealthy that a medieval saying claimed: &quot;If the Abbot of Glastonbury
                  could marry the Abbess of Shaftesbury, their heir would hold more
                  land than the King of England.&quot;
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://i.postimg.cc/76r8nm5D/PXL_20230928_120620015.jpg"
                alt="Shaftesbury Abbey ruins"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
