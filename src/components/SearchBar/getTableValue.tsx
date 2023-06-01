import { Box } from "@mui/material";
import * as React from "react";
import Image from "next/image";
import LAND_SUBSTRING_TO_COLOR_MAP from "./SearchBar";
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
