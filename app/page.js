export default function IndexPage() {
  return (
    <div className='h-full w-full bg-white'>
      <div className='flex flex-col relative h-[calc(100vh-28px)] 2xl:h-[150vh]'>
        <div className='h1 text-26 flex-grow items-center flex h-full lg:margin-top lg:margin-bottom'>
          We are a design studio that helps brands realize their
          identity and execute it across branding, digital and
          physical mediums.
        </div>
        <div className='w-full flex h-fit aspect-video overflow-clip'>
          <img
            src='/images/about_auw.png'
            alt='about'
            className='col-span-12 w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";

// import { client } from "@/sanity/config";

// const PROJECTS_QUERY = `*[
//   _type == "project"
//   && defined(title)
// ]|order(publishedAt desc)[0...12]{_id, title, publishedAt}`;

// const options = { next: { revalidate: 30 } };

// export default async function IndexPage() {
//   const projects = await client.fetch(PROJECTS_QUERY, {}, options);

//   return (
//     <main className='container mx-auto max-w-3xl p-8'>
//       <h1 className='text-4xl font-bold mb-8'>Projects</h1>
//       <ul className='flex flex-col gap-y-4'>
//         {projects.map((project) => (
//           <li className='hover:underline' key={project._id}>
//             <Link
//               href={`/${project.title
//                 .toLowerCase()
//                 .replace(/\s+/g, "-")}`}
//             >
//               <h2 className='text-xl font-semibold'>
//                 {project.title}
//               </h2>
//               <p>
//                 {new Date(project.publishedAt).toLocaleDateString()}
//               </p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
