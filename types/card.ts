type ImageUris = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

const legalities = ["not_legal", "legal"] as const;
type Legalities = {
  standard: (typeof legalities)[number];
  future: (typeof legalities)[number];
  historic: (typeof legalities)[number];
  timeless: (typeof legalities)[number];
  gladiator: (typeof legalities)[number];
  pioneer: (typeof legalities)[number];
  explorer: (typeof legalities)[number];
  modern: (typeof legalities)[number];
  legacy: (typeof legalities)[number];
  pauper: (typeof legalities)[number];
  vintage: (typeof legalities)[number];
  penny: (typeof legalities)[number];
  commander: (typeof legalities)[number];
  oathbreaker: (typeof legalities)[number];
  brawl: (typeof legalities)[number];
  historicbrawl: (typeof legalities)[number];
  alchemy: (typeof legalities)[number];
  paupercommander: (typeof legalities)[number];
  duel: (typeof legalities)[number];
  oldschool: (typeof legalities)[number];
  premodern: (typeof legalities)[number];
  predh: (typeof legalities)[number];
};

type Prices = {
  usd: string;
  usd_foil: string;
  usd_etched: string | null;
  eur: string;
  eur_foil: string;
  tix: string;
};

type RelatedUris = {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
};

type PurchaseUris = {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
};

type FrameEffects = "legendary"; // Assuming a limited set of frame effects

export type Card = {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  mtgo_foil_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: ImageUris;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  power: string;
  toughness: string;
  colors: string[];
  color_identity: string[];
  keywords: string[];
  legalities: Legalities;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  frame_effects: FrameEffects[];
  security_stamp: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  penny_rank: number;
  prices: Prices;
  related_uris: RelatedUris;
  purchase_uris: PurchaseUris;
};
