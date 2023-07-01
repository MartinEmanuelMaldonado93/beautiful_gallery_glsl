"use client";
import { useThree, useFrame, extend, Object3DNode } from "@react-three/fiber";
import { useRef } from "react";
import { damp } from "three/src/math/MathUtils";
import { image_data } from "../(models)";
import { BufferGeometry, LineBasicMaterial, Vector3 } from "three";
import { useScroll } from "@react-three/drei";
import collection_images from "../(data)";

const material = new LineBasicMaterial({ color: "black" });
const geometry = new BufferGeometry().setFromPoints([
  new Vector3(0, -0.5, 0),
  new Vector3(0, 2, 0),
]);

// extend({ SVGLineElement });

// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     line: Object3DNode<typeof SVGLineElement, typeof SVGLineElement>;
//   }
// }
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
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      // grows only y axis
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
