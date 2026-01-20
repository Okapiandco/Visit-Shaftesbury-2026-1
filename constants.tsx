import { Landmark, ShaftesburyEvent, Place } from './types';

export const COLORS = {
  GREEN: '#013220',
  GOLD: '#C5A059',
  CREAM: '#F9F7F2'
};

export const LANDMARKS: Landmark[] = [
  {
    id: 'gold-hill',
    name: 'Gold Hill',
    lat: 51.0044,
    lng: -2.1979,
    description: "England's most iconic cobbled street, famous for the Ridley Scott 'Hovis' advert. Steep hills and thatched cottages.",
    keyInfo: 'Free to visit. Iconic views over Blackmore Vale.',
    type: 'Historic Site',
    distance: 'In Town',
    image_url: 'https://i.postimg.cc/SKvjQ0th/gold_hill_shaftesbury_2.jpg'
  },
  {
    id: 'abbey',
    name: 'Shaftesbury Abbey Museum & Gardens',
    lat: 51.0041,
    lng: -2.1989,
    description: 'Excavated foundations of a Benedictine nunnery founded by King Alfred the Great in 888AD.',
    keyInfo: 'Includes a virtual tour and herb garden.',
    type: 'Museum & Gardens',
    distance: 'In Town',
    image_url: 'https://i.postimg.cc/76r8nm5D/PXL_20230928_120620015.jpg'
  },
  {
    id: 'gold-hill-museum',
    name: 'Gold Hill Museum',
    lat: 51.0046,
    lng: -2.1982,
    description: "Local history museum set in two historic buildings at the top of Gold Hill. Features Dorset’s oldest hand-drawn fire engine.",
    keyInfo: 'Award-winning garden; volunteer-run.',
    type: 'Local Museum',
    distance: 'In Town'
    // No image provided - icon will be used
  },
  {
    id: 'park-walk',
    name: 'Park Walk',
    lat: 51.0035,
    lng: -2.2010,
    description: 'A high-altitude promenade offering panoramic views across the Blackmore Vale.',
    keyInfo: 'Benches, flower beds, and sunset spots.',
    type: 'Viewpoint',
    distance: 'In Town',
    image_url: 'https://picsum.photos/seed/parkwalk/800/1200'
  },
  {
    id: 'arts-centre',
    name: 'Shaftesbury Arts Centre',
    lat: 51.0055,
    lng: -2.1995,
    description: "The town's cultural hub for theatre, music, film, and art exhibitions.",
    keyInfo: 'Check the calendar for live performances and films.',
    type: 'Arts & Culture',
    distance: 'In Town'
  },
  {
    id: 'castle-hill',
    name: 'Castle Hill',
    lat: 51.0068,
    lng: -2.2045,
    description: 'A viewpoint on the site of a former iron age fort. Ideal for picnics and looking north toward Gillingham.',
    keyInfo: 'Part of the Shaftesbury Heritage Trail.',
    type: 'Viewpoint',
    distance: 'In Town'
    // No image provided - icon will be used
  },
  {
    id: 'fontmell-downs',
    name: 'Fontmell & Melbury Downs',
    lat: 50.9575,
    lng: -2.1855,
    description: 'Breathtaking panoramic views; rare butterflies and orchids. Managed by the National Trust.',
    type: 'National Trust Nature Reserve',
    distance: '4-5 Miles'
  },
  {
    id: 'duncliffe-wood',
    name: 'Duncliffe Wood',
    lat: 51.0021,
    lng: -2.2568,
    description: 'One of the oldest and largest woods in North Dorset. Famous for its spectacular bluebells.',
    type: 'Woodland',
    distance: '2 Miles'
  },
  {
    id: 'win-green',
    name: 'Win Green',
    lat: 51.0115,
    lng: -2.1124,
    description: 'The highest point in Cranborne Chase. On clear days, you can see the Isle of Wight.',
    type: 'High Point',
    distance: '5 Miles'
  },
  {
    id: 'zig-zag-hill',
    name: 'Zig Zag Hill',
    lat: 51.0135,
    lng: -2.1645,
    description: 'Famous steep, winding road with an "Alpine" feel and a viewing point at the top.',
    type: 'Viewpoint',
    distance: '4 Miles'
  },
  {
    id: 'kingsettle-wood',
    name: 'Kingsettle Wood',
    lat: 51.0210,
    lng: -2.2050,
    description: 'Delivers stunning glimpses of the town through wildflower-peppered floors.',
    type: 'Woodland',
    distance: '< 1 Mile'
  }
];

