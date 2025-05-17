"use client";

import { useState } from "react";
import { Search, MapPin, Home, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button-custom";

const propertyTypes = ["Any Type", "House", "Apartment", "Villa", "Plot", "Commercial"];
const priceRanges = [
  "Any Price",
  "Under 50 Lac",
  "50 Lac - 1 Cr",
  "1 Cr - 2 Cr",
  "2 Cr - 5 Cr",
  "Above 5 Cr",
];
const locations = [
  "Any Location",
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Faisalabad",
];

const PropertySearchBar = () => {
  const [location, setLocation] = useState("Any Location");
  const [propertyType, setPropertyType] = useState("Any Type");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log({ location, propertyType, priceRange });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 rounded-md border-0 bg-muted/40 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary sm:text-sm"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 min-w-0 mt-3 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Home className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 rounded-md border-0 bg-muted/40 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary sm:text-sm"
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 min-w-0 mt-3 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 rounded-md border-0 bg-muted/40 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary sm:text-sm"
            >
              {priceRanges.map((price) => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <Button
            onClick={handleSearch}
            variant="gold"
            size="lg"
            className="w-full md:w-auto flex items-center justify-center"
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>

      {/* Advanced search options (mobile) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-sm text-primary flex items-center md:hidden"
      >
        {isExpanded ? "Less options" : "More options"}
      </button>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">
          {/* Add more search options here */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              defaultValue="Any Bedrooms"
              className="block w-full pl-10 pr-3 py-2.5 rounded-md border-0 bg-muted/40 text-foreground ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary sm:text-sm"
            >
              <option>Any Bedrooms</option>
              <option>1+ Bedrooms</option>
              <option>2+ Bedrooms</option>
              <option>3+ Bedrooms</option>
              <option>4+ Bedrooms</option>
              <option>5+ Bedrooms</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearchBar;