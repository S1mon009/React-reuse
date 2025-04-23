import Each from "@/components/utilities/each/each";
import { getContentStructure } from "@/lib/file_structure/file-structure";
import ContentTreeItem from "./content-tree-item";

interface ContentTreeProps {
  locale: string;
}

export default async function ContentTree({ locale }: ContentTreeProps) {
  const { structure } = await getContentStructure(locale);

  return (
    <Each
      of={Object.keys(structure)}
      render={(item, index) => {
        const pathnames = Object.keys(structure).map((pathname) =>
          pathname === "getting_started" ? "docs" : `docs/${pathname}`
        );

        return (
          <ContentTreeItem
            key={index}
            name={item}
            content={structure[item]}
            openPathName={pathnames[index]}
          />
        );
      }}
    />
  );
}
