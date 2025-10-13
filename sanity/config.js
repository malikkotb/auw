import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// Set up image builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
