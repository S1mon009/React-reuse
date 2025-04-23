import { type JSX } from "react";

export function GridBackground(): JSX.Element {
  return (
    <div className="h-[35rem] md:h-[50rem] w-full dark:bg-[#0c0a09] bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#0c0a09] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
