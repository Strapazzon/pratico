import { Link } from "@i18n/routing";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <Link href="/auth/login" lang="en">
        Login
      </Link>
      <br />
      <Link href="/auth/register" lang="en">
        {" "}
        Register
      </Link>
      <br />
      <Link href="/dashboard/clients" lang="en">
        {" "}
        Clients
      </Link>
      <br />
    </div>
  );
}
