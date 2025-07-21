"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { Button } from "@/components/shadcn-ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form";
import { PageContentMap } from "@/utils/content/content.model";
import { createClient } from "@/utils/supabase/client";

import { renderFieldInput } from "./render-field-input";

type PageKey = keyof PageContentMap;

interface PageEditorProps<T extends PageKey> {
  pageName: T;
  fields: (keyof PageContentMap[T])[];
}

function createSchemaForFields<T extends PageKey>(fields: (keyof PageContentMap[T])[], pageName: PageKey) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    const name = field.toString();

    if (name.includes("image")) {
      shape[name] =
        name === "image_urls" && pageName === "landing_page"
          ? z.array(z.string().url()).optional()
          : z.string().url().optional();
    } else {
      shape[name] = z.string().nonempty(`Field '${name}' cannot be empty`);
    }
  });

  return z.object(shape);
}

export function AdminContentPageEditor<T extends PageKey>({ pageName, fields }: PageEditorProps<T>) {
  const supabase = createClient();
  const schema = createSchemaForFields(fields, pageName);

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

      function parseValue(key: string, value: string, pageName: string): string | string[] {
        if (key === "image_urls" && pageName === "landing_page") {
          try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            return [value];
          }
        }
        return value;
      }

      const contentMap = Object.fromEntries(
        data.map(({ key, value }) => [key, parseValue(key, value, pageName)])
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
                    {renderFieldInput({
                      fieldName,
                      isImage,
                      isTextarea,
                      pageName,
                      field: formField,
                      form,
                      handleUploadImage,
                    })}
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
