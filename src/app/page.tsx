import { createClient } from "@/utils/supabase/server";

import "@/styles/globals.css";
import { LayoutGrid } from "@/components/layout-grid";
import { Button } from "@/components/shadcn-ui/button";
import { ArrowRightIcon } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  // if (!products) {
  //   return <div>Loading...</div>;
  // }

  const cards = products?.map((product) => ({
    id: product.id,
    thumbnail: product.images?.length && product.images[0],
    orientation: product.orientation,
    content: (
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-hidden">
          <p className="font-bold md:text-4xl text-xl text-black">{product.name}</p>
          <div className="flex justify-between mt-auto">
            <p className="font-normal md:text-lg text-md my-4 max-w-lg text-black">{product.description}1</p>
            <Button
              icon={ArrowRightIcon}
              effect="expandIcon"
              iconPlacement="right"
              className="w-2/5 p-[30px] text-lg rounded-[30px] font-helvetica">
              See more1
            </Button>
          </div>
        </div>
      </div>
    ),
  }));

  // if (!cards) {
  //   return <div>No images to display</div>;
  // }

  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline">Galeria</h1>
        <div className="h-screen py-20 w-full">{cards && <LayoutGrid cards={cards} />}</div>
      </main>
    </div>
  );
}
