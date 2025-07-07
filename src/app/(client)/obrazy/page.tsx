import { createClient } from "@/utils/supabase/server";

import { Images } from "./images";

export default async function ImagesPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  if (!products) return;

  return <Images products={products} />;
}
