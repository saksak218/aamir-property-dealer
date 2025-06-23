import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { formatToLakhCrore } from "@/lib/formatToLakhCrore";
import {
  MapPin,
  Maximize as ArrowsMaximize,
  ArrowLeft,
  Bed,
  Home,
  Car,
  TreePine,
  Wifi,
  Dumbbell,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PortableText, SanityDocument } from "next-sanity";
import { Button } from "@/components/ui/button";

const CATEGORIES_QUERY = `*[_type == "propertyCategory"]{_id, title, "slug": slug.current}`;

const options = { next: { revalidate: 30 } };

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await client.fetch(
    `*[_type == "property" && slug.current == $slug][0]{
        _id,
        title,
        description,
        mainImage,
        price,
        bed,
        bath,
        featured,
        size,
        location,
        images,
        publishedAt,
        categories,
        amenities,
      }`,
    { slug: params.slug }
  );

  const propertyCategory = await client.fetch<SanityDocument[]>(
    CATEGORIES_QUERY,
    {},
    options
  );

  const mainImageUrl = property.mainImage
    ? urlFor(property.mainImage)?.width(1000).height(810).url()
    : null;

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "parking":
        return <Car className="w-4 h-4" />;
      case "garden":
        return <TreePine className="w-4 h-4" />;
      case "wi-fi":
        return <Wifi className="w-4 h-4" />;
      case "gym":
        return <Dumbbell className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  if (!property) return notFound();

  return (
    <MainLayout>
      <div className="mt-16 py-12 min-h-screen container">
        <div className="mx-20">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center mb-8 text-navy hover:text-amber-600/70 transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Link>

          <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Property Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg w-full h-92 overflow-hidden">
                <Image
                  width={1000}
                  height={810}
                  src={mainImageUrl || "/placeholder.jpg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${"bg-slate-900 text-white"}`}
                >
                  {propertyCategory.find(
                    (cat) => cat._id === property.categories[0]?._ref
                  )?.title || "Uncategorized"}
                </Badge>
                {property.featured && (
                  <Badge className="top-4 right-4 absolute bg-amber-600 text-white">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Additional Images */}
              {property.images && property.images.length > 1 && (
                <div className="gap-4 grid grid-cols-3">
                  {property.images.map((img: object, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg h-24 overflow-hidden"
                    >
                      <Image
                        width={300}
                        height={200}
                        src={urlFor(img).url()}
                        alt={`${property.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-4 font-playfair font-bold text-slate-900 dark:text-white text-3xl md:text-4xl">
                  {property.title}
                </h1>
                <div className="flex items-center mb-4 text-darkGray">
                  <MapPin className="mr-2 w-5 h-5 text-amber-400/70" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="mb-6 font-bold text-amber-600/70 text-3xl">
                  {formatToLakhCrore(Number(property.price))}
                </div>
              </div>

              {/* Property Features */}
              <div className="gap-4 grid grid-cols-3 py-6 border-gray-200 border-y">
                <div className="text-center">
                  <Bed className="mx-auto mb-2 w-6 h-6 text-amber-600/70" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300">
                    {property.bed}
                  </div>
                  <div className="text-muted-foreground text-sm">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Home className="mx-auto mb-2 w-6 h-6 text-amber-600/70" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300">
                    {property.bath}
                  </div>
                  <div className="text-muted-foreground text-sm">Bathrooms</div>
                </div>
                <div className="text-center">
                  <ArrowsMaximize className="mx-auto mb-2 w-6 h-6 text-amber-600/70" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300">
                    {property.size} sq ft
                  </div>
                  <div className="text-muted-foreground text-sm">Area</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 font-semibold text-navy text-xl">
                  Description
                </h3>
                <div className="text-muted-foreground leading-relaxed">
                  {Array.isArray(property.description) && (
                    <PortableText value={property.description} />
                  )}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && (
                <div>
                  <h3 className="mb-3 font-semibold text-navy text-xl">
                    Amenities
                  </h3>
                  <div className="gap-3 grid grid-cols-2">
                    {property.amenities.map(
                      (amenity: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center text-muted-foreground"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-2">{amenity}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <div className="pt-6">
                <Button className="relative bg-amber-500 hover:bg-amber-600 py-3 w-full text-white text-lg">
                  <Link href="https://wa.me/923005019850" target="_blank">
                    <span className="absolute inset-0"></span>
                  </Link>
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
