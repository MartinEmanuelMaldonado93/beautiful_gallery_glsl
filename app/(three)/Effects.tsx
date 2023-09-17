import { MeshTransmissionMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef } from "react";
import { Color } from 'three';

// import { useControls } from "leva";

export type EffectsType = JSX.IntrinsicElements["meshTransmissionMaterial"];

export const EffectsWithRef = forwardRef<EffectsType>(
  (_, ref) => {
    const { viewport } = useThree();

    return (
      <mesh position={[0, 0, 1]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <MeshTransmissionMaterial
          ref={ref}
          background={new Color("white")}
          // transmission={ctrl.transmission}
          transmission={0.95}
          roughness={0}
          thickness={0}
          chromaticAberration={0.06}
          anisotropy={0}
          // ior={ctrl.ior}
          ior={0.9}
          distortionScale={0}
          temporalDistortion={0}
        />
      </mesh>
    );
  }
);

//   const ctrl = useControls({
    //     active: {
    //       value: true,
    //     },
    //     ior: {
    //       value: 0.9,
    //       min: 0.8,
    //       max: 1.2,
    //     },
    //     // transmission: 0.5,
    //   });