import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";

export function Lists() {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const response = await axios.get(`${API_URL}/search/${searchTerm}`);
        setHeroes(response.data);
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
      {heroes.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {heroes.map((hero) => (
            <li key={hero.id}>
              {hero.name}
              <img src={hero.image.url} alt={hero.name} />{" "}
              {/* This line adds the hero's image */}
              <div>
                <strong>Powerstats:</strong> <br />
                Intelligence: {hero.powerstats.intelligence} <br />
                Strength: {hero.powerstats.strength} <br />
                Speed: {hero.powerstats.speed} <br />
                Durability: {hero.powerstats.durability} <br />
                Power: {hero.powerstats.power} <br />
                Combat: {hero.powerstats.combat} <br />
                <br />
                <strong>Biography:</strong> <br />
                Full Name: {hero.biography["full-name"]} <br />
                Alter Egos: {hero.biography["alter-egos"]} <br />
                Aliases: {hero.biography.aliases.join(", ")} <br />
                Place of Birth: {hero.biography["place-of-birth"]} <br />
                First Appearance: {hero.biography["first-appearance"]} <br />
                Publisher: {hero.biography.publisher} <br />
                Alignment: {hero.biography.alignment} <br />
                <br />
                <strong>Additional Information:</strong> <br />
                Gender: {hero.appearance.gender} <br />
                Race: {hero.appearance.race} <br />
                Height: {hero.appearance.height.join(", ")} <br />
                Weight: {hero.appearance.weight.join(", ")} <br />
                Eye Color: {hero.appearance["eye-color"]} <br />
                Hair Color: {hero.appearance["hair-color"]} <br />
                Occupation: {hero.work.occupation} <br />
                Base: {hero.work.base} <br />
                <br />
                <strong>Group Affiliation:</strong>{" "}
                {hero.connections["group-affiliation"]} <br />
                Relatives: {hero.connections.relatives} <br />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
