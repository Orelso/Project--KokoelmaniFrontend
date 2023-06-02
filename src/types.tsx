export type PokemonCard = {
  name: string;
  type: string;
  color: string;
  stage: string;
  digi_type: string;
  attribute: string;
  level: string;
  play_cost: string;
  evolution_cost: string;
  cardrarity: string;
  artist: string;
  dp: string;
  cardnumber: string;
  maineffect: string;
  set_name: string;
  card_sets: string;
  img_url: string;
};

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

const exampleYuGiOhCard = {
  id: 46986414,
  name: "Dark Magician",
  type: "Normal Monster",
  frameType: "normal",
  desc: "''The ultimate wizard in terms of attack and defense.''",
  atk: 2500,
  def: 2100,
  level: 7,
  race: "Spellcaster",
  attribute: "DARK",
  archetype: "Dark Magician",
  card_sets: [
    {
      set_name: "2016 Mega-Tins",
      set_code: "CT13-EN003",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "6.97",
    },
    {
      set_name: "2017 Mega-Tins",
      set_code: "CT14-EN001",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "9.66",
    },
    {
      set_name: "Battle of Chaos",
      set_code: "25TH-EN001",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "0.00",
    },
    {
      set_name: "Booster Pack Collectors Tins 2002",
      set_code: "BPT-001",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "63.01",
    },
    {
      set_name: "Collectible Tins 2003",
      set_code: "BPT-007",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "19.08",
    },
    {
      set_name: "Dark Beginning 1",
      set_code: "DB1-EN102",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "25.2",
    },
    {
      set_name: "Dark Legends",
      set_code: "DLG1-EN004",
      set_rarity: "Rare",
      set_rarity_code: "(R)",
      set_price: "11.64",
    },
    {
      set_name: "Duel Power",
      set_code: "DUPO-EN101",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "3.52",
    },
    {
      set_name: "Duel Terminal - Preview Wave 1",
      set_code: "DTP1-EN002",
      set_rarity: "Duel Terminal Normal Parallel Rare",
      set_rarity_code: "(DNPR)",
      set_price: "0.00",
    },
    {
      set_name: "Duel Terminal - Preview Wave 2",
      set_code: "DTP1-EN002",
      set_rarity: "Duel Terminal Rare Parallel Rare",
      set_rarity_code: "(DRPR)",
      set_price: "0.00",
    },
    {
      set_name: "Duel Terminal 1",
      set_code: "DT01-EN002",
      set_rarity: "Duel Terminal Rare Parallel Rare",
      set_rarity_code: "(DRPR)",
      set_price: "14.78",
    },
    {
      set_name: "Duelist League 2 participation cards",
      set_code: "DL11-EN001",
      set_rarity: "Rare",
      set_rarity_code: "(R)",
      set_price: "70.6",
    },
    {
      set_name: "Duelist Pack: Battle City",
      set_code: "DPBC-EN008",
      set_rarity: "Super Rare",
      set_rarity_code: "(SR)",
      set_price: "3.7",
    },
    {
      set_name: "Duelist Pack: Yugi",
      set_code: "DPYG-EN001",
      set_rarity: "Rare",
      set_rarity_code: "(R)",
      set_price: "2.24",
    },
    {
      set_name: "Duelist Saga",
      set_code: "DUSA-EN100",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "11.34",
    },
    {
      set_name: "Forbidden Legacy",
      set_code: "FL1-EN002",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "16.26",
    },
    {
      set_name: "Ghosts From the Past",
      set_code: "GFTP-EN128",
      set_rarity: "Ghost Rare",
      set_rarity_code: "(GR)",
      set_price: "742",
    },
    {
      set_name: "KC Grand Tournament 2021 prize card",
      set_code: "2021-EN001",
      set_rarity: "Extra Secret Rare",
      set_rarity_code: "",
      set_price: "0.00",
    },
    {
      set_name: "Legend of Blue Eyes White Dragon",
      set_code: "LOB-005",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "46.71",
    },
    {
      set_name: "Legend of Blue Eyes White Dragon",
      set_code: "LOB-E003",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "53.66",
    },
    {
      set_name: "Legend of Blue Eyes White Dragon",
      set_code: "LOB-EN005",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "49.41",
    },
    {
      set_name: "Legendary Collection",
      set_code: "LC01-EN005",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "4.43",
    },
    {
      set_name: "Legendary Collection 3: Yugi's World Mega Pack",
      set_code: "LCYW-EN001",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "10.84",
    },
    {
      set_name: "Legendary Decks II",
      set_code: "LDK2-ENY10",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "2.35",
    },
    {
      set_name: "Legendary Dragon Decks",
      set_code: "LEDD-ENA01",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "1.72",
    },
    {
      set_name: "Maximum Gold",
      set_code: "MAGO-EN002",
      set_rarity: "Premium Gold Rare",
      set_rarity_code: "(PG)",
      set_price: "11.91",
    },
    {
      set_name: "Retro Pack",
      set_code: "RP01-EN003",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "503.21",
    },
    {
      set_name: "Shonen Jump Vol. 9, Issue 4 promotional card",
      set_code: "JUMP-EN049",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "129.27",
    },
    {
      set_name: "Speed Duel Starter Decks: Destiny Masters",
      set_code: "SS01-ENA01",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "1.61",
    },
    {
      set_name: "Speed Duel Starter Decks: Match of the Millennium",
      set_code: "SS04-ENA01",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "2",
    },
    {
      set_name: "Speed Duel Tournament Pack 1",
      set_code: "STP1-EN001",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "22.78",
    },
    {
      set_name: "Speed Duel: Battle City Box",
      set_code: "SBCB-EN001",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "1.55",
    },
    {
      set_name: "Speed Duel: Battle City Box",
      set_code: "SBCB-EN001",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "6.53",
    },
    {
      set_name: "Starter Deck: Yugi",
      set_code: "SDY-006",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "9.96",
    },
    {
      set_name: "Starter Deck: Yugi",
      set_code: "SDY-E005",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "24.46",
    },
    {
      set_name: "Starter Deck: Yugi Evolution",
      set_code: "SYE-001",
      set_rarity: "Super Rare",
      set_rarity_code: "(SR)",
      set_price: "6.37",
    },
    {
      set_name: "Starter Deck: Yugi Reloaded",
      set_code: "YSYR-EN001",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "2.34",
    },
    {
      set_name: "Starter Deck: Yugi Reloaded",
      set_code: "YSYR-EN001",
      set_rarity: "Ultimate Rare",
      set_rarity_code: "(UtR)",
      set_price: "12.75",
    },
    {
      set_name: "Structure Deck: Spellcaster's Judgment",
      set_code: "SD6-EN003",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "2.26",
    },
    {
      set_name: "Structure Deck: Yugi Muto",
      set_code: "SDMY-EN010",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "1.8",
    },
    {
      set_name: "WSJ Jump Pack Fall 2016 promotional card",
      set_code: "JMPS-EN003",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "171.83",
    },
    {
      set_name: "Yu-Gi-Oh! Dark Duel Stories promotional cards",
      set_code: "DDS-002",
      set_rarity: "Prismatic Secret Rare",
      set_rarity_code: "(PScR)",
      set_price: "797.61",
    },
    {
      set_name: "Yu-Gi-Oh! Power of Chaos: Yugi the Destiny promotional cards",
      set_code: "PCY-004",
      set_rarity: "Prismatic Secret Rare",
      set_rarity_code: "(PScR)",
      set_price: "82.23",
    },
    {
      set_name: "Yu-Gi-Oh! Power of Chaos: Yugi the Destiny promotional cards",
      set_code: "PCY-E004",
      set_rarity: "Prismatic Secret Rare",
      set_rarity_code: "(PScR)",
      set_price: "74.4",
    },
    {
      set_name: "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack",
      set_code: "MVP1-EN054",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "3.3",
    },
    {
      set_name:
        "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack Secret Edition",
      set_code: "MVP1-ENS54",
      set_rarity: "Secret Rare",
      set_rarity_code: "(ScR)",
      set_price: "19.53",
    },
    {
      set_name:
        "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack Secret Edition",
      set_code: "MVP1-ENSV3",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "4.19",
    },
    {
      set_name:
        "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack Special Edition",
      set_code: "MVP1-ENSE3",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "4.11",
    },
    {
      set_name:
        "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack: Gold Edition",
      set_code: "MVP1-ENG54",
      set_rarity: "Gold Rare",
      set_rarity_code: "(GUR)",
      set_price: "5.83",
    },
    {
      set_name:
        "Yu-Gi-Oh! The Dark Side of Dimensions Movie Pack: Gold Edition",
      set_code: "MVP1-ENGV3",
      set_rarity: "Gold Secret Rare",
      set_rarity_code: "(GScR)",
      set_price: "8.39",
    },
    {
      set_name: "Yugi & Kaiba Collector Box",
      set_code: "YUCB-EN001",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "5.63",
    },
    {
      set_name: "Yugi's Legendary Decks",
      set_code: "YGLD-ENA03",
      set_rarity: "Common",
      set_rarity_code: "(C)",
      set_price: "1.7",
    },
    {
      set_name: "Yugi's Legendary Decks",
      set_code: "YGLD-ENC09",
      set_rarity: "Ultra Rare",
      set_rarity_code: "(UR)",
      set_price: "4.04",
    },
  ],
  card_images: [
    {
      id: 46986414,
      image_url: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986414.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986414.jpg",
    },
    {
      id: 46986415,
      image_url: "https://images.ygoprodeck.com/images/cards/46986415.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986415.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986415.jpg",
    },
    {
      id: 46986416,
      image_url: "https://images.ygoprodeck.com/images/cards/46986416.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986416.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986416.jpg",
    },
    {
      id: 46986417,
      image_url: "https://images.ygoprodeck.com/images/cards/46986417.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986417.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986417.jpg",
    },
    {
      id: 46986418,
      image_url: "https://images.ygoprodeck.com/images/cards/46986418.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986418.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986418.jpg",
    },
    {
      id: 46986419,
      image_url: "https://images.ygoprodeck.com/images/cards/46986419.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986419.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986419.jpg",
    },
    {
      id: 36996508,
      image_url: "https://images.ygoprodeck.com/images/cards/36996508.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/36996508.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/36996508.jpg",
    },
    {
      id: 46986420,
      image_url: "https://images.ygoprodeck.com/images/cards/46986420.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986420.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986420.jpg",
    },
    {
      id: 46986421,
      image_url: "https://images.ygoprodeck.com/images/cards/46986421.jpg",
      image_url_small:
        "https://images.ygoprodeck.com/images/cards_small/46986421.jpg",
      image_url_cropped:
        "https://images.ygoprodeck.com/images/cards_cropped/46986421.jpg",
    },
  ],
};
export type YuGiOhCard = typeof exampleYuGiOhCard;

