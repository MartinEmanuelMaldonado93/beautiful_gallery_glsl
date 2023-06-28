"use client";
import InfoBar from './(components)/InfoBar';
import CanvasScene from './(three)/Canvas';

export default function Home() {
  return (
		<main className="h-screen w-full">
			<InfoBar />
			<CanvasScene />
		</main>
	);
}
