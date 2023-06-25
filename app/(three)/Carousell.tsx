import { useEffect, useRef, useState } from "react";
import PlanePhoto from "./PlanePhoto";
import { Group, Vector3 } from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useAnimation } from "framer-motion";

export default function Carousell() {
	const rootRef = useRef<Group>(null!);
	const [hover, setHover] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const { viewport } = useThree();
	// z: isActive ? 0 : -0.01,  delay: isActive ? 0 : 2
	const newZposition = isActive ? 0 : -0.01;
	const targetPos = new Vector3(0, 0, newZposition);

	useFrame(() => {
		if (!rootRef.current) return;

		const newPos = rootRef.current.position.clone();
		newPos.lerp(targetPos, 0.1);
		rootRef.current.position.setZ(newZposition);
	});

	// Hover effect
	const hoverScale = hover && !isActive ? 1.1 : 1;
	const targetScale = new Vector3(hoverScale, hoverScale, 1);
	const scaleSpeed = 0.1;

	useFrame(() => {
		if (!rootRef.current) return;

		const newScale = rootRef.current.scale.clone();
		newScale.lerp(targetScale, scaleSpeed); // interpolation *
		rootRef.current.scale.copy(newScale);
	});

	function handleClose(e: ThreeEvent<MouseEvent>) {
		e.stopPropagation();
		if (!isActive) return;
		setIsActive(false);
	}

	return (
		<group
			ref={rootRef}
			onClick={() => {
				setIsActive(true);
				console.log("click");
			}}
			onPointerEnter={() => setHover(true)}
			onPointerLeave={() => setHover(false)}
		>
			<PlanePhoto
				texture="./raudha_athif.jpg"
				width={1.8}
				height={2.6}
				active={isActive}
			/>
			{isActive && (
				<mesh position={[0, 0, 0.01]} onClick={handleClose}>
					<planeGeometry args={[viewport.width, viewport.height]} />
					<meshBasicMaterial transparent={true} opacity={0} color={"red"} />
				</mesh>
			)}
		</group>
	);
}
