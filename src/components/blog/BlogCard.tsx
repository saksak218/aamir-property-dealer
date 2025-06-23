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

  return (
    <div
      key={_id}
      className="group relative shadow-lg hover:shadow-xl border border-gray-300 dark:border-gray-800 rounded-md overflow-hidden transition-all hover:-translate-y-1 duration-300"
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
          className="rounded-md w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="top-4 left-4 absolute bg-amber-400/70 px-2 py-0.5 border-0 rounded-full font-semibold text-white text-xs">
          {categories.map((cat) => (
            <div key={cat._id}>
              {category._ref === cat._id ? cat.title : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-6 min-h-60">
        <h4 className="mb-2 font-bold text-gray-900 dark:text-white group-hover:text-amber-600 text-xl line-clamp-2 transition-colors">
          {title}
        </h4>
        <div className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {excerpt}
          {/* {Array.isArray(body) && <PortableText value={body} />} */}
        </div>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.map((tag: string) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 px-2 py-0.5 rounded-full font-medium dark:text-gray-800 text-xs"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User size={14} />
                {authors.map((auth) => (
                  <span key={auth._id}>
                    {author._ref === auth._id ? auth.name : ""}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{readTime} min read</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
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
