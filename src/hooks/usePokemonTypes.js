// hooks/usePokemonWithTypes.js
import { useQueries } from "@tanstack/react-query";
import { usePokemon } from "./usePokemon";

export const usePokemonWithTypes = () => {
  const { data: baseList = [] } = usePokemon();

  const enriched = useQueries({
    queries: baseList.map((pokemon) => ({
      queryKey: ["pokemon-type", pokemon.name],
      queryFn: () => fetch(pokemon.url).then((res) => res.json()),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const combined = baseList.map((pokemon, i) => {
    const detail = enriched[i]?.data;
    return {
      name: pokemon.name,
      id: detail?.id ?? null,
      image: detail?.sprites?.other?.["official-artwork"]?.front_default,
      types: detail?.types?.map((t) => t.type.name) || [],
    };
  });

  const isLoading = enriched.some((q) => q.isLoading);
  const isError = enriched.some((q) => q.isError);

  return { data: combined, isLoading, isError };
};
