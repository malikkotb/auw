import WorkClient from "./WorkClient";
import { client } from "@/sanity/config";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const PROJECTS_QUERY = `*[
  _type == "project"
  && defined(title)
]|order(publishedAt desc){
  _id,
  title,
  description,
  featuredMedia{
    dimension,
    type,
    image{
      asset->
    },
    video
  },
  featuredMediaMobile{
    dimension,
    type,
    image{
      asset->
    },
    video
  },
  year,
}`;

// This option tells Next.js to revalidate this page's data every 1 hour
// This enables Incremental Static Regeneration (ISR) - the page will be regenerated
// in the background while stale data is served to users
const options = { next: { revalidate: 3600 } }; // 1 hour in seconds

export default async function Work() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, options);

  // Process the media URLs on the server side
  const processedProjects = projects.map((project) => ({
    ...project,
    imageUrl: project.featuredMedia?.image?.asset
      ? urlFor(project.featuredMedia.image).url()
      : null,
    videoUrl: project.featuredMedia?.video || null,
    imageUrlMobile: project.featuredMediaMobile?.image?.asset
      ? urlFor(project.featuredMediaMobile.image).url()
      : null,
    videoUrlMobile: project.featuredMediaMobile?.video || null,
  }));

  return <WorkClient projects={processedProjects} />;
}
