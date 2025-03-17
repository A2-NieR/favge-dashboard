import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Login from "./login";
import { Logout } from "./logout";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Favge Bot
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Login />
          </li>
        </ul>
        {session?.user?.image && (
          <details className="dropdown">
            <summary className="avatar m-1 cursor-pointer">
              <div className="w-12 rounded-full">
                <Image
                  src={session.user.image}
                  alt="discord avatar"
                  height={48}
                  width={48}
                />
              </div>
            </summary>

            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <Logout />
              </li>
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
