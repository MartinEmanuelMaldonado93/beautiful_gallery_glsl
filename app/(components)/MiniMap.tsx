"use client";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, LineBasicMaterial, Vector3 } from "three";
import { damp } from "three/src/math/MathUtils";
import collection_images from "../../store/(data)";

const material = new LineBasicMaterial({ color: "black" });
const geometry = new BufferGeometry().setFromPoints([
  new Vector3(0, -0.5, 0),
  new Vector3(0, 2, 0),
]);

/** uses ScrollControls
 * horizontal  pages={(width - xW + urls.length * xW) / width}
 */
export function Minimap() {
  const ref = useRef<THREE.Group>(null!);
  const scroll = useScroll();
  const urls: image_data[] = collection_images;
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      );
      child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, 8);
    });
  });

  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line
          key={i}
          //@ts-ignore
          geometry={geometry}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
}
