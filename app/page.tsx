import Image from 'next/image'
import CanvasScene from './(three)/Canvas';

export default function Home() {
  return (
		<main className="h-screen w-full">
			<CanvasScene />
		</main>
	);
}
