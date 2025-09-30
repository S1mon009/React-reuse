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
      <div className="absolute start-1/2 top-32 z-20 w-full -translate-x-2/4 -translate-y-28 p-6 sm:-translate-y-8 md:-translate-y-0 md:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Layout
            type="section"
            className="ml-[50%] w-full -translate-x-1/2 text-center text-white md:w-[70%] md:text-black dark:md:text-white"
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
            className="mx-auto mt-2 max-w-md text-center text-2xl font-normal text-muted dark:text-white"
          >
            {t("Subheading")}
          </Typography>
          <Layout type="section" className="mt-4 flex justify-center gap-4">
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
        className="absolute top-0 z-10 hidden h-[800px] w-full items-center justify-center md:flex"
        aria-label="Interactive 3D Globe"
      >
        {/* <WorldComponent data={sampleArcs} globeConfig={globeConfig} /> */}
      </div>
    </>
  );
}
