import { ContactForm } from "@/components/ui/contact-form";
import { HeaderSection } from "@/components/ui/header-section";
import { PAGE_NAME } from "@/utils/content/content.model";
import { getPageContent } from "@/utils/content/map-content";

export default async function ContactPage() {
  const content = await getPageContent(PAGE_NAME.CONTACT);
  const { title, description, header_title, header_description } = content;

  return (
    <>
      <HeaderSection title={header_title} description={header_description} />

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
