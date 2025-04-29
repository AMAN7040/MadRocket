export const getDetails = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error("Failed to get the details of the pokemon");

    clearTimeout(timeout);

    const data = await response.json();

    return {
      id: data?.id,
      name: data?.name,
      image: data?.sprites?.front_default,
      type: data.types.map((type) => type.type.name),
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }
    throw error;
  }
};
