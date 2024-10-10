import { Layout } from "@/components/layouts/layout";
import Section1 from "@/components/main/section_1/section-1";
import Section2 from "@/components/main/section_2/section-2";

export default function Home() {
  return (
    <Layout type="main" className="absolute w-full  h-72 md:h-full z-10">
      <Section1 />
      <Section2 />
    </Layout>
  );
}
