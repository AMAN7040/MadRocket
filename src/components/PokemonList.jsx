import React, { useMemo, useRef } from "react";
import { usePokemon } from "../hooks/usePokemon";
import ErrorFallback from "./ErrorFallback";
import SkeletonLoader from "./SkeletonLoader";
import VirtualizedGrid from "./VirtualizedGrid";
import { useSearch } from "../context/SearchContext";

const PokemonList = () => {
  const {
    data: pokemons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemon();

  const { debounceSearchTerm } = useSearch();

  const parentRef = useRef();

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) return pokemons;
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(debounceSearchTerm.toLowerCase())
    );
  }, [searchTerm, pokemons]);

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return <ErrorFallback error={error} onReset={refetch} />;
  }
  if (!filteredPokemons.length)
    return (
      <p className="text-center text-gray-500">No Pokémon Found.</p>
    );

  return <VirtualizedGrid pokemons={filteredPokemons} parentRef={parentRef} />;
};

export default PokemonList;
