"use client";

import type { JSX } from "react";
import { useTranslations } from "next-intl";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/components/navigation/navigation";
import Each from "@/components/utilities/each/each";
import Typography from "@/components/typography/typography";
import Layout from "@/components/layouts/layout";

import { capitalize } from "@/lib/helpers/text";

import { TriggerProps, ListItemProps, MainListProps } from "./interface";

const triggerTranslation: string = "System.Navigation";
const mainListTranslation: string = "Header";

export function Trigger({ text }: TriggerProps): JSX.Element {
  const t = useTranslations(triggerTranslation);

  return <>{t(capitalize(text))}</>;
}

export function ListItem({
  title,
  href,
  children,
}: ListItemProps): JSX.Element {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <Layout type="div" className="text-sm font-medium leading-none">
            {title}
          </Layout>
          <Typography
            type="p"
            className="line-clamp-2 text-sm leading-snug text-muted-foreground"
          >
            {children}
          </Typography>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function MainList({ objectKey, structure }: MainListProps): JSX.Element {
  const t = useTranslations(mainListTranslation);

  if (!objectKey) {
    return <></>;
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Trigger text={objectKey} />
      </NavigationMenuTrigger>
      <NavigationMenuContent aria-label="Getting Started Menu">
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href={"/"}
              >
                <div className="mb-2 mt-4 text-lg font-medium">React reuse</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  {t(`${capitalize(objectKey)}.Description`)}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <Each
            of={structure[objectKey]}
            render={(item: any, index: number) => (
              <ListItem key={index} href={item.link} title={item.name}>
                {item.description}
              </ListItem>
            )}
          />
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
