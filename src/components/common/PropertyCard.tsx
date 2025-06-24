// app/components/common/PropertyCard.tsx
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  Heart,
  MapPin,
  BedDouble,
  Maximize as ArrowsMaximize,
} from "lucide-react";
import { useEffect, useState } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatToLakhCrore } from "@/lib/formatToLakhCrore";

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  category: string;
  featured?: boolean;
  slug?: string; // Optional slug for linking
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
  featured,
  slug,
}: PropertyProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check localStorage for favorite status on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favoriteProperties");
      if (stored) {
        const favs = JSON.parse(stored);
        setIsFavorite(Array.isArray(favs) && favs.includes(id));
      }
    }
  }, [id]);

  // Update localStorage when favorite toggled
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite((prev) => {
      const newFav = !prev;
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("favoriteProperties");
        let favs: string[] = stored ? JSON.parse(stored) : [];
        if (newFav) {
          if (!favs.includes(id)) favs.push(id);
        } else {
          favs = favs.filter((fid) => fid !== id);
        }
        localStorage.setItem("favoriteProperties", JSON.stringify(favs));
      }
      return newFav;
    });
  };

  const amount = formatToLakhCrore(Number(price));

  return (
    <motion.div
      className={`relative ${cn(
        "group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
        featured && "ring-2 ring-amber-500"
      )}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/properties/${slug}`} className="block">
        <span className="z-20 absolute inset-0"></span>
      </Link>
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
          <div className="top-2 left-2 absolute bg-amber-600 px-2 py-1 rounded font-semibold text-white text-xs">
            Featured
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute z-20 cursor-pointer top-2 right-2 p-2 rounded-full transition-colors",
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
          <h3 className="font-semibold group-hover:text-amber-600 text-lg line-clamp-1 transition-colors">
            <Link href={`/property/${id}`}>{title}</Link>
          </h3>
          <span className="font-bold text-amber-600">{amount}</span>
        </div>

        <div className="flex items-center mb-4 text-muted-foreground">
          <MapPin className="flex-shrink-0 mr-1 w-4 h-4" />
          <span className="text-sm truncate">{location}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="flex items-center text-muted-foreground">
            <BedDouble className="mr-1 w-4 h-4" />
            <span className="text-xs">{bedrooms} Beds</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Bath className="mr-1 w-4 h-4" />
            <span className="text-xs">{bathrooms} Baths</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <ArrowsMaximize className="mr-1 w-4 h-4" />
            <span className="text-xs">{area} sq ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;

// "use client";

// import { useState } from "react";
// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import { motion } from "motion/react";
// import {
//   Heart,
//   MapPin,
//   BedDouble,
//   Bath,
//   Maximize as ArrowsMaximize,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export interface PropertyProps {
//   id: string;
//   title: string;
//   location: string;
//   price: string;
//   imageUrl: StaticImageData;
//   bedrooms: number;
//   bathrooms: number;
//   area: string;
//   featured?: boolean;
// }

// const PropertyCard = ({
//   id,
//   title,
//   location,
//   price,
//   imageUrl,
//   bedrooms,
//   bathrooms,
//   area,
//   featured = false,
// }: PropertyProps) => {
// const [isFavorite, setIsFavorite] = useState(false);
// const [isHovered, setIsHovered] = useState(false);

//   return (
// <motion.div
//   className={cn(
//     "group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
//     featured && "ring-2 ring-amber-500"
//   )}
//   whileHover={{ y: -5 }}
//   transition={{ duration: 0.3 }}
// >
// <div
//   className="relative aspect-[4/3] overflow-hidden"
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
// >
//   <Image
//     src={imageUrl}
//     alt={title}
//     fill
//     className={cn(
//       "object-cover transition-transform duration-700 ease-in-out",
//       isHovered && "scale-110"
//     )}
//   />

//   {featured && (
//     <div className="top-2 left-2 absolute bg-amber-600 px-2 py-1 rounded font-semibold text-white text-xs">
//       Featured
//     </div>
//   )}

//   <button
//     onClick={(e) => {
//       e.preventDefault();
//       setIsFavorite(!isFavorite);
//     }}
//     className={cn(
//       "absolute top-2 right-2 p-2 rounded-full transition-colors",
//       isFavorite
//         ? "bg-red-500 text-white"
//         : "bg-white/80 text-gray-600 hover:bg-white"
//     )}
//     aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//   >
//     <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
//   </button>
// </div>

// <div className="p-4">
//   <div className="flex justify-between items-start mb-2">
//     <h3 className="font-semibold group-hover:text-amber-600 text-lg line-clamp-1 transition-colors">
//       <Link href={`/property/${id}`}>{title}</Link>
//     </h3>
//     <span className="font-bold text-amber-600">{price}</span>
//   </div>

//   <div className="flex items-center mb-4 text-muted-foreground">
//     <MapPin className="flex-shrink-0 mr-1 w-4 h-4" />
//     <span className="text-sm truncate">{location}</span>
//   </div>

//   <div className="flex justify-between items-center pt-3 border-t border-border">
//     <div className="flex items-center text-muted-foreground">
//       <BedDouble className="mr-1 w-4 h-4" />
//       <span className="text-xs">{bedrooms} Beds</span>
//     </div>

//     <div className="flex items-center text-muted-foreground">
//       <Bath className="mr-1 w-4 h-4" />
//       <span className="text-xs">{bathrooms} Baths</span>
//     </div>

//     <div className="flex items-center text-muted-foreground">
//       <ArrowsMaximize className="mr-1 w-4 h-4" />
//       <span className="text-xs">{area}</span>
//     </div>
//   </div>
// </div>
//     </motion.div>
//   );
// };

// export default PropertyCard;
