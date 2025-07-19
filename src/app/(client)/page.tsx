import { ImageCarousel } from "@/components/ui/image-carousel";
import { createClient } from "@/utils/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("content-landing-page").select().single();

  const { title, description, title_bottom, desc_bottom, image_url } = data!;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {image_url!.length > 0 && (
          <div className="mb-12 pt-4">
            <ImageCarousel images={image_url} interval={4000} />
          </div>
        )}

        <div className="max-w-3xl mx-auto  text-center  rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title_bottom}</h2>
          <p className="text-xl text-gray-600">{desc_bottom}</p>
        </div>
      </main>
    </div>
  );
}
