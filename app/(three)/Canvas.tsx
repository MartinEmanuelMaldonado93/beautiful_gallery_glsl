"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import Carousel from "./Carousel";
import { Minimap } from "../(components)/MiniMap";
import collection_images from "../(data)";

export default function CanvasScene() {
//   const { width } = useThree((state) => state.viewport);
  const {clientWidth: width} = document.body;
  const gap = 0.15, w = 0.7;
  const xW = w + gap;
  const { length } = collection_images;

  return (
    <Suspense fallback={null}>
      <Canvas className="h-screen w-full">
        <ambientLight intensity={0.001} />
        <Carousel />
        <ScrollControls horizontal pages={(width - xW + length * xW) / width}>
          <Scroll>
            <Minimap />
          </Scroll>
        </ScrollControls>
        {/* <OrbitControls /> */}
      </Canvas>
    </Suspense>
  );
}
