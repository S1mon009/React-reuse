import type { JSX } from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/providers/theme-provider";
import { HeaderNavigation } from "@/components/navigation";

import { cn } from "@/lib/utils";
import { getMessages } from "next-intl/server";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "React-reuse",
  description:
    "React-reuse is a reuseable library of hooks, utilities, components and animations.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout(props: {
  params: Params;
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeaderNavigation />
            {props.children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
