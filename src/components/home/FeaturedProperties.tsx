"use client";

import { useState } from "react";
import { motion } from "motion/react";
import PropertyCard, { PropertyProps } from "@/components/common/PropertyCard";
import { Button } from "@/components/ui/button-custom";
import { Building2, Home, Warehouse, Building } from "lucide-react";

import image1 from "../../../public/images/property/1.jpeg";
import image2 from "../../../public/images/property/2.jpeg";
import image3 from "../../../public/images/property/3.jpeg";
import image4 from "../../../public/images/property/3.jpeg";
import image5 from "../../../public/images/property/3.jpeg";
import image6 from "../../../public/images/property/3.jpeg";

const propertyCategories = [
  { id: "all", name: "All", icon: <Building2 className="h-4 w-4 mr-2" /> },
  {
    id: "residential",
    name: "Residential",
    icon: <Home className="h-4 w-4 mr-2" />,
  },
  {
    id: "commercial",
    name: "Commercial",
    icon: <Warehouse className="h-4 w-4 mr-2" />,
  },
  { id: "plots", name: "Plots", icon: <Building className="h-4 w-4 mr-2" /> },
];

const properties: PropertyProps[] = [
  {
    id: "1",
    title: "Luxury Villa with Garden",
    location: "DHA Phase 6, Lahore",
    price: "Rs. 12.5 Cr",
    imageUrl: image1,
    // "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    bedrooms: 5,
    bathrooms: 4,
    area: "5000 sq ft",
    featured: true,
  },
  {
    id: "2",
    title: "Modern Apartment",
    location: "Bahria Town, Islamabad",
    price: "Rs. 2.8 Cr",
    imageUrl: image2,
    // "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sq ft",
  },
  {
    id: "3",
    title: "Commercial Plaza Space",
    location: "Gulberg III, Lahore",
    price: "Rs. 18.5 Cr",
    imageUrl: image3,
    // "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    bedrooms: 0,
    bathrooms: 4,
    area: "8000 sq ft",
  },
  {
    id: "4",
    title: "Family Home with Pool",
    location: "Scheme 33, Karachi",
    price: "Rs. 8.6 Cr",
    imageUrl: image4,
    // "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sq ft",
    featured: true,
  },
  {
    id: "5",
    title: "Prime Location Plot",
    location: "F-7, Islamabad",
    price: "Rs. 4.9 Cr",
    imageUrl: image5,
    // "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    bedrooms: 0,
    bathrooms: 0,
    area: "1000 sq ft",
  },
  {
    id: "6",
    title: "Penthouse with Terrace",
    location: "Clifton, Karachi",
    price: "Rs. 7.2 Cr",
    imageUrl: image6,
    // "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    bedrooms: 3,
    bathrooms: 3,
    area: "2700 sq ft",
  },
];

const FeaturedProperties = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProperties, setVisibleProperties] = useState(6);

  // Filter properties based on the active category
  const filteredProperties = properties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="properties"
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="relative inline-block">
              Featured Properties
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-500 rounded"></span>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties that offer
            exceptional value and luxurious living experiences.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {propertyCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "gold" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Properties grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProperties.slice(0, visibleProperties).map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load more button */}
        {visibleProperties < filteredProperties.length && (
          <div className="mt-12 text-center">
            <Button
              variant="gold-outline"
              size="lg"
              onClick={() => setVisibleProperties((prev) => prev + 3)}
            >
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
