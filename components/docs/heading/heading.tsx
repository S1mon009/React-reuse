import type { JSX } from "react";

import { RoughNotation } from "react-rough-notation";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";

import { HeadingProps } from "./interface";

/**
 * Heading component that displays a title with a highlight effect using RoughNotation.
 *
 * Props:
 * - title (string): Heading title.
 * - color (string): RoughNotation color.
 *
 * @param {HeadingProps} props - Contains title and color
 * @returns {JSX.Element} The rendered Heading component.
 */
export default function Heading({ title, color }: HeadingProps): JSX.Element {
  return (
    <Layout type="section">
      <Typography type="h1" className="mb-5">
        <RoughNotation type="highlight" color={color} show>
          {title}
        </RoughNotation>
      </Typography>
    </Layout>
  );
}
