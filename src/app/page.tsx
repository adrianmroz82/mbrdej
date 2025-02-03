import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

import "@/styles/globals.css";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  return (
    <div className="p-6 font-geist grid justify-center items-center">
      <main className="flex flex-col gap-8 grid-row">
        <h1 className="text-3xl font-bold underline">Galeria</h1>

        <ol className="pl-0 m-0 text-sm leading-6 tracking-tight list-inside">
          {products?.map((product, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <div className="flex gap-4 mt-2">
                {product?.images?.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={img}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </ol>
      </main>
    </div>
  );
}
