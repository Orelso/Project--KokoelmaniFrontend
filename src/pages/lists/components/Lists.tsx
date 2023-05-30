import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";

export default function Lists() {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const selectedHeroes = [
    "Batman",
    "Gambit",
    "Captain America",
    "Superman",
    "Wolverine",
  ];

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const allHeroes = [];
        if (searchTerm === "") {
          for (let heroName of selectedHeroes) {
            const response = await axios.get(`${API_URL}/search/${heroName}`);
            if (response.data && response.data.length > 0) {
              allHeroes.push(response.data[0]);
            }
          }
        } else {
          const response = await axios.get(`${API_URL}/search/${searchTerm}`);
          if (response.data && response.data.length > 0) {
            allHeroes.push(...response.data);
          }
        }
        setHeroes(allHeroes);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch heroes", error);
      }
    }

    fetchHeroes();
  }, [searchTerm]);

  return (
    <div>
      <h1>Superheroes List</h1>
      <input
        type="text"
        placeholder="Search superheroes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : heroes.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div style={styles.heroesContainer}>
          {heroes.map((hero) => (
            <div style={styles.heroBox} key={hero.id}>
              <div style={styles.heroInfo}>
                <h2>{hero.name}</h2>
                <img
                  src={hero.image.url}
                  alt={hero.name}
                  style={styles.heroImage}
                />
                <div style={styles.characterData}>
                  <strong>Powerstats:</strong>
                  <br />
                  Intelligence: {hero.powerstats.intelligence}
                  <br />
                  Strength: {hero.powerstats.strength}
                  <br />
                  Speed: {hero.powerstats.speed}
                  <br />
                  Durability: {hero.powerstats.durability}
                  <br />
                  Power: {hero.powerstats.power}
                  <br />
                  Combat: {hero.powerstats.combat}
                  <br />
                  <br />
                  <strong>Biography:</strong>
                  <br />
                  Full Name: {hero.biography["full-name"]}
                  <br />
                  Alter Egos: {hero.biography["alter-egos"]}
                  <br />
                  Aliases: {hero.biography.aliases.join(", ")}
                  <br />
                  Place of Birth: {hero.biography["place-of-birth"]}
                  <br />
                  First Appearance: {hero.biography["first-appearance"]}
                  <br />
                  Publisher: {hero.biography.publisher}
                  <br />
                  Alignment: {hero.biography.alignment}
                  <br />
                  <br />
                  <strong>Additional Information:</strong>
                  <br />
                  Gender: {hero.appearance.gender}
                  <br />
                  Race: {hero.appearance.race}
                  <br />
                  Height: {hero.appearance.height.join(", ")}
                  <br />
                  Weight: {hero.appearance.weight.join(", ")}
                  <br />
                  Eye Color: {hero.appearance["eye-color"]}
                  <br />
                  Hair Color: {hero.appearance["hair-color"]}
                  <br />
                  Occupation: {hero.work.occupation}
                  <br />
                  Base: {hero.work.base}
                  <br />
                  <br />
                  <strong>Group Affiliation:</strong>{" "}
                  {hero.connections["group-affiliation"]}
                  <br />
                  Relatives: {hero.connections.relatives}
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  heroesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  heroBox: {
    backgroundColor: "#f1f1f1",
    padding: "20px",
    borderRadius: "4px",
    flex: "1 1 300px", // Each box takes the available width
    maxWidth: "100%", // Ensure the box doesn't exceed the screen width
  },
  heroInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  heroImageContainer: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "50%",
    // height: "50%",
    objectFit: "cover",
    borderRadius: "50%", // Make the image appear in a circle
  },
  characterData: {
    textAlign: "left",
  },
};
