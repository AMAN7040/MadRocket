import { useSearch } from "../context/SearchContext";
import { useDetails } from "../hooks/useDetails";
import PokemonCard from "./PokemonCard";
import SkeletonCard from "./SkeletonCard";

const PokemonCardWithDetails = ({ url }) => {
  const { data, isLoading, isError } = useDetails(url);
  const { selectedType } = useSearch();

  if (isLoading) return <SkeletonCard />;

  if (isError)
    return (
      <div>
        <p className="text-red-500">Cannot Display card</p>
      </div>
    );


  if (!data) return <p>NOT DETAILS</p>;

  const matchesType = selectedType === "all" || data.type.includes(selectedType);

  if (!matchesType) return null;

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
