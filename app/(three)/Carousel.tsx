import { useEffect, useRef, useState, useMemo } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { usePrevious } from "react-use";
import gsap from "gsap";
import CarouselItem from "./CarouselItem";
import { Group, MathUtils, Object3D } from "three";
import collection_images from "../(data)";
import { EffectsWithRef } from "./Effects";
import { getPiramidalIndex } from "../(utils)";
import { useStore } from "zustand";
import { useNameStore } from "@/store";

const { min, max, abs, floor } = Math;
const { lerp } = MathUtils;

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
	const postRef = useRef<unknown>();
	const [activePlane, setActivePlane] = useState<number | null>(null);
	const prevActivePlane = usePrevious<number | null>(activePlane);
	const { viewport } = useThree();

	const progress = useRef<number>(0);
	const startX = useRef<number>(0);
	const isDown = useRef<boolean>(false);
	const speed = useRef<number>(0);
	const oldProgress = useRef<number>(0);
	const speedWheel = 0.09;
	const speedDrag = -0.3;

	const [$items, set$items] = useState<
		THREE.Object3D<THREE.Event>[] | undefined
	>(undefined);

	useEffect(() => {
		if (rootRef.current) {
			set$items(rootRef.current.children);
		}
	}, [rootRef]);

	useFrame(() => {
		progress.current = max(0, min(progress.current, 100));

		if (!$items) return;

		const activeIndex = floor(
			(progress.current / 100) * ($items.length - 1)
		);

		$items.forEach((item, index) => 
		gsapDisplayItems(item, index, activeIndex));// 1..2..3...4..5

		speed.current = lerp(
			speed.current,
			abs(oldProgress.current - progress.current),
			0.5
		);

		oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);
		//@ts-ignore
		if(postRef.current) postRef.current.thickness = speed.current;
	});

	function gsapDisplayItems(
		item: Object3D<THREE.Event>,
		index: number,
		activeNro: number
	) {
		if(!$items) return;
		const piramidalIndex = getPiramidalIndex($items, activeNro)[index];

		gsap.to(item.position, {
			x: (index - activeNro) * (planeSettings.width + planeSettings.gap + 0.2),
			y: $items.length * -0.1 + piramidalIndex * 0.1,
		});
	}

	function handleWheel(e: ThreeEvent<WheelEvent>) {
		if (activePlane !== null) return;

		const isVerticalScroll = abs(e.deltaY) > abs(e.deltaX);
		const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
		progress.current += wheelProgress * speedWheel;
	}

	function handleDown(e: ThreeEvent<PointerEvent>) {
		if (activePlane !== null) return;

		isDown.current = true;
		startX.current = e.clientX || 0;
		// startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
	}

	function handleUp() {
		isDown.current = false;
	}

	function handleMove(e: ThreeEvent<PointerEvent>) {
		if (activePlane !== null || !isDown.current) return;
		const x = e.clientX || 0;
		const mouseProgress = (x - startX.current) * speedDrag;
		progress.current = progress.current + mouseProgress;
		startX.current = x;
	}

	useEffect(() => {
		if (!$items) return;
		if (activePlane !== null && prevActivePlane === null) {
			progress.current = (activePlane / ($items.length - 1)) * 100; // Calculate the progress.current based on activePlane
		}
	}, [activePlane, $items]);

	return (
		<group>
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
			<EffectsWithRef ref={postRef} />
		</group>
	);
}
