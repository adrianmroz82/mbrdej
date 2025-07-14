import { redirect } from "next/navigation";

import { Button } from "@/components/shadcn-ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  // TODO - should be in middleware/api route?
  if (error || !data?.user) {
    redirect("/admin/login");
  }

  return <Button>Hello {data.user.email}</Button>;
}
