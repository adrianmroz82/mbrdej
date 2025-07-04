import ContactForm from "@/components/ui/contact-form";

interface Props {
  title: string;
  description?: string;
}

export function HeaderSection({ title, description }: Props) {
  return (
    <div className="text-center mb-8 bg-slate-200 w-full py-8 px-4">
      <p className="text-3xl md:text-4xl font-bold text-gray-800">{title}</p>
      {description && <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">{description}</p>}
    </div>
  );
}

export default async function KontaktPage() {
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
