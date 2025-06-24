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

const Property_QUERY = `*[_type == "property" && slug.current == $slug][0]`;
const CATEGORIES_QUERY = `*[_type == "propertyCategory"]{_id, title, "slug": slug.current}`;
const options = { next: { revalidate: 30 } };

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const property = await client.fetch(Property_QUERY, await params, options);
  const propertyCategory = await client.fetch<SanityDocument[]>(
    CATEGORIES_QUERY,
    {},
    options
  );

  const mainImageUrl = property.mainImage
    ? urlFor(property.mainImage)?.width(1000).height(600).url()
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen container">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center mb-6 sm:mb-8 text-navy hover:text-amber-600 text-sm sm:text-base transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Link>

          <div className="gap-6 sm:gap-8 grid grid-cols-1 lg:grid-cols-2">
            {/* Property Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
                <Image
                  width={800}
                  height={500}
                  src={mainImageUrl || "/placeholder.jpg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <Badge className="top-3 left-3 absolute bg-slate-900 text-white text-xs sm:text-sm">
                  {propertyCategory.find(
                    (cat) => cat._id === property.categories[0]?._ref
                  )?.title || "Uncategorized"}
                </Badge>
                {property.featured && (
                  <Badge className="top-3 right-3 absolute bg-amber-600 text-white text-xs sm:text-sm">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Additional Images */}
              {property.images && property.images.length > 1 && (
                <div className="gap-3 sm:gap-4 grid grid-cols-3">
                  {property.images.map((img: object, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg h-20 sm:h-24 overflow-hidden"
                    >
                      <Image
                        width={300}
                        height={200}
                        src={urlFor(img).url()}
                        alt={`${property.title} ${index + 2}`}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-3 font-playfair font-bold text-slate-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl">
                  {property.title}
                </h1>
                <div className="flex items-center mb-3 text-darkGray text-sm sm:text-base">
                  <MapPin className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
                  <span>{property.location}</span>
                </div>
                <div className="mb-4 font-bold text-amber-600 text-2xl sm:text-3xl">
                  {formatToLakhCrore(Number(property.price))}
                </div>
              </div>

              {/* Property Features */}
              <div className="gap-4 grid grid-cols-3 py-6 border-gray-200 border-y">
                <div className="text-center">
                  <Bed className="mx-auto mb-2 w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300 text-sm sm:text-base">
                    {property.bed}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    Bedrooms
                  </div>
                </div>
                <div className="text-center">
                  <Home className="mx-auto mb-2 w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300 text-sm sm:text-base">
                    {property.bath}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    Bathrooms
                  </div>
                </div>
                <div className="text-center">
                  <ArrowsMaximize className="mx-auto mb-2 w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
                  <div className="font-semibold text-slate-900 dark:text-gray-300 text-sm sm:text-base">
                    {property.size} sq ft
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    Area
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 font-semibold text-navy text-lg sm:text-xl">
                  Description
                </h3>
                <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {Array.isArray(property.description) && (
                    <PortableText value={property.description} />
                  )}
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && (
                <div>
                  <h3 className="mb-3 font-semibold text-navy text-lg sm:text-xl">
                    Amenities
                  </h3>
                  <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                    {property.amenities.map(
                      (amenity: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center text-muted-foreground text-sm sm:text-base"
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
                <Button className="relative bg-amber-500 hover:bg-amber-600 py-2 sm:py-3 w-full text-white text-base sm:text-lg">
                  <Link href="https://wa.me/923005019850" target="_blank">
                    <span className="absolute inset-0"></span>
                    Contact Agent
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
