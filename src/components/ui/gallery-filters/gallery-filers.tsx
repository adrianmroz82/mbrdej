import { GalleryFiltersProps } from "@/components/ui/gallery-filters/constant";
import { DesktopGalleryFilters } from "@/components/ui/gallery-filters/desktop-gallery-filters";
import { MobileGalleryFilters } from "@/components/ui/gallery-filters/mobile-gallery-filters";

export function GalleryFilters({ filter, setFilter }: GalleryFiltersProps) {
  return (
    <>
      <MobileGalleryFilters filter={filter} setFilter={setFilter} />
      <DesktopGalleryFilters filter={filter} setFilter={setFilter} />
    </>
  );
}
