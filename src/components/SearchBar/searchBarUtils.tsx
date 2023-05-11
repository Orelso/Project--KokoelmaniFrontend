import { Box } from "@mui/material";
import * as React from "react";
import Image from "next/image";
import { LAND_SUBSTRING_TO_COLOR_MAP } from "./SearchBar";

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
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const HIDDEN_KEYS = [
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
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
