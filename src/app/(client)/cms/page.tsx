import { getEntries } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function CmsPage() {
  const posts = await getEntries();
  const post = posts[0];
  const { shortTextField, iAmRichText, image } = post.fields;

  const imageUrl = `https:${image.fields.file.url}`;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>{shortTextField}</h1>

      <img src={imageUrl} alt={image.fields.title} style={{ width: "100%", borderRadius: "8px" }} />

      <div style={{ marginTop: "1rem" }}>{documentToReactComponents(iAmRichText)}</div>
    </div>
  );
}
