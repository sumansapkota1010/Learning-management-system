"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect } from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      redirect("/");
    }
  }, [session, status]);
  if (status == "loading") return <p>Loading...</p>;
  return <Dashboard>{children}</Dashboard>;
}

export default AdminLayout;
