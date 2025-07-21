import { ImageCarousel } from "@/components/ui/image-carousel";
import { parseImageUrls } from "@/lib/utils";
import { PAGE_NAME } from "@/utils/content/content.model";
import { getPageContent } from "@/utils/content/map-content";

export default async function LandingPage() {
  const content = await getPageContent(PAGE_NAME.LANDING);
  const { title, description, image_urls, title_bottom, description_bottom } = content;
  const imageArray = parseImageUrls(image_urls);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {imageArray.length > 0 && (
          <div className="mb-12 pt-4">
            <ImageCarousel images={imageArray} interval={4000} />
          </div>
        )}

        <div className="max-w-3xl mx-auto  text-center  rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title_bottom}</h2>
          <p className="text-xl text-gray-600">{description_bottom}</p>
        </div>
      </main>
    </div>
  );
}
