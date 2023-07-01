import React, { useEffect, useRef } from "react";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import "./SplittingWriter.css";

export default function SplittingWriter() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const container = containerRef.current;
    Splitting({ target: container });

    const interval = setInterval(() => {
      const chars = container.querySelectorAll(".char");

      chars.forEach((char, index) => {
        setTimeout(() => {
          //@ts-ignore
          char.style.visibility = "visible";
        }, 100 * index);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-container absolute left-1/3 top-10 z-10 transition-opacity duration-300"
    >
      Your rotating string here
    </div>
  );
}
