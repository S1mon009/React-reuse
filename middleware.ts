import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pl|en)/:path*"],
};
