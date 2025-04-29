import { useDetails } from "../hooks/useDetails";
import SkeletonCard from "./SkeletonCard";

const PokemonCardWithDetails = ({ url }) => {
  const { data, isLoading, isError } = useDetails(url);

  if (isLoading) return <SkeletonCard />;

  if (isError)
    return (
      <div>
        <p className="text-red-500">Cannot Display card</p>
      </div>
    );

  if (!data) return <p>NOT DETAILS</p>;

  return <p className="text-blue-400">{data?.name}</p>;
};

export default PokemonCardWithDetails;
