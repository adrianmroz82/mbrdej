import Image from "next/image";

import { FAQ } from "@/components/ui/FAQ";
import { config } from "@/page.config";
import { createClient } from "@/utils/supabase/server";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ImageDetailsPage({ params }: Props) {
  const supabase = await createClient();

  const { id } = await params;
  const { data: product } = await supabase.from("products").select().eq("id", Number(id)).single();

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="relative  aspect-square w-full ] md:w-2/4 lg:w-3/5">
            <Image
              src={product?.images![0] ?? "/placeholder.svg"}
              alt={`Product Image ${+1}`}
              fill
              className="w-full rounded-lg bg-neutral-100 object-cover object-center"
              sizes="(min-width: 1024px) 66.66vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col mt-8 md:mt-0 md:ml-16">
            <h2 className="text-2xl">{product?.name}</h2>

            <p className="text-lg">{product?.price}</p>
            <p className="mt-4 font-bold">O Obrazie</p>
            <div>{product?.description}</div>

            <p className="mt-4 font-bold">Wymiary</p>
            <div>
              <span>{product?.height}cm</span>
              <span>x</span>
              wys x{product?.width}cm szer
            </div>

            <p className="mt-4 font-bold">Technika</p>
            <div>{product?.technique}</div>

            <p className="mt-4 font-bold">Data powstania</p>
            <div>{product?.created_at}</div>
          </div>
        </div>
        {/* <div>{product?.}</div> */}
        {/* wymiary */}
        {/* technika */}
        {/* data powstania */}
      </div>
      <div className="w-full max-w-5xl px-4 mx-auto mb-8">
        <FAQ content={config.faq} />
      </div>
    </>
  );
}