export const DINING_PLACES: Place[] = [
  {
    id: 'grosvenor-arms',
    name: 'The Grosvenor Arms',
    type: 'Boutique Hotel & Resto',
    feature: 'Georgian elegance, seasonal menus',
    image_url: 'https://i.postimg.cc/7YsFWx51/PXL_20230928_122158905.jpg',
    website_url: 'https://grosvenorarms.co.uk'
  },
  {
    id: 'the-mitre',
    name: 'The Mitre',
    type: 'Traditional Pub',
    feature: 'Stunning views over Blackmore Vale',
    image_url: 'https://i.postimg.cc/DZQVjLGX/PXL_20230928_120911716.jpg',
    website_url: 'https://themitredorset.co.uk'
  },
  {
    id: 'sorelle-dorset',
    name: 'Sorelle',
    type: 'Artisan Deli & Coffee',
    feature: 'Authentic Italian deli and specialty coffee on the High Street',
    image_url: 'https://i.postimg.cc/kGDc6d7G/20240505_103728.jpg',
    website_url: 'https://www.sorelledorset.com/'
  },
  {
    id: 'ye-olde-two-brewers',
    name: 'Ye Olde Two Brewers',
    type: 'Historic Pub',
    feature: 'Charming 17th-century inn at the foot of Gold Hill',
    image_url: 'https://ekhpybotr7n.exactdn.com/wp-content/uploads/2024/02/dd26ba41-7454-4284-9c19-2aba74f55971-scaled-1-1024x768.webp?strip=all',
    website_url: 'https://2brewers.co.uk'
  },
  {
    id: 'la-fleur-de-lys',
    name: 'La Fleur de Lys',
    type: 'Fine Dining',
    feature: 'Award-winning French-style cuisine & exquisite plating',
    image_url: 'https://cdn.prod.website-files.com/682bb0749f13caaf160f7a07/683c9168073ce007e9a96d3e_GuineaFowl5-p-1080.jpg',
    website_url: 'https://lafleurdelys.co.uk'
  },
  {
    id: 'coppleridge-inn',
    name: 'The Coppleridge Inn',
    type: 'Country Pub',
    feature: '15-acre grounds, family friendly',
    image_url: 'https://i.postimg.cc/mD8zQ0Z6/coppleridge-inn.jpg',
    website_url: 'https://coppleridge.com'
  },
  {
    id: 'pythouse-kitchen',
    name: 'Pythouse Kitchen Garden',
    type: 'Restaurant / Garden',
    feature: 'Cozy garden room with sheepskin and fairy lights',
    image_url: 'https://images.squarespace-cdn.com/content/v1/597853a8d2b8576d2caa6efa/1757783654241-VDOWBET2KVFN8FNZMDNJ/C%26C+-+744.jpg?format=2500w',
    website_url: 'https://pythousekitchengarden.co.uk'
  }
];

