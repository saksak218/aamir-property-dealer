"use client";

import { motion } from "framer-motion";
import { 
  Home, 
  Building2, 
  Briefcase, 
  ClipboardList, 
  HandshakeIcon, 
  Landmark 
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    title: "Property Sales",
    description: "We help you sell your property at the best possible price with our expert market analysis and negotiation skills.",
    icon: <Home className="h-10 w-10" />,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
  },
  {
    id: 2,
    title: "Property Purchase",
    description: "Find your dream property with our extensive listings and personalized property search assistance.",
    icon: <Building2 className="h-10 w-10" />,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  },
  {
    id: 3,
    title: "Property Management",
    description: "We handle tenant screening, rent collection, maintenance, and other aspects of property management.",
    icon: <Briefcase className="h-10 w-10" />,
    color: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  },
  {
    id: 4,
    title: "Property Valuation",
    description: "Get accurate property valuation reports based on market analysis and property condition assessment.",
    icon: <ClipboardList className="h-10 w-10" />,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
  },
  {
    id: 5,
    title: "Legal Consultation",
    description: "Our legal experts provide guidance on property documentation, transfers, and compliance matters.",
    icon: <Landmark className="h-10 w-10" />,
    color: "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
  },
  {
    id: 6,
    title: "Property Investment",
    description: "We identify lucrative investment opportunities and help you maximize returns on your property investments.",
    icon: <HandshakeIcon className="h-10 w-10" />,
    color: "bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400",
  },
];

const Services = () => {
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
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-500 rounded"></span>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive real estate services to help you buy, sell, or manage properties with ease and confidence.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow p-6 border border-border"
            >
              <div className={cn("rounded-full p-4 inline-flex mb-4", service.color)}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;