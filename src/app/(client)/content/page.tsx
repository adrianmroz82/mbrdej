import Content from "@/components/ui/content";
import { createClient } from "@/utils/supabase/server";

export default async function ContentPage() {
  const supabase = await createClient();
  const { data: content } = await supabase.from("content").select().single();

  // TODO: validate content so that fields are not undefined
  // change nullish fields to required ones
  return <Content title={content?.title} description={content?.description} imageUrl={content?.image_url} />;
}
