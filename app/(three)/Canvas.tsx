"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Carousel from "./Carousel";

export default function CanvasScene() {
	return (
		<Suspense fallback={null}>
			<Canvas className="h-screen w-full">
				<ambientLight intensity={0.001} />
				<Carousel />
				{/* <OrbitControls /> */}
			</Canvas>
		</Suspense>
	);
}
