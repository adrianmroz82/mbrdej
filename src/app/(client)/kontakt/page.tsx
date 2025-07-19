// TODO: extract content

import ContactForm from "@/components/ui/contact-form";
import { HeaderSection } from "@/components/ui/header-section";
import { createClient } from "@/utils/supabase/server";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("content-contact").select().single();

  const { title, description, header_desc, header_title } = data!;

  return (
    <>
      <HeaderSection title={header_title} description={header_desc} />

      <div className="mt-6 px-4 max-w-4xl mx-auto">
        <h2 className="font-bold mb-2">Jak kupować</h2>
        <p>{title}</p>
        <p>{description}</p>
      </div>

      <div className="my-6 px-4 md:w-[50rem] w-full mx-auto">
        <ContactForm />
      </div>
    </>
  );
}
