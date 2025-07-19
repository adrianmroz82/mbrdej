import Image from "next/image";

import { HeaderSection } from "@/components/ui/header-section";
import { createClient } from "@/utils/supabase/server";

export default async function AboutPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("content-about-me").select().single();

  const { title, description, image_url } = data!;

  return (
    <>
      <HeaderSection title={title} />
      <div className="md:w-10/12 w-full mx-auto">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-lg mt-4 text-balance">{description}</p>
          </div>

          <div className="w-full lg:w-1/2 p-4 mt-4 ">
            <Image
              src={image_url}
              alt={title}
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
