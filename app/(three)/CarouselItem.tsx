import { useEffect, useRef, useState } from "react";
import PlanePhoto from "./PlanePhoto";
import { Group, Vector3 } from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useAnimation } from "framer-motion";
import { image_data } from "../(models)";
import gsap from "gsap";

type props = {
	index: number;
	width?: number;
	height?: number;
	activePlane: number | null;
	setActivePlane: any;
	item: image_data;
};
export default function CarouselItem({
	index,
	width = 1.8,
	height = 2.6,
	setActivePlane,
	activePlane,
	item,
}: props) {
	const rootRef = useRef<Group>(null!);
	const [hover, setHover] = useState(false);
	const [isActive, setIsActive] = useState<boolean | null>(false);
	const [isCloseActive, setCloseActive] = useState(false);
	const { viewport } = useThree();
	const timeoutID = useRef<NodeJS.Timeout>();

	// z: isActive ? 0 : -0.01,  delay: isActive ? 0 : 2
	const newZposition = isActive ? 0 : -0.01;
	const targetPos = new Vector3(0, 0, newZposition);

	useEffect(() => {
		if (activePlane === index) {
			setIsActive(true);
			setCloseActive(true);
		} else {
			setIsActive(null);
		}
	}, [activePlane]);

	useEffect(() => {
		gsap.killTweensOf(rootRef.current.position);
		gsap.to(rootRef.current.position, {
			z: isActive ? 0 : -0.01,
			duration: 0.2,
			ease: "power3.out",
			delay: isActive ? 0 : 2,
		});
	}, [isActive]);

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
		clearTimeout(timeoutID.current);
		timeoutID.current = setTimeout(() => {
			setCloseActive(false);
		}, 1500); // The duration of this timer depends on the duration of the plane's closing animation.
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
				// texture="./raudha_athif.jpg"
				texture={item.image}
				width={width}
				height={height}
				active={!!isActive}
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
