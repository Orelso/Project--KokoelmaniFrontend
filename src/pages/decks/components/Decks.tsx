/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [groupedDecks, setGroupedDecks] = useState({
    mtg: [],
    digimon: [],
    pokemon: [],
  });

  const addDeck = (name, type) => {
    const newDeck = {
      name,
      type,
      cards: [],
    };

    setDecks([...decks, newDeck]);

    setGroupedDecks((prevGroupedDecks) => ({
      ...prevGroupedDecks,
      [type]: [...prevGroupedDecks[type], newDeck],
    }));
  };

  const addCardToDeck = (deckIndex) => {
    fetch("https://api.scryfall.com/cards/random")
      .then((response) => response.json())
      .then((data) => {
        if (data.image_uris) {
          const newDecks = [...decks];
          const newCards = [...newDecks[deckIndex].cards];
          newCards.push({
            name: data.name,
            imageUrl: data.image_uris.normal,
            cmc: data.cmc,
            colors: data.colors,
          });
          newDecks[deckIndex].cards = newCards;
          setDecks(newDecks);
        }
      });
  };

  const handleDeckNameChange = (deckIndex, newName) => {
    const newDecks = [...decks];
    newDecks[deckIndex].name = newName;
    setDecks(newDecks);

    const type = newDecks[deckIndex].type;
    const newGroupedDecks = { ...groupedDecks };
    newGroupedDecks[type][deckIndex].name = newName;
    setGroupedDecks(newGroupedDecks);
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
      {Object.keys(groupedDecks).map((type) =>
        groupedDecks[type].map((deck, deckIndex) => (
          <div key={deckIndex}>
            <h2>
              <input
                type="text"
                value={deck.name}
                onChange={(e) =>
                  handleDeckNameChange(deckIndex, e.target.value)
                }
                style={{ color: "red" }}
              />
            </h2>
            <Button onClick={() => addCardToDeck(deckIndex)}>Add Card</Button>
            <div style={{ display: "flex" }}>
              {deck.cards.map((card, cardIndex) => (
                <div key={cardIndex} style={{ marginRight: "10px" }}>
                  <img src={card.imageUrl} alt={card.name} />
                  <div>Name: {card.name}</div>
                  <div>Mana Cost: {card.cmc}</div>
                  <div>Colors: {card.colors.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
