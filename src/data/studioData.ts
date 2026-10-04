import heroMuralAsset from '../assets/images/hero_wall_mural_1791097267615.jpg';
import artistAtWorkAsset from '../assets/images/artist_at_work_1791097286180.jpg';
import odishaCafeMuralAsset from '../assets/images/traditional_odisha_mural_1791097305182.jpg';
import portraitAndCanvasAsset from '../assets/images/portrait_sketch_canvas_1791097322356.jpg';
import beforePlainWallAsset from '../assets/images/before_plain_wall_1791097334450.jpg';
import igPeacockMuralAsset from '../assets/images/ig_peacock_mural_post_1791103651906.jpg';
import igBuddhaCanvasAsset from '../assets/images/ig_buddha_canvas_post_1791103666417.jpg';
import igKidsRoomMuralAsset from '../assets/images/ig_kids_room_mural_post_1791103680243.jpg';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  deliverables: string[];
  typicalTimeline: string;
  startingRange: string;
  idealFor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category:
    | 'Wall Murals'
    | 'Home Art'
    | 'Portraits'
    | 'Canvas Painting'
    | 'Commercial Projects'
    | 'Traditional Art';
  spaceType: string;
  location: string;
  year: string;
  dimensions: string;
  medium: string;
  duration: string;
  image: string;
  featuredSpan?: 'wide' | 'tall' | 'standard';
  story: string;
  svgOverlayType?: 'botanical' | 'pattachitra' | 'portrait' | 'geometric' | 'cafe' | 'temple';
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  outcome: string;
}

export interface InstagramPostItem {
  id: string;
  handle: string;
  caption: string;
  hashtags: string;
  likes: number;
  comments: number;
  timestamp: string;
  location: string;
  category: 'Wall Murals' | 'Reels & Process' | 'Portraits & Canvas' | 'Commercial Art';
  mediaType: 'PHOTO' | 'CAROUSEL_ALBUM' | 'REEL';
  image: string;
  permalink: string;
}

export const BUNDLED_FALLBACK_IMAGES = {
  artistAtWork: artistAtWorkAsset,
  igKidsRoomMural: igKidsRoomMuralAsset,
};

export const STUDIO_IMAGES = {
  heroMural: heroMuralAsset,
  artistAtWork: '/MUKESH ARTIST.jpeg',
  odishaCafeMural: odishaCafeMuralAsset,
  portraitAndCanvas: portraitAndCanvasAsset,
  beforePlainWall: beforePlainWallAsset,
  igPeacockMural: igPeacockMuralAsset,
  igBuddhaCanvas: igBuddhaCanvasAsset,
  igKidsRoomMural: 'MUKESH PAINTING.jpg',
};

