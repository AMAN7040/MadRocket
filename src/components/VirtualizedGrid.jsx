import React, { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useResponsiveViewport } from "../hooks/useResponsiveViewport";
import PokemonCardWithDetails from "./PokemonCardWithDetails";


const VirtualizedGrid = ({ pokemons, parentRef }) => {
  const { columns, rowHeight, gap } = useResponsiveViewport();

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

export default VirtualizedGrid;
