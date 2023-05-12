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
import type { AnyCard, MTGCard } from "../../types";
import CommentSection from "../CommentSection";
import { Currency, CurrencyTab } from "../Currency";
import CreateCollection from "../../pages/create-collection/components/CreateCollection";
// import styles from "../styles/SearchBar.module.css"; className={styles.filter_card}
import { BACKEND_URL } from "../../constants";
import {
  MODIFIED_VALUES,
  HIDDEN_KEYS,
  RENAME_KEYS_MAP,
  getTableValue,
  startCase,
} from "./searchBarUtils";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedCard, setSelectedCard] = useState<null | AnyCard>(null);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [numResults, setNumResults] = useState(6); // Display the first 6 items by default
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
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
  };
  /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handleSubmit = () => {
    fetch(`${BACKEND_URL}/cards/name/${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // check if it's an array, if not, console.error
        if (Array.isArray(res)) {
          setSearchResults(res);
        } else {
          console.error("not an array type!", res);
        }
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
        {searchResults.slice(0, numResults).map((result, index) => {
          return (
            <SearchResult
              key={`${result.name}-${index}`}
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
                <Typography>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>
                      <button onClick={handleLike}>👍</button>
                      <p>{likes}</p>
                    </div>

                    <div>
                      <button onClick={handleDislike}>👎</button>
                      <p>{dislikes}</p>
                    </div>
                  </div>
                </Typography>

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

                <p>Total Likes Rank: {likes - dislikes}</p>

                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <Button onClick={handleModalOpen}>
                  <AddCircleOutlineRoundedIcon />
                  Collection
                </Button>
                <Modal open={openModal} onClose={handleModalClose}>
                  <CreateCollection selectedCardName={selectedCard} />
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
                    if (HIDDEN_KEYS.includes(key)) {
                      return null; // Skip this iteration of the map loop
                    }

                    let renamedKey = key;
                    const shouldRenameKey = key in RENAME_KEYS_MAP;
                    if (shouldRenameKey) {
                      renamedKey = RENAME_KEYS_MAP[key];
                    }

                    if (key === "modified") {
                      val = "modified value";
                    } else if (
                      MODIFIED_VALUES[val as keyof typeof MODIFIED_VALUES]
                    ) {
                      val =
                        MODIFIED_VALUES[val as keyof typeof MODIFIED_VALUES];
                    }

                    if (typeof val === "object" && !Array.isArray(val)) {
                      if (key === "legalities") {
                        return (
                          <TableRow key={key}>
                            <TableCell>{startCase(key)}</TableCell>
                            <TableCell>
                              {Object.entries(val as MTGCard["legalities"]).map(
                                ([subKey, subVal]) => (
                                  <React.Fragment key={subVal}>
                                    <span>
                                      {startCase(subKey)}: ${subVal}
                                    </span>
                                    <br />
                                  </React.Fragment>
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      } else if (key === "related_uris") {
                        const [firstUriKey, firstUriVal] = Object.entries(
                          val as MTGCard["related_uris"]
                        )[0];
                        return (
                          <TableRow key={`${key}-${firstUriKey}`}>
                            <TableCell>{`${startCase(key)} - ${startCase(
                              firstUriKey
                            )}`}</TableCell>
                            <TableCell>{firstUriVal}</TableCell>
                          </TableRow>
                        );
                      } else {
                        return typeof val === "object" && !Array.isArray(val)
                          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            Object.entries(val).map(
                              ([subKey, subVal], index) => (
                                <TableRow key={`${key}-${subKey}-${index}`}>
                                  <TableCell>{`${startCase(key)} - ${startCase(
                                    subKey
                                  )}`}</TableCell>
                                  <TableCell>{subVal as any}</TableCell>
                                </TableRow>
                              )
                            )
                          : null;
                      }
                    }

                    if (Array.isArray(val)) {
                      return val.flatMap((item, arrayIndex) => {
                        if (typeof item === "object" && !Array.isArray(item)) {
                          return Object.entries(item as MTGCard).map(
                            ([subKey, subVal], itemIndex) => (
                              <TableRow
                                key={`${key}-${arrayIndex}-${subKey}-${itemIndex}`}
                              >
                                <TableCell>{`${startCase(
                                  key
                                )} - ${arrayIndex} - ${startCase(
                                  subKey
                                )}`}</TableCell>
                                <TableCell>{subVal as any}</TableCell>
                              </TableRow>
                            )
                          );
                        }

                        // Return a row for non-object array item
                        return (
                          <TableRow key={`${key}-${arrayIndex}`}>
                            <TableCell>{`${startCase(
                              key
                            )} - ${arrayIndex}`}</TableCell>
                            <TableCell>{item}</TableCell>
                          </TableRow>
                        );
                      });
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

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export default SearchBar;

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
