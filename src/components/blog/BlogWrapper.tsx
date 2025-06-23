"use client";

import { SanityDocument } from "next-sanity";
import { Button } from "../ui/button-custom";
import BlogCard from "./BlogCard";
import FeaturedArticle from "./FeaturedArticle";
import { useState } from "react";

// import { BlogPost } from "@/sanity/schemaTypes/blogPost";
// import { postType } from "@/sanity/schemaTypes/postType";

const BlogWrapper = ({ categories, featuredPost, authors, posts }) => {
  const [vissiblePosts, setVissiblePosts] = useState(4);

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
        <h3 className="mb-8 font-bold text-gray-900 dark:text-gray-200 text-2xl">
          Latest Articles
        </h3>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, vissiblePosts).map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              authors={authors}
              categories={categories}
            />
          ))}
        </div>
      </section>

      {/* Load More */}
      {vissiblePosts < posts.length && (
        <div className="mt-12 text-center">
          <Button
            onClick={() => setVissiblePosts((prev) => prev + 3)}
            variant="gold-outline"
            size="lg"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogWrapper;
