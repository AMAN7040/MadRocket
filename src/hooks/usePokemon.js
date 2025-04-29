import { useQuery } from "@tanstack/react-query";
import {getPokemons} from "../services/pokemonService"

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemons,
  });
};
  