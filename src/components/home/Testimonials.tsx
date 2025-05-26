"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

import image1 from "../../../public/images/testimonials/1.jpeg";
import image2 from "../../../public/images/testimonials/2.jpeg";
import image3 from "../../../public/images/testimonials/3.jpeg";
import image4 from "../../../public/images/testimonials/4.jpeg";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Property Buyer",
    image: image1,
    // image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    text: "Aamir Property Dealer helped me find my dream home in the exact location I wanted. Their attention to detail and understanding of my needs made the process incredibly smooth. I couldn't be happier with my new home!",
  },
  {
    id: 2,
    name: "Fatima Ali",
    role: "Property Seller",
    image: image2,
    // image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    text: "I was amazed at how quickly they sold my property and at a price higher than I expected. Their market knowledge and negotiation skills are truly exceptional. I would definitely recommend their services.",
  },
  {
    id: 3,
    name: "Saad Ahmed",
    role: "Commercial Investor",
    image: image3,
    // image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    text: "As a commercial property investor, I needed an agent who understood the market. Aamir Property Dealer not only found me profitable investments but also provided valuable advice on market trends and potential growth areas.",
  },
  {
    id: 4,
    name: "Zainab Khan",
    role: "First-time Buyer",
    image: image4,
    // image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    text: "Being a first-time buyer, I was nervous about the process. The team at Aamir Property Dealer guided me through every step, making it stress-free. Their patience and expertise were invaluable to me.",
  },
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-amber-50 dark:bg-amber-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="relative inline-block">
              Client Testimonials
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-500 rounded"></span>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working
            with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:-left-10 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg p-6 md:p-10">
            <div className="absolute top-6 right-8 text-amber-500 opacity-20">
              <Quote className="h-24 w-24" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="md:flex items-center"
              >
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-amber-100 dark:border-amber-900">
                    <Image
                      quality={80}
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 md:pl-8">
                  <blockquote className="text-lg md:text-xl italic text-slate-700 dark:text-slate-200 mb-4">
                    &quot;{testimonials[activeTestimonial].text}&quot;
                  </blockquote>

                  <div>
                    <div className="font-bold text-xl">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-amber-600 dark:text-amber-400">
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-0 md:-right-10 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setActiveTestimonial(index);
              }}
              className={cn(
                "h-2 w-2 rounded-full mx-1 transition-all duration-300",
                index === activeTestimonial
                  ? "bg-amber-500 w-6"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
