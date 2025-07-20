import { PageContentMap, PageName } from "@/utils/content/content.model";
import { createClient } from "@/utils/supabase/server";

export async function getPageContent<T extends PageName>(page: T): Promise<PageContentMap[T]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("page-content").select("key, value").eq("page_name", page);

  if (error || !data) {
    throw new Error(`Failed to fetch content for ${page}`);
  }

  return Object.fromEntries(data.map(({ key, value }) => [key, value])) as PageContentMap[T];
}
