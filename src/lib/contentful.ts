import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN!,
});

export async function getEntries() {
  const res = await client.getEntries({
    content_type: "post",
  });
  console.log("res", res);

  return res.items;
}
