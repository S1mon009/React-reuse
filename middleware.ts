import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(pl|en)/:path*"],
};
