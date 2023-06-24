"use client";
import { useTexture } from "@react-three/drei";
import {
	Object3DNode,
	extend,
	useFrame,
	useLoader,
	useThree,
} from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Mesh, ShaderMaterialParameters, TextureLoader, Vector2 } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import VS from "../(shaders)/photo.vertex.glsl";
import FS from "../(shaders)/photo.fragment.glsl";

export default function PlanePhoto() {
	const meshRef = useRef<Mesh>(null!);
	const { viewport } = useThree();
	const tex = useTexture("/raudha_athif.jpg");

	const { width, height } = useControls({
		width: {
			value: 2,
			min: 0.5,
			max: viewport.width,
		},
		height: {
			value: 3,
			min: 0.5,
			max: viewport.height,
		},
	});

	useFrame(() => {
		if (meshRef.current.material) {
			//@ts-ignore
			meshRef.current.material.uniforms.uRes.value.x = width;
			//@ts-ignore
			meshRef.current.material.uniforms.uRes.value.y = height;
		}
	});

	const shaderArgs = useMemo(
		() => ({
			uniforms: {
				uTex: { value: tex },
				uRes: { value: { x: 1, y: 1 } },
				uImageRes: {
					value: { x: tex.source.data.width, y: tex.source.data.height },
				},
			},
			/* glsl */
			vertexShader: VS,
			fragmentShader: FS,
		}),
		[tex]
	);

	return (
		<mesh ref={meshRef}>
			<planeGeometry args={[width, height, 30, 30]} />
			<shaderMaterial args={[shaderArgs]} />
		</mesh>
	);
}
