export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  courseNumber: number;
  category: "tasting" | "beverage" | "seasonal";
  description: string;
  ingredients: string[];
  provenance: string;
  pairingNote?: string;
  price?: number;
  imageKey: string;
  fallbackImage: string;
  tags: string[];
}

export interface PhilosophyPillar {
  id: string;
  number: string;
  kanji: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  imageKey: string;
  fallbackImage: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  outlet: string;
  rating: string;
}

export const RESTAURANT_INFO = {
  name: "KURO",
  japaneseName: "黒",
  tagline: "Artisanal Omakase & Fire Craft",
  subTagline: "An intimate 12-seat culinary sanctuary where ancestral Kishu Binchotan fire meets ultra-pristine Japanese ocean harvest.",
  seatsCount: 12,
  seatingsPerNight: 2,
  michelinRating: "Two Michelin Stars (2025)",
  location: {
    address: "484 Broome Street, SoHo",
    city: "New York, NY 10013",
    coordinates: "40.7233° N, 74.0010° W",
  },
  hours: {
    firstSeating: "5:30 PM",
    secondSeating: "8:30 PM",
    days: "Tuesday – Sunday (Closed Mondays)",
  },
  pricing: {
    omakasePrice: 385,
    reservePairing: 220,
    rareSakePairing: 310,
  },
  stats: [
    { label: "Exclusive Seats", value: "12" },
    { label: "Omakase Courses", value: "18" },
    { label: "Charcoal Temperature", value: "1,000°C" },
    { label: "Michelin Stars", value: "★★" },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dish-1",
    name: "Signature Otoro Nigiri",
    japaneseName: "大トロ 備長炭",
    courseNumber: 1,
    category: "tasting",
    description: "Line-caught Bluefin Tuna belly lightly kiss-seared over glowing Kishu Binchotan charcoal, brushed with 8-year aged barrel nikiri, imperial oscietra caviar, and 24k edible gold leaf.",
    ingredients: ["A5 Wild Bluefin Otoro", "Aged Tamari Nikiri", "Kaluga Imperial Caviar", "Akazu Seasoned Rice", "24k Gold Leaf"],
    provenance: "Shiogama Port, Miyagi Prefecture, Japan",
    pairingNote: "Paired with Juyondai 'Black Label' Junmai Daiginjo (Yamagata)",
    imageKey: "dish-1",
    fallbackImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Signature", "Charcoal Seared", "Raw Bar"],
  },
  {
    id: "dish-2",
    name: "Hokkaido Uni & Charcoal Tartlet",
    japaneseName: "雲丹 炭火海苔",
    courseNumber: 2,
    category: "tasting",
    description: "Golden Bafun Sea Urchin layered over smoked dashi custard in an ultra-crisp charcoal nori crust, topped with finger lime spheres and mountain wasabi.",
    ingredients: ["Hokkaido Bafun Uni", "Smoked Dashi Custard", "Crisp Nori Shell", "Australian Finger Lime", "Shizuoka Real Wasabi"],
    provenance: "Ezo Sea, Nemuro, Hokkaido",
    pairingNote: "Paired with 2018 Domaine Leflaive Puligny-Montrachet 1er Cru",
    imageKey: "dish-2",
    fallbackImage: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=85",
    tags: ["Seasonal", "Delicate", "Caviar"],
  },
  {
    id: "dish-3",
    name: "Binchotan Smoked Miyazaki Wagyu A5",
    japaneseName: "宮崎牛 炭焼き",
    courseNumber: 3,
    category: "tasting",
    description: "Tenderloin medallion slow-smoked over charred cherry wood and high-heat white charcoal, served with fresh shaved black winter truffles, smoked Okinawa sea salt, and aged garlic shoyu.",
    ingredients: ["Miyazaki Champion Wagyu A5", "Perigord Black Truffle", "Cherry Blossom Smoke", "Okinawa Sea Salt Crystals", "Aged Garlic Reduction"],
    provenance: "Miyazaki Prefecture, Kyushu",
    pairingNote: "Paired with 2016 Chateau Pontet-Canet, Pauillac Grand Cru",
    imageKey: "dish-3",
    fallbackImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    tags: ["Fire Craft", "Wagyu", "Truffle"],
  },
  {
    id: "dish-4",
    name: "Smoked Dashi & King Crab Consommé",
    japaneseName: "タラバ蟹 出汁",
    courseNumber: 4,
    category: "tasting",
    description: "Clarified amber broth steeped with 36-month aged Rishiri kombu and smoked bonito, poured tableside over sweet red King Crab and delicate purple shiso blossoms.",
    ingredients: ["Red King Crab Leg", "36-Month Aged Rishiri Kombu", "Smoked Katsuobushi", "Purple Shiso Blossoms", "Gold Leaf Dust"],
    provenance: "Okhotsk Sea / Rishiri Island",
    pairingNote: "Paired with Kokuryu 'Black Dragon' Shizuku Junmai Daiginjo",
    imageKey: "dish-4",
    fallbackImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85",
    tags: ["Broth", "Umami", "Tableside"],
  },
  {
    id: "dish-5",
    name: "Black Truffle & Foie Gras Chawanmushi",
    japaneseName: "茶碗蒸し 黒トリュフ",
    courseNumber: 5,
    category: "tasting",
    description: "Silken Japanese egg custard steamed with smoked jidori chicken dashi, Hudson Valley foie gras medallion, and abundant shaved black winter melanosporum truffle.",
    ingredients: ["Pasture-Raised Jidori Eggs", "Hudson Valley Foie Gras", "Smoked Jidori Dashi", "Winter Melanosporum Truffle", "Mibuna Greens"],
    provenance: "Kagoshima Farm & Perigord, France",
    pairingNote: "Paired with Isojiman 'Nobilmente' Junmai Daiginjo",
    imageKey: "dish-5",
    fallbackImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    tags: ["Warm", "Savory Custard", "Luxury"],
  },
  {
    id: "dish-6",
    name: "Smoked Hojicha & Dark Chocolate Sphere",
    japaneseName: "焙じ茶 炭球 菓子",
    courseNumber: 6,
    category: "tasting",
    description: "Charcoal-dusted 72% single-origin dark chocolate shell filled with roasted Kyoto hojicha mousse, smoked sea salt caramel, yuzu gel, and liquid nitrogen matcha clouds.",
    ingredients: ["Kyoto Roasted Hojicha", "Valrhona 72% Dark Ganache", "Smoked Caramel Core", "Yuzu Citrus Reduction", "Matcha Moss Crumble"],
    provenance: "Uji, Kyoto, Japan",
    pairingNote: "Paired with Yamazaki 18-Year Single Malt Sherry Cask",
    imageKey: "dish-6",
    fallbackImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85",
    tags: ["Dessert", "Smoked Tea", "Avant-Garde"],
  },
  {
    id: "bev-1",
    name: "Yamazaki 18 Smokeworks Highball",
    japaneseName: "山崎 ハイボール",
    courseNumber: 7,
    category: "beverage",
    description: "Rare Yamazaki 18 Single Malt, hand-carved crystal ice diamond, carbonated sparkling water, ignited hinoki cedar fragrance spray.",
    ingredients: ["Yamazaki 18yr", "Super-Dense Ice Diamond", "Ultra-Fine Sparkling Water", "Hinoki Wood Mist"],
    provenance: "Osaka, Japan",
    price: 95,
    imageKey: "cocktail-pairing",
    fallbackImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
    tags: ["Cocktail", "Whisky", "Rare"],
  },
  {
    id: "bev-2",
    name: "Juyondai Ryugetsu Junmai Daiginjo",
    japaneseName: "十四代 龍月",
    courseNumber: 8,
    category: "beverage",
    description: "The crown jewel of Japanese sake brewing. Velvety melon, white peach, ethereal finish with sublime minerality.",
    ingredients: ["Yamada Nishiki Rice (35% Polish)", "Spring Water from Gassan Mount"],
    provenance: "Takagi Shuzo, Yamagata Prefecture",
    price: 350,
    imageKey: "cocktail-pairing",
    fallbackImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=85",
    tags: ["Rare Sake", "Grand Cru", "Bottle"],
  },
];

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    id: "pillar-1",
    number: "01",
    kanji: "炭",
    title: "Kishu Binchotan Fire",
    subtitle: "The Soul of Clean Heat",
    description: "Sourced from pristine Ubame oak forests in Wakayama, our white charcoal burns smokelessly at over 1,000°C. Its intense far-infrared waves sear delicacies in milliseconds, sealing natural juices while imparting delicate woody minerality.",
    detail: "Harvested through a 300-year-old kiln firing method requiring 14 days of continuous stewardship by master carbonizers.",
    imageKey: "craft-fire",
    fallbackImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "pillar-2",
    number: "02",
    kanji: "海",
    title: "Tsukiji Dawn Harvest",
    subtitle: "Pristine Marine Provenance",
    description: "Every dawn, our private purveyor in Toyosu and Hokkaido selects line-caught fish and shellfish, air-freighting the harvest directly to our kitchen within 16 hours of catch. No intermediaries, no compromises.",
    detail: "Aged individually through controlled Ikejime and Shinkei-jime neurological preservation methods to maximize sweet nucleotide umami.",
    imageKey: "dish-1",
    fallbackImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "pillar-3",
    number: "03",
    kanji: "心",
    title: "Ichigo Ichie (一期一会)",
    subtitle: "One Time, One Meeting",
    description: "Every evening is an unrepeatable culinary theater. With only 12 guests seated along a 300-year-old single-slab charred Hinoki counter, our chefs orchestrate an intimate sensory dialog where every motion is calibrated.",
    detail: "Handmade Karatsu ceramics, hand-blown Edo glass, and Damascus yanagiba blades honed daily on natural Kyoto waterstones.",
    imageKey: "interior-counter",
    fallbackImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
  },
];

