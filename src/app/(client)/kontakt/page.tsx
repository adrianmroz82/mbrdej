// TODO: extract content

import ContactForm from "@/components/ui/contact-form";
import { HeaderSection } from "@/components/ui/header-section";

export default async function ContactPage() {
  const title = "Kontakt";
  const description =
    "Jesteś zainteresowany kupnem, obrazem na zamówienie lub chcesz o coś zapytać? Zapraszam do kontaktu.";

  return (
    <>
      <HeaderSection title={title} description={description} />

      <div className="mt-6 px-4 max-w-4xl mx-auto">
        <h2 className="font-bold mb-2">Jak kupować</h2>
        <p>
          Jeśli jesteś zainteresowany zakupem danego obrazu lub masz pytania wystarczy, że się ze mną skontaktujesz.
        </p>
        <p>Napisz mail, wypełnij formularz lub skontaktuj się ze mną przez Instagram.</p>
      </div>

      <div className="my-6 px-4 md:w-[50rem] w-full mx-auto">
        <ContactForm />
      </div>
    </>
  );
}
