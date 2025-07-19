"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { Button } from "@/components/shadcn-ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/shadcn-ui/dialog";
import { Input } from "@/components/shadcn-ui/input";
// import Content from "@/components/ui/content";
import { createClient } from "@/utils/supabase/client";

export default function AdminContentAboutPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // const [content, setContent] = useState({
  //   title: "",
  //   description: "",
  //   imageUrl: "",
  // });
  // const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    async function fetchInitialContent() {
      const supabase = await createClient();
      const { data: content } = await supabase.from("content-about-me").select("*").eq("id", 1).single();

      if (content) {
        setTitle(content.title!);
        setDescription(content.description!);
        setImageUrl(content.image_url!);
        setLoading(false);
      }
    }

    fetchInitialContent();
  }, []);

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = await createClient();
    const filePath = `content-images/${v4()}-${file.name}`;

    const { error } = await supabase.storage.from("content-images").upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("content-images").getPublicUrl(filePath);

    setImageUrl(publicUrlData?.publicUrl || "");
  }

  async function handleSave() {
    const supabase = await createClient();

    await supabase.from("content-about-me").upsert({
      id: 1,
      title,
      description,
      image_url: imageUrl,
    });

    alert("Content updated!");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Edit Main Page</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <Input type="file" onChange={handleUploadImage} />
      {imageUrl && (
        <Image src={imageUrl} alt="Preview" className="my-4 h-60 object-cover mb-2" width={200} height={200} />
      )}

      <div className="flex gap-2">
        {/* <Button onClick={() => setPreviewOpen(true)} className="bg-gray-500 text-white p-2 flex-1">
          Preview
        </Button> */}
        <Button onClick={handleSave} className="bg-blue-500 text-white p-2 flex-1">
          Save
        </Button>
      </div>

      {/* TODO - Preview Modal - to be extracted */}
      {/* {previewOpen && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="min-w-full h-full">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
            </DialogHeader>

            <Content title={title} description={description} imageUrl={imageUrl} />
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
}
