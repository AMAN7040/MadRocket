import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { data, isLoading, isError, error } = usePokemon();

  if (isLoading) return <div>Loading....</div>;

  if (isError) return <div>{error?.message}</div>;

  return (
    <>
      <div className="">
        {data.map((pokemon) => (
          <p>{pokemon.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
