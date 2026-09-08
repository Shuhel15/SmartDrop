import {auth} from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if(!session?.user) {
    redirect("/login");
  }

  return <DashboardContent name={session.user.name} email={session.user.email} role={session.user.role} />;
}