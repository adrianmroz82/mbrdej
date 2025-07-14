"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { ImagesGrid } from "@/components/ui/images-grid";
import { RedirectButton } from "@/components/ui/see-more-button";

interface Props {
  products: Product[];
}

const mapTechniqueToLabel: Record<string, string> = {
  watercolor: "Akwarela",
  oil: "Olej",
};

const _mapAvailabilityToLabel: Record<string, string> = {
  Available: "Dostępne",
  Sold: "Sprzedane",
};

export function Images({ products }: Props) {
  const [filter, setFilter] = useState({ technique: "All", availability: "All" });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesType = filter.technique === "All" || product.technique === filter.technique;
      const matchesAvailability =
        filter.availability === "All" ||
        (filter.availability === "Available" && product.available) ||
        (filter.availability === "Sold" && !product.available);
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

      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          {["All", "watercolor", "oil"].map((technique) => (
            <Button
              key={technique}
              size="lg"
              variant={filter.technique === technique ? "default" : "outline"}
              onClick={() => setFilter((f) => ({ ...f, technique }))}>
              {mapTechniqueToLabel[technique] || technique}
            </Button>
          ))}
        </div>

        <div className="flex gap-4">
          {["All", "Available", "Sold"].map((status) => (
            <Button
              key={status}
              size="lg"
              variant={filter.availability === status ? "default" : "outline"}
              onClick={() => setFilter((f) => ({ ...f, availability: status }))}>
              {status}
            </Button>
          ))}
        </div>
      </div>

      <ImagesGrid cards={cards} />
    </div>
  );
}
