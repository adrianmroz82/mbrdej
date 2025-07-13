import { ImageCarousel } from "@/components/ui/image-carousel";
import { config } from "@/page.config";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const { homePage } = config;
  const supabase = await createClient();
  const { data: landingProducts } = await supabase.from("landing_products").select();

  if (!landingProducts) {
    return <div>Loading...</div>;
  }

  const allImages = landingProducts.filter((product) => product.images).map((product) => product.images);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-4xl font-bold mb-4 text-gray-800">{homePage.title}</p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{homePage.description}</p>
        </div>

        {allImages.length > 0 && (
          <div className="mb-12">
            <ImageCarousel images={allImages} interval={4000} />
          </div>
        )}

        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-3xl font-bold mb-4 text-gray-800">{homePage.footerTitle}</p>
          <p className="text-xl text-gray-600">{homePage.footerDescription}</p>
        </div>
      </main>
    </div>
  );
}
