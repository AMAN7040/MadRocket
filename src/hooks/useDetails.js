import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../services/pokemonDetailsService";

export const useDetails = (url) => {
  return useQuery({
    queryKey: ["Pokemon_Details"],
    queryFn: () => getDetails(url),
    enabled: !!url,
  });
};
