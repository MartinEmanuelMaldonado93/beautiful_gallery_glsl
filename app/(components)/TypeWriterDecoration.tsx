"use client";
import { useEffect, useRef } from "react";

export default function TypewriterDecoration({
  index,
  profession,
  time_ms = 20,
}: {
  index: number;
  profession: string;
  time_ms?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let index = 0;
    type();

    function type() {
      if (!ref.current) return;
      if (index == profession.length) return;

      ref.current.innerHTML = profession.slice(0, index + 1);
      index++;
      setTimeout(type, Math.random() * time_ms);
    }
  }, [profession]);

  return (
    <div className="top-10 flex min-w-[35vw] items-center gap-1 text-xl transition-all">
      <span style={{ fontFamily: "big-daily" }}>
        {"("}
        {index}
        {")"}
      </span>
      <div className="h-[1px] flex-1 shrink bg-black"></div>
      <span
        ref={ref}
        className="min-w-[4rem] uppercase"
        style={{ fontFamily: "big-daily-italic-light" }}
      ></span>
    </div>
  );
}
