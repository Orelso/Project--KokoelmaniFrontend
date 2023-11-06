/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, IconButton, TextField, Modal } from "@mui/material";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../../store";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import type { AnyCard, MTGCard } from "../../types";

import { BACKEND_URL } from "../../constants";
import {
  MODIFIED_VALUES,
  HIDDEN_KEYS,
  RENAME_KEYS_MAP,
  getTableValue,
  startCase,
} from "./searchBarUtils";
import { SearchResult } from "./SearchResult";
import LoadMoreButton from "./LoadMoreButton";
import CardComponent from "./CardComponent"; // adjust the import path as necessary

const boxStyle = {
  display: "absolute", // This should likely be 'position': 'absolute'
  flexDirection: "column",
  alignItems: "center",
  border: "20px solid white",
  height: "100%",
  backgroundColor: "white",
  overflow: "hidden",
};

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
  const [cardTypeFilter, setCardTypeFilter] = useState(""); // New state for card type filter

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
          let filteredResults = res;
          // If a card type filter is set, apply it
          if (cardTypeFilter) {
            filteredResults = res.filter(
              (card: AnyCard) => card.type === cardTypeFilter
            );
          }
          setSearchResults(filteredResults);
          setLastSearchResultCount(filteredResults.length); // Use the length of the filtered results
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
    console.log(selectedCard); // <--- Add this line

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
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleOnChange}
          />
          {/* Add a new input/select for card type filter */}
          <select
            value={cardTypeFilter}
            onChange={(e) => setCardTypeFilter(e.target.value)}
            placeholder="Filter by type"
          >
            <option value="">All Types</option>
            <option value="MTGCard">MTG</option>
            <option value="Pokemon">Pokemon</option>
            <option value="Yugioh">Yugioh</option>
            <option value="Digimon">Digimon</option>
            <option value="FunkoPop">Funko Pop</option>
            <option value="FleshAndBlood">Flesh and Blood</option>
            <option value="Game">Video Games</option>
            {/* ... other card types as needed */}
          </select>
          <button onClick={handleSubmit}>Search</button>
          {/* ... rendering of search results ... */}
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

        <LoadMoreButton
          searchResults={searchResults}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </div>

      {/* --------------------------------------------------------------(Search Bar MODAL data shown)-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      {selectedCard && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={boxStyle}>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <CardComponent
              selectedCard={selectedCard}
              likes={likes}
              dislikes={dislikes}
              handleLike={handleLike}
              handleDislike={handleDislike}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              openModal={openModal}
            />
            {/* -------------------------------------------------------------------(Card/Item Data)------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
            <TableContainer
              sx={{
                height: "450px",
                overflow: "auto",
                width: "400px",
                fontSize: "16px", // Adjust the font size value as needed
              }}
            >
              <Table sx={{ border: "2px solid green" }}>
                <TableBody sx={{ border: "2px solid orange" }}>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid green" }}>
                      Name
                    </TableCell>
                    <TableCell>{selectedCard.name}</TableCell>
                    {(() => {
                      console.log(
                        "🚀 ~ file: SearchBar.tsx:280 ~ SearchBar ~ selectedCard.name:",
                        selectedCard.name
                      );
                      return null;
                    })()}
                  </TableRow>
                  {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                  {Object.entries(selectedCard).map(
                    ([keyofAnyCard, valOfAnyCard]) => {
                      if (HIDDEN_KEYS.includes(keyofAnyCard)) {
                        return null; // Skip this iteration of the map loop
                      }

                      let renamedKey = keyofAnyCard;
                      const shouldRenameKey = keyofAnyCard in RENAME_KEYS_MAP;
                      if (shouldRenameKey) {
                        renamedKey = RENAME_KEYS_MAP[keyofAnyCard];
                      }

                      if (keyofAnyCard === "modified") {
                        valOfAnyCard = "modified value";
                      } else if (
                        MODIFIED_VALUES[
                          valOfAnyCard as keyof typeof MODIFIED_VALUES
                        ]
                      ) {
                        valOfAnyCard =
                          MODIFIED_VALUES[
                            valOfAnyCard as keyof typeof MODIFIED_VALUES
                          ];
                      }

                      if (
                        typeof valOfAnyCard === "object" &&
                        !Array.isArray(valOfAnyCard)
                      ) {
                        if (keyofAnyCard === "legalities") {
                          return (
                            <TableRow key={keyofAnyCard}>
                              <TableCell>{startCase(keyofAnyCard)}</TableCell>
                              <TableCell>
                                {Object.entries(
                                  valOfAnyCard as MTGCard["legalities"]
                                ).map(([subKey, subVal]) => {
                                  console.log(
                                    "🚀 ~ file: SearchBar.tsx:326 ~ ).map ~ subVal:",
                                    subVal
                                  );

                                  const subKeyWithoutUnderscores =
                                    subKey.replace(/_/g, " ");
                                  const subKeyInStartCase = startCase(
                                    subKeyWithoutUnderscores
                                  );

                                  return (
                                    <React.Fragment key={subVal}>
                                      <span>
                                        {subKeyInStartCase}: {subVal}
                                      </span>
                                      <br />
                                    </React.Fragment>
                                  );
                                })}
                              </TableCell>
                            </TableRow>
                          );
                        } else if (keyofAnyCard === "related_uris") {
                          const [firstUriKey, firstUriVal] = Object.entries(
                            valOfAnyCard as MTGCard["related_uris"]
                          )[0];
                          console.log(
                            "🚀 ~ file: SearchBar.tsx:341 ~ ).map ~ firstUriVal:",
                            firstUriVal
                          );
                          return (
                            <TableRow key={`${keyofAnyCard}-${firstUriKey}`}>
                              <TableCell>{`${startCase(
                                keyofAnyCard
                              )} - ${startCase(firstUriKey)}`}</TableCell>
                              <TableCell>{firstUriVal}</TableCell>
                            </TableRow>
                          );
                        } else {
                          return typeof valOfAnyCard === "object" &&
                            !Array.isArray(valOfAnyCard)
                            ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              (valOfAnyCard
                                ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                  Object.entries(valOfAnyCard)
                                : []
                              ).map(([subKey, subVal], index) => {
                                console.log(
                                  "🚀 ~ file: SearchBar.tsx:361 ~ ).map ~ subVal:",
                                  subVal
                                );

                                return (
                                  <TableRow
                                    key={`${keyofAnyCard}-${subKey}-${index}`}
                                  >
                                    <TableCell>{`${startCase(
                                      keyofAnyCard
                                    )} - ${startCase(subKey)}`}</TableCell>
                                    <TableCell>{subVal as any}</TableCell>
                                  </TableRow>
                                );
                              })
                            : null;
                        }
                      }

                      if (Array.isArray(valOfAnyCard)) {
                        return valOfAnyCard.flatMap((item, arrayIndex) => {
                          if (
                            typeof item === "object" &&
                            !Array.isArray(item)
                          ) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            return Object.entries(item).map(
                              ([subKey, subVal], itemIndex) => {
                                console.log(
                                  "🚀 ~ file: SearchBar.tsx:401 ~ returnvalOfAnyCard.flatMap ~ subVal:",
                                  subVal
                                );

                                return (
                                  <TableRow
                                    key={`${keyofAnyCard}-${arrayIndex}-${subKey}-${itemIndex}`}
                                  >
                                    <TableCell>{`${startCase(
                                      keyofAnyCard
                                    )} - ${arrayIndex} - ${startCase(
                                      subKey
                                    )}`}</TableCell>
                                    <TableCell>
                                      {typeof subVal === "object"
                                        ? JSON.stringify(subVal)
                                        : (subVal as any)}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            );
                          }

                          console.log(
                            "🚀 ~ file: SearchBar.tsx:410 ~ returnvalOfAnyCard.flatMap ~ item:",
                            item
                          );
                          // Return a row for non-object array item
                          return (
                            <TableRow key={`${keyofAnyCard}-${arrayIndex}`}>
                              <TableCell>{`${startCase(
                                keyofAnyCard
                              )} - ${arrayIndex}`}</TableCell>
                              <TableCell>{item}</TableCell>
                            </TableRow>
                          );
                        });
                      }

                      console.log(
                        "🚀 ~ file: SearchBar.tsx:439 ~ SearchBar ~ getTableValue(valOfAnyCard):",
                        getTableValue(valOfAnyCard)
                      );
                      /* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                      return (
                        <TableRow key={keyofAnyCard}>
                          <TableCell>{startCase(renamedKey)}</TableCell>
                          <TableCell>{getTableValue(valOfAnyCard)}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
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