const exampleDigimonCard = {
  name: "MetalGreymon",
  type: "Digimon",
  color: "Yellow",
  stage: "Ultimate",
  digi_type: "Android",
  attribute: "Virus",
  level: null,
  play_cost: null,
  evolution_cost: null,
  cardrarity: null,
  artist: null,
  dp: null,
  cardnumber: "BO-01",
  maineffect: null,
  soureeffect: null,
  set_name: "Series 1 Booster Pack",
  card_sets: ["Series 1 Booster Pack"],
  image_url: "https://images.digimoncard.io/images/cards/BO-01.jpg",
};
export type DigimonCard = typeof exampleDigimonCard;

const exampleFleshBlood = {
  unique_id: "WDJgQgDCwjbKRTJ8BTz8C",
  name: "Shitty Xmas Present",
  pitch: "2",
  cost: "0",
  power: "",
  defense: "2",
  health: "",
  intelligence: "",
  types: ["Generic", "Action"],
  card_keywords: [],
  abilities_and_effects: [],
  ability_and_effect_keywords: [],
  granted_keywords: [],
  removed_keywords: [],
  interacts_with_keywords: [],
  functional_text:
    "Put a Cracked Bauble from outside the game on top of target hero's deck.",
  functional_text_plain:
    "Put a Cracked Bauble from outside the game on top of target hero's deck.",
  flavor_text: "Socks. Again?!",
  flavor_text_plain: "Socks. Again?!",
  type_text: "Generic Action",
  played_horizontally: false,
  blitz_legal: false,
  cc_legal: false,
  commoner_legal: false,
  blitz_living_legend: false,
  cc_living_legend: false,
  blitz_banned: false,
  cc_banned: false,
  commoner_banned: false,
  upf_banned: false,
  blitz_suspended: false,
  cc_suspended: false,
  commoner_suspended: false,
  variation_unique_id: "9phnJ7RdKkgqGnzC7nwgR",
  set_edition_unique_id: "Cbc6mFhKFNdqtCTJ9wwGJ",
  id: "LGS099",
  set_id: "LGS",
  edition: "N",
  foilings: ["R"],
  rarity: "P",
  artist: "Sam Yang",
  art_variation: null,
  image_url:
    "https://storage.googleapis.com/fabmaster/cardfaces/promos/LGS099.png",
};
export type FleshBlood = typeof exampleFleshBlood;

const exampleFunkoPop = {
  handle: "black-panther",
  title: "Black Panther",
  imageName:
    "https://images.hobbydb.com/processed_uploads/catalog_item_photo/catalog_item_photo/image/897627/Black_Panther_Shirts_and_Jackets_0490e751-49fc-42a3-bf83-d59d3acd753e_large.jpg",
  series: ["Pop! Tees & Apparel", "Funko Target Exclusives"],
};
export type FunkoPop = typeof exampleFunkoPop;

export type CardCategory =
  | "Pokemon"
  | "MTG"
  | "Digimon"
  | "YuGiOh"
  | "other tcg";

export type Collection = { category: CardCategory } & any;

export type AnyCard = {
  name: string;
  platforms: { platform: { name: string } }[];
  card_images?: { image_url: string; image_url_small: string }[];
  imageName: string;
  background_image: string;
  images: { large: string; small: string };
  released?: string;
  title?: string;
  series?: string;
  types?: string;
  token_name?: string;
  card_faces?: string;
  set?: { id: string; name: string; series: string };
  resourceURI: string;
} & Partial<DigimonCard & PokemonCard & MTGCard>;
