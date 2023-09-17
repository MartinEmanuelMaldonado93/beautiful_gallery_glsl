import { useEffect } from "react";
import Splitting from "splitting";
import "splitting/dist/splitting-cells.css";
import "splitting/dist/splitting.css";
import "./SplittingWriter.css";

export function SplittingWriter() {
  useEffect(() => {
    Splitting({ target: document.getElementById("splitting-text")! });
  }, []);

  return (
    <div
      id="splitting-text"
      className="text-container absolute left-1/3 top-10 z-10 transition-opacity duration-300"
    >
      Your rotating string here
    </div>
  );
}
