import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, mainImage, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="mx-auto p-8 max-w-3xl min-h-screen container">
      <h1 className="mb-8 font-bold text-4xl">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map(({ _id, title, slug, mainImage, publishedAt }) => (
          <li className="hover:underline" key={_id}>
            <Link href={`/hello/${slug.current}`}>
              <h2 className="font-semibold text-xl">{title}</h2>
              <p>{new Date(publishedAt).toLocaleDateString()}</p>
              {mainImage && (
                <Image
                  src={urlFor(mainImage).width(550).height(310).url()}
                  alt={title}
                  width={550}
                  height={310}
                  className="mt-2 rounded-xl aspect-video"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
