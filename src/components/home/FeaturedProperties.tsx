// app/components/FeaturedProperties.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PropertyCard, {
  PropertyProps as OriginalPropertyProps,
} from "@/components/common/PropertyCard";
import { Button } from "../ui/button-custom";

interface PropertyProps extends OriginalPropertyProps {
  category: string;
}

interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
}

interface FeaturedPropertiesProps {
  initialProperties: PropertyProps[];
  categories: PropertyCategory[];
}

const FeaturedProperties = ({
  initialProperties,
  categories,
}: FeaturedPropertiesProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProperties, setVisibleProperties] = useState(6);

  // Filter properties based on the active category
  const filteredProperties =
    activeCategory === "all"
      ? initialProperties
      : initialProperties.filter((property) => {
          return property.category === activeCategory;
        });

  // Reset visible properties when category changes
  useEffect(() => {
    setVisibleProperties(6);
  }, [activeCategory]);

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
      className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            <span className="inline-block relative">
              Featured Properties
              <span className="-bottom-2 left-1/2 absolute bg-amber-500 rounded w-12 h-1 -translate-x-1/2 transform"></span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our handpicked selection of premium properties that offer
            exceptional value and luxurious living experiences.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "gold" : "outline"}
              onClick={() => {
                setActiveCategory(category.id);
              }}
              className="flex items-center cursor-pointer"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Properties grid */}
        <motion.div
          key={activeCategory} // Add key to force re-render on category change
          className="gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Use animate instead of whileInView for immediate trigger
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
