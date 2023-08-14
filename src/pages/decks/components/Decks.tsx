/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import SearchBar from "./DeckSearchBar/SearchBar";

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [currentDeckIndex, setCurrentDeckIndex] = useState(null);
  const [hand, setHand] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addDeck = (name, type) => {
    const newDeck = {
      name,
      type,
      cards: [],
      searchResults: [],
      numResults: 6,
      lastSearchResultCount: 0,
    };

    setDecks((prevDecks) => {
      setCurrentDeckIndex(prevDecks.length);
      return [...prevDecks, newDeck];
    });
  };

  const addCardToDeck = (card, deckIndex) => {
    const newDecks = [...decks];
    const cardIdentifier = card.id || card.cardnumber;

    const existingCardIndex = newDecks[deckIndex].cards.findIndex(
      (c) => (c.id || c.cardnumber) === cardIdentifier
    );

    if (existingCardIndex > -1) {
      newDecks[deckIndex].cards[existingCardIndex].count += 1;
    } else {
      newDecks[deckIndex].cards.push({ ...card, count: 1 });
    }

    setDecks(newDecks);
  };

  const removeCardFromDeck = (card, deckIndex) => {
    const newDecks = [...decks];
    const cardIdentifier = card.id || card.cardnumber;

    const existingCardIndex = newDecks[deckIndex].cards.findIndex(
      (c) => (c.id || c.cardnumber) === cardIdentifier
    );

    if (existingCardIndex > -1) {
      if (newDecks[deckIndex].cards[existingCardIndex].count === 1) {
        newDecks[deckIndex].cards.splice(existingCardIndex, 1);
      } else {
        newDecks[deckIndex].cards[existingCardIndex].count -= 1;
      }
    }

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

  const shuffleDeck = (deckIndex) => {
    setModalOpen(true);
    const deckToShuffle = [...decks[deckIndex].cards];
    let tempHand = [];

    for (let i = 0; i < 7; i++) {
      const randIndex = Math.floor(Math.random() * deckToShuffle.length);
      tempHand.push(deckToShuffle.splice(randIndex, 1)[0]);
    }

    setHand(tempHand);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
              ({deck.cards.reduce((acc, curr) => acc + curr.count, 0)})
            </span>
            <Button
              onClick={() => setCurrentDeckIndex(deckIndex)}
              style={{ marginLeft: "10px" }}
            >
              Edit {deck.name}
            </Button>
            <Button onClick={() => shuffleDeck(deckIndex)}>Shuffle Deck</Button>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {deck.cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                style={{
                  marginRight: "10px",
                  position: "relative",
                  width: "100px",
                  height: "150px",
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
                    (card.images && card.images[0]) ||
                    "https://via.placeholder.com/150"
                  }
                  alt={card.name}
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "2.5px",
                    right: "2.5px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    textAlign: "center",
                    lineHeight: "15px",
                  }}
                >
                  {card.count}
                </div>
                <Button
                  onClick={() => removeCardFromDeck(card, deckIndex)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <SearchBar
            type={deck.type}
            setSearchResults={(newSearchResults) =>
              setSearchResults(deckIndex, newSearchResults)
            }
            numResults={deck.numResults}
            setNumResults={(newNumResults) =>
              setNumResults(deckIndex, newNumResults)
            }
            lastSearchResultCount={deck.lastSearchResultCount}
            setLastSearchResultCount={(newCount) =>
              setLastSearchResultCount(deckIndex, newCount)
            }
            addCardToDeck={(card) => addCardToDeck(card, deckIndex)}
          />
        </div>
      ))}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ padding: "20px", backgroundColor: "white" }}>
          <h2>Hand</h2>
          {hand.map((card, cardIndex) => (
            <div
              key={cardIndex}
              style={{
                marginRight: "-60px",
                position: "relative",
                width: "100px",
                height: "150px",
                zIndex: hand.length - cardIndex,
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
                  (card.images && card.images[0]) ||
                  "https://via.placeholder.com/150"
                }
                alt={card.name}
                style={{ width: "100%", height: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "2.5px",
                  right: "2.5px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "15px",
                  height: "15px",
                  textAlign: "center",
                  lineHeight: "15px",
                }}
              >
                {card.count}
              </div>
            </div>
          ))}
          <Button onClick={handleCloseModal} style={{ marginTop: "20px" }}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
