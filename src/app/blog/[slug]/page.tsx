import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Playfair } from "next/font/google";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const CATEGORY_QUERY = `*[_type == "category"]{_id, title, "slug": slug.current}`;
const AUTHOR_QUERY = `*[_type == "author"]{_id, name, "slug": slug.current}`;

const playFair = Playfair({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );

  const category = await client.fetch<SanityDocument[]>(
    CATEGORY_QUERY,
    {},
    options
  );

  const authors = await client.fetch<SanityDocument[]>(
    AUTHOR_QUERY,
    {},
    options
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(450).url()
    : null;

  return (
    <MainLayout>
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 min-h-screen container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <span className="inline-block bg-amber-600/80 px-3 py-1 rounded-full font-medium text-white text-xs sm:text-sm">
              {category.find((cat) => cat._id === post.category._ref)?.title ||
                "Uncategorized"}
            </span>
          </div>

          <h1
            className={`${playFair.className} mb-6 font-bold text-slate-900 dark:text-gray-200 text-2xl sm:text-3xl md:text-4xl leading-tight`}
          >
            {post.title}
          </h1>

          <div className="flex sm:flex-row flex-col sm:items-center gap-4 sm:gap-6 mb-8 pb-8 border-gray-200 dark:border-gray-800 border-b text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
            <div className="flex items-center">
              <User className="mr-2 w-4 h-4" />
              <span>
                {authors.find((author) => author._id === post.author._ref)
                  ?.name || "Unknown Author"}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 w-4 h-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <div className="mb-8">
            <Image
              src={postImageUrl ?? ""}
              alt={post.title}
              className="rounded-lg w-full h-auto object-cover aspect-video"
              width={800}
              height={450}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          <div className="dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed prose prose-sm sm:prose-base">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>

          <div className="mt-12 pt-8 border-gray-200 border-t dark:border-t-gray-800">
            <Link href="/blog">
              <Button className="bg-slate-900 hover:bg-slate-900/80 px-4 sm:px-6 py-2 sm:py-2.5 text-white text-sm sm:text-base cursor-pointer">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to All Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
