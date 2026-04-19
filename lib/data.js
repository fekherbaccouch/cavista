// lib/data.js — Cavista complete data layer

// ─── CATEGORIES ───────────────────────────────────────────────
export const categories = [
  { id: "bieres",      label: "Bières",      en: "Beers",       icon: "🍺", count: 16 },
  { id: "vins",        label: "Vins",        en: "Wines",       icon: "🍷", count: 19 },
  { id: "whisky",      label: "Whiskies",    en: "Whiskies",    icon: "🥃", count: 15 },
  { id: "vodka",       label: "Vodka",       en: "Vodka",       icon: "🫙", count: 11 },
  { id: "gin",         label: "Gin",         en: "Gin",         icon: "🌿", count: 4  },
  { id: "rhum",        label: "Rhum",        en: "Rum",         icon: "🏝️", count: 6  },
  { id: "tequila",     label: "Tequila",     en: "Tequila",     icon: "🌵", count: 3  },
  { id: "cocktails",   label: "Cocktails",   en: "Cocktails",   icon: "🍹", count: 8  },
  { id: "accessoires", label: "Accessoires", en: "Accessories", icon: "🍸", count: 24 },
];

// ─── PRODUCTS ─────────────────────────────────────────────────
export const products = [
  {
    id: "1", slug: "johnnie-walker-double-black",
    name: "Johnnie Walker Double Black",
    category: "Whisky", brand: "Johnnie Walker",
    price: 300, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80",
    badge: null, rating: 4.9, reviews: 42, inStock: true, featured: true,
    description: "Un blend écossais d'exception, plus intense et fumé que son aîné le Black Label. Notes de tourbe, fruits noirs et épices.",
  },
  {
    id: "2", slug: "chivas-regal-18",
    name: "Chivas Regal 18 YO",
    category: "Whisky", brand: "Chivas",
    price: 400, oldPrice: 490, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&q=80",
    badge: "promo", rating: 4.8, reviews: 28, inStock: true, featured: true,
    description: "18 ans d'affinage pour un Scotch d'une richesse incomparable. Noisette, miel, vanille et fruits secs.",
  },
  {
    id: "3", slug: "grey-goose",
    name: "Grey Goose",
    category: "Vodka", brand: "Grey Goose",
    price: 240, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80",
    badge: "new", rating: 4.7, reviews: 19, inStock: true, featured: true,
    description: "La vodka française de prestige, distillée cinq fois à partir de blé de Picardie.",
  },
  {
    id: "4", slug: "moet-chandon-rose",
    name: "Moët & Chandon Rosé Impérial",
    category: "Champagne", brand: "Moët & Chandon",
    price: 320, oldPrice: null, volume: "0.75L",
    image: "https://images.unsplash.com/photo-1547595628-c61a32f82bf3?w=500&q=80",
    badge: "new", rating: 5.0, reviews: 67, inStock: true, featured: true,
    description: "Un champagne rosé d'une élégance rare aux arômes de fraise, framboise et cerise.",
  },
  {
    id: "5", slug: "jack-daniels-single-barrel",
    name: "Jack Daniel's Single Barrel",
    category: "Whisky", brand: "Jack Daniel's",
    price: 350, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80",
    badge: null, rating: 4.8, reviews: 31, inStock: true, featured: false,
    description: "Sélectionné baril par baril pour une complexité aromatique unique.",
  },
  {
    id: "6", slug: "ciroc",
    name: "Cîroc",
    category: "Vodka", brand: "Cîroc",
    price: 270, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=500&q=80",
    badge: null, rating: 4.6, reviews: 22, inStock: true, featured: false,
    description: "Distillée cinq fois à partir de raisins fins de la région de Gaillac.",
  },
  {
    id: "7", slug: "heineken-pack-6",
    name: "Heineken Pack de 6",
    category: "Bières", brand: "Heineken",
    price: 16.8, oldPrice: null, volume: "6 × 33cl",
    image: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=500&q=80",
    badge: null, rating: 4.4, reviews: 88, inStock: true, featured: false,
    description: "La lager internationale emblématique dans un pack pratique de 6 bouteilles.",
  },
  {
    id: "8", slug: "roberto-cavalli-golden",
    name: "Roberto Cavalli Golden",
    category: "Vodka", brand: "Roberto Cavalli",
    price: 300, oldPrice: null, volume: "1L",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80",
    badge: "exclusive", rating: 4.9, reviews: 14, inStock: true, featured: true,
    description: "La vodka de luxe dans un flacon iconique plaqué or, symbole d'élégance absolue.",
  },
  {
    id: "9", slug: "glenfiddich-18",
    name: "Glenfiddich 18 Years Old",
    category: "Whisky", brand: "Glenfiddich",
    price: 620, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?w=500&q=80",
    badge: null, rating: 4.9, reviews: 36, inStock: true, featured: false,
    description: "Single malt de référence, vieilli 18 ans dans des fûts de chêne américain et européen.",
  },
  {
    id: "10", slug: "celtia-pack-6",
    name: "Celtia Pack de 6",
    category: "Bières", brand: "Celtia",
    price: 15, oldPrice: 16.8, volume: "6 × 25cl",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=80",
    badge: "promo", rating: 4.3, reviews: 112, inStock: true, featured: false,
    description: "La bière tunisienne par excellence, légère et rafraîchissante.",
  },
  {
    id: "11", slug: "hendricks-gin",
    name: "Hendrick's Gin",
    category: "Gin", brand: "Hendrick's",
    price: 185, oldPrice: null, volume: "0.70L",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500&q=80",
    badge: null, rating: 4.7, reviews: 25, inStock: true, featured: false,
    description: "Un gin d'exception distillé au concombre et à la rose de Damas.",
  },
  {
    id: "12", slug: "kurubis-rouge",
    name: "Kurubis Rouge AOC",
    category: "Vins", brand: "Kurubis",
    price: 38, oldPrice: null, volume: "0.75L",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80",
    badge: "new", rating: 4.5, reviews: 44, inStock: true, featured: false,
    description: "Vin rouge tunisien AOC, assemblage de Syrah et Cabernet Sauvignon. Notes de fruits noirs et d'épices.",
  },
  // ── Cocktails ──
  {
    id: "13", slug: "kit-spritz-aperol",
    name: "Kit Spritz Aperol",
    category: "Cocktails", brand: "Aperol",
    price: 85, oldPrice: null, volume: "Kit 3 pièces",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80",
    badge: "new", rating: 4.8, reviews: 34, inStock: true, featured: false,
    cocktailBase: "Prêt à boire",
    description: "Kit complet Spritz : Aperol 70cl, Prosecco et eau pétillante San Pellegrino.",
  },
  {
    id: "14", slug: "mojito-havana-club-kit",
    name: "Mojito Havana Club Kit",
    category: "Cocktails", brand: "Havana Club",
    price: 95, oldPrice: null, volume: "Kit 4 pièces",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80",
    badge: null, rating: 4.7, reviews: 28, inStock: true, featured: false,
    cocktailBase: "Rhum Based",
    description: "Rhum Havana Club 3 ans, sirop de canne, jus de citron vert et feuilles de menthe fraîche.",
  },
  {
    id: "15", slug: "negroni-classique",
    name: "Negroni Classique Kit",
    category: "Cocktails", brand: "Campari",
    price: 110, oldPrice: null, volume: "Kit 3 pièces",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80",
    badge: null, rating: 4.9, reviews: 19, inStock: true, featured: false,
    cocktailBase: "Whisky Based",
    description: "Campari, Vermouth Rosso Martini et Gin Hendrick's. Le cocktail élégant par excellence.",
  },
  {
    id: "16", slug: "cosmopolitan-kit",
    name: "Cosmopolitan Kit Premium",
    category: "Cocktails", brand: "Cointreau",
    price: 120, oldPrice: null, volume: "Kit 4 pièces",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    badge: "new", rating: 4.6, reviews: 22, inStock: true, featured: false,
    cocktailBase: "Vodka Based",
    description: "Vodka Cîroc, Cointreau, jus de cranberry et citron vert. La sophistication rose en bouteille.",
  },
  {
    id: "17", slug: "mocktail-detox-kit",
    name: "Mocktail Détox Bio",
    category: "Cocktails", brand: "Virgin",
    price: 45, oldPrice: null, volume: "Kit 3 pièces",
    image: "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?w=500&q=80",
    badge: null, rating: 4.5, reviews: 41, inStock: true, featured: false,
    cocktailBase: "Sans Alcool",
    description: "Sirop de gingembre bio, eau pétillante et mélange fruits exotiques. Fraîcheur 100% sans alcool.",
  },
  {
    id: "18", slug: "margarita-patron-kit",
    name: "Margarita Patrón Kit",
    category: "Cocktails", brand: "Patrón",
    price: 130, oldPrice: null, volume: "Kit 3 pièces",
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=500&q=80",
    badge: null, rating: 4.8, reviews: 17, inStock: true, featured: false,
    cocktailBase: "Tequila Based",
    description: "Patrón Silver, Cointreau et citron vert pressé. La margarita authentique en kit premium.",
  },
];

