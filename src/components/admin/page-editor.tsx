"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 } from "uuid";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { PageContentMap } from "@/utils/content/content.model";
import { createClient } from "@/utils/supabase/client";

type PageKey = keyof PageContentMap;

interface PageEditorProps<T extends PageKey> {
  pageName: T;
  fields: (keyof PageContentMap[T])[];
}

export function AdminContentPageEditor<T extends PageKey>({ pageName, fields }: PageEditorProps<T>) {
  const [content, setContent] = useState<Partial<PageContentMap[T]>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase.from("page-content").select("key, value").eq("page_name", pageName);

      if (error) {
        console.error("Error fetching content:", error.message);
        setLoading(false);
        return;
      }

      const contentMap = Object.fromEntries(data.map((row) => [row.key, row.value])) as Partial<PageContentMap[T]>;
      setContent(contentMap);
      setLoading(false);
    }

    fetchContent();
  }, [pageName, supabase]);

  const handleSave = async () => {
    const updates = fields.map((key) => ({
      page_name: pageName as string,
      key: key as string,
      value: (content[key] as string) ?? "",
    }));

    const { error } = await supabase.from("page-content").upsert(updates, {
      onConflict: "page_name, key",
    });

    if (error) {
      console.error("Error saving content:", error.message);
      alert("Error saving content");
    } else {
      alert("Content updated!");
    }
  };

  const handleChange = (key: keyof PageContentMap[T], value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  const handleUploadImage = async (key: keyof PageContentMap[T], e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const filePath = `content-images/${v4()}-${file.name}`;

    const { error } = await supabase.storage.from("content-images").upload(filePath, file);
    if (error) {
      console.error("Error uploading image:", error.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("content-images").getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      handleChange(key, publicUrlData.publicUrl);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const formattedPageName = pageName.replace(/_/g, " ");

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">{formattedPageName}</h1>

      {fields.map((field) => {
        const fieldKey = field.toString();
        const value = (content[field] as string) || "";

        return (
          <div key={fieldKey} className="mb-4">
            {fieldKey.includes("image") && (
              <>
                <label className="block mb-1">{fieldKey}</label>
                <Input type="file" onChange={(e) => handleUploadImage(field, e)} />
                {value && (
                  <Image src={value} alt="Preview" className="my-2 h-60 object-cover" width={200} height={200} />
                )}
              </>
            )}

            {!fieldKey.includes("image") && (fieldKey.includes("description") || fieldKey.includes("content")) && (
              <textarea
                placeholder={fieldKey}
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="border p-2 w-full"
              />
            )}

            {!fieldKey.includes("image") && !fieldKey.includes("description") && !fieldKey.includes("content") && (
              <input
                type="text"
                placeholder={fieldKey}
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="border p-2 w-full"
              />
            )}
          </div>
        );
      })}

      <div className="flex gap-2">
        <Button onClick={handleSave} className="bg-blue-500 text-white p-2 flex-1">
          Save
        </Button>
      </div>
    </div>
  );
}
