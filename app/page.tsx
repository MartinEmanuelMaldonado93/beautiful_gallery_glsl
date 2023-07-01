"use client";
import { Loader } from '@react-three/drei';
import InfoBar from './(components)/InfoBar';
import CanvasScene from './(three)/Canvas';
import {SplittingWriter} from './(components)/SplittingWriter';

interface LoaderOptions {
  containerStyles: any;
  innerStyles: any;
  barStyles: any;
  dataStyles: any;
  dataInterpolation: (p: number) => string;
  initialState: (active: boolean) => boolean;
}

export default function Home() {
  return (
    <main className="h-screen w-full">
      <InfoBar />
      {/* <SplittingWriter /> */}
      <CanvasScene />
      <Loader
        containerStyles={{
          background: "linear-gradient(to top, transparent,  #d1dbdc);",
        }}
		dataStyles={{
			color:'black',
			fontSize: '2rem',
			fontFamily:'big-daily-italic-light'
		}}
      />
    </main>
  );
}
