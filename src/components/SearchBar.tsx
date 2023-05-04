import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../store";
import { Paper } from "@mui/material";
import { Modal } from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { AnyCard } from "../types";
import Image from "next/image";
import CommentSection from "./CommentSection";
import { CurrencyTab } from "./Currency";
import CreateCollection from "../pages/create-collection/components/CreateCollection";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const MODIFIED_VALUES = {
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
const HIDDEN_KEYS = [
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
];
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const RENAME_KEYS_MAP = {
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
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const KEYS_WITH_CLICKABLE_LINKS = [
  "uri",
  "scryfall_uri",
  "set_uri",
  "set_search_uri",
  "scryfall_set_uri",
  "rulings_uri",
  "prints_search_uri",
];
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const FilterCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedCard, setSelectedCard] = useState<null | AnyCard>(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [numResults, setNumResults] = useState(6); // Display the first 6 items by default

  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleModalClose = () => {
    setOpenModal(false);
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    console.log("🚀 ~ file: SearchBar.tsx:29 ~ handleOnChange ~ value", value);
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleSubmit = () => {
    fetch(`http://localhost:5051/api/v1/all/cards/name/${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(
          "🚀 ~ file: SearchBar.tsx:25 ~ .then ~ data",
          res,
          typeof res !== "undefined" && "data" in res ? res.data : null
        );
        setSearchResults(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleCardClick = (card: null | AnyCard) => {
    setSelectedCard(card);
    setOpen(true);
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleClose = () => {
    setOpen(false);
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <FilterCardStyles>
      <TextField
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Search..."
        onChange={handleOnChange}
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          ),
        }}
        /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <>
        {searchResults.slice(0, numResults).map((result, index) => {
          return (
            <TableContainer
              key={index}
              component={Paper}
              elevation={13}
              sx={{ overflow: "hidden" }}
            >
              {/* --------------------------------------------------------------(Search Bar data shown)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
              <Table aria-label="simple table">
                <TableRow
                  onClick={() => handleCardClick(result)}
                  sx={{ display: "flex", flexWrap: "nowrap" }}
                >
                  <TableCell>{result.name}</TableCell>
                  {/* --------------------------------------------------------------(YuGiOh Searchbar data displayed)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                  {result.card_sets && result.card_sets[0] && (
                    <React.Fragment>
                      <TableCell>Set: {result.card_sets[0].set_name}</TableCell>
                      <TableCell>
                        Rarity: {result.card_sets[0].set_rarity}
                      </TableCell>
                      <TableCell>
                        Code: {result.card_sets[0].set_code}
                      </TableCell>
                    </React.Fragment>
                  )}
                  {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

                  <TableCell>
                    {result.mana_cost && getTableValue(result.mana_cost)}
                    {result.released && result.released}
                    {result.series && result.series}
                  </TableCell>
                  <TableCell>
                    {result.lang &&
                      (MODIFIED_VALUES[result.lang] || "#" + result.number)}
                  </TableCell>
                  <TableCell>{result.artist && result.artist}</TableCell>
                  <TableCell>
                    {result.cardnumber && result.cardnumber}
                  </TableCell>
                  <TableCell>
                    {result.frame &&
                      (MODIFIED_VALUES[result.frame] || result.rarity)}
                  </TableCell>
                </TableRow>
                <TableRow onClick={() => handleCardClick(result)}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      title="Image title"
                      alt=""
                      width="47"
                      height="0"
                      src={
                        result.image_uris?.small ||
                        result.image_url ||
                        result.images?.small ||
                        result.card_images?.[0]?.image_url_small ||
                        result.imageName ||
                        result.background_image
                      }
                      onClick={() => handleCardClick(result)}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          );
        })}
        {/* --------------------------------------------------------------(Search Bar - Load More Button)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        {searchResults.length > numResults && (
          <Button
            variant="contained"
            onClick={() => setNumResults(numResults + 6)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Load More
          </Button>
        )}
      </>

      {/* --------------------------------------------------------------(Search Bar MODAL data shown)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {selectedCard && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              display: "absolute",
              flexDirection: "column",
              alignItems: "center",
              border: "10px solid purple",
              height: "100%",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <Typography>
                  <h1 style={{ fontSize: "2rem" }}>{selectedCard.name}</h1>
                  <h6>{selectedCard.set_name}</h6>
                </Typography>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    selectedCard.image_uris?.border_crop ||
                    selectedCard.image_url ||
                    selectedCard.card_images?.[0]?.image_url ||
                    selectedCard.imageName ||
                    selectedCard.background_image ||
                    selectedCard.images.large
                  }
                  style={{ border: "8px solid black" }}
                  width="400"
                />
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <Button onClick={handleModalOpen}>
                  <AddCircleOutlineRoundedIcon />
                  Collection
                </Button>
                <Modal open={openModal} onClose={handleModalClose}>
                  <CreateCollection />
                </Modal>
                <Button>
                  <AddCircleOutlineRoundedIcon />
                  Deck
                </Button>
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: 40,
                  }}
                >
                  <h3 style={{ marginRight: "20px" }}>Today{"'"}s Average</h3>
                  <h3 style={{ marginRight: "20px" }}>All Time high</h3>
                  <h3>All Time Low</h3>
                  <h3>
                    <CurrencyTab />
                  </h3>
                </div>
                <CommentSection />
              </div>
            </div>
            {/* -------------------------------------------------------------------(Card/Item Data)------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <TableContainer
              sx={{
                minHeight: 100,
                height: "450px",
                overflow: "auto",
                width: "400px",
              }}
            >
              <Table sx={{ border: "2px solid green" }}>
                <TableBody sx={{ border: "2px solid orange" }}>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid green" }}>
                      Name
                    </TableCell>
                    <TableCell>{selectedCard.name}</TableCell>
                  </TableRow>
                  {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                  {Object.entries(selectedCard).map(([key, val]) => {
                    console.log(selectedCard);
                    if (HIDDEN_KEYS.includes(key)) {
                      return null; // Skip this iteration of the map loop
                    } // Changing the words to more suitable constants
                    let renamedKey = key;
                    const shouldRenameKey =
                      // Object.keys(RENAME_KEYS_MAP).includes(key);
                      key in RENAME_KEYS_MAP;
                    if (shouldRenameKey) {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      renamedKey = RENAME_KEYS_MAP[key];
                    }

                    if (key === "modified") {
                      val = "modified value"; // replace the value with a new one
                    } else if (
                      MODIFIED_VALUES[val as keyof typeof MODIFIED_VALUES]
                    ) {
                      val =
                        MODIFIED_VALUES[val as keyof typeof MODIFIED_VALUES];
                    }

                    if (typeof val === "object") {
                      return (
                        <TableRow key={key}>
                          <TableCell>{startCase(key)}</TableCell>
                          <TableCell sx={{ wordBreak: "break-word;" }}>
                            {JSON.stringify(val)}
                          </TableCell>
                        </TableRow>
                      );
                    }
                    /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    if (KEYS_WITH_CLICKABLE_LINKS.includes(key)) {
                      return (
                        <TableRow key={key}>
                          <TableCell>{startCase(renamedKey)}</TableCell>
                          <TableCell>
                            <a
                              href={val}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {val}
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    return (
                      <TableRow key={key}>
                        <TableCell>{startCase(renamedKey)}</TableCell>
                        <TableCell>{getTableValue(val)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      )}
    </FilterCardStyles>
  );
};
/* -----------------------------------------------------(MTG Mana Logo)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const LAND_SUBSTRING_TO_COLOR_MAP = {
  G: "forest",
  U: "island",
  B: "swamp",
  R: "mountain",
  W: "plains",
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
  // "G/U/P": "GUP",
  "B/P": "blackmana-or-2life",
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function getTableValue(val: any): React.ReactNode {
  if (Array.isArray(val)) {
    val = val.map((i: string) => `{${i}}`).join("");
  }

  console.log(val);
  const valArray = String(val).split(/[{}]/);

  const valNodes = valArray.map((substring, idx) => {
    //This pattern is designed to match different types of mana symbols or numbers.
    const isManaSymbolOrNumber =
      /^(\d+|[A-Z\d]+\/[A-Z]+\/[A-Z]|[A-Z\d]+\/[A-Z]|[A-Z][A-Z/]*)$/.test(
        substring
      );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const landColor: string = LAND_SUBSTRING_TO_COLOR_MAP[`${substring}`];
    // if we're not looking at a G, U, etc right now, return string
    if (!isManaSymbolOrNumber || !landColor) {
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
function startCase(string: string) {
  return string
    .split(" ")
    .map(
      (word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1).toLowerCase()}`
    )
    .join(" ");
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const FilterCardStyles = styled.div`
  max-width: 600px;
  width: 90vw;
  margin: auto;
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    transform: scale(1.05);
  }
  .MuiTextField-root {
    align-items: center;
    width: 100%;
  }
  .MuiInputBase-input {
    width: 50vw;
  }
`;

export default FilterCard;
