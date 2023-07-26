import { Button } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "./DeckSearchBar/SearchBar";

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [currentDeckIndex, setCurrentDeckIndex] = useState(null);

  const addDeck = (name, type) => {
    const newDeck = {
      name,
      type,
      cards: {},
      searchResults: [],
      numResults: 6,
      lastSearchResultCount: 0,
    };

    setDecks((prevDecks) => {
      setCurrentDeckIndex(prevDecks.length); // Set the currentDeckIndex to the index of the new deck
      return [...prevDecks, newDeck];
    });
  };

  const addCardToDeck = (card, deckIndex) => {
    const newDecks = [...decks];
    const newCards = { ...newDecks[deckIndex].cards };
    const cardIdentifier = card.id || card.cardnumber;

    if (newCards[cardIdentifier]) {
      newCards[cardIdentifier].count += 1;
    } else {
      newCards[cardIdentifier] = { ...card, count: 1 };
    }

    newDecks[deckIndex].cards = newCards;
    setDecks(newDecks);
  };

  const handleDeckNameChange = (deckIndex, newName) => {
    const newDecks = [...decks];
    newDecks[deckIndex].name = newName;
    setDecks(newDecks);
  };

  const setSearchResults = (deckIndex, newSearchResults) => {
    const newDecks = [...decks];
    newDecks[deckIndex].searchResults = newSearchResults;
    setDecks(newDecks);
  };

  return (
    <div>
      <h1>My Decks</h1>
      <Button
        onClick={() =>
          addDeck(
            `MTG Deck ${
              decks.filter((deck) => deck.type === "mtg").length + 1
            }`,
            "mtg"
          )
        }
      >
        Add MTG Deck
      </Button>
      <Button
        onClick={() =>
          addDeck(
            `Digimon Deck ${
              decks.filter((deck) => deck.type === "digimon").length + 1
            }`,
            "digimon"
          )
        }
      >
        Add Digimon Deck
      </Button>
      <Button
        onClick={() =>
          addDeck(
            `Pokemon Deck ${
              decks.filter((deck) => deck.type === "pokemon").length + 1
            }`,
            "pokemon"
          )
        }
      >
        Add Pokemon Deck
      </Button>
      {decks.map((deck, deckIndex) => (
        <div key={deckIndex} style={{ marginBottom: "20px" }}>
          <h2 style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={deck.name}
              onChange={(e) => handleDeckNameChange(deckIndex, e.target.value)}
              style={{ color: "red" }}
            />
            <span style={{ marginLeft: "10px" }}>
              (
              {Object.values(deck.cards).reduce(
                (acc, curr) => acc + curr.count,
                0
              )}
              )
            </span>
            <Button
              onClick={() => setCurrentDeckIndex(deckIndex)}
              style={{ marginLeft: "10px" }}
            >
              Edit {deck.name}
            </Button>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.values(deck.cards).map((card, cardIndex) => (
              <div
                key={cardIndex}
                style={{
                  marginRight: "10px", // Reduced margin
                  position: "relative",
                  width: "100px", // Half size
                  height: "150px", // Half size
                }}
              >
                {[...Array(card.count)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: `${i * 2.5}px`, // Half stack offset
                      left: `${i * 2.5}px`, // Half stack offset
                      zIndex: -i,
                      border: "1px solid black",
                      width: "100%", // Full size to fill container
                      height: "100%", // Full size to fill container
                    }}
                  >
                    <img
                      src={
                        card.image_uris?.small ||
                        card.image_url ||
                        card.images?.small ||
                        card.card_images?.[0]?.image_url_small ||
                        card.imageName ||
                        card.background_image ||
                        card.token_name ||
                        (card.images &&
                          card.images[0]?.path +
                            "." +
                            card.images[0].extension) ||
                        card.resourceURI
                      }
                      alt={card.name}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "2.5px", // Half offset
                        right: "2.5px", // Half offset
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "10px", // Half size
                        height: "10px", // Half size
                        textAlign: "center",
                        lineHeight: "10px", // Half line height
                      }}
                    >
                      {card.count}
                    </div>
                  </div>
                ))}
                <div>Mana Cost: {card.cmc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {currentDeckIndex !== null && (
        <SearchBar
          addCardToDeck={(card) => addCardToDeck(card, currentDeckIndex)}
          deckIndex={currentDeckIndex}
          deckName={decks[currentDeckIndex].name}
          searchResults={decks[currentDeckIndex].searchResults}
          setSearchResults={(results) =>
            setSearchResults(currentDeckIndex, results)
          }
          numResults={decks[currentDeckIndex].numResults}
          lastSearchResultCount={decks[currentDeckIndex].lastSearchResultCount}
        />
      )}
    </div>
  );
}
