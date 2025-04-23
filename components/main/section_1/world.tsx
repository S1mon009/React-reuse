"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import Layout from "@/components/layouts/layout";
import Typography from "@/components/typography/typography";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { GridBackground } from "@/components/grid_background/grid-background";

const translation = "LandingPage.Section1";

export default function World() {
  const t = useTranslations(translation);

  return (
    <>
      <GridBackground />
      <div className="absolute w-full start-1/2 -translate-y-28 sm:-translate-y-8 md:-translate-y-0 -translate-x-2/4 top-32 z-20 p-6 md:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Layout
            type="section"
            className="w-full md:w-[70%] ml-[50%] text-white dark:md:text-white md:text-black -translate-x-1/2 text-center"
          >
            <Typography type="h1">
              {t.rich("Heading", {
                span: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </Typography>
          </Layout>
          <Typography
            type="p"
            className="text-center text-2xl dark:text-white text-muted font-normal max-w-md mt-2 mx-auto"
          >
            {t("Subheading")}
          </Typography>
          <Layout type="section" className="flex justify-center gap-4 mt-4">
            <Link
              href="/docs/introduction"
              className={buttonVariants({ variant: "default", size: "lg" })}
              aria-label="Get started with the documentation"
            >
              {t("GetStarted")}
            </Link>
            <a
              href="https://github.com/S1mon009"
              aria-label="Visit GitHub repository"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
          </Layout>
        </motion.div>
      </div>
      <div
        className="hidden absolute w-full h-[800px] z-10 md:flex justify-center items-center top-0"
        aria-label="Interactive 3D Globe"
      >
        {/* <WorldComponent data={sampleArcs} globeConfig={globeConfig} /> */}
      </div>
    </>
  );
}
