export const config = {
  navigation: [
    {
      title: "Obrazy",
      href: "/obrazy",
    },
    {
      title: "Akwarela",
      href: "/akwarela",
    },
    {
      title: "O Mnie",
      href: "/o-mnie",
    },
    {
      title: "Kontakt",
      href: "/kontakt",
    },
  ],
  // TODO: move to content table
  homePage: {
    title: "OBRAZY OLEJNE, AKWARELA, PLAKATY",
    description:
      "Jestem Małgorzata, a to miejsce gdzie dzielę się swoją pasją. Poznaj moją sztukę i zabierz ją do swojego życia...",
    footerTitle: "INDYWIDUALNE ZAMÓWIENIE",
    footerDescription:
      "Chciałbyś mieć obraz o konkretnej tematyce, kolorach czy rozmiarze, według swojego upodobania? A może marzy ci się uwiecznienie konkretnego kadru na płótnie? Chętnie stworzę obraz dla Ciebie, namalowany specjalnie do Twojego wnętrza. Zapraszam do kontaktu.",
  },
  faq: [
    {
      question: "Jak mogę zamówić obraz?",
      answer:
        "Aby zamówić obraz, skontaktuj się ze mną przez formularz kontaktowy lub bezpośrednio na Instagramie. Opowiedz mi o swoich oczekiwaniach, a ja przygotuję dla Ciebie indywidualną ofertę.",
    },
    {
      question: "Wysyłka",
      answer:
        "Obrazy/plakaty wysyłam za pośrednictwem kuriera. Koszt wysyłki po stronie kupującego. Istnieje możliwość wysyłki do paczkomatu - zależne od formatu obrazu. Wysyłkę dużych formatów omawiam indywidualnie z klientem.",
    },
    {
      question: "Zwroty",
      answer:
        "Jeśli obraz nie spełnia Twoich oczekiwań, możesz go zwrócić w ciągu 14 dni od otrzymania. Pamiętaj jednak, że obrazy na zamówienie nie podlegają zwrotowi.",
    },
  ],
  email: {
    from: "Od",
    recipent: "Formularz MBrdej"
    // TODO: add rest of email content stored in a component
  }
};

export type PageConfig = typeof config;
