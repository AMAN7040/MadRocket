// src/components/Header.jsx
import React from "react";
import { useSearch } from "../context/SearchContext";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-md">
        <h3 className="text-[clamp(20px,3vw,28px)]">POKEMON</h3>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="w-[60vw] p-2 border rounded-md focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
    </header>
  );
};

export default Header;
