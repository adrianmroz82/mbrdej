import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("user data", data);

  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>This is dashboard, Hello {data.user.email}</p>;
}
