import { Layout } from "@/components/layouts/layout";
import World from "@/components/world/world";

export default function Home() {
  return (
    <Layout
      type="main"
      className="absolute w-full -bottom-20 h-72 md:h-full z-10"
    >
      <World />
    </Layout>
  );
}
