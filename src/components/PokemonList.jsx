import React, { useMemo, useRef } from "react";
import ErrorFallback from "./ErrorFallback";
import SkeletonLoader from "./SkeletonLoader";
import VirtualizedGrid from "./VirtualizedGrid";
import { useSearch } from "../context/SearchContext";
import { usePokemonWithTypes } from "../hooks/usePokemonTypes";

const PokemonList = () => {
  const { data = [], isLoading, isError } = usePokemonWithTypes();
  const { debounceSearchTerm, selectedType } = useSearch();
  const parentRef = useRef();

  const filteredPokemons = useMemo(() => {
    return data.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(debounceSearchTerm.toLowerCase()) &&
        (selectedType === "all" || pokemon.types.includes(selectedType))
    );
  }, [data, debounceSearchTerm, selectedType]);

  if (isLoading) return <SkeletonLoader />;
  if (isError)
    return (
      <ErrorFallback
        error={{ message: "Failed to load Pokémon." }}
        onReset={() => {}}
      />
    );
  if (!filteredPokemons.length)
    return <p className="text-center text-gray-500">No Pokémon Found.</p>;

  return <VirtualizedGrid pokemons={filteredPokemons} parentRef={parentRef} />;
};
export default PokemonList;
