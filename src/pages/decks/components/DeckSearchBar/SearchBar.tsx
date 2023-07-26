/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, Button, IconButton, TextField, Modal } from "@mui/material";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../../../../store";
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
import type { AnyCard, MTGCard } from "../../../../types";
import CreateCollection from "../../../../pages/create-collection/components/CreateCollection";
// import styles from "../styles/SearchBar.module.css"; className={styles.filter_card}
import { BACKEND_URL } from "../../../../constants";
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
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export default SearchBar;
