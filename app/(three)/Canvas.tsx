"use client";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Minimap } from "../(components)/MiniMap";
import Carousel from "./Carousel";

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
      </Canvas>
    </Suspense>
  );
}
