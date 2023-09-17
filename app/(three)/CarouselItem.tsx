import { useActiveStore, useNameStore } from "@/store";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { type Group, Vector3 } from "three";
import PlanePhoto from "./PlanePhoto";

type props = {
  index: number;
  width?: number;
  height?: number;
  activePlane: number | null;
  setActivePlane: Dispatch<SetStateAction<number | null>>;
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
  const groupRef = useRef<Group>(null!);
  const { setNamePhoto } = useNameStore();
  const { activeFullPhoto, setActiveFullPhoto } = useActiveStore();
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState<boolean | null>(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const timeoutID = useRef<NodeJS.Timeout>();

  const newZposition = isActive ? 0 : -0.01;
  const targetPos = new Vector3(0, 0, newZposition);

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(true);
      setCloseActive(true);
      // setActiveFullPhoto(true);
      return;
    }
    // setActiveFullPhoto(false);
    setIsActive(null);
  }, [activePlane]);

  useEffect(() => {
    // TODO: i dontk know what is used for
    // gsap.killTweensOf(groupRef.current.position);
    // gsap.to(groupRef.current.position, {
    //   z: isActive ? 0 : -0.01,
    //   duration: 0.2,
    //   ease: "power3.out",
    //   delay: isActive ? 0 : 1,
    // });
    
    
  }, [isActive]);

  useFrame(() => {
    if (!groupRef.current) return;

    const newPos = groupRef.current.position.clone();
    newPos.lerp(targetPos, 0.1);
    groupRef.current.position.setZ(newZposition);
  });

  // Hover effect
  const hoverScale = hover && !isActive ? 1.1 : 1;
  const targetScale = new Vector3(hoverScale, hoverScale, 1);
  const scaleSpeed = 0.5;
  useFrame(() => {
    if (!groupRef.current) return;

    const newScale = groupRef.current.scale.clone();
    newScale.lerp(targetScale, scaleSpeed); // interpolation *
    groupRef.current.scale.copy(newScale);
  });

  function handleClose(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (!isActive) return;

    setTimeout(() => {
      setActiveFullPhoto(!activeFullPhoto);
    }, 500);
    setActivePlane(null);
    setHover(false);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setCloseActive(false);
    }, 1000); // The duration of this timer depends on the duration of the plane's closing animation.
  }

  return (
    <group
      ref={groupRef}
      onClick={() => {
        setActivePlane(index);
        setActiveFullPhoto(!activeFullPhoto);
      }}
      onPointerEnter={() => {
        setHover(true);
        setNamePhoto({
          index,
          name_photo: item.name,
          profession: item.profession,
          // isClicked: true,
        });
      }}
      onPointerLeave={() => setHover(false)}
    >
      <PlanePhoto
        texture={item.image}
        width={width}
        height={height}
        active={!!isActive}
      />
      {isActive && (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} />
        </mesh>
      )}
    </group>
  );
}
