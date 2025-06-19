import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import MainLayout from "@/components/layout/MainLayout";

const PROPERTIES_QUERY = `*[
  _type == "property"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, mainImage, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function PropertiesPage() {
  const properties = await client.fetch<SanityDocument[]>(
    PROPERTIES_QUERY,
    {},
    options
  );

  return (
    <MainLayout>
      <main className="mx-auto p-8 max-w-3xl min-h-screen container">
        <h1 className="mb-8 font-bold text-4xl">Properties</h1>
        <ul className="flex flex-col gap-y-4">
          {properties.map(({ _id, title, slug, mainImage, publishedAt }) => (
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
    </MainLayout>
  );
}
