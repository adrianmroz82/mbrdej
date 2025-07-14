"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";
import {
  availabilities,
  GalleryFiltersProps,
  mapAvailabilityToLabel,
  mapTechniqueToLabel,
  techniques,
} from "@/components/ui/gallery-filters/constant";

export function MobileGalleryFilters({ filter, setFilter }: GalleryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:hidden mb-6">
      <p className="text-sm">Technika:</p>

      <Select value={filter.technique} onValueChange={(val) => setFilter((f) => ({ ...f, technique: val }))}>
        <SelectTrigger>
          <SelectValue placeholder="Technique" />
        </SelectTrigger>
        <SelectContent>
          {techniques.map((technique) => (
            <SelectItem key={technique} value={technique}>
              {mapTechniqueToLabel[technique] ?? technique}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-sm">Dostępność:</p>
      <Select value={filter.availability} onValueChange={(val) => setFilter((f) => ({ ...f, availability: val }))}>
        <SelectTrigger>
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent>
          {availabilities.map((availability) => (
            <SelectItem key={availability} value={availability}>
              {mapAvailabilityToLabel[availability] ?? availability}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
