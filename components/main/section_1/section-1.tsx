import World from "@/components/main/section_1/world";
import { Layout } from "@/components/layouts/layout";

/**
 * Section 1 component for the main landing page.
 * It includes the world/globe component wrapped inside a layout.
 *
 * @returns {JSX.Element} The rendered Section1 component.
 */
export default function Section1() {
  return (
    <Layout type="section">
      <World />
    </Layout>
  );
}
