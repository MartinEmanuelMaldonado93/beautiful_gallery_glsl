"use client";
import { Canvas } from "@react-three/fiber";
import PlanePhoto from "./PlanePhoto";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function CanvasScene() {
	return (
		<Suspense fallback={null}>
			<Canvas className="h-screen w-full">
				<ambientLight intensity={0.001} />
				<PlanePhoto />
				<OrbitControls />
			</Canvas>
		</Suspense>
	);
}
