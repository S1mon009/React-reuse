"use client";

import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Layout } from "@/components/layouts/layout";
import { Link } from "@/components/navigation/navigation";
import { Each } from "@/components/utilities/each/each";
import { usePathname } from "@/components/navigation/navigation";
import { useTranslations } from "next-intl";
import { House } from "lucide-react";
import { keys } from "@/keys/links-keys";

const translation: string = "Data";

/**
 * BreadcrumbNavigation component
 *
 * This component renders a breadcrumb navigation bar that dynamically generates links
 * based on the current pathname. It uses the `next-intl` library for internationalization.
 *
 * @returns {JSX.Element} The rendered BreadcrumbNavigation component.
 */
export default function BreadcrumbNavigation(): JSX.Element {
  const pathname = usePathname();
  const t = useTranslations(translation);

  /**
   * Generates the link data for each breadcrumb item.
   *
   * @param {string} link - The current segment of the path.
   * @param {string} previousLink - The previous segment of the path.
   * @param {"Link" | "Name"} type - The type of returned data
   *
   * @returns {string} A translated URL data based on the segment.
   */
  const createLink = (
    link: string,
    previousLink: string,
    type: "Link" | "Name"
  ): string => {
    let temporaryLink: string = "";

    if (keys.some((item) => item === link[0].toUpperCase() + link.slice(1))) {
      temporaryLink = t(`${link[0].toUpperCase() + link.slice(1)}.${type}`);
    } else {
      temporaryLink = t(
        `${
          previousLink[0].toUpperCase() + previousLink.slice(1)
        }.Items.${link}.${type}`
      );
    }

    return temporaryLink;
  };

  return (
    <Layout type="nav" className="w-full mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" aria-label="Go to homepage">
                <House className="text-primary" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <Each
            of={pathname.split("/").slice(1)}
            render={(item: any, index: number) => (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={createLink(
                        item,
                        pathname.split("/").slice(1)[--index],
                        "Link"
                      )}
                    >
                      {createLink(
                        item,
                        pathname.split("/").slice(1)[index],
                        "Name"
                      )}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            )}
          />
        </BreadcrumbList>
      </Breadcrumb>
    </Layout>
  );
}
