"use client";

import { colors, globeConfig, sampleArcs } from "@/config/globe";
import dynamic from "next/dynamic";

const WorldComponent = dynamic(
  () => import("../ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export default function World() {
  return <WorldComponent data={sampleArcs} globeConfig={globeConfig} />;
}
