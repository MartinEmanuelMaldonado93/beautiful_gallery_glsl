type Coordinates = { x: number; y: number };
export type CustomUniforms = THREE.Material & {
	uniforms: {
		uTex: { value: THREE.Texture };
		uRes: { value: Coordinates };
		uProgress: { value: number };
		uZoomScale: { value: Coordinates };
		uImageRes: { value: Coordinates };
	};
};
