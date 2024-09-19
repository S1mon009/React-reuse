import { RoughNotation } from "react-rough-notation";
import { Layout } from "@/components/layouts/layout";
import { Typography } from "@/components/typography/typography";

interface headingProps {
  title: string;
  color: string;
}

/**
 * Heading component that displays a title with a highlight effect using RoughNotation.
 *
 * Props:
 * - title (string): Heading title.
 * - color (string): RoughNotation color.
 *
 * @param {headingProps} props - Contains title and color
 * @returns {JSX.Element} The rendered Heading component.
 */
export default function Heading({ title, color }: headingProps): JSX.Element {
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
