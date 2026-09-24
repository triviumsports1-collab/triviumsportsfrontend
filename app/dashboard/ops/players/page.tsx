import { redirect } from "next/navigation";

export default function OpsPlayersPage() {
  redirect("/dashboard/ops/leads?audience=PLAYER");
}