// ─── NEW ARRIVALS (homepage featured grid) ────────────────────
export const NEW_PRODUCTS = [
  {
    id: 101, slug: "dalmore-king-alexander",
    name: "Dalmore King Alexander III",
    category: "Whisky",
    price: 1250,
    img: "https://images.unsplash.com/photo-1615887023544-3a566f29d822?w=600&q=80",
    tag: "Rare",
  },
  {
    id: 102, slug: "krug-grande-cuvee",
    name: "Krug Grande Cuvée",
    category: "Champagne",
    price: 950,
    img: "https://images.unsplash.com/photo-1547595628-c61a32f82bf3?w=600&q=80",
    tag: "Exclusif",
  },
  {
    id: 103, slug: "chateau-talbot-2018",
    name: "Château Talbot 2018",
    category: "Vin Rouge",
    price: 480,
    img: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80",
    tag: "Nouveau",
  },
  {
    id: 104, slug: "belvedere-heritage",
    name: "Belvédère Heritage 176",
    category: "Vodka",
    price: 220,
    img: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&q=80",
    tag: "Premium",
  },
];

// ─── ACCESSORIES ──────────────────────────────────────────────
export const accessories = [
  {
    id: "a1", slug: "kit-tire-bouchon-electrique",
    name: "Kit Tire-Bouchon Électrique",
    category: "coffrets", price: 45, oldPrice: 65,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    badge: "promo", rating: 4.6, reviews: 23, inStock: true,
    description: "Kit complet avec tire-bouchon rechargeable, coupe-capsule et bec verseur.",
  },
  {
    id: "a2", slug: "set-verres-cocktail",
    name: "Set 6 Verres à Cocktail",
    category: "verrerie", price: 48, oldPrice: null,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80",
    badge: "new", rating: 4.7, reviews: 34, inStock: true,
    description: "Verres à long drink en cristal soufflé, style Art Déco.",
  },
  {
    id: "a3", slug: "decanteur-whisky-crystal",
    name: "Décanteur Whisky Crystal",
    category: "verrerie", price: 85, oldPrice: null,
    image: "https://images.unsplash.com/photo-1613667240983-f71f399bf430?w=400&q=80",
    badge: "new", rating: 4.8, reviews: 19, inStock: true,
    description: "Décanteur en cristal taillé, livré avec 2 verres Old Fashioned.",
  },
  {
    id: "a4", slug: "shaker-boston",
    name: "Shaker Professionnel Boston",
    category: "outils", price: 38, oldPrice: null,
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&q=80",
    badge: null, rating: 4.9, reviews: 57, inStock: true,
    description: "Shaker inox double paroi, capacité 750ml, joint silicone étanche.",
  },
];

