import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/");
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
}
