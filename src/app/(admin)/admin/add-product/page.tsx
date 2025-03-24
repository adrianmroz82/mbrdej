"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { createClient } from "@/utils/supabase/client";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  images: z.array(z.string()).nonempty("At least one image is required"),
});

export default function AddProductPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  const handleUploadImage = async (
    e: ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
    // field: ControllerRenderProps<z.infer<typeof formSchema>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = await createClient();
    const filePath = `products/${v4()}-${file.name}`;
    const { error } = await supabase.storage.from("images").upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);
    const imageUrl = publicUrlData?.publicUrl;

    if (imageUrl) {
      console.log("Image uploaded successfully:", imageUrl);
      field.onChange([...form.getValues("images"), imageUrl]);
    }
  };

  const handleAddProduct = async (data: z.infer<typeof formSchema>) => {
    const supabase = await createClient();
    const { error } = await supabase.from("products").insert([data]);

    if (error) {
      console.error("Error adding product:", error.message);
      return;
    }

    console.log("Product added successfully!", data);
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
                  <Input type="file" onChange={(e) => handleUploadImage(e, field)} accept="image/*" />
                </FormControl>
                {/* <FormDescription>Upload an image for the product</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
