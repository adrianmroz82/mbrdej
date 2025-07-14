export const techniques = ["all", "watercolor", "oil"];
export const availabilities = ["all", "available", "sold"];

interface Filter {
  technique: string;
  availability: string;
};

export interface GalleryFiltersProps {
  filter: Filter;
  setFilter: (f: (prev: Filter) => Filter) => void;
}

export const mapTechniqueToLabel: Record<string, string> = {
  all: "Wszystkie",
  watercolor: "Akwarela",
  oil: "Olej",
};

export const mapAvailabilityToLabel: Record<string, string> = {
  all: "Wszystkie",
  available: "Dostępne",
  sold: "Sprzedane",
};
