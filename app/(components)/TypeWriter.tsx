"use client";
import { useState, useEffect, useRef } from "react";

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
		type();

		function type() {
			if (!ref.current) return;
			if (index == text.length) return;

			ref.current.innerHTML = text.slice(0, index+1);
			index++;
			setTimeout(type, Math.random() * 20);
		}
	}, [text]);

	return (
		<span
			ref={ref}
			className="text-5xl top-16  "
			style={{ fontFamily: "big-daily-regular" }}
		></span>
	);
}
