export const config = {
  navigation: [
    {
      title: "Strona Główna",
      href: "/",
    },
    {
      title: "Obrazy",
      href: "/obrazy",
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
    recipent: "Formularz MBrdej",
    // TODO: add rest of email content stored in a component
  },
};

export type PageConfig = typeof config;