export const CHEF_PROFILE = {
  name: "Chef Kenzo Takahashi",
  japaneseName: "高橋 賢三",
  title: "Chef Patron & Charcoal Artisan",
  bio: "With over 24 years honing culinary discipline across Ginza, Kyoto, and Manhattan, Chef Kenzo has redefined modern omakase by marrying traditional Edo-mae precision with elemental woodfire alchemy. Former Executive Chef of three 3-Michelin-starred institutions in Tokyo and Kyoto.",
  quote: "Fire is not merely a method of heat; it is an elemental catalyst of memory, fragrance, and sacred communion.",
  imageKey: "chef-portrait",
  fallbackImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    quote: "KURO offers one of the most transcendent dining experiences in the Western Hemisphere. The binchotan-kissed otoro is pure poetry.",
    author: "Pete Wells",
    title: "Chief Food Critic",
    outlet: "The New York Times",
    rating: "★★★★ (Extraordinary)",
  },
  {
    id: "rev-2",
    quote: "An immaculate temple of charcoal, knife craft, and sake curation. Every dish possesses the poise of high art.",
    author: "Michelin Guide Inspectors",
    title: "Editorial Evaluation",
    outlet: "Michelin Guide New York",
    rating: "Two Michelin Stars",
  },
  {
    id: "rev-3",
    quote: "Dining here feels less like a meal and more like an intimate chamber concert where every note is flavored with smoke and sea.",
    author: "Robb Report",
    title: "Best of the Best Luxury Awards",
    outlet: "Culinary Sanctuary of the Year",
    rating: "99/100 Point Score",
  },
];
