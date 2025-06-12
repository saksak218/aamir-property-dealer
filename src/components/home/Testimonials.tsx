"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

import image1 from "../../../public/images/testimonials/1.jpg";
import image2 from "../../../public/images/testimonials/2.jpeg";
import image3 from "../../../public/images/testimonials/3.jpeg";
import image4 from "../../../public/images/testimonials/4.jpeg";
import image5 from "../../../public/images/testimonials/5.jpeg";

const testimonials = [
  {
    id: 1,
    name: "Qazalbash",
    role: "Property Buyer",
    image: image1,
    // image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    text: "I recently bought a villa in PC Society, Multan through Aamir Property Dealer and had a smooth, professional experience. Mr. Yasir and his team handled everything with transparency and ease. I highly recommend them for reliable real estate services in Multan.",
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
  {
    id: 5,
    name: "Ahmed Khan",
    role: "Property Buyer",
    image: image5,
    // image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    text: "Aamir Property Dealer helped me find my dream home in the exact location I wanted. Their attention to detail and understanding of my needs made the process incredibly smooth. I couldn't be happier with my new home!",
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
    <section className="bg-amber-50 dark:bg-amber-950/20 py-16 md:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            <span className="inline-block relative">
              Client Testimonials
              <span className="-bottom-2 left-1/2 absolute bg-amber-500 rounded w-12 h-1 -translate-x-1/2 transform"></span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear what our clients have to say about their experience working
            with us.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="top-1/2 left-0 md:-left-10 z-10 absolute -translate-y-1/2 transform">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md p-2 rounded-full text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex items-center bg-white dark:bg-slate-800 shadow-lg p-6 md:p-10 rounded-xl h-80 overflow-hidden">
            <div className="top-6 right-8 absolute opacity-20 text-amber-500">
              <Quote className="w-24 h-24" />
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
                <div className="flex justify-center mb-6 md:mb-0 md:w-1/3">
                  <div className="relative border-4 border-amber-100 dark:border-amber-900 rounded-full w-24 md:w-32 h-24 md:h-32 overflow-hidden">
                    <Image
                      quality={80}
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:pl-8 md:w-2/3">
                  <blockquote className="mb-4 text-slate-700 dark:text-slate-200 text-lg md:text-xl italic">
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

          <div className="top-1/2 right-0 md:-right-10 z-10 absolute -translate-y-1/2 transform">
            <button
              onClick={handleNext}
              className="bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md p-2 rounded-full text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
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
