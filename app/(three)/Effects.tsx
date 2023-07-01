import { forwardRef, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Color } from "three";
import { useControls } from "leva";

export const EffectsWithRef = forwardRef((_, ref) => {
  const { viewport } = useThree();
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

  return (
    <mesh position={[0, 0, 1]}>
      {/* fill all the window  */}
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
});
