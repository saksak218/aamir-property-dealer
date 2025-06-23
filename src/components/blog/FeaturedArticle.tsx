import { Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button-custom";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Playfair } from "next/font/google";

const playFair = Playfair({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const FeaturedArticle = ({ categories, featuredPost, authors }) => {
  return (
    <section className="mb-16">
      <div className="relative bg-slate-900 shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="z-10 relative p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 mb-4 border-white/30 text-white">
              {categories.find(
                (cat: { _id: string }) =>
                  cat._id === featuredPost?.category?._ref
              )?.title || "Uncategorized"}
            </Badge>
            <h2
              className={`${playFair.className} mb-4 font-bold text-4xl md:text-5xl leading-tight`}
            >
              {featuredPost?.title}
            </h2>
            <div className="mb-6 text-white/90 text-lg leading-relaxed">
              {/* {Array.isArray(featuredPost?.body) && (
                  <PortableText value={featuredPost?.body} />
                )} */}
              {featuredPost?.excerpt}
            </div>
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>
                  {authors.find(
                    (auth: { _id: string; name: string }) =>
                      auth._id === featuredPost?.author?._ref
                  )?.name || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
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
                <Clock size={16} />
                <span>{featuredPost?.readTime} min read</span>
              </div>
            </div>
            <Button className="relative bg-amber-500 hover:bg-amber-600 mt-8 px-8 font-semibold text-white">
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
