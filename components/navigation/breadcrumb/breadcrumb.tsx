"use client";

import { Fragment, type JSX } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/components/navigation/navigation";
import Layout from "@/components/layouts/layout";
import Each from "@/components/utilities/each/each";
import { House } from "lucide-react";
import { capitalize } from "@/lib/helpers/text";
import { BreadcrumbNavigationProps } from "./interface";

export default function BreadcrumbNavigation({
  structure,
}: BreadcrumbNavigationProps): JSX.Element {
  const pathname = usePathname();
  const rawSegments = pathname.split("/").filter(Boolean);

  const segments = rawSegments.filter(
    (seg, idx) => idx !== 0 && seg !== "docs"
  );

  const crumbs: Array<{ name: string; href: string }> = [];

  segments.forEach((segment, idx) => {
    const path = "/" + rawSegments.slice(2, 2 + idx + 1).join("/");

    let name = "";

    const category = segments[0];

    if (category === "hooks") {
      name =
        idx === 0
          ? "Hooks"
          : structure.hooks.find((i) => i.link.endsWith(segment))?.name ||
            capitalize(segment);
    } else if (category === "utilities") {
      name =
        idx === 0
          ? "Utilities"
          : structure.utilities.find((i) => i.link.endsWith(segment))?.name ||
            capitalize(segment);
    } else {
      crumbs.push({ name: "Getting started", href: "/docs" });
      name =
        structure.getting_started.find((i) => i.link.endsWith(segment))?.name ||
        capitalize(segment);
    }

    crumbs.push({ name, href: path });
  });

  return (
    <Layout type="nav" className="w-full mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" aria-label="Go to homepage">
                <House className="size-6 text-primary" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <Each
            of={crumbs}
            render={(item: { name: string; href: string }) => (
              <Fragment key={item.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.name}</Link>
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
