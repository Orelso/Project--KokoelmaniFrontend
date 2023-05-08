import React, { useState, useEffect } from "react";
import axios from "axios";

export function Lists() {
  const [superheroData, setSuperheroData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async (name) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${name}`); // Update this line with the correct URL
        setSuperheroData(response.data);
      } catch (error) {
        console.error("Failed to fetch superhero data", error);
      }
    };

    if (searchTerm) {
      fetchData(searchTerm);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div>
      <h1>Superhero Data:</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a superhero"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {superheroData.map((superhero, index) => (
        <div key={index}>{superhero.name}</div>
      ))}
    </div>
  );
}
