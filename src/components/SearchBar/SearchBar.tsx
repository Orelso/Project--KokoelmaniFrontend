/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, Button, IconButton, TextField, Modal } from "@mui/material";
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
import { SearchResult } from "./SearchResult";
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
  const [isHovered, setIsHovered] = useState(false);
  const [lastSearchResultCount, setLastSearchResultCount] = useState(0);

  const toStartCase = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
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
        if (Array.isArray(res)) {
          setSearchResults(res);
          setLastSearchResultCount(res.length); // Set the last search result count here
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
      <div>
        <div style={{ width: "15%", margin: "0 auto" }}>
          <TextField
            sx={{
              flex: 1,
              color: "white",
              transform: isHovered ? "scale(1.5)" : "scale(1)",
              transition: "transform 0.3s",
              backgroundColor: isHovered ? "white" : "transparent",
              borderRadius: "20px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
            placeholder={`Results: ${lastSearchResultCount}`}
            onChange={handleOnChange}
            value={searchTerm}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <span
          style={{ display: "block", textAlign: "center", marginTop: "10px" }}
        >
          Total Results: {lastSearchResultCount}
        </span>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
        {searchResults.slice(0, numResults).map((result, index) => {
          return (
            <SearchResult
              key={`${result.name || result.title}-${index}`}
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
      </div>

      {/* --------------------------------------------------------------(Search Bar MODAL data shown)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {selectedCard && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "10px solid purple",
              height: "100%",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography component="div">
                <div>
                  <h1 style={{ fontSize: "2rem" }}>{selectedCard.name}</h1>
                  <h6>{selectedCard.set_name}</h6>
                </div>
              </Typography>

              <Typography component="div">
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px" }}>
                    <button onClick={handleLike}>👍</button>
                    <div>{likes}</div>
                  </div>

                  <div>
                    <button onClick={handleDislike}>👎</button>
                    <div>{dislikes}</div>
                  </div>
                </div>
              </Typography>

              <img
                alt=""
                src={
                  selectedCard.image_uris?.border_crop ||
                  selectedCard.image_url ||
                  selectedCard.card_images?.[0]?.image_url ||
                  selectedCard.imageName ||
                  selectedCard.background_image ||
                  selectedCard.images.large
                }
                style={{ border: "8px solid black" }}
                width="300"
              />

              <div>
                <div>Total Likes Rank: {likes - dislikes}</div>
              </div>

              <Button onClick={handleModalOpen}>
                <AddCircleOutlineRoundedIcon />
                Collection
              </Button>
              {openModal && (
                <Modal open={openModal} onClose={handleModalClose}>
                  <CreateCollection selectedCard={selectedCard} />
                </Modal>
              )}
              <Button>
                <AddCircleOutlineRoundedIcon />
                Deck
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 40,
              }}
            >
              <h3 style={{ marginRight: "20px" }}>Today's Average</h3>
              <h3 style={{ marginRight: "20px" }}>All-Time High</h3>
              <h3>All-Time Low</h3>
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

                  {Object.entries(selectedCard).map(([key, value]) => {
                    if (HIDDEN_KEYS.includes(key)) {
                      return null;
                    }

                    let renamedKey = key;
                    if (RENAME_KEYS_MAP[key]) {
                      renamedKey = RENAME_KEYS_MAP[key];
                    }

                    if (key === "modified") {
                      value = "modified value";
                    } else if (MODIFIED_VALUES[value]) {
                      value = MODIFIED_VALUES[value];
                    }

                    if (typeof value === "object" && !Array.isArray(value)) {
                      if (key === "legalities") {
                        return (
                          <TableRow key={key}>
                            <TableCell>{startCase(key)}</TableCell>
                            <TableCell>
                              {Object.entries(value).map(
                                ([subKey, subValue]) => (
                                  <div key={subKey}>
                                    <span>
                                      {toStartCase(subKey)}: {subValue}
                                    </span>
                                  </div>
                                )
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      } else if (key === "related_uris") {
                        return Object.entries(value).map(
                          ([uriKey, uriValue]) => (
                            <TableRow key={uriKey}>
                              <TableCell>
                                {`${startCase(key)} - ${startCase(uriKey)}`}
                              </TableCell>
                              <TableCell>
                                <a
                                  href={uriValue}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {uriValue}
                                </a>
                              </TableCell>
                            </TableRow>
                          )
                        );
                      } else {
                        return Object.entries(value).map(
                          ([subKey, subValue]) => (
                            <TableRow key={`${key}-${subKey}`}>
                              <TableCell>{`${startCase(key)} - ${startCase(
                                subKey
                              )}`}</TableCell>
                              <TableCell>{subValue}</TableCell>
                            </TableRow>
                          )
                        );
                      }
                    }

                    if (Array.isArray(value)) {
                      return value.flatMap((item, index) => (
                        <TableRow key={`${key}-${index}`}>
                          <TableCell>{`${startCase(
                            key
                          )} - ${index}`}</TableCell>
                          <TableCell>{item}</TableCell>
                        </TableRow>
                      ));
                    }

                    return (
                      <TableRow key={key}>
                        <TableCell>{startCase(renamedKey)}</TableCell>
                        <TableCell>{value}</TableCell>
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
