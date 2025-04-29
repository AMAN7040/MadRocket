import React, { useRef } from "react";
import { usePokemon } from "../hooks/usePokemon";
import ErrorFallback from "./ErrorFallback";
import SkeletonLoader from "./SkeletonLoader";
import VirtualizedGrid from "./VirtualizedGrid";

const PokemonList = () => {
  const {
    data: pokemons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemon();
  const parentRef = useRef();

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return <ErrorFallback error={error} onReset={refetch} />;
  }
  if (!pokemons.length)
    return <p className="text-center text-gray-500">No Pokémon found.</p>;

  return <VirtualizedGrid pokemons={pokemons} parentRef={parentRef} />;
};

export default PokemonList;
