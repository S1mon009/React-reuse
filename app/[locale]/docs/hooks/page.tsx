import { redirect } from "@/components/navigation/navigation";
import { keys } from "@/keys/sidebar-links-keys";

export default function Page() {
  redirect(`/docs/hooks/${keys[1][0]}`);
}
