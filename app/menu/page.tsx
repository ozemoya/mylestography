import { redirect } from "next/navigation";

// The responsive navigation now lives in the shared header.
export default function MenuPage() {
  redirect("/");
}
