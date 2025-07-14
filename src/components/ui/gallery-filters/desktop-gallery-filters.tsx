"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  availabilities,
  GalleryFiltersProps,
  mapAvailabilityToLabel,
  mapTechniqueToLabel,
  techniques,
} from "@/components/ui/gallery-filters/constant";

export function DesktopGalleryFilters({ filter, setFilter }: GalleryFiltersProps) {
  return (
    <div className="hidden lg:flex justify-between mb-6">
      <div className="flex gap-4">
        {techniques.map((technique) => (
          <Button
            key={technique}
            size="lg"
            variant={filter.technique === technique ? "default" : "outline"}
            onClick={() => setFilter((f) => ({ ...f, technique }))}>
            {mapTechniqueToLabel[technique] ?? technique}
          </Button>
        ))}
      </div>

      <div className="flex gap-4">
        {availabilities.map((availability) => (
          <Button
            key={availability}
            size="lg"
            variant={filter.availability === availability ? "default" : "outline"}
            onClick={() => setFilter((f) => ({ ...f, availability }))}>
            {mapAvailabilityToLabel[availability] ?? availability}
          </Button>
        ))}
      </div>
    </div>
  );
}
