import React, { useState } from "react";

export default function Decks() {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    fetch("https://api.scryfall.com/cards/random")
      .then((response) => response.json())
      .then((data) => {
        if (data.image_uris) {
          setCards([
            ...cards,
            {
              name: data.name,
              imageUrl: data.image_uris.normal,
              cmc: data.cmc,
              colors: data.colors,
            },
          ]);
        }
      });
  };

  return (
    <div>
      <h1>MTG Deck Builder</h1>
      <button onClick={addCard}>Add Card</button>
      {cards.map((card, index) => (
        <div key={index}>
          <img src={card.imageUrl} alt={card.name} />
          <div>Name: {card.name}</div>
          <div>Mana Cost: {card.cmc}</div>
          <div>Colors: {card.colors.join(", ")}</div>
        </div>
      ))}
    </div>
  );
}
