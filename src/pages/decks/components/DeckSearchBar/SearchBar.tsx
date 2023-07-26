import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { searchResultsAtom } from "../../../../store";
import * as React from "react";
import { AnyCard } from "../../../../types";
import { BACKEND_URL } from "../../../../constants";
import { SearchResult } from "./SearchResult";
import { getTableValue } from "./searchBarUtils";

interface SearchBarProps {
  addCardToDeck: (card: AnyCard, deckIndex: number) => void;
  deckIndex: number;
  deckName: string; // Pass the deck name as a prop
}

const SearchBar = ({ addCardToDeck, deckIndex, deckName }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const [selectedCard, setSelectedCard] = useState<null | AnyCard>(null);
  const [numResults, setNumResults] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [lastSearchResultCount, setLastSearchResultCount] = useState(0);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(true);

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    fetch(`${BACKEND_URL}/cards/name/${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          setSearchResults(res);
          setLastSearchResultCount(res.length);
        } else {
          console.error("not an array type!", res);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleCardClick = (card: AnyCard) => {
    console.log("handleCardClick triggered");
    addCardToDeck(card, deckIndex);
  };

  const handleClearResults = () => {
    setSearchResults([]);
    setSearchTerm("");
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen((prevState) => !prevState);
    if (!isSearchBarOpen) {
      setSearchResults([]);
      setNumResults(1);
      setSearchTerm("");
    }
  };

  return (
    <div>
      <div>
        <div style={{ width: "20%", margin: "0 auto" }}>
          {isSearchBarOpen && ( // Only render if the search bar is open
            <TextField
              sx={{
                flex: 1,
                color: "white",
                transform: isHovered ? "scale(1.5)" : "scale(1)",
                transition: "transform 0.3s",
                backgroundColor: isHovered ? "white" : "transparent",
                borderRadius: "20px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                width: "100%", // Adjust the width as desired
                height: "30px", // Adjust the height as desired
              }}
              placeholder={`Results: ${lastSearchResultCount}`}
              onChange={handleOnChange}
              value={searchTerm}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton onClick={handleSubmit}>
                      <SearchIcon />
                    </IconButton>
                    <IconButton onClick={handleClearResults}>
                      <CloseIcon />
                    </IconButton>
                  </>
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
          )}
        </div>
        {isSearchBarOpen ? ( // Only show the total results if the search bar is open
          <span
            style={{ display: "block", textAlign: "center", marginTop: "10px" }}
          >
            Total Results: {lastSearchResultCount}
          </span>
        ) : (
          <div style={{ color: "white", marginBottom: "10px" }}>{deckName}</div>
        )}
      </div>

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
    </div>
  );
};

export default SearchBar;