export const CONTACT_INFO = {
  artistName: 'Mukesh Guru',
  brandName: 'GURUART',
  tagline: 'Turning Walls Into Art.',
  phoneDisplay: '+91 70081 93931',
  phoneRaw: '917008193931',
  email: 'mukeshguru124@gmail.com',
  locationShort: 'Junagarh, Odisha',
  locationFull: 'Main Road, Junagarh, Kalahandi District, Odisha 766014, India',
  serviceAreas: 'Mahibhar, Junagarh · Bhawanipatna · Bhubaneswar · Sambalpur · Puri',
  workingHours: 'Mon – Sat, 9:00 AM – 9:00 PM IST',
  instagramHandle: '@guruart123',
  facebookPage: 'Mukesh Guru',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'wall-painting',
    number: '01',
    title: 'Wall Painting',
    shortDesc: 'Custom murals, decorative walls and artistic designs.',
    fullDesc:
      'Bespoke hand-painted wall murals tailored to your room architecture, natural lighting, and interior palette. From serene tropical foliage to contemporary geometric and heritage relief work, every wall is primed and sealed with washable weather-resistant coats.',
    image: STUDIO_IMAGES.heroMural,
    deliverables: [
      'On-site wall inspection & surface moisture check',
      '2 custom digital concept sketches mapped to your wall photo',
      'Low-VOC premium acrylic & metallic gold leaf execution',
      'Protective matte or satin clear coat for 10+ year durability',
    ],
    typicalTimeline: '3 – 7 Days per wall',
    startingRange: '₹120 – ₹350 / sq.ft.',
    idealFor: 'Living rooms, double-height foyers, bedrooms & courtyards',
  },
  {
    id: 'custom-artwork',
    number: '02',
    title: 'Custom Artwork',
    shortDesc: "Original artwork created according to the client's idea.",
    fullDesc:
      'Transform a personal memory, spiritual motif, or architectural vision into a one-of-a-kind hand-painted canvas or mixed-media installation. We collaborate closely on color swatches and textures so the piece anchors your room effortlessly.',
    image: STUDIO_IMAGES.artistAtWork,
    deliverables: [
      '1-on-1 concept consultation with Mukesh Guru',
      'Museum-grade cotton canvas on seasoned teak stretcher bars',
      'Textured palette knife, acrylic, oil, or gold-leaf detailing',
      'Ready-to-hang brass hardware & certificate of authenticity',
    ],
    typicalTimeline: '5 – 12 Days',
    startingRange: '₹4,500 – ₹35,000',
    idealFor: 'Statement dining walls, study rooms, wedding gifts & offices',
  },
  {
    id: 'home-painting',
    number: '03',
    title: 'Home Painting',
    shortDesc: 'Creative and premium painting solutions for interiors and exteriors.',
    fullDesc:
      'Complete interior and exterior residential painting combining architectural color consultation, designer texture finishes (metallic, stucco, limewash), and crisp accent walls executed with dust-free preparation.',
    image: STUDIO_IMAGES.beforePlainWall,
    deliverables: [
      'Room-by-room warm/cool lighting color palette curation',
      'Crack filling, 2-coat wall putty leveling & antifungal primer',
      'Designer royal play, limewash, or velvet matte finishes',
      'Spotless post-painting cleanup & furniture masking',
    ],
    typicalTimeline: '4 – 14 Days (Full Home)',
    startingRange: '₹18 – ₹65 / sq.ft.',
    idealFor: 'New bungalows, apartment makeovers & festive renovations',
  },
  {
    id: 'portrait-sketching',
    number: '04',
    title: 'Portrait & Sketching',
    shortDesc: 'Hand-drawn portraits, pencil sketches and custom artwork.',
    fullDesc:
      'Hyper-detailed graphite, charcoal, and pastel portraits crafted by hand from your photographs. We capture subtle expressions, heirloom jewelry textures, and emotional warmth—including combining multiple family references into a single portrait.',
    image: STUDIO_IMAGES.portraitAndCanvas,
    deliverables: [
      'Acid-free 300 GSM archival Bristol or Fabriano paper',
      'Fine graphite, willow charcoal, or oil portrait rendering',
      'Fixative UV-protective spray to prevent smudging or yellowing',
      'Optional handcrafted teak or matte black gallery framing',
    ],
    typicalTimeline: '3 – 6 Days',
    startingRange: '₹2,000 – ₹12,000',
    idealFor: 'Anniversary gifts, memorial tributes & family heirlooms',
  },
  {
    id: 'commercial-art',
    number: '05',
    title: 'Commercial Art',
    shortDesc: 'Creative wall designs for shops, cafés, offices and businesses.',
    fullDesc:
      'Turn your commercial space into a visual landmark that guests photograph and share. We design and paint brand-aligned storytelling murals, typography walls, and exterior signage for cafés, boutiques, hotels, gyms, and schools across Odisha.',
    image: STUDIO_IMAGES.odishaCafeMural,
    deliverables: [
      'Brand-aligned spatial storytelling & Instagram-spot planning',
      'Night/off-hour execution option to avoid business disruption',
      'Scuff-resistant commercial polyurethane topcoat',
      'Custom hand-lettered quotes, menus & directional wall graphics',
    ],
    typicalTimeline: '3 – 10 Days',
    startingRange: '₹15,000 – ₹85,000 per project',
    idealFor: 'Cafés, restaurants, coworking offices, boutiques & schools',
  },
  {
    id: 'commission-artwork',
    number: '06',
    title: 'Commission Artwork',
    shortDesc: 'Personalized paintings created specially for individual clients.',
    fullDesc:
      'Dedicated collector-grade commissions ranging from traditional Odisha Pattachitra-inspired contemporary canvases and spiritual Jagannath themes to large-scale abstract diptychs shipped safely across India.',
    image: STUDIO_IMAGES.portraitAndCanvas,
    deliverables: [
      'Milestone photo & video updates from sketch to final varnish',
      'Custom dimensions tailored to your exact architectural niche',
      'Traditional natural pigments, gold foil, or archival oils',
      'Insured wooden crate delivery anywhere in Odisha & India',
    ],
    typicalTimeline: '7 – 21 Days',
    startingRange: '₹6,000 – ₹60,000+',
    idealFor: 'Art collectors, temple/puja rooms, hotel lobbies & gifts',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'nature-wall-mural',
    title: 'Nature Wall Mural',
    category: 'Wall Murals',
    spaceType: 'Residential Interior',
    location: 'Bhubaneswar, Odisha',
    year: '2026',
    dimensions: '14 ft × 9.5 ft',
    medium: 'Matte Acrylic & 24K Gold Leaf Detailing on Plaster',
    duration: '5 Days',
    image: STUDIO_IMAGES.heroMural,
    featuredSpan: 'wide',
    story:
      'Designed for a sunlit living room in Patia, Bhubaneswar. The client wanted to replace a stark white 14-foot wall with an immersive tropical forest canopy that harmonizes with their mid-century teak sofa and brass lamps.',
    svgOverlayType: 'botanical',
  },
  {
    id: 'kalinga-cafe-heritage',
    title: 'Utkal Heritage & Botanical Café Mural',
    category: 'Commercial Projects',
    spaceType: 'Boutique Café & Roastery',
    location: 'Saheed Nagar, Bhubaneswar',
    year: '2026',
    dimensions: '22 ft × 10 ft',
    medium: 'Weather-Shield Acrylic & Terracotta Pigment',
    duration: '6 Days',
    image: STUDIO_IMAGES.odishaCafeMural,
    featuredSpan: 'standard',
    story:
      'A warm storytelling wall blending Odisha folk rhythmic linework with contemporary tropical motifs in burnt ochre, indigo, and gold. Customer photo check-ins increased noticeably within the first month of opening.',
    svgOverlayType: 'cafe',
  },
  {
    id: 'charcoal-heirloom-portrait',
    title: 'Generations in Charcoal & Acrylic',
    category: 'Portraits',
    spaceType: 'Private Commission',
    location: 'Junagarh, Kalahandi',
    year: '2026',
    dimensions: '24 in × 36 in',
    medium: 'Willow Charcoal, Graphite & Linen Canvas Study',
    duration: '4 Days',
    image: STUDIO_IMAGES.portraitAndCanvas,
    featuredSpan: 'tall',
    story:
      'Restored and hand-drew a commemorative family portrait from a faded 1980s photograph, paired with a custom textured acrylic companion canvas for the family ancestral home in Junagarh.',
    svgOverlayType: 'portrait',
  },
  {
    id: 'golden-lotus-sanctuary',
    title: 'Swarna Mayura & Padma Foyer Wall',
    category: 'Home Art',
    spaceType: 'Duplex Foyer & Puja Space',
    location: 'Bhawanipatna, Odisha',
    year: '2026',
    dimensions: '11 ft × 12 ft',
    medium: 'Textured Stucco Base, Metallic Gold & Acrylic',
    duration: '5 Days',
    image: STUDIO_IMAGES.igPeacockMural,
    featuredSpan: 'standard',
    story:
      'Hand-painted royal peacock and sacred lotus floral borders framing a double-height residential entrance, giving warm golden reflections under evening chandelier lighting.',
    svgOverlayType: 'temple',
  },
  {
    id: 'pattachitra-modern-fusion',
    title: 'Konark Sun Chariot & Tree of Life',
    category: 'Traditional Art',
    spaceType: 'Cultural Lounge & Reception',
    location: 'Puri, Odisha',
    year: '2025',
    dimensions: '16 ft × 8.5 ft',
    medium: 'Natural Earth Tones, Fine Liner Brushwork & Gold Foil',
    duration: '8 Days',
    image: STUDIO_IMAGES.artistAtWork,
    featuredSpan: 'wide',
    story:
      'An intricate tribute to Odisha’s timeless traditional arch mural and Pattachitra heritage reimagined in a warm modern palette for a boutique cultural reception space.',
    svgOverlayType: 'pattachitra',
  },
  {
    id: 'monsoon-over-mahanadi-canvas',
    title: 'Meditative Buddha & Bodhi Gold Canvas',
    category: 'Canvas Painting',
    spaceType: 'Collector Commission',
    location: 'Rourkela, Odisha',
    year: '2026',
    dimensions: '48 in × 48 in',
    medium: 'Heavy-Body Impasto Acrylic & Gold Leaf on Linen Canvas',
    duration: '7 Days',
    image: STUDIO_IMAGES.igBuddhaCanvas,
    featuredSpan: 'standard',
    story:
      'A richly textured palette-knife and brushwork canvas capturing serene golden light and Bodhi foliage, commissioned as the centerpiece for an architect’s meditation and study room.',
    svgOverlayType: 'geometric',
  },
  {
    id: 'minimal-limewash-living',
    title: 'Starry Woodland Children’s Bedroom Mural',
    category: 'Home Art',
    spaceType: 'Residential Nursery & Kids Room',
    location: 'Cuttack, Odisha',
    year: '2026',
    dimensions: '12 ft × 9 ft Wall',
    medium: 'Zero-VOC Child-Safe Washable Matte Acrylic',
    duration: '4 Days',
    image: STUDIO_IMAGES.igKidsRoomMural,
    featuredSpan: 'standard',
    story:
      'A whimsical hand-painted pastel woodland and starry night sky mural crafted with non-toxic odorless paints to create an imaginative sanctuary for a young family.',
    svgOverlayType: 'botanical',
  },
  {
    id: 'creative-school-story-corridor',
    title: 'Science & Folklore Discovery Corridor',
    category: 'Commercial Projects',
    spaceType: 'Educational Campus',
    location: 'Junagarh, Odisha',
    year: '2025',
    dimensions: '45 ft × 8 ft Corridor',
    medium: 'Zero-VOC Washable Interior Emulsion',
    duration: '9 Days',
    image: STUDIO_IMAGES.artistAtWork,
    featuredSpan: 'standard',
    story:
      'Interactive educational wall murals combining solar system illustrations, local wildlife, and inspiring quotes to turn a plain school hallway into an engaging learning journey.',
    svgOverlayType: 'geometric',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discuss',
    subtitle: "Understand the client's idea and space.",
    detail:
      'Share photos of your wall or reference ideas via WhatsApp or our quote form. We assess wall dimensions, natural lighting, furniture colors, and budget.',
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Create a concept/design proposal.',
    detail:
      'Mukesh Guru prepares custom concept sketches and color mockups overlaid on your actual wall photo so you can preview the artwork before a single brush touches the wall.',
  },
  {
    number: '03',
    title: 'Create',
    subtitle: 'Paint and bring the artwork to life.',
    detail:
      'We mask your furniture, prime the surface, and hand-paint every detail using low-odor, washable archival paints and fine artisan brushwork.',
  },
  {
    number: '04',
    title: 'Reveal',
    subtitle: 'Deliver a beautiful finished space.',
    detail:
      'After applying a protective weather-resistant seal coat and spotless cleanup, we walk through the finished masterpiece with you.',
  },
];

