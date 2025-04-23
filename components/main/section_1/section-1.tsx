import { type JSX } from "react";

import Layout from "@/components/layouts/layout";
import World from "@/components/main/section_1/world";

export default function Section1(): JSX.Element {
  return (
    <Layout type="section">
      <World />
    </Layout>
  );
}
