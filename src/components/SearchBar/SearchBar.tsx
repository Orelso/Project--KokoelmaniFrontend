/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Paper,
  Modal,
} from "@mui/material";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../../store";
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
import type { AnyCard } from "../../types";
import CommentSection from "../CommentSection";
import { Currency, CurrencyTab } from "../Currency";
import CreateCollection from "../../pages/create-collection/components/CreateCollection";
// import styles from "../styles/SearchBar.module.css"; className={styles.filter_card}
import { BACKEND_URL } from "../../constants";
import {
  MODIFIED_VALUES,
  HIDDEN_KEYS,
  RENAME_KEYS_MAP,
  KEYS_WITH_CLICKABLE_LINKS,
  getTableValue,
  startCase,
} from "./searchBarUtils";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const FilterCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [searchResults, setSearchResults] = useAtom<AnyCard[]>(
    searchResultsAtom
  ) as any;
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
    fetch(`${BACKEND_URL}/cards/name/${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(
          "🚀 ~ file: SearchBar.tsx:25 ~ .then ~ data",
          res,
          typeof res !== "undefined" && "data" in res ? res.data : null
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
    <div>
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
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
        {searchResults.slice(0, numResults).map((result) => {
          return (
            <SearchResult
              key={result.name}
              handleCardClick={handleCardClick}
              result={result}
              getTableValue={getTableValue}
            />
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
                  <CreateCollection selectedCardName={selectedCard.name} />
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
                    <CurrencyTab
                      defaultCurrency={Currency.USD}
                      onChange={(event) => {
                        console.log("TODO Currency changed", event);
                      }}
                    />
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
    </div>
  );
};
/* -----------------------------------------------------(MTG Mana Logo)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
export const LAND_SUBSTRING_TO_COLOR_MAP = {
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

export const LAND_SUBSTRING_TO_COLOR_MAP_POKEMON = {
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

export default FilterCard;

function SearchResult({
  handleCardClick,
  result,
  getTableValue,
}: {
  result: AnyCard;
  handleCardClick: (event) => void;
  getTableValue: (mana_cost: string) => any;
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={13}
      sx={{
        overflow: "hidden",
      }}
    >
      {/* --------------------------------------------------------------(Search Bar data shown)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <Table aria-label="simple table">
        <TableRow
          onClick={() => handleCardClick(result)}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <TableCell>{result.name}</TableCell>
          {/* --------------------------------------------------------------(YuGiOh Searchbar data displayed)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          {/* {result.card_sets && result.card_sets[0] && (
         <React.Fragment>
           <TableCell>Set: {result.card_sets[0].set_name}</TableCell>
           <TableCell>
             Rarity: {result.card_sets[0].set_rarity}
           </TableCell>
           <TableCell>
             Code: {result.card_sets[0].set_code}
           </TableCell>
         </React.Fragment>
        )} */}
          {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <TableCell>
            {/* Mana Cost */}
            {result.mana_cost && getTableValue(String(result.mana_cost))}
            {/* Games */}
            {result.released}
            {/* Funko Pop */}
            {result.title} {result.series}
          </TableCell>
          <TableCell>{result.lang && MODIFIED_VALUES[result.lang]}</TableCell>
          {/* MTG POKEMON */}
          <TableCell>{result.artist}</TableCell>
          <TableCell>{result.rarity}</TableCell>
          <TableCell>{result.types}</TableCell>
          {/* YUGIOH */}
          <TableCell>{result.type}</TableCell>
          <TableCell>{result.attribute}</TableCell>
          {/* DIGIMON */}
          <TableCell>{result.color}</TableCell>
          <TableCell>{result.set_name}</TableCell>
        </TableRow>
        <TableRow onClick={() => handleCardClick(result)}>
          <TableCell>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              title="Click Me"
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
}
