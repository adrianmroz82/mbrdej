import "@/styles/globals.css";

import { LayoutGrid } from "@/components/layout-grid";
import { RedirectButton } from "@/components/ui/see-more-button";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  if (!products) {
    return <div>Loading...</div>;
  }

  const cards = products.map((product) => ({
    id: product.id,
    thumbnail: product.images?.length && product.images[0],
    orientation: product.orientation,
    content: (
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-hidden">
          <p className="font-bold md:text-4xl text-xl text-black">{product.name}</p>
          <div className="flex justify-between mt-auto">
            <p className="font-normal md:text-lg text-md my-4 max-w-lg text-black">{product.description}1</p>
            <RedirectButton text="Zobacz wiecej" href={`/obrazy/${product.id}`} />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline">Galeria</h1>
        <div className="h-screen py-20 w-full">{cards && <LayoutGrid cards={cards} />}</div>
      </main>
    </div>
  );
}
