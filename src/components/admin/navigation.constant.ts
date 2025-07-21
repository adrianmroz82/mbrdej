import { Database, PlusCircle, Text } from "lucide-react";

export const navigation = [
  {
    title: "Zarzadzaj produktami",
    url: "/admin/products",
    icon: Database,
  },
  {
    title: "Dodaj nowy produkt",
    url: "/admin/add-product",
    icon: PlusCircle,
  },
  {
    title: "Zarzadzaj trescia",
    icon: Text,
    subItems: [
      {
        title: "Strona Główna",
        url: "/admin/content/landing-page",
      },
      {
        title: "O mnie",
        url: "/admin/content/about-me",
      },
      {
        title: "Kontakt",
        url: "/admin/content/contact",
      },
    ],
  },
];
