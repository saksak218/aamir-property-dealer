"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, Home, Award, Building } from "lucide-react";

interface StatsItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const StatsItem = ({
  icon,
  value,
  label,
  color,
  prefix = "",
  suffix = "",
  duration = 2500,
}: StatsItemProps) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = Math.min(value, 9999);
    const incrementTime = Math.max(duration / end, 5);
    
    const counter = setInterval(() => {
      const nextCount = Math.ceil(start + (end - start) * 0.1);
      setCount(Math.min(nextCount, end));
      
      if (nextCount === end) {
        clearInterval(counter);
      }
      start = nextCount;
    }, incrementTime);

    return () => clearInterval(counter);
  }, [value, duration, inView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setInView(true)}
      className="flex flex-col items-center"
    >
      <div className={cn("p-4 rounded-full mb-4", color)}>
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2">
        {prefix}
        {inView ? count : 0}
        {suffix}
      </h3>
      <p className="text-muted-foreground text-center">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatsItem
            icon={<Users className="h-8 w-8" />}
            value={5000}
            label="Happy Clients"
            color="bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
            suffix="+"
          />
          <StatsItem
            icon={<Home className="h-8 w-8" />}
            value={1500}
            label="Properties Sold"
            color="bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
            suffix="+"
          />
          <StatsItem
            icon={<Award className="h-8 w-8" />}
            value={15}
            label="Years Experience"
            color="bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400"
            suffix="+"
          />
          <StatsItem
            icon={<Building className="h-8 w-8" />}
            value={300}
            label="Active Listings"
            color="bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400"
            suffix="+"
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;