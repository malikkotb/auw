import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// export const config = {
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion:
//     process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-06",
//   useCdn: process.env.NODE_ENV === "production",
//   token: process.env.SANITY_API_TOKEN,
// };

// TODO: make these environment variables

export const client = createClient({
  projectId: "04o7eam1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Set up image builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
