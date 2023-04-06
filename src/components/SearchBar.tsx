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
import forestImage from "../MTGImages/mtg-forest.jpg";
import islandImage from "../MTGImages/mtg-island.png";
import mountainImage from "../MTGImages/mtg-mountain.png";
import plainsImage from "../MTGImages/mtg-plains.png";
import swampImage from "../MTGImages/mtg-swamp.png";

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
  // keyword: [],
  // colors: [0],
  // mana_cost: replace(
  //   "{g}{g}",
  //   /{g}/g,
  //   '<img src="../MTGImages/mtg-forest.png" alt="Forest" />'
  // ),
};

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

const KEYS_WITH_CLICKABLE_LINKS = [
  "uri",
  "scryfall_uri",
  "set_uri",
  "set_search_uri",
  "scryfall_set_uri",
  "rulings_uri",
  "prints_search_uri",
];
const FilterCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedCard, setSelectedCard] = useState<null | AnyCard>(null);
  const [open, setOpen] = React.useState(false);

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    console.log("🚀 ~ file: SearchBar.tsx:29 ~ handleOnChange ~ value", value);
  };

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

  const handleCardClick = (card: null | AnyCard) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // prevent the default behavior of the enter key
            handleSubmit();
          }
        }}
      />

      {searchResults.map((result, index) => {
        return (
          <TableContainer
            key={index}
            component={Paper}
            elevation={13}
            sx={{ overflow: "hidden" }}
          >
            <Table aria-label="simple table">
              <TableRow onClick={() => handleCardClick(result)}>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.mana_cost}</TableCell>
                <TableCell>{result.lang}</TableCell>
                <TableCell>{result.artist}</TableCell>
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
                      result.card_images?.[0]?.image_url_small
                    }
                    onClick={() => handleCardClick(result)}
                  />
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        );
      })}

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
            {/*-- Modal close button --*/}
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/*-- Container for image and table and more --*/}
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <Typography>
                  <h1>{selectedCard.name}</h1>
                  <h6>{selectedCard.set_name}</h6>
                </Typography>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    selectedCard.image_uris?.border_crop ||
                    selectedCard.image_url ||
                    selectedCard.card_images?.[0]?.image_url
                  }
                  style={{ border: "8px solid black" }}
                  width="300"
                  height="300"
                />
                <Button>
                  <AddCircleOutlineRoundedIcon />
                  Collection
                </Button>
                <Button>
                  <AddCircleOutlineRoundedIcon />
                  Deck
                </Button>
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
                </div>
              </div>
            </div>

            <TableContainer
              sx={{ width: "20%", height: "450px", overflow: "auto" }}
            >
              <Table sx={{ border: "2px solid green" }}>
                <TableBody sx={{ border: "2px solid orange" }}>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid green" }}>
                      Name
                    </TableCell>
                    <TableCell>{selectedCard.name}</TableCell>
                  </TableRow>

                  {Object.entries(selectedCard).map(([key, val]) => {
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
                          <TableCell>{JSON.stringify(val)}</TableCell>
                        </TableRow>
                      );
                    }

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

function getTableValue(val: any): React.ReactNode {
  // detect if it includes a string like "{x}"
  const doesContainManacost = true; // TODO

  // split the input value based on certain strings
  const valArray = String(val).split(/{(.*?)}/g);

  // map the array of substrings to corresponding React Nodes
  const valNodes = valArray.map((substring) => {
    if (substring === "G") {
      return <img src={forestImage} alt="Forest" />;
    } else if (substring === "U") {
      return <img src={islandImage} alt="Island" />;
    } else if (substring === "R") {
      return <img src={mountainImage} alt="Mountain" />;
    } else if (substring === "W") {
      return <img src={plainsImage} alt="Plains" />;
    } else if (substring === "B") {
      return <img src={swampImage} alt="Swamp" />;
    } else {
      return substring;
    }
  });

  // return the mapped array of React Nodes
  return valNodes;
}

/** title case = turn e.g. "hi how" into "Hi How" */
function startCase(string: string) {
  return string
    .split(" ")
    .map(
      (word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1).toLowerCase()}`
    )
    .join(" ");
}

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
  /* .too {
    border: 2px solid green;
  }
  .too2 {
    border: 2px solid red;
  } */
`;

export default FilterCard;
