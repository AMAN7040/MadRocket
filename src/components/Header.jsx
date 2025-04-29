// src/components/Header.jsx
import React from "react";
import { useSearch } from "../context/SearchContext";

const types = [
  "all",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "rock",
  "ground",
  "ghost",
  "fighting",
  "poison",
  "bug",
  "dark",
  "flying",
];

const Header = () => {
  const { searchTerm, setSearchTerm, selectedType, setSelectedType } =
    useSearch();

  return (
    <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-md">
      <h3 className="text-[clamp(20px,3vw,28px)]">POKEMON</h3>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className=" sm:w-[50vw] p-2 border rounded-md focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
      <select
        className="p-2 border w-13 sm:w-28 rounded-md text-[12px] sm:text-sm sm:mr-3"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type[0].toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </header>
  );
};

export default Header;
