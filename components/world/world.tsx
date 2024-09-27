"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/navigation/navigation";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Layout } from "@/components/layouts/layout";
import { Typography } from "@/components/typography/typography";
import { Github } from "lucide-react";
import { globeConfig, sampleArcs } from "@/config/globe";

const WorldComponent = dynamic(
  () => import("../ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export default function World() {
  return (
    <>
      <div className="absolute w-full start-1/2 -translate-x-2/4 top-32 z-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <Layout type="div" className="w-full text-center text-6xl font-bold">
            Hooks and utilities for your <br /> next powerfull projects
          </Layout>
          <Typography
            type="p"
            className="text-center text-2xl dark:text-white text-muted font-normal max-w-md mt-2 mx-auto "
          >
            Supercharge your code with reuseable code checked with ESLint and
            Vitest.
          </Typography>
          <Layout type="div" className="flex justify-center gap-4 mt-4">
            <Link
              href="/docs/introduction"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Get started
            </Link>
            <a href="https://github.com/S1mon009">
              <Button variant="secondary" size="lg">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
          </Layout>
        </motion.div>
      </div>
      <div className="absolute w-full h-[800px] z-10 flex justify-center items-center">
        <WorldComponent data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </>
  );
}
