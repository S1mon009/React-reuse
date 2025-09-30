import type { JSX } from "react";

import Layout from "@/components/layouts/layout";
import Section1 from "@/components/main/section_1/section-1";
import Section2 from "@/components/main/section_2/section-2";
import Section3 from "@/components/main/section_3/section-3";
import Footer from "@/components/navigation/footer";

export default function Page(): JSX.Element {
  return (
<<<<<<< HEAD
    <Layout type="main" className="w-full top-14 h-72 md:h-full z-0">
=======
    <Layout type="main" className="absolute top-14 z-0 h-72 w-full md:h-full">
>>>>>>> nextjs-15.2.0
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </Layout>
  );
}
