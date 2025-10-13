import Link from "next/link";

import { client } from "@/sanity/config";

const PROJECTS_QUERY = `*[
  _type == "project"
  && defined(title)
]|order(publishedAt desc)[0...12]{_id, title, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, options);

  return (
    <main className='container mx-auto max-w-3xl p-8'>
      <h1 className='text-4xl font-bold mb-8'>Projects</h1>
      <ul className='flex flex-col gap-y-4'>
        {projects.map((project) => (
          <li className='hover:underline' key={project._id}>
            <Link
              href={`/${project.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <h2 className='text-xl font-semibold'>
                {project.title}
              </h2>
              <p>
                {new Date(project.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