export const WHY_CHOOSE_FEATURES = [
  {
    index: '01',
    title: 'Original & Custom Designs',
    description:
      'Zero stencils or mass-printed wallpapers—every wall mural and canvas is sketched from scratch for your architecture.',
  },
  {
    index: '02',
    title: 'Professional Finishing',
    description:
      'Moisture testing, crack priming, and UV-resistant topcoats ensure vibrant colors that stay crisp for over a decade.',
  },
  {
    index: '03',
    title: 'Attention to Detail',
    description:
      'From fine charcoal portrait eyelashes to delicate 24K gold-leaf highlights, every stroke is executed with patience.',
  },
  {
    index: '04',
    title: 'Affordable Packages',
    description:
      'Transparent per-square-foot and per-canvas pricing tailored for homes, startups, cafés, and institutions across Odisha.',
  },
  {
    index: '05',
    title: 'Creative Concepts',
    description:
      'Blending contemporary interior aesthetics with Odisha’s rich artistic heritage, botanical serenity, or bold modern geometry.',
  },
  {
    index: '06',
    title: 'Personalized Service',
    description:
      'Direct collaboration with lead artist Mukesh Guru from initial sketch consultation to the final reveal.',
  },
];

export const CLIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Subhashree Mohanty',
    role: 'Homeowner, 3BHK Residence',
    location: 'Patia, Bhubaneswar',
    projectType: 'Living Room Botanical Mural (135 sq.ft.)',
    rating: 5,
    quote:
      'Guruart completely transformed our living room wall. The artwork looks beautiful and feels completely unique. Every guest who visits asks if it is imported designer wallpaper until they touch the hand-painted gold leaf texture.',
    outcome: 'Completed in 4 days · Zero paint odor or mess',
  },
  {
    id: 'rev-2',
    name: 'Debasis Panda',
    role: 'Founder, Kalinga Brew & Bistro',
    location: 'Saheed Nagar, Bhubaneswar',
    projectType: 'Commercial Café Heritage Wall & Hand-Lettering',
    rating: 5,
    quote:
      'Mukesh ji understood our café vibe immediately. He blended traditional Odisha motifs with a warm modern coffeehouse palette and worked overnight shifts so our opening schedule was never delayed.',
    outcome: '22-ft mural delivered on schedule · Featured in local food blogs',
  },
  {
    id: 'rev-3',
    name: 'Dr. Anupam Mishra',
    role: 'Senior Physician & Art Collector',
    location: 'Junagarh, Kalahandi',
    projectType: 'Custom Charcoal Family Portrait & Home Painting',
    rating: 5,
    quote:
      'I commissioned a charcoal portrait of my late parents along with custom accent walls for our new bungalow in Junagarh. The emotional depth in the portrait brought tears to our family’s eyes.',
    outcome: 'Archival framed portrait + 3 custom interior feature walls',
  },
];

