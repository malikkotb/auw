import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/config";
import ProjectClient from "./ProjectClient";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  textFieldTwo,
  textFieldThree,
  client,
  overview,
  year,
  projectUrl,
  nextProjectTitle,
  nextProjectLink,
  nextProjectYear,
  nextProjectDescription,
  nextProjectMedia{
    dimension,
    type,
    image{
      asset->
    },
    video
  },
  featuredMedia{
    dimension,
    type,
    image{
      asset->
    },
    video
  },
  mediaGallery[]{
    _key,
    dimension,
    type,
    image{
      asset->
    },
    video
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// chaned to 1 hour instead of 30 seconds, and changed the generateStaticParams to use the new cache time
const options = { next: { revalidate: 3600 } }; // Cache for 1 hour instead of 30 seconds

// This tells Next.js which paths to pre-render
export async function generateStaticParams() {
  // Fetch only the slugs we need
  const slugs = await client.fetch(
    `*[_type == "project"][0...12]{
      "slug": slug.current
    }`,
    {},
    { next: { revalidate: 3600 } }
  );

  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const project = await client.fetch(
    PROJECT_QUERY,
    { slug: slug },
    options
  );

  // Get featured media URL
  const getFeaturedMediaUrl = (media) => {
    if (media?.type === "image" && media.image?.asset) {
      return urlFor(media.image)?.url();
    }
    if (media?.type === "video" && media.video) {
      return media.video;
    }
    return null;
  };

  // Process media data for ProjectClient
  const getMediaData = (media) => {
    if (!media) return null;
    
    return {
      image: media.image?.asset ? urlFor(media.image)?.url() : null,
      video: media.video || null
    };
  };

  const featuredMediaUrl = project.featuredMedia
    ? getMediaData(project.featuredMedia)
    : null;

  const mediaGallery = project.mediaGallery
    ? project.mediaGallery.map((media) => getMediaData(media))
    : null;

  const nextProjectMediaUrl = project.nextProjectMedia
    ? getMediaData(project.nextProjectMedia)
    : null;

  console.log("project", project);

  return (
    <ProjectClient 
      project={project}
      featuredMediaUrl={featuredMediaUrl}
      mediaGallery={mediaGallery}
      nextProjectMediaUrl={nextProjectMediaUrl}
    />
  );
}
