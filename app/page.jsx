import { client, urlFor } from "@/sanity/config";
import IndexClient from "./IndexClient";

async function getClients() {
  const query = `*[_type == "clients"] {
    name,
    "imageUrl": image.asset->url
  }`;

  const options = { next: { revalidate: 3600 } }; // 1 hour in seconds

  return await client.fetch(query, {}, options);
}

export default async function Index() {
  const clients = await getClients();
  const clientsData = clients.map((client) => ({
    name: client.name,
    imageUrl: client.imageUrl,
  }));

  return <IndexClient clientsData={clientsData} />;
}
