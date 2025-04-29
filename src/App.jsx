import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <>
        <Header />
        <PokemonList />
      </>
    </SearchProvider>
  );
}

export default App;
