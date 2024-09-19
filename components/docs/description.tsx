import { Layout } from "@/components/layouts/layout";

interface descriptionProps {
  description: string;
}

/**
 * Description component that displays a text description inside a structured layout.
 *
 * Props:
 * - description (string): Data description
 *
 * @param {descriptionProps} props - Contains the description string.
 * @returns {JSX.Element} The rendered Description component.
 */
export default function Description({
  description,
}: descriptionProps): JSX.Element {
  return (
    <Layout type="section" className="w-full" id="description">
      <Layout type="article">{description}</Layout>
    </Layout>
  );
}
