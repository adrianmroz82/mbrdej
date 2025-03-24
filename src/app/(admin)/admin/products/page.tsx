import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  return (
    <div>
      <h1>Products</h1>
      <ol>
        {products?.map((product, index) => (
          <div key={index}>
            <h1>{product.name}</h1>
            <h1>{product.description}</h1>
            {product?.images?.map((img, index) => (
              <Image key={index} src={img} alt={product.name || "placeholder"} width="200" height="200" />
            ))}
          </div>
        ))}
      </ol>
    </div>
  );
}
