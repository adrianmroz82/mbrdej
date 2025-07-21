import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";

import { FormControl } from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { PageContentMap } from "@/utils/content/content.model";

type PageKey = keyof PageContentMap;

interface Props<T extends keyof PageContentMap> {
  fieldName: string;
  isImage: boolean;
  isTextarea: boolean;
  pageName: PageKey;
  field: any;
  form: any;
  handleUploadImage: (key: keyof PageContentMap[T], e: ChangeEvent<HTMLInputElement>) => void;
}

export function renderFieldInput<T extends PageKey>({
  fieldName,
  isImage,
  isTextarea,
  pageName,
  field,
  form,
  handleUploadImage,
}: Props<T>) {
  if (isImage) {
    const value = field.value;

    return (
      <>
        <FormControl>
          <Input
            type="file"
            onChange={(e) => handleUploadImage(fieldName as any, e)}
            accept="image/*"
            multiple={pageName === "landing_page"}
          />
        </FormControl>

        {pageName === "landing_page" && Array.isArray(value) && (
          <div className="flex flex-wrap gap-4">
            {value.map((url: string, index: number) => (
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
                    const updated = value.filter((_: string, i: number) => i !== index);
                    form.setValue(fieldName as any, updated, { shouldValidate: true });
                  }}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-100 transition-opacity opacity-80 hover:opacity-100">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {pageName !== "landing_page" && typeof value === "string" && value && (
          <Image src={value} alt="Preview" width={200} height={200} className="my-2 object-cover h-60" />
        )}
      </>
    );
  }

  if (isTextarea) {
    return (
      <FormControl>
        <textarea {...field} className="border p-2 w-full resize-y" rows={4} />
      </FormControl>
    );
  }

  return (
    <FormControl>
      <Input {...field} type="text" />
    </FormControl>
  );
}
