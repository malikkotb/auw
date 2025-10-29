import { client, urlFor } from "@/sanity/config";
import IndexClient from "./IndexClient";

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

async function getClients() {
  const query = `*[_type == "clients"] {
    name,
    "imageUrl": image.asset->url
  }`;

  const options = { next: { revalidate: 3600 } }; // 1 hour in seconds

  return await client.fetch(query, {}, options);
}

async function getProjects() {
  const options = { next: { revalidate: 3600 } }; // 1 hour in seconds

  return await client.fetch(PROJECTS_QUERY, {}, options);
}

export default async function Index() {
  const [clients, projects] = await Promise.all([
    getClients(),
    getProjects(),
  ]);

  const clientsData = clients.map((client) => ({
    name: client.name,
    imageUrl: client.imageUrl,
  }));

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

  // Get first 3 projects
  const firstThreeProjects = processedProjects.slice(0, 3);

  return (
    <IndexClient
      clientsData={clientsData}
      projects={firstThreeProjects}
    />
  );
}
