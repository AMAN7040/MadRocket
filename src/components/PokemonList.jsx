import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useVirtualizer } from "@tanstack/react-virtual";
import SkeletonCard from "./SkeletonCard";
import ErrorFallback from "./ErrorFallback";
import PokemonCardWithDetails from "./PokemonCardWithDetails";

const PokemonList = () => {
  const {
    data: pokemons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemon();
  const parentRef = useRef();

  const [viewport, setViewport] = useState({
    columns: 1,
    rowHeight: 160,
    gap: "gap-4",
  });

  const calculateViewport = () => {
    const width = window.innerWidth;
    if (width >= 1024) return { columns: 3, rowHeight: 400, gap: "gap-6" };
    if (width >= 640) return { columns: 2, rowHeight: 320, gap: "gap-6" };
    return { columns: 1, rowHeight: 250, gap: "gap-5" };
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

  if (isLoading) {
    return (
      <div className="overflow-auto h-[calc(100vh-70px)]  rounded-md p-2">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback error={error} onReset={refetch} />;
  }
  if (!pokemons.length)
    return <p className="text-center text-gray-500">No Pokémon found.</p>;

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-70px)] overflow-auto bg-bg p-2 rounded-md border shadow-inner"
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
              className={`absolute w-full px-2 grid justify-items-center ${gap}`}
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {items.map((item) => (
                <PokemonCardWithDetails key={item} url={item?.url} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
