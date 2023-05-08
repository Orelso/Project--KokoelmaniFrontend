import React, { useEffect, useState } from "react";
import axios from "axios";

export function Lists() {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const response = await axios.get(`/search/${searchTerm}`);
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
            <li key={hero.id}>{hero.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