export const INSTAGRAM_POSTS: InstagramPostItem[] = [
  {
    id: 'ig-1',
    handle: '@guruart123',
    caption:
      'In the Junagarh studio today—hand-painting fine marigold, terracotta, and teal floral motifs inside a traditional scalloped arch mural. Every petal is layered by hand with natural mineral warmth.',
    hashtags: '#Guruart123 #MukeshGuru #WallMuralIndia #OdishaArtists #HandPaintedWalls',
    likes: 642,
    comments: 48,
    timestamp: '2 hours ago',
    location: 'Junagarh Studio, Odisha',
    category: 'Reels & Process',
    mediaType: 'REEL',
    image: STUDIO_IMAGES.artistAtWork,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-2',
    handle: '@guruart123',
    caption:
      'Royal Mayura & Padma foyer mural completed for a new duplex residence in Bhubaneswar. 24K gold leaf highlights catch the warm evening chandelier glow.',
    hashtags: '#PeacockMural #LuxuryInteriorsIndia #BhubaneswarHomes #Guruart #CustomWallArt',
    likes: 589,
    comments: 39,
    timestamp: '1 day ago',
    location: 'Patia, Bhubaneswar',
    category: 'Wall Murals',
    mediaType: 'CAROUSEL_ALBUM',
    image: STUDIO_IMAGES.igPeacockMural,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-3',
    handle: '@guruart123',
    caption:
      'Serene meditative Buddha & Bodhi leaf textured acrylic canvas (48" × 48") resting on the studio oak easel before crating for our client in Rourkela.',
    hashtags: '#BuddhaPainting #CommissionArt #TexturedCanvas #OdishaArtStudio #Guruart',
    likes: 514,
    comments: 31,
    timestamp: '3 days ago',
    location: 'Rourkela, Odisha',
    category: 'Portraits & Canvas',
    mediaType: 'PHOTO',
    image: STUDIO_IMAGES.igBuddhaCanvas,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-4',
    handle: '@guruart123',
    caption:
      'Gold leaf detailing on the tropical botanical living room mural. 14 feet of pure hand-painted calm designed around mid-century teak furniture.',
    hashtags: '#BotanicalMural #LivingRoomMakeover #HomePaintingOdisha #Guruart123',
    likes: 476,
    comments: 27,
    timestamp: '5 days ago',
    location: 'Bhubaneswar, Odisha',
    category: 'Wall Murals',
    mediaType: 'PHOTO',
    image: STUDIO_IMAGES.heroMural,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-5',
    handle: '@guruart123',
    caption:
      'Dreamy woodland & starry night nursery wall mural hand-painted with zero-VOC child-safe matte emulsion for a young family in Bhawanipatna.',
    hashtags: '#KidsRoomMural #NurseryDecorIndia #SafeWallPaint #Kalahandi #Guruart123',
    likes: 438,
    comments: 24,
    timestamp: '1 week ago',
    location: 'Bhawanipatna, Odisha',
    category: 'Wall Murals',
    mediaType: 'CAROUSEL_ALBUM',
    image: STUDIO_IMAGES.igKidsRoomMural,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-6',
    handle: '@guruart123',
    caption:
      'Contemporary Pattachitra & tropical storytelling wall finished for an upscale boutique café in Saheed Nagar. Painted across 4 overnight shifts!',
    hashtags: '#CafeInteriors #PattachitraFusion #CommercialWallArt #OdishaCafe #Guruart123',
    likes: 712,
    comments: 56,
    timestamp: '2 weeks ago',
    location: 'Saheed Nagar, Bhubaneswar',
    category: 'Commercial Art',
    mediaType: 'REEL',
    image: STUDIO_IMAGES.odishaCafeMural,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-7',
    handle: '@guruart123',
    caption:
      'Fine willow charcoal & graphite heirloom portrait commission alongside a custom acrylic study on 300 GSM Fabriano archival paper.',
    hashtags: '#CharcoalPortrait #SketchArtistIndia #CustomPortraitGift #Junagarh #Guruart123',
    likes: 395,
    comments: 19,
    timestamp: '3 weeks ago',
    location: 'Junagarh, Kalahandi',
    category: 'Portraits & Canvas',
    mediaType: 'PHOTO',
    image: STUDIO_IMAGES.portraitAndCanvas,
    permalink: 'https://www.instagram.com/guruarts123',
  },
];

