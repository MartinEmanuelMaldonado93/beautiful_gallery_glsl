"use client";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { animate } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import type { Mesh } from "three";
import FS from "../(shaders)/photo.fragment.glsl";
import VS from "../(shaders)/photo.vertex.glsl";

type props = {
  texture: string;
  width: number;
  height: number;
  active: boolean;
};
export default function PlanePhoto({
  texture: url,
  width,
  height,
  active,
}: props) {
  const meshRef = useRef<Mesh>(null!);
  const { viewport } = useThree();
  const texture = useTexture(url);

  useEffect(() => {
    if (!meshRef.current.material) return;
    // meshRef.current.rotation.set = 3;
    const material = meshRef.current.material as CustomUniforms;
    material.uniforms.uRes.value.x = width;
    material.uniforms.uRes.value.y = height;
    material.uniforms.uZoomScale.value.x = viewport.width / width;
    material.uniforms.uZoomScale.value.y = viewport.height / height;

    // // animate resolution and progress wich is the most important
    // let start = material.uniforms.uProgress.value;
    animate(material.uniforms.uProgress.value, active ? 1 : 0, {
      onUpdate(latest) {
        material.uniforms.uProgress.value = latest;

        material.uniforms.uRes.value.x = active ? viewport.width : width;
        material.uniforms.uRes.value.y = active ? viewport.height : height;
      },
      stiffness: 60,
      mass: 1.7,
    });

  }, [active, viewport]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTex: { value: texture },
        uRes: { value: { x: 1, y: 1 } },
        uProgress: { value: 0 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: {
            x: texture.source.data.width,
            y: texture.source.data.height,
          },
        },
      },
      vertexShader: VS,
      fragmentShader: FS,
    }),
    [texture]
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
}
