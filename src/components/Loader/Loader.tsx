"use client";

import { ThreeCircles } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="h-screen relative bg-transparent">
        <div className="absolute top-1/2 left-1/2 z-10 ">
          <ThreeCircles />
        </div>
      </div>
    </>
  );
}
