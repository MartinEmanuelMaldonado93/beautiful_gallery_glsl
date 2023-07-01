// Returns an array of decreasing index values in a pyramid shape, 
// starting from the specified index with the highest value. 

import { Object3D } from "three";

// These indices are often used to create overlapping effects among elements.
export function getPiramidalIndex(array: Object3D<THREE.Event>[], index: number) {
	return array.map((_, i) =>
		index === i ? array.length : array.length - Math.abs(index - i) *1.9
	);
}
