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
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { AnyCard } from "../types";

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
                    selectedCard.image_uris?.normal ||
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
                    function replace(str, pattern, replacement) {
                      return str.replace(pattern, replacement);
                    }

                    const modifiedValues = {
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
                      keyword: ["csdbkjb"],
                      // colors: [0],
                      // mana_cost: replace(
                      //   "{g}{g}",
                      //   /{g}/g,
                      //   '<img src="../MTGImages/mtg-forest.png" alt="Forest" />'
                      // ),
                    };

                    if (
                      key === "multiverse_ids" ||
                      key === "id" ||
                      key === "mtgo_id" ||
                      key === "mtgo_foil_id" ||
                      key === "tcgplayer_id" ||
                      key === "cardmarket_id" ||
                      key === "highres_image" ||
                      key === "image_status" ||
                      key === "produced_mana" ||
                      key === "set_id" ||
                      key === "set" ||
                      key === "collector_number" ||
                      key === "artist_ids" ||
                      key === "frame" ||
                      key === "story_spotlight	" ||
                      key === "oracle_id" ||
                      key === "image_uris" ||
                      key === "card_back_id" ||
                      key === "illustration_id" ||
                      key === "name"
                    ) {
                      return null; // Skip this iteration of the map loop
                    } else if (key === "object") {
                      key = "category";
                    } else if (key === "lang") {
                      key = "language";
                    } else if (key === "released_at") {
                      key = "released";
                    } else if (key === "mana_cost") {
                      key = "mana cost";
                    } else if (key === "type_line") {
                      key = "type";
                    } else if (key === "oracle_text") {
                      key = "flavor text";
                    } else if (key === "color_identity") {
                      key = "color identity";
                    } else if (key === "set_name") {
                      key = "set name";
                    } else if (key === "set_type") {
                      key = "set type";
                    } else if (key === "border_color") {
                      key = "border color";
                    } else if (key === "full_art") {
                      key = "full art";
                    }

                    if (key === "modified") {
                      val = "modified value"; // replace the value with a new one
                    } else if (
                      modifiedValues[val as keyof typeof modifiedValues]
                    ) {
                      val = modifiedValues[val as keyof typeof modifiedValues];
                    }

                    if (typeof val === "object") {
                      return (
                        <TableRow key={key}>
                          <TableCell>{startCase(key)}</TableCell>
                          <TableCell>{JSON.stringify(val)}</TableCell>
                        </TableRow>
                      );
                    }

                    if (
                      key === "uri" ||
                      key === "scryfall_uri" ||
                      key === "set_uri" ||
                      key === "set_search_uri" ||
                      key === "scryfall_set_uri" ||
                      key === "rulings_uri" ||
                      key === "prints_search_uri"
                    ) {
                      return (
                        <TableRow key={key}>
                          <TableCell>{startCase(key)}</TableCell>
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
                        <TableCell>{startCase(key)}</TableCell>
                        <TableCell>{startCase(String(val))}</TableCell>
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