export const accessoryCategories = [
  { id: "verrerie",        label: "Verrerie",         icon: "🥂", count: 8  },
  { id: "outils",          label: "Outils & Bar",     icon: "🔧", count: 12 },
  { id: "coffrets",        label: "Coffrets & Packs", icon: "🎁", count: 6  },
  { id: "decoration",      label: "Décoration Bar",   icon: "✨", count: 5  },
  { id: "art-de-la-table", label: "Art de la Table",  icon: "🍽️", count: 7  },
];

// ─── EVENTS ───────────────────────────────────────────────────
export const eventPackages = [
  {
    id: "classique", name: "Bar Classique", tier: 1,
    price: "À partir de 500 DT", duration: "4h", guests: "Jusqu'à 50 personnes",
    featured: false,
    features: [
      "Bar mobile équipé",
      "1 bartender professionnel",
      "5 cocktails au choix",
      "Glace & garnitures incluses",
      "Installation & démontage",
    ],
  },
  {
    id: "premium", name: "Bar Premium", tier: 2,
    price: "À partir de 900 DT", duration: "6h", guests: "Jusqu'à 120 personnes",
    featured: true,
    features: [
      "Bar mobile premium",
      "2 bartenders professionnels",
      "10 cocktails signature",
      "Carte mocktails incluse",
      "Glace sculptée",
      "Option Kémia & Tapas",
      "Éclairage ambiance LED",
    ],
  },
  {
    id: "vip", name: "Bar VIP", tier: 3,
    price: "Sur devis", duration: "Illimitée", guests: "Illimité",
    featured: false,
    features: [
      "Bar sur-mesure",
      "Équipe complète 3+ bartenders",
      "Menu cocktails exclusif",
      "Spiritueux premium sélectionnés",
      "Kémia & Tapas service",
      "Décoration & theming",
      "Coordinateur événement dédié",
      "Service VIP premium",
    ],
  },
];

