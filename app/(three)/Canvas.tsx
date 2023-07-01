"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import Carousel from "./Carousel";
import { Minimap } from "../(components)/MiniMap";
import collection_images from "../(data)";

export default function CanvasScene() {
  return (
    <Suspense fallback={null}>
      <Canvas className="h-screen w-full">
        <ambientLight intensity={0.001} />
        <Carousel />
		<ScrollControls>
			<Scroll>
				<Minimap />
			</Scroll>
		</ScrollControls>
        {/* <OrbitControls /> */}
      </Canvas>
    </Suspense>
  );
}
