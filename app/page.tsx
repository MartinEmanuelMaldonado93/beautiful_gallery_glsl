"use client";
import { Loader } from '@react-three/drei';
import InfoBar from './(components)/InfoBar';
import CanvasScene from './(three)/Canvas';
import SplittingWriter from './(components)/SplittingWriter';

export default function Home() {
  return (
    <main className="h-screen w-full">
      {/* <InfoBar /> */}
      <SplittingWriter />
      {/* <CanvasScene />
      <Loader /> */}
    </main>
  );
}