// ─── BLOG ─────────────────────────────────────────────────────
export const blogPosts = [
  {
    id: "b1", slug: "guide-whisky-debutant",
    title: "Guide du Whisky pour Débutants",
    excerpt: "Tout ce que vous devez savoir pour commencer votre voyage dans l'univers du whisky : régions, distillation, dégustation.",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80",
    date: "12 Avr 2026", readTime: "8 min", category: "Guide", featured: true,
  },
  {
    id: "b2", slug: "cocktails-ete-2026",
    title: "10 Cocktails Tendance Été 2026",
    excerpt: "Les créations les plus fraîches et colorées pour animer vos soirées estivales au bord de la mer.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    date: "8 Avr 2026", readTime: "5 min", category: "Tendances", featured: false,
  },
  {
    id: "b3", slug: "open-bar-reussi",
    title: "Comment Organiser un Open Bar Réussi",
    excerpt: "Nos conseils d'experts pour un open bar mémorable : quantités, logistique, sélection de spiritueux.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80",
    date: "2 Avr 2026", readTime: "6 min", category: "Événementiel", featured: false,
  },
  {
    id: "b4", slug: "vins-tunisiens-2026",
    title: "Les Meilleurs Vins Tunisiens de 2026",
    excerpt: "Notre sélection des meilleures cuvées tunisiennes : Kurubis, Neferis, Magon et les nouveaux producteurs.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
    date: "25 Mar 2026", readTime: "7 min", category: "Vins", featured: false,
  },
];

