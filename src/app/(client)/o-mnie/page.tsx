// TODO: generic function getContent that will fetch data from content table and pass it to component
import Image from "next/image";

import { HeaderSection } from "@/components/ui/header-section";
import { createClient } from "@/utils/supabase/server";

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: content } = await supabase.from("content").select().eq("page", "about").single();

  return (
    <>
      <HeaderSection title="O Mnie" />
      <div className="md:w-10/12 w-full mx-auto">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-lg mt-4 text-balance">{content?.description}</p>
          </div>

          <div className="w-full lg:w-1/2 p-4 mt-4 ">
            <Image
              src={content?.image_url ?? "/placeholder.svg"}
              alt="O mnie"
              className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full"
              width="550"
              height="550"
            />
          </div>
        </div>
      </div>
    </>
  );
}
