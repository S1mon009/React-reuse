import { redirect } from "@/components/navigation/navigation";
import { keys } from "@/keys/sidebar-links-keys";

/**
 * Page redirect to page of first hook in the list
 */
export default function Page(): void {
  redirect(`/docs/hooks/${keys[1][0]}`);
}
