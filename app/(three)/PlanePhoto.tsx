"use client";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Mesh } from "three";
import { useAnimation } from "framer-motion";
import VS from "../(shaders)/photo.vertex.glsl";
import FS from "../(shaders)/photo.fragment.glsl";
import { animate } from "framer-motion";
import { useControls } from "leva";
import gsap from "gsap";
import { CustomUniforms } from "../(models)";

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
	const lerpSpeed = 0.05;

	useEffect(() => {
		if (!meshRef.current.material) return;
		// meshRef.current.rotation.set = 3;
		const material = meshRef.current.material as CustomUniforms;
		material.uniforms.uRes.value.x = width;
		material.uniforms.uRes.value.y = height;
		material.uniforms.uZoomScale.value.x = viewport.width / width;
		material.uniforms.uZoomScale.value.y = viewport.height / height;

		// // animate resolution and progress wich is the most important
		let start = material.uniforms.uProgress.value;
		animate(start, active ? 1 : 0, {
			onUpdate(latest) {
				material.uniforms.uProgress.value = latest;
			},
			stiffness: 60,
			mass: 1.7,
			
		});

		gsap.to(material.uniforms.uRes.value, {
			x: active ? viewport.width : width,
			y: active ? viewport.height : height,
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
