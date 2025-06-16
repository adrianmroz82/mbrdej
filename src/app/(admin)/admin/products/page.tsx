"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { createClient } from "@/utils/supabase/client";

export default function AdminProductsPage() {
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = await createClient();

      const { data: products } = await supabase.from("products").select();
      setData(products || []);
    }

    fetchProducts();
  }, []);

  // const supabase = await createClient();
  // const { data: products } = await supabase.from("products").select();

  async function getProducts(id: number) {
    console.log("Deleting product with ID:", id);

    const supabase = await createClient();
    await supabase.from("products").delete().eq("id", id);
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ol>
        {data?.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <h1>{product.description}</h1>
            {/* @ts-ignore */}
            {product?.images?.map((img, index) => (
              <Fragment key={index}>
                <Image key={index} src={img} alt={product.name || "placeholder"} width="200" height="200" />
                <Button onClick={() => getProducts(product.id)}>Delete</Button>
              </Fragment>
            ))}
          </div>
        ))}
      </ol>
    </div>
  );
}
