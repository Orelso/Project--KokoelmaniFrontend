const exampleMtgCard = {
  object: "card",
  id: "f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3",
  oracle_id: "80240b6b-d20d-4dfb-a2c5-c272c3b43a70",
  multiverse_ids: [221112],
  mtgo_id: 38690,
  mtgo_foil_id: 38691,
  name: "Argivian Blacksmith",
  lang: "en",
  released_at: "2011-01-10",
  uri: "https://api.scryfall.com/cards/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3",
  scryfall_uri:
    "https://scryfall.com/card/me4/4/argivian-blacksmith?utm_source=api",
  layout: "normal",
  highres_image: true,
  image_status: "highres_scan",
  image_uris: {
    small:
      "https://cards.scryfall.io/small/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.jpg?1562952460",
    normal:
      "https://cards.scryfall.io/normal/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.jpg?1562952460",
    large:
      "https://cards.scryfall.io/large/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.jpg?1562952460",
    png: "https://cards.scryfall.io/png/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.png?1562952460",
    art_crop:
      "https://cards.scryfall.io/art_crop/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.jpg?1562952460",
    border_crop:
      "https://cards.scryfall.io/border_crop/front/f/1/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3.jpg?1562952460",
  },
  mana_cost: "{1}{W}{W}",
  cmc: 3,
  type_line: "Creature — Human Artificer",
  oracle_text:
    "{T}: Prevent the next 2 damage that would be dealt to target artifact creature this turn.",
  power: "2",
  toughness: "2",
  colors: ["W"],
  color_identity: ["W"],
  keywords: [],
  legalities: {
    standard: "not_legal",
    future: "not_legal",
    historic: "not_legal",
    gladiator: "not_legal",
    pioneer: "not_legal",
    explorer: "not_legal",
    modern: "not_legal",
    legacy: "legal",
    pauper: "legal",
    vintage: "legal",
    penny: "legal",
    commander: "legal",
    brawl: "not_legal",
    historicbrawl: "not_legal",
    alchemy: "not_legal",
    paupercommander: "legal",
    duel: "legal",
    oldschool: "not_legal",
    premodern: "not_legal",
  },
  games: ["mtgo"],
  reserved: false,
  foil: true,
  nonfoil: true,
  finishes: ["nonfoil", "foil"],
  oversized: false,
  promo: false,
  reprint: true,
  variation: false,
  set_id: "d38a13b7-6615-4c89-be7d-3b4eaacf1875",
  set: "me4",
  set_name: "Masters Edition IV",
  set_type: "masters",
  set_uri: "https://api.scryfall.com/sets/d38a13b7-6615-4c89-be7d-3b4eaacf1875",
  set_search_uri:
    "https://api.scryfall.com/cards/search?order=set&q=e%3Ame4&unique=prints",
  scryfall_set_uri: "https://scryfall.com/sets/me4?utm_source=api",
  rulings_uri:
    "https://api.scryfall.com/cards/f1fb4d0b-fa3f-4794-9285-89ddb9ac21c3/rulings",
  prints_search_uri:
    "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A80240b6b-d20d-4dfb-a2c5-c272c3b43a70&unique=prints",
  collector_number: "4",
  digital: true,
  rarity: "uncommon",
  flavor_text:
    "Through years of study and training, the Blacksmiths of Argive became adept at reassembling the mangled remains of the strange, mechanical creatures abounding in their native land.",
  card_back_id: "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
  artist: "Kerstin Kaman",
  artist_ids: ["41c51967-2bf2-462f-bb10-9d97ff2b2101"],
  illustration_id: "65fe81a3-cc57-4010-8ac2-8fd9d29a614c",
  border_color: "black",
  frame: "1997",
  full_art: false,
  textless: false,
  booster: true,
  story_spotlight: false,
  edhrec_rank: 23971,
  prices: {
    usd: null,
    usd_foil: null,
    usd_etched: null,
    eur: null,
    eur_foil: null,
    tix: "0.06",
  },
  related_uris: {
    gatherer:
      "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=221112",
    tcgplayer_infinite_articles:
      "https://infinite.tcgplayer.com/search?contentMode=article&game=magic&partner=scryfall&q=Argivian+Blacksmith&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall",
    tcgplayer_infinite_decks:
      "https://infinite.tcgplayer.com/search?contentMode=deck&game=magic&partner=scryfall&q=Argivian+Blacksmith&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall",
    edhrec: "https://edhrec.com/route/?cc=Argivian+Blacksmith",
  },
  purchase_uris: {
    tcgplayer:
      "https://www.tcgplayer.com/search/magic/product?productLineName=magic&q=Argivian+Blacksmith&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall&view=grid",
    cardmarket:
      "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Argivian+Blacksmith&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
    cardhoarder:
      "https://www.cardhoarder.com/cards/38690?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall",
  },
};
export type MTGCard = typeof exampleMtgCard;

export type CardCategory =
  | "Pokemon"
  | "MTG"
  | "Digimon"
  | "Yu-Gi-Oh"
  | "other tcg";

export type Collection = { category: CardCategory } & any; // TODO
