import { Box } from "@mui/material";
import * as React from "react";
import Image from "next/image";
/* -----------------------------------------------------(MTG Mana Logo)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const LAND_SUBSTRING_TO_COLOR_MAP = {
  G: "forest",
  U: "island",
  B: "swamp",
  R: "mountain",
  W: "plains",
  S: "snow-mana",
  X: "x-generic-mana",
  C: "colorless-mana",
  1: "colorless-mana1",
  2: "colorless-mana2",
  3: "colorless-mana3",
  4: "colorless-mana4",
  5: "colorless-mana5",
  6: "colorless-mana6",
  7: "colorless-mana7",
  8: "colorless-mana8",
  9: "colorless-mana9",
  10: "colorless-mana10",
  11: "colorless-mana11",
  12: "colorless-mana12",
  13: "colorless-mana13",
  14: "colorless-mana14",
  15: "colorless-mana15",
  16: "colorless-mana16",
  17: "colorless-mana17",
  18: "colorless-mana18",
  19: "colorless-mana19",
  20: "colorless-mana20",
  "2/W": "2generic-or-1white-mana",
  "2/U": "2generic-or-1blue-mana",
  "2/B": "2generic-or-1black-mana",
  "2/R": "2generic-or-1red-mana",
  "2/G": "2generic-or-1green-mana",
  "W/U": "white-or-blue-mana",
  "U/B": "blue-or-black-mana",
  "B/R": "black-or-red-mana",
  "R/G": "red-or-green-mana",
  "G/W": "green-or-white-mana",
  "U/R": "blue-or-red-mana",
  "B/G": "black-or-green-mana",
  "R/W": "red-or-white-mana",
  "G/U": "green-or-blue-mana",
  "W/B": "white-or-black-mana",
  "G/U/P": "GUP",
  "B/P": "blackmana-or-2life",
  "U/P": "bluemana-or-2life",
  "G/P": "greenmana-or-2life",
  "W/P": "whitemana-or-2life",
  "R/P": "redmana-or-2life",
};

const LAND_SUBSTRING_TO_COLOR_MAP_POKEMON = {
  Psychic: "Pokemon-psychic-energy",
  Grass: "Pokemon-grass-energy",
  Fire: "Pokemon-fire-energy",
  Water: "Pokemon-water-energy",
  Electric: "Pokemon-electric-energy",
  Fighting: "Pokemon-fighting-energy",
  Dark: "Pokemon-dark-energy",
  Metal: "Pokemon-metal-energy",
  Fairy: "Pokemon-fairy-energy",
  Dragon: "Pokemon-dragon-energy",
  Colorless: "Pokemon-colorless-energy",
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export function getTableValue(val: any): React.ReactNode {
  if (Array.isArray(val)) {
    val = val.map((i: string) => `{${i}}`).join("");
  }

  console.log(val);
  const valArray = String(val).split(/[{}]/);

  const valNodes = valArray.map((substring, idx) => {
    //This pattern is designed to match different types of mana symbols or numbers.
    const isManaSymbolOrNumberMTG =
      /^(\d+|[A-Z\d]+\/[A-Z]+\/[A-Z]|[A-Z\d]+\/[A-Z]|[A-Z][A-Z/]*)$/.test(
        substring
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const landColor: string = LAND_SUBSTRING_TO_COLOR_MAP[`${substring}`];
    // if we're not looking at a G, U, etc right now, return string
    if (!isManaSymbolOrNumberMTG || !landColor) {
      return substring;
    }
    return (
      <Image
        width={20}
        height={20}
        key={idx}
        src={`/MTGImagesMana/mtg-${landColor}.jpg`}
        alt={startCase(landColor)}
      />
    );
  });

  return <Box display="flex">{valNodes}</Box>;
}
/* ---------------------------------------------------------(Title case = turn "hi how" into "Hi How")----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export function startCase(string: string) {
  return string
    .split(" ")
    .map(
      (word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1).toLowerCase()}`
    )
    .join(" ");
}

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const MODIFIED_VALUES = {
  es: "Spanish",
  en: "English",
  it: "Italian",
  ja: "Japanese",
  zht: "Traditional Chinese",
  zhs: "Simplified Chinese",
  de: "German",
  pt: "Portuguese",
  ko: "Korean",
  ru: "Russian",
  fr: "French",
  ph: "Phyrexian",
  card: "Magic The Gathering",
  false: "No",
  true: "Yes",
  normal: "Normal",
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const HIDDEN_KEYS = [
  /*MTG*/
  "multiverse_ids",
  "id",
  "mtgo_id",
  "mtgo_foil_id",
  "tcgplayer_id",
  "cardmarket_id",
  "highres_image",
  "image_status",
  "produced_mana",
  "set_id",
  "set",
  "collector_number",
  "artist_ids",
  "frame",
  "story_spotlight",
  "oracle_id",
  "image_uris",
  "card_back_id",
  "illustration_id",
  "name",
  "prices",
  "edhrec_rank",
  "textless",
  "booster",
  "uri",
  "scryfall_uri",
  "cmc",
  "games",
  "finishes",
  "set_uri",
  "set_search_uri",
  "scryfall_set_uri",
  "rulings_uri",
  "prints_search_uri",
  /*Pokemon*/
  "images",
];
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const RENAME_KEYS_MAP = {
  object: "category",
  lang: "language",
  released_at: "released",
  mana_cost: "mana cost",
  type_line: "type",
  oracle_text: "flavor text",
  color_identity: "color identity",
  set_name: "set name",
  set_type: "set type",
  border_color: "border color",
  full_art: "full art",
  flavor_text: "Flavor Text",
  printed_name: "Printed Name",
  printed_text: "Printed Text",
  printed_type_line: "Printed Type",

  /*Pokemon */
  convertedretreatcost: "Evolves to",
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
