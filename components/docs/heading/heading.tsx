import type { JSX } from "react";

import { RoughNotation } from "react-rough-notation";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";

import { HeadingProps } from "./interface";

export default function Heading({ title, color }: HeadingProps): JSX.Element {
  return (
    <Layout type="section">
      <Typography type="h1" className="mb-5 text-primary-foreground">
        <RoughNotation type="highlight" color={color} show>
          {title}
        </RoughNotation>
      </Typography>
    </Layout>
  );
}
