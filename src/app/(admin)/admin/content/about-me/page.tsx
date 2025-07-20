import { AdminContentPageEditor } from "@/components/admin/page-editor";
import { PAGE_NAME } from "@/utils/content/content.model";

export default function AdminAboutMePage() {
  return <AdminContentPageEditor pageName={PAGE_NAME.ABOUT} fields={["title", "description", "image_url"]} />;
}
