// LoadMoreButton.js
import React from "react";
import Button from "@mui/material/Button";

const LoadMoreButton = ({ searchResults, numResults, setNumResults }) => {
  return (
    searchResults.length > numResults && (
      <Button
        variant="contained"
        onClick={() => setNumResults(numResults + 6)}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Load More
      </Button>
    )
  );
};

export default LoadMoreButton;
