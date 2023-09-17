type image_data = {
  image: string;
  name: string;
  profession: string;
};

type Coordinates = { x: number; y: number };
type CustomUniforms = THREE.Material & {
  uniforms: {
    uTex: { value: THREE.Texture };
    uRes: { value: Coordinates };
    uProgress: { value: number };
    uZoomScale: { value: Coordinates };
    uImageRes: { value: Coordinates };
  };
};
