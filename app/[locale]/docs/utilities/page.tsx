import { redirect } from "@/components/navigation/navigation";
import { keys } from "@/keys/sidebar-links-keys";

/**
 * Page redirect to page of first util in the list
 */
export default function Page(): void {
  redirect(`/docs/utilities/${keys[2][0]}`);
}
