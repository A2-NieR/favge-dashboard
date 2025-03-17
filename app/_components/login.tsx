import { signIn } from "@/auth";

export default function Login() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", {
          redirectTo: "/dashboard",
        });
      }}
    >
      <button type="submit" className="btn btn-link">
        Dashboard
      </button>
    </form>
  );
}
