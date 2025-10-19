import { client, urlFor } from "@/sanity/config";
import AboutClient from "./AboutClient";

async function getClients() {
  const query = `*[_type == "clients"] {
    name,
    "imageUrl": image.asset->url
  }`;

  const options = { next: { revalidate: 3600 } }; // 1 hour in seconds

  return await client.fetch(query, {}, options);
}

export default async function About() {
  const clients = await getClients();
  const clientsData = clients.map((client) => ({
    name: client.name,
    imageUrl: client.imageUrl,
  }));

  return <AboutClient clientsData={clientsData} />;
}
