import {auth} from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if(!session?.user) {
    redirect("/login");
  }

  return(
    <main>
      <h1>SmartDrop Dashboard</h1>

      <p>
        Welcome, {session.user.name}
      </p>
      <p>Email: {session.user.email}</p>
      <p>Role : {session.user.role}</p>
    </main>
  )
}