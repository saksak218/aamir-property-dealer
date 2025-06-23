import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogWrapper from "@/components/blog/BlogWrapper";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  category,
  author,
  }`;

const AUTHOR_QUERY = `*[_type == "author"]{_id, name, slug, image}`;

const CATEGORIES_QUERY = `*[_type == "category"]{_id, title, "slug": slug.current}`;

const options = { next: { revalidate: 30 } };

export default async function Page() {
  const [posts, authors, categories] = await Promise.all([
    client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options),
    client.fetch<SanityDocument[]>(AUTHOR_QUERY, {}, options),
    client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options),
  ]);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <BlogWrapper
        categories={categories}
        featuredPost={featuredPost ? featuredPost : null}
        authors={authors}
        posts={posts}
      />
    </main>
  );
}
