import { urlFor } from "@/sanity/lib/image";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: SanityDocument;
  authors: SanityDocument[];
  categories: SanityDocument[];
}

const BlogCard = ({ post, authors, categories }: BlogCardProps) => {
  const {
    _id,
    title,
    excerpt,
    mainImage,
    author,
    slug,
    category,
    tags,
    publishedAt,
    readTime,
  } = post;

  const categoryTitle =
    categories.find((cat) => cat._id === category._ref)?.title || "";
  const authorName =
    authors.find((auth) => auth._id === author._ref)?.name || "Unknown Author";

  return (
    <div
      key={_id}
      className="group relative shadow-lg hover:shadow-xl mx-auto border border-gray-300 dark:border-gray-800 rounded-md max-w-sm sm:max-w-md overflow-hidden transition-all hover:-translate-y-1 duration-300"
    >
      <Link href={`/blog/${slug.current}`}>
        <span className="z-10 absolute inset-0"></span>
      </Link>
      <div className="relative overflow-hidden">
        <Image
          src={urlFor(mainImage).width(600).height(400).url()}
          alt={title}
          width={600}
          height={400}
          className="rounded-t-md w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 600px"
        />
        {categoryTitle && (
          <div className="top-3 left-3 absolute bg-amber-400/70 px-2 py-0.5 rounded-full font-semibold text-white text-xs sm:text-sm">
            {categoryTitle}
          </div>
        )}
      </div>
      <div className="flex flex-col p-4 sm:p-6 min-h-[220px] sm:min-h-[260px]">
        <h4 className="mb-2 font-bold text-gray-900 dark:text-white group-hover:text-amber-600 text-lg sm:text-xl line-clamp-2 transition-colors">
          {title}
        </h4>
        <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base line-clamp-3 leading-relaxed">
          {excerpt}
        </div>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {tags?.map((tag: string) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 px-2 py-0.5 rounded-full font-medium dark:text-gray-800 text-xs sm:text-sm"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </div>
            ))}
          </div>
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 sm:gap-0 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center space-x-1">
                <User size={12} className="sm:w-4 sm:h-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={12} className="sm:w-4 sm:h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={12} className="sm:w-4 sm:h-4" />
              <span>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
