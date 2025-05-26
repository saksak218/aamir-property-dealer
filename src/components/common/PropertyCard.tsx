"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize as ArrowsMaximize,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: string;
  imageUrl: StaticImageData;
  bedrooms: number;
  bathrooms: number;
  area: string;
  featured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  imageUrl,
  bedrooms,
  bathrooms,
  area,
  featured = false,
}: PropertyProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
        featured && "ring-2 ring-amber-500"
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={cn(
            "object-cover transition-transform duration-700 ease-in-out",
            isHovered && "scale-110"
          )}
        />

        {featured && (
          <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-colors",
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-amber-600 transition-colors">
            <Link href={`/property/${id}`}>{title}</Link>
          </h3>
          <span className="text-amber-600 font-bold">{price}</span>
        </div>

        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center text-muted-foreground">
            <BedDouble className="h-4 w-4 mr-1" />
            <span className="text-xs">{bedrooms} Beds</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-xs">{bathrooms} Baths</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <ArrowsMaximize className="h-4 w-4 mr-1" />
            <span className="text-xs">{area}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
