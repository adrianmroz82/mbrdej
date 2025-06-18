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
};

export type PageConfig = typeof config;