export const LIVE_INSTAGRAM_QUEUE: InstagramPostItem[] = [
  {
    id: 'ig-live-1',
    handle: '@guruart123',
    caption:
      'Fresh off the palette! Layering final ochre and indigo borders on a custom residential courtyard arch mural in Kalahandi. DM or WhatsApp 6372182212 for festive slot bookings.',
    hashtags: '#LiveFromStudio #MukeshGuru #Guruart123 #CustomMuralArt',
    likes: 128,
    comments: 14,
    timestamp: 'Just now',
    location: 'Junagarh, Odisha',
    category: 'Reels & Process',
    mediaType: 'REEL',
    image: STUDIO_IMAGES.artistAtWork,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-live-2',
    handle: '@guruart123',
    caption:
      'Close-up of 24K gold leaf feather work on our Royal Peacock & Lotus wall mural commission. Washable matte seal coat applied today!',
    hashtags: '#GoldLeafMural #PeacockArt #OdishaHomeDecor #Guruart123',
    likes: 215,
    comments: 21,
    timestamp: 'Moments ago',
    location: 'Bhubaneswar, Odisha',
    category: 'Wall Murals',
    mediaType: 'PHOTO',
    image: STUDIO_IMAGES.igPeacockMural,
    permalink: 'https://www.instagram.com/guruarts123',
  },
  {
    id: 'ig-live-3',
    handle: '@guruart123',
    caption:
      'Before & after wall preparation check: 2 coats of antifungal primer and smooth putty leveling completed before we begin tomorrow’s 16-ft living room mural.',
    hashtags: '#WallPrep #HomePaintingOdisha #InteriorTransformation #Guruart123',
    likes: 164,
    comments: 11,
    timestamp: 'Just now',
    location: 'Cuttack, Odisha',
    category: 'Reels & Process',
    mediaType: 'PHOTO',
    image: STUDIO_IMAGES.beforePlainWall,
    permalink: 'https://www.instagram.com/guruarts123',
  },
];
