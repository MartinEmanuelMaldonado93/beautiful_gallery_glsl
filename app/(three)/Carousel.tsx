import { useEffect, useRef, useState, useMemo } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { usePrevious } from "react-use";
import gsap from "gsap";
import CarouselItem from "./CarouselItem";
import { Group, Object3D } from "three";
import collection_images from "../(data)";

const planeSettings = {
	width: 1,
	height: 2.5,
	gap: 0.1,
};

gsap.defaults({
	duration: 2.5,
	ease: "power3.out",
});

export default function Carousel() {
	const rootRef = useRef<Group>(null!);
	const [activePlane, setActivePlane] = useState<number | null>(null);
	const prevActivePlane = usePrevious(activePlane);
	const { viewport } = useThree();

	/*--------------------
  Vars
  --------------------*/
	const progress = useRef(0);
	const startX = useRef(0);
	const isDown = useRef(false);
	const speedWheel = 0.02;
	const speedDrag = -0.3;
	// const $items: Object3D<Event>[] | undefined = useMemo(() => {
	// 	if (rootRef.current.children) return rootRef.current.children;
	// }, [rootRef]);
	const [$items, set$items] = useState<THREE.Object3D<Event>[]|undefined>(undefined);

	useEffect(() => {
		if (rootRef.current && rootRef.current.children) {
			set$items(rootRef.current.children);
		}
	}, []);
	/*--------------------
  Diaplay Items
  --------------------*/
	const displayItems = (item: any, index: number, active: number) => {
		gsap.to(item.position, {
			x: (index - active) * (planeSettings.width + planeSettings.gap),
			y: 0,
		});
	};

	/*--------------------
	RAF
  --------------------*/
	useFrame(() => {
		progress.current = Math.max(0, Math.min(progress.current, 100));
		if (!$items) return;
		const active = Math.floor((progress.current / 100) * ($items.length - 1));
		$items.forEach((item, index) => displayItems(item, index, active));
	});

	/*--------------------
  Handle Wheel
  --------------------*/
	const handleWheel = (e: { deltaY: number; deltaX: number }) => {
		if (activePlane !== null) return;
		const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
		const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
		progress.current = progress.current + wheelProgress * speedWheel;
	};

	/*--------------------
  Handle Down
  --------------------*/
	const handleDown = (e: ThreeEvent<PointerEvent>) => {
		if (activePlane !== null) return;

		isDown.current = true;
		startX.current = e.clientX || 0;
		// startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
	};

	/*--------------------
  Handle Up
  --------------------*/
	const handleUp = () => {
		isDown.current = false;
	};

	/*--------------------
  Handle Move
  --------------------*/
	const handleMove = (e: ThreeEvent<PointerEvent>) => {
		if (activePlane !== null || !isDown.current) return;
		const x = e.clientX || 0;
		// const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
		const mouseProgress = (x - startX.current) * speedDrag;
		progress.current = progress.current + mouseProgress;
		startX.current = x;
	};

	/*--------------------
  Click
  --------------------*/
	useEffect(() => {
		if (!$items) return;
		if (activePlane !== null && prevActivePlane === null) {
			progress.current = (activePlane / ($items.length - 1)) * 100; // Calculate the progress.current based on activePlane
		}
	}, [activePlane, $items]);

	/*--------------------
  Render Plane Events
  --------------------*/
	const renderPlaneEvents = () => {
		return (
			<mesh
				position={[0, 0, -0.01]}
				onWheel={handleWheel}
				onPointerDown={handleDown}
				onPointerUp={handleUp}
				onPointerMove={handleMove}
				onPointerLeave={handleUp}
				onPointerCancel={handleUp}
			>
				<planeGeometry args={[viewport.width, viewport.height]} />
				<meshBasicMaterial transparent={true} opacity={0} />
			</mesh>
		);
	};

	/*--------------------
  Render Slider
  --------------------*/
	const renderSlider = () => {
		return (
			// <group ref={setRoot}>
			<group ref={rootRef}>
				{collection_images.map((item, i) => (
					<CarouselItem
						width={planeSettings.width}
						height={planeSettings.height}
						setActivePlane={setActivePlane}
						activePlane={activePlane}
						key={item.image}
						item={item}
						index={i}
					/>
				))}
			</group>
		);
	};

	return (
		<group>
			{renderPlaneEvents()}
			{renderSlider()}
		</group>
	);
}
