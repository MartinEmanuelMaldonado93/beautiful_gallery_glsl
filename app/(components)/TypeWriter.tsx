"use client";
import { useEffect, useRef } from "react";

export default function Typewriter({
  text,
}: {
  text: string;
  velocity?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let index = 0;

    (function typing() {
      if (!ref.current) return;
      if (index == text.length) return;

      ref.current.innerHTML = text.slice(0, index + 1);
      index++;
      setTimeout(typing, Math.random() * 20);
    })();
  }, [text]);

  return (
    <span
      ref={ref}
      className="top-16 text-5xl  "
      style={{ fontFamily: "big-daily-regular" }}
    ></span>
  );
}
