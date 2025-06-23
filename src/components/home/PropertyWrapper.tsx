// app/components/PropertiesWrapper.tsx
import { client } from "@/sanity/client";
import { type SanityDocument } from "next-sanity";
import FeaturedProperties from "./FeaturedProperties";
import imageUrlBuilder from "@sanity/image-url";
import { client as sanityClient } from "@/sanity/client";

// Helper to build image URLs from Sanity
const urlFor = (source: Record<string, unknown>) =>
  imageUrlBuilder(sanityClient).image(source);

// Define the Sanity query
const PROPERTIES_QUERY = `*[
  _type == "property"
  && defined(slug.current)
]|order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  location,
  price,
  bed,
  bath,
  size,
  categories,
  featured
}`;

// Add category fetching
const CATEGORIES_QUERY = `*[_type == "propertyCategory"]{_id, title, "slug": slug.current}`;

// Revalidate every 30 seconds
const options = { next: { revalidate: 30 } };

// Define the shape of the property data
export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: string;
  slug?: string; // Optional slug for linking
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  category: string; // e.g., "residential", "commercial", "plots"
  featured?: boolean;
}

export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
}

export default async function PropertiesWrapper() {
  const [properties, categories] = await Promise.all([
    client.fetch<SanityDocument[]>(PROPERTIES_QUERY, {}, options),
    client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options),
  ]);

  // Map categories
  const formattedCategories: PropertyCategory[] = [
    { id: "all", name: "All", slug: "all" },
    ...categories.map((category) => ({
      id: category._id,
      name: category.title,
      slug: category.slug,
    })),
  ];

  // Map Sanity data to PropertyProps
  const formattedProperties: PropertyProps[] = properties.map((property) => ({
    id: property._id,
    title: property.title,
    location: property.location,
    price: property.price,
    imageUrl: property.mainImage
      ? urlFor(property.mainImage).url()
      : "/images/fallback.jpg", // Use a fallback image if needed
    bedrooms: property.bed || 0,
    bathrooms: property.bath || 0,
    area: property.size || "N/A",
    // Map to first category slug (or 'all' if none)
    category:
      property.categories && property.categories.length > 0
        ? property.categories[0]._ref || "all"
        : "all",
    featured: property.featured || false,
    slug: property.slug?.current || "", // Ensure slug is a string
  }));

  return (
    <FeaturedProperties
      initialProperties={formattedProperties}
      categories={formattedCategories}
    />
  );
}
