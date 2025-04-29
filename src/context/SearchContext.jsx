import { createContext, useContext, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, debounceSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
