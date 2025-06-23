"use client";
import { useState } from "react";
import { Button } from "../ui/button-custom";
import BlogCard from "./BlogCard";
import FeaturedArticle from "./FeaturedArticle";
import { SanityDocument } from "next-sanity";

interface BlogProps {
  categories: SanityDocument[];
  featuredPost: SanityDocument | null;
  authors: SanityDocument[];
  posts: SanityDocument[];
}

const BlogWrapper = ({
  categories,
  featuredPost,
  authors,
  posts,
}: BlogProps) => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  console.log(posts);

  return (
    <div>
      {/* Featured Article */}
      <FeaturedArticle
        categories={categories}
        featuredPost={featuredPost}
        authors={authors}
      />

      {/* Blog Posts Grid */}
      <section>
        <h3 className="mb-8 font-bold text-slate-900 dark:text-slate-50 text-2xl">
          Latest Articles
        </h3>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, visiblePosts).map((post) => (
            <BlogCard
              authors={authors}
              key={post._id}
              post={post}
              categories={categories}
            />
          ))}
        </div>
      </section>

      {/* Load More */}
      {visiblePosts < posts.length && (
        <div className="mt-12 text-center">
          <Button
            variant="gold-outline"
            size="lg"
            onClick={() => setVisiblePosts((prev) => prev + 3)}
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogWrapper;
