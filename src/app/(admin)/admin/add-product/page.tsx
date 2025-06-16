"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  images: z.any().refine((files) => files && files.length > 0, "At least one image is required"),
});

export default function AddProductPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  const handleAddProduct = async (data: z.infer<typeof formSchema>) => {
    const supabase = await createClient();
    const uploadedImageUrls: string[] = [];

    // Upload each image in the form state to Supabase
    for (const file of data.images) {
      console.log("Uploading image:", file.name);

      const filePath = `products/${v4()}-${file.name}`;
      const { error } = await supabase.storage.from("images").upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);
      if (publicUrlData?.publicUrl) {
        uploadedImageUrls.push(publicUrlData.publicUrl);
      }
    }

    // Insert product with uploaded image URLs
    const { error } = await supabase.from("products").insert([
      {
        name: data.name,
        description: data.description,
        images: uploadedImageUrls,
      },
    ]);

    if (error) {
      console.error("Error adding product:", error.message);
      return;
    }

    console.log("Product added successfully!");

    form.reset({
      name: "",
      description: "",
      images: [],
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddProduct)} className="flex flex-col gap-6 w-full max-w-md">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="name" />
                </FormControl>
                {/* <FormDescription>This is name of a product</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Enter product description" />
                </FormControl>
                {/* <FormDescription>This is the description of the product</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    ref={inputRef}
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      field.onChange(files); // Store the files in the form state
                    }}
                    accept="image/*"
                  />
                </FormControl>
                {/* <FormDescription>Upload an image for the product</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  );
}
