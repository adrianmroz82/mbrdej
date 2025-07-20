import { AdminContentPageEditor } from "@/components/admin/page-editor";
import { PAGE_NAME } from "@/utils/content/content.model";

export default function AdminContactPage() {
  return (
    <AdminContentPageEditor
      pageName={PAGE_NAME.CONTACT}
      fields={["title", "description", "header_title", "header_description"]}
    />
  );
}