// ─── BRANDS ───────────────────────────────────────────────────
export const brands = [
  { id: "johnnie-walker", name: "Johnnie Walker", country: "Écosse"  },
  { id: "chivas-regal",   name: "Chivas Regal",   country: "Écosse"  },
  { id: "jack-daniels",   name: "Jack Daniel's",  country: "USA"     },
  { id: "grey-goose",     name: "Grey Goose",     country: "France"  },
  { id: "ciroc",          name: "Cîroc",          country: "France"  },
  { id: "moet-chandon",   name: "Moët & Chandon", country: "France"  },
  { id: "kurubis",        name: "Kurubis",        country: "Tunisie" },
  { id: "neferis",        name: "Domaine Neferis",country: "Tunisie" },
  { id: "glenfiddich",    name: "Glenfiddich",    country: "Écosse"  },
  { id: "hendricks",      name: "Hendrick's",     country: "Écosse"  },
];

// ─── CAVACOINS ────────────────────────────────────────────────
export const cavacoinsActions = [
  { action: "Achat",        points: "1 pt / DT dépensé", icon: "🛒" },
  { action: "Parrainage",   points: "+200 pts",           icon: "👥" },
  { action: "Avis produit", points: "+50 pts",            icon: "⭐" },
  { action: "Inscription",  points: "+100 pts",           icon: "🎁" },
  { action: "Anniversaire", points: "+150 pts",           icon: "🎂" },
];

export const loyaltyTiers = [
  {
    id: "bronze", name: "Bronze", min: 0, max: 499, icon: "🥉",
    perks: ["Accès aux offres exclusives", "1 pt / DT dépensé"],
  },
  {
    id: "silver", name: "Silver", min: 500, max: 1999, icon: "🥈",
    perks: ["Tous les avantages Bronze", "Offres anniversaire doublées", "Accès prioritaire aux nouveautés"],
  },
  {
    id: "gold", name: "Gold", min: 2000, max: null, icon: "🥇",
    perks: ["Tous les avantages Silver", "Points x1.5 sur chaque achat", "Invitations événements exclusifs", "Service client prioritaire"],
  },
];

// ─── COCKTAILISTS ─────────────────────────────────────────────
export const cocktailists = [
  {
    id: "c1", name: "Karim B.", specialty: "Cocktails Signature",
    experience: "8 ans", rating: 5.0, events: 180,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    tags: ["Moléculaire", "Classic", "Tropical"],
    bio: "Expert en cocktails de dégustation et bartending flair. Formé à Paris et Barcelone.",
  },
  {
    id: "c2", name: "Sonia M.", specialty: "Mocktails & Wellness",
    experience: "5 ans", rating: 4.9, events: 94,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&q=80",
    tags: ["Sans alcool", "Fruité", "Bio"],
    bio: "Spécialiste en boissons wellness et mocktails élaborés. Certifiée sommelier.",
  },
  {
    id: "c3", name: "Yassine T.", specialty: "Whisky & Flair",
    experience: "10 ans", rating: 5.0, events: 240,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    tags: ["Whisky", "Old Fashioned", "Flair"],
    bio: "Champion régional de flair bartending. Expert whisky single malt et spiritueux rares.",
  },
];

// ─── TIME SLOTS (checkout) ────────────────────────────────────
export const timeSlots = [
  { time: "10:00", available: true  },
  { time: "10:30", available: false },
  { time: "11:00", available: true  },
  { time: "11:30", available: true  },
  { time: "12:00", available: true  },
  { time: "12:30", available: false },
  { time: "14:00", available: true  },
  { time: "14:30", available: true  },
  { time: "15:00", available: true  },
  { time: "15:30", available: false },
  { time: "16:00", available: true  },
  { time: "16:30", available: true  },
  { time: "17:00", available: true  },
  { time: "17:30", available: true  },
  { time: "18:00", available: true  },
  { time: "18:30", available: false },
  { time: "19:00", available: true  },
];

// ─── HELPERS ──────────────────────────────────────────────────
export const formatPrice = (price) =>
  new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("TND", "DT")
    .trim();

export const getCategories = () => [
  "Tous", "Whisky", "Champagne", "Vins", "Gin", "Rhum", "Vodka", "Bières", "Cocktails",
];
