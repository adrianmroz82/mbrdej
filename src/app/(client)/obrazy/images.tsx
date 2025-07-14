"use client";

import { useMemo, useState } from "react";

import { GalleryFilters } from "@/components/ui/gallery-filters/gallery-filers";
import { ImagesGrid } from "@/components/ui/images-grid";
import { RedirectButton } from "@/components/ui/redirect-button";

interface Props {
  products: Product[];
}

export function Images({ products }: Props) {
  const [filter, setFilter] = useState({ technique: "all", availability: "all" });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesType = filter.technique === "all" || product.technique === filter.technique;
      const matchesAvailability =
        filter.availability === "all" ||
        (filter.availability === "available" && product.available) ||
        (filter.availability === "sold" && !product.available);
      return matchesType && matchesAvailability;
    });
  }, [products, filter]);

  const cards = filteredProducts.map((product) => ({
    id: product.id,
    thumbnail: product.images?.[0]!,
    content: (
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-hidden">
          <p className="font-bold md:text-4xl text-xl text-black">{product.name}</p>
          <div className="flex justify-between mt-auto">
            <p className="font-normal md:text-lg text-md my-4 max-w-lg text-black">{product.description}</p>
            <RedirectButton text="Zobacz więcej" href={`/obrazy/${product.id}`} />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="py-20 px-12 w-full">
      <div className="flex justify-center mb-10">
        <h1 className="text-4xl font-bold">Obrazy</h1>
      </div>
      <GalleryFilters filter={filter} setFilter={setFilter} />
      <ImagesGrid cards={cards} />
    </div>
  );
}
