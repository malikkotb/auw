import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/config";
import Link from "next/link";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  client,
  publishedAt,
  overview,
  featuredMedia{
    dimension,
    type,
    image{
      asset->
    },
    video{
      asset->
    }
  },
  mediaGallery[]{
    _key,
    dimension,
    type,
    image{
      asset->
    },
    video{
      asset->
    }
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({ params }) {
  console.log("params", params.slug);
  const project = await client.fetch(
    PROJECT_QUERY,
    { slug: params.slug },
    options
  );
  // Helper function to get aspect ratio class
  const getAspectRatioClass = (dimension) => {
    switch (dimension) {
      case 'instagram':
        return 'aspect-[4/5]';
      case 'video':
        return 'aspect-video';
      default:
        return 'aspect-video';
    }
  };

  // Get featured media URL
  const getFeaturedMediaUrl = (media) => {
    if (media?.type === 'image' && media.image?.asset) {
      return urlFor(media.image)?.url();
    }
    if (media?.type === 'video' && media.video?.asset?.url) {
      return media.video.asset.url;
    }
    return null;
  };

  const featuredMediaUrl = project.featuredMedia ? getFeaturedMediaUrl(project.featuredMedia) : null;

  return (
    <main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
      <Link href='/' className='hover:underline'>
        ← Back to projects
      </Link>
      {featuredMediaUrl && (
        <div className={getAspectRatioClass(project.featuredMedia.dimension)}>
          {project.featuredMedia.type === 'image' ? (
            <img
              src={featuredMediaUrl}
              alt={project.title}
              className='rounded-xl w-full h-full object-cover'
            />
          ) : (
            <video
              src={featuredMediaUrl}
              className='rounded-xl w-full h-full object-cover'
              controls
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <h1 className='text-4xl font-bold mb-8'>{project.title}</h1>
      
      {project.client && (
        <div className='mb-4'>
          <h2 className='text-xl font-semibold mb-2'>Client</h2>
          <p>{project.client}</p>
        </div>
      )}

      {project.description && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Description</h2>
          <p>{project.description}</p>
        </div>
      )}

      {project.overview && (
        <div className='prose max-w-none'>
          <h2 className='text-xl font-semibold mb-2'>Overview</h2>
          <PortableText value={project.overview} />
        </div>
      )}

      {project.mediaGallery && project.mediaGallery.length > 0 && (
        <div className='mt-12'>
          <h2 className='text-xl font-semibold mb-6'>Project Gallery</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {project.mediaGallery.map((media) => {
              const mediaUrl = getFeaturedMediaUrl(media);
              return mediaUrl ? (
                <div 
                  key={media._key} 
                  className={`relative ${getAspectRatioClass(media.dimension)}`}
                >
                  {media.type === 'image' ? (
                    <img
                      src={mediaUrl}
                      alt={`${project.title} gallery image`}
                      className='rounded-xl w-full h-full object-cover'
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={mediaUrl}
                      className='rounded-xl w-full h-full object-cover'
                      controls
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className='mt-8 text-sm text-gray-500'>
        Published: {new Date(project.publishedAt).toLocaleDateString()}
      </div>
    </main>
  );
}

// import { PortableText } from "next-sanity";
// import imageUrlBuilder from "@sanity/image-url";
// import { client } from "@/sanity/config";
// import Link from "next/link";

// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

// const { projectId, dataset } = client.config();
// const urlFor = (source) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

// const options = { next: { revalidate: 30 } };

// export default async function PostPage({ params }) {
//   const post = await client.fetch(POST_QUERY, { slug: params.slug }, options);
//   const postImageUrl = post.image
//     ? urlFor(post.image)?.width(550).height(310).url()
//     : null;

//   return (
//     <main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
//       <Link href='/' className='hover:underline'>
//         ← Back to posts
//       </Link>
//       {postImageUrl && (
//         <img
//           src={postImageUrl}
//           alt={post.title}
//           className='aspect-video rounded-xl'
//           width='550'
//           height='310'
//         />
//       )}
//       <h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
//       <div className='prose'>
//         <p>
//           Published: {new Date(post.publishedAt).toLocaleDateString()}
//         </p>
//         {Array.isArray(post.body) && (
//           <PortableText value={post.body} />
//         )}
//       </div>
//     </main>
//   );
// }
