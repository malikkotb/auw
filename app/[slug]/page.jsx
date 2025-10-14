import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/config";
import Link from "next/link";
import VideoDim from "@/components/ImageComponents/VideoDim";
import InstaDim from "@/components/ImageComponents/InstaDim";
import Footer from "@/components/Footer/Footer";
import ParagraphEyebrow from "@/components/ParagraphEyebrow";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  client,
  publishedAt,
  overview,
  year,
  projectUrl,
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
  // Helper function to get aspect ratio class
  const getAspectRatioClass = (dimension) => {
    switch (dimension) {
      case "instagram":
        return "aspect-[4/5]";
      case "video":
        return "aspect-video";
      default:
        return "aspect-video";
    }
  };

  // Get featured media URL
  const getFeaturedMediaUrl = (media) => {
    if (media?.type === "image" && media.image?.asset) {
      return urlFor(media.image)?.url();
    }
    if (media?.type === "video" && media.video?.asset?.url) {
      return media.video.asset.url;
    }
    return null;
  };

  const featuredMediaUrl = project.featuredMedia
    ? getFeaturedMediaUrl(project.featuredMedia)
    : null;

  // Helper function to check if a URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".mov"];
    return videoExtensions.some((ext) =>
      url.toLowerCase().endsWith(ext)
    );
  };

  const mediaGallery = project.mediaGallery
    ? project.mediaGallery.map((media) => getFeaturedMediaUrl(media))
    : null;

  console.log("project", project);

  return (
    <main className='h-full w-full margin-top'>
      <div className='margin-bottom w-full flex justify-between'>
        <div className='flex flex-col'>
          <div className='h1'>{project.title}</div>
          <div className='h1 text-[#838383]'>
            {project.description}
          </div>
        </div>
        <div className='h1'>({project.year})</div>
      </div>

      <div className='grid grid-cols-12 w-full h-full'>
        <VideoDim
          colSpan={12}
          imgLink={featuredMediaUrl}
          videoLink={
            isVideoUrl(featuredMediaUrl) ? featuredMediaUrl : null
          }
        />
      </div>
      <ParagraphEyebrow
        className='mt-[20%]'
        eyebrowText={"Overview"}
        mainText={project.overview}
        buttonText={"View Live Site"}
        targetBlank={true}
        buttonLink={project.projectUrl}
      />

      <div className='grid grid-cols-12 gap-[14px]'>
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[0]}
          videoLink={
            isVideoUrl(mediaGallery[0]) ? mediaGallery[0] : null
          }
        />
        <InstaDim
          colSpan={4}
          imgLink={mediaGallery[1]}
          videoLink={
            isVideoUrl(mediaGallery[1]) ? mediaGallery[1] : null
          }
        />
        <InstaDim
          colSpan={8}
          imgLink={mediaGallery[2]}
          videoLink={
            isVideoUrl(mediaGallery[2]) ? mediaGallery[2] : null
          }
        />
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[3]}
          videoLink={
            isVideoUrl(mediaGallery[3]) ? mediaGallery[3] : null
          }
        />
      </div>

      <ParagraphEyebrow
        className='mt-[20%]'
        eyebrowText={"Overview"}
        mainText={project.overview}
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[4]}
          videoLink={
            isVideoUrl(mediaGallery[4]) ? mediaGallery[4] : null
          }
        />
        <InstaDim
          colSpan={8}
          imgLink={mediaGallery[5]}
          videoLink={
            isVideoUrl(mediaGallery[5]) ? mediaGallery[5] : null
          }
        />
        <InstaDim
          colSpan={4}
          imgLink={mediaGallery[6]}
          videoLink={
            isVideoUrl(mediaGallery[6]) ? mediaGallery[6] : null
          }
        />
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[7]}
          videoLink={
            isVideoUrl(mediaGallery[7]) ? mediaGallery[7] : null
          }
        />
      </div>

      <ParagraphEyebrow
        className='mt-[20%]'
        eyebrowText={"Overview"}
        mainText={project.overview}
      />

      <div className='grid h-full grid-cols-12 gap-[14px]'>
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[8]}
          videoLink={
            isVideoUrl(mediaGallery[8]) ? mediaGallery[8] : null
          }
        />
        <InstaDim
          colSpan={4}
          imgLink={mediaGallery[10]}
          videoLink={
            isVideoUrl(mediaGallery[10]) ? mediaGallery[10] : null
          }
        />
        <InstaDim
          colSpan={8}
          imgLink={mediaGallery[9]}
          videoLink={
            isVideoUrl(mediaGallery[9]) ? mediaGallery[9] : null
          }
        />
        <VideoDim
          colSpan={12}
          imgLink={mediaGallery[11]}
          videoLink={
            isVideoUrl(mediaGallery[11]) ? mediaGallery[11] : null
          }
        />
      </div>

      <div className='mt-[20%]'>Next Project Page starts here</div>
    </main>
  );
}