export const STAY_PLACES: Place[] = [
  {
    id: 'royal-chase-hotel',
    name: 'The Royal Chase Hotel',
    type: 'Hotel',
    feature: 'Outskirts (Georgian monastery)',
    image_url: 'https://i.postimg.cc/wvHZ5mZk/royal_chase_hotel_x3f8009bc_tmb_hero_un.jpg',
    website_url: 'https://theroyalchasehotel.co.uk'
  },
  {
    id: 'old-forge-bb',
    name: 'The Old Forge B&B',
    type: 'B&B / Glamping',
    feature: '2.7 miles from center',
    image_url: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&q=80&w=800',
    website_url: 'https://theoldforgedorset.co.uk'
  },
  {
    id: 'gutchpool-farm',
    name: 'Gutchpool Farm',
    type: 'Farmhouse B&B',
    feature: '3.8 miles (Gillingham side)',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    website_url: 'https://gutchpoolfarm.co.uk'
  },
  {
    id: 'benett-arms',
    name: 'The Benett Arms',
    type: 'Village Inn',
    feature: '3.1 miles (Semley)',
    image_url: 'https://i.postimg.cc/9F7V2B9p/benett-arms.jpg',
    website_url: 'https://thebenettarms.co.uk'
  },
  {
    id: 'holbrook-bb',
    name: 'Holbrook B&B',
    type: 'Bed & Breakfast',
    feature: 'Central Shaftesbury',
    image_url: 'https://images.getaroom-cdn.com/image/upload/s--ssD3jkNl--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1755821535/fd506d2c19c824c7c1ce36fdd7da45e2ba03df36?_a=BACAEuEv&atc=e7cd1cfa',
    website_url: 'https://holbrookbedandbreakfast.co.uk'
  },
  {
    id: 'plumber-manor',
    name: 'Plumber Manor',
    type: 'Luxury Country House',
    feature: '7 miles (Sturminster Newton)',
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    website_url: 'https://plumbermanor.co.uk'
  },
  {
    id: 'goldhill-glamping',
    name: 'Goldhill Glamping',
    type: 'Glamping / Pods',
    feature: 'Near town center',
    image_url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800',
    website_url: 'https://goldhillglamping.co.uk'
  }
];

export const MOCK_PUBLISHED_EVENTS: ShaftesburyEvent[] = [
  {
    id: '1',
    title: 'Morning Market at the High Street',
    date: '2024-06-22',
    time: '08:30',
    location: 'High Street, Shaftesbury',
    description: 'A vibrant weekly market with the freshest Dorset produce and local crafts. Experience the best of local agriculture, from award-winning cheeses to freshly baked sourdough and seasonal vegetables direct from the farm. Local artisans also showcase their unique handmade jewelry, pottery, and textiles.',
    image_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1200',
    website_url: 'https://www.visit-dorset.com/whats-on/markets/',
    status: 'published',
    lat: 51.0055,
    lng: -2.1982
  },
  {
    id: '2',
    title: 'Live Music: The Shreen Quartet',
    date: '2024-06-25',
    time: '19:30',
    location: 'The Mitre Pub',
    description: 'An evening of classical and folk fusions with local favourites. The Shreen Quartet brings their unique acoustic arrangements to the historic atmosphere of The Mitre. Expect a mix of traditional Dorset folk tunes re-imagined with a modern string quartet sensibility.',
    image_url: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=1200',
    website_url: 'https://shaftesburyartscentre.org.uk/',
    status: 'published',
    lat: 51.0041,
    lng: -2.1992
  },
  {
    id: '3',
    title: 'Shaftesbury Abbey Garden Tour',
    date: '2024-06-28',
    time: '11:00',
    location: 'Shaftesbury Abbey',
    description: 'Explore the historic gardens of the Abbey ruins with our expert head gardener. Discover the medicinal herbs and flora that have been cultivated here since the Saxon era.',
    image_url: 'https://i.postimg.cc/76r8nm5D/PXL_20230928_120620015.jpg',
    website_url: 'https://shaftesburyabbey.org.uk/',
    status: 'published',
    lat: 51.0041,
    lng: -2.1989
  },
  {
    id: '4',
    title: 'Artisan Pottery Workshop',
    date: '2024-07-02',
    time: '14:00',
    location: 'The Swan\'s Yard',
    description: 'Join local ceramicists for a hands-on clay experience. Perfect for beginners, this session covers wheel-throwing and hand-building techniques in a beautiful courtyard setting.',
    image_url: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=1200',
    website_url: 'https://www.shaftesbury.gov.uk/',
    status: 'published',
    lat: 51.0053,
    lng: -2.1987
  },
  {
    id: '5',
    title: 'Blackmore Vale Sunset Walk',
    date: '2024-07-05',
    time: '20:00',
    location: 'Park Walk Gates',
    description: 'A guided dusk walk along the promenade to witness the stunning sunset over the vale. Bring binoculars for some late-evening birdwatching.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    website_url: 'https://www.visit-dorset.com/',
    status: 'published',
    lat: 51.0035,
    lng: -2.2010
  }
];