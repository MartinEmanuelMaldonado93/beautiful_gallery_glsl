import { ScrollControls, Scroll } from "@react-three/drei";
import React, { ReactNode } from "react";
import collection_images from "../(data)";
import { useThree } from "@react-three/fiber";

export default function ScrollWrap({ children }: { children: ReactNode }) {
  const { width } = useThree((state) => state.viewport);
  //   const {clientWidth: width} = window;
  //   const { innerWidth: width } = window;
  const gap = 0.15,
    w = 0.7;
  const xW = w + gap;
  const { length } = collection_images;
  return (
    <ScrollControls horizontal pages={(width - xW + length * xW) / width}>
      <Scroll>{children}</Scroll>
    </ScrollControls>
  );
}
