export const getPokemons = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/pokemon?limit=150`,
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Failed to fetch the pokemons data");
    }

    const data = await response.json();
    return data?.results;
    
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }
    throw error;
  }
};
