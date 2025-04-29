import { useDetails } from "../hooks/useDetails";
import PokemonCard from "./PokemonCard";
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

  return (
    <PokemonCard
      id={data?.id}
      name={data?.name}
      image={data?.image}
      type={data?.type}
    />
  );
};

export default PokemonCardWithDetails;
