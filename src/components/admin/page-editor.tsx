"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { PageContentMap } from "@/utils/content/content.model";
import { createClient } from "@/utils/supabase/client";

type PageKey = keyof PageContentMap;

interface PageEditorProps<T extends PageKey> {
  pageName: T;
  fields: (keyof PageContentMap[T])[];
}

function createSchemaForFields<T extends PageKey>(fields: (keyof PageContentMap[T])[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    const fieldName = field.toString();
    if (fieldName.includes("image")) {
      shape[fieldName] =
        fieldName === "image_urls"
          ? z.array(z.string().url("Must be a valid URL")).optional()
          : z.string().url("Must be a valid URL").optional();
    } else {
      shape[fieldName] = z.string().nonempty(`Pole '${fieldName}' nie może być puste`);
    }
  });

  return z.object(shape);
}

export function AdminContentPageEditor<T extends PageKey>({ pageName, fields }: PageEditorProps<T>) {
  const supabase = createClient();
  const schema = createSchemaForFields(fields);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...Object.fromEntries(fields.map((field) => [field.toString(), ""])),
    },
  });

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase.from("page-content").select("key, value").eq("page_name", pageName);

      if (error) {
        console.error(error.message);
        return;
      }

      const contentMap = Object.fromEntries(
        data.map((row) => {
          const parsedValue =
            row.key === "image_urls" && pageName === "landing_page"
              ? (() => {
                  try {
                    return JSON.parse(row.value);
                  } catch {
                    return [row.value];
                  }
                })()
              : row.value;

          return [row.key, parsedValue];
        })
      ) as Partial<z.infer<typeof schema>>;

      form.reset(contentMap);
    }

    fetchContent();
  }, [form, pageName, supabase]);

  const handleUploadImage = async (key: keyof PageContentMap[T], e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const filePath = `content-images/${v4()}-${file.name}`;
      const { error } = await supabase.storage.from("content-images").upload(filePath, file);
      if (error) {
        console.error(error.message);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from("content-images").getPublicUrl(filePath);
      if (publicUrlData?.publicUrl) {
        urls.push(publicUrlData.publicUrl);
      }
    }

    if (pageName === "landing_page") {
      const existing = form.getValues(key.toString()) ?? [];
      const updated = Array.isArray(existing) ? [...existing, ...urls] : urls;
      form.setValue(key.toString() as any, updated, { shouldValidate: true });
    } else {
      form.setValue(key.toString() as any, urls[0] ?? "", { shouldValidate: true });
    }
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const updates = fields.map((key) => ({
      page_name: pageName as string,
      key: key as string,
      value: data[key.toString()] ?? "",
    }));

    const { error } = await supabase.from("page-content").upsert(updates, { onConflict: "page_name, key" });
    if (error) {
      alert("Error saving content: " + error.message);
      return;
    }
    alert("Content updated!");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">{pageName.replace(/_/g, " ")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {fields.map((field) => {
            const fieldName = field.toString();
            const isImage = fieldName.includes("image");
            const isTextarea = fieldName.includes("description") || fieldName.includes("content");

            return (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{fieldName}</FormLabel>

                    {isImage && (
                      <>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => handleUploadImage(field, e)}
                            accept="image/*"
                            multiple={pageName === "landing_page"}
                          />
                        </FormControl>
                        {formField.value && typeof formField.value === "string" && pageName !== "landing_page" && (
                          <Image
                            src={formField.value ?? ""}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="my-2 object-cover h-60"
                          />
                        )}

                        {pageName === "landing_page" && Array.isArray(formField.value) && (
                          <div className="flex flex-wrap gap-4">
                            {formField.value.map((url, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  width={200}
                                  height={200}
                                  className="object-cover h-60 rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = formField.value.filter((_: string, i: number) => i !== index);
                                    form.setValue(fieldName as any, updated, { shouldValidate: true });
                                  }}
                                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-100 transition-opacity opacity-80 hover:opacity-100">
                                  <Trash2 className="w-5 h-5 text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {!isImage && isTextarea && (
                      <FormControl>
                        <textarea {...formField} className="border p-2 w-full resize-y" rows={4} />
                      </FormControl>
                    )}

                    {!isImage && !isTextarea && (
                      <FormControl>
                        <Input {...formField} type="text" />
                      </FormControl>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
