import { Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button-custom";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Playfair } from "next/font/google";
import { SanityDocument } from "next-sanity";

const playFair = Playfair({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

interface FeaturedArticleProps {
  categories: SanityDocument[];
  featuredPost: SanityDocument | null;
  authors: SanityDocument[];
}

const FeaturedArticle = ({
  categories,
  featuredPost,
  authors,
}: FeaturedArticleProps) => {
  return (
    <section className="mb-8 sm:mb-16">
      <div className="relative bg-slate-900 shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="z-10 relative p-4 sm:p-8 md:p-12 text-white">
          <div className="mx-auto max-w-full">
            <Badge className="bg-white/20 mb-4 border-white/30 text-white text-xs sm:text-sm">
              {categories.find(
                (cat: { _id: string }) =>
                  cat._id === featuredPost?.category?._ref
              )?.title || "Uncategorized"}
            </Badge>
            <h2
              className={`${playFair.className} mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight`}
            >
              {featuredPost?.title}
            </h2>
            <div className="mb-6 text-white/90 text-sm sm:text-base md:text-lg line-clamp-3 leading-relaxed">
              {featuredPost?.excerpt}
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <User size={14} className="sm:w-4 sm:h-4" />
                <span>
                  {authors.find(
                    (auth) => auth._id === featuredPost?.author?._ref
                  )?.name || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span>
                  {new Date(featuredPost?.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span>{featuredPost?.readTime} min read</span>
              </div>
            </div>
            <Button className="relative bg-amber-500 hover:bg-amber-600 mt-6 sm:mt-8 px-6 sm:px-8 py-2 font-semibold text-white text-sm sm:text-base">
              <Link href={`/blog/${featuredPost?.slug?.current}`}>
                <span className="absolute inset-0 cursor-pointer"></span>
                Read Article
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
