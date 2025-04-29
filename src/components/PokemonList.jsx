import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useVirtualizer } from "@tanstack/react-virtual";

const PokemonList = () => {
  const { data: pokemons = [], isLoading, isError } = usePokemon();
  const parentRef = useRef();

  const [viewport, setViewport] = useState({
    columns: 1,
    rowHeight: 160,
    gap: "gap-4",
  });

  const calculateViewport = () => {
    const width = window.innerWidth;
    if (width >= 1024) return { columns: 3, rowHeight: 200, gap: "gap-6" };
    if (width >= 640) return { columns: 2, rowHeight: 180, gap: "gap-5" };
    return { columns: 1, rowHeight: 160, gap: "gap-4" };
  };

  useEffect(() => {
    const handleResize = () => {
      setViewport(calculateViewport());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { columns, rowHeight, gap } = viewport;

  const rowCount = useMemo(
    () => Math.ceil(pokemons.length / columns),
    [pokemons.length, columns]
  );

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 4,
  });

  if (isLoading)
    return <p className="text-center text-gray-600">Loading Pokémon...</p>;
  if (isError)
    return <p className="text-center text-red-600">Failed to load data.</p>;
  if (!pokemons.length)
    return <p className="text-center text-gray-500">No Pokémon found.</p>;

  return (
    <div
      ref={parentRef}
      className="h-[100vh - 70px] overflow-auto bg-blue-50 p-2 rounded-md border border-blue-100 shadow-inner"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const items = pokemons.slice(
            rowIndex * columns,
            rowIndex * columns + columns
          );

          return (
            <div
              key={rowIndex}
              className={`absolute w-full px-2 grid ${gap}`}
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white h-full rounded-lg p-4 text-center shadow hover:shadow-md transition-all"
                >
                  <p className="font-semibold capitalize text-gray-800 text-lg">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
