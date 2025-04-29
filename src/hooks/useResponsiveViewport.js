import { useState, useEffect } from "react";

const calculateViewport = () => {
  const width = window.innerWidth;
  if (width >= 1024) return { columns: 3, rowHeight: 400, gap: "gap-6" };
  if (width >= 640) return { columns: 2, rowHeight: 320, gap: "gap-6" };
  return { columns: 1, rowHeight: 250, gap: "gap-5" };
};

export const useResponsiveViewport = () => {
  const [viewport, setViewport] = useState(calculateViewport());

  useEffect(() => {
    const handleResize = () => setViewport(calculateViewport());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
};
