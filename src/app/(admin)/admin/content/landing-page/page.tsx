import { AdminContentPageEditor } from "@/components/admin/page-editor";
import { PAGE_NAME } from "@/utils/content/content.model";

export default function AdminLandingPage() {
  return (
    <AdminContentPageEditor
      pageName={PAGE_NAME.LANDING}
      fields={["title", "description", "title_bottom", "description_bottom", "image_urls"]}
    />
  );
}
