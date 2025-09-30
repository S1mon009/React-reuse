import { type JSX } from "react";

export function GridBackground(): JSX.Element {
  return (
    <div className="relative flex h-[35rem] w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-[#0c0a09] dark:bg-grid-white/[0.2] md:h-[50rem]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#0c0a09]"></div>
    </div>
  );
}
