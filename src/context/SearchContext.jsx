import { createContext, useContext, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      debounceSearchTerm,
      selectedType,
      setSelectedType,
    }),
    [searchTerm, debounceSearchTerm, selectedType]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
