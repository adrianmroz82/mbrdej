import { Database } from "../../lib/database.model";

declare global {
  type Product = Database["public"]["Tables"]["products"]["Row"];
  type Content = Database["public"]["Tables"]["content"]["Row"];
}
