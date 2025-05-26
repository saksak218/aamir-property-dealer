"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";
import Image from "next/image";

import slide1 from "../../../public/images/slider/1.jpeg";
import slide2 from "../../../public/images/slider/2.jpeg";
import slide3 from "../../../public/images/slider/3.jpeg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slide1,
      // image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      title: "Find Your Dream Home",
      subtitle: "Discover premium properties in prime locations",
    },
    {
      image: slide2,
      // "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      title: "Luxury Living Spaces",
      subtitle: "Experience comfort and elegance in every corner",
    },
    {
      image: slide3,
      // image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
      title: "Premium Real Estate",
      subtitle: "Invest in properties with exceptional value",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              className="object-cover"
              fill
              src={slide.image}
              alt="Slide image"
            />

            {/* <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            > */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* </div> */}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-20">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-opacity duration-500 ease-in-out"
            style={{
              opacity: 1,
              animation: `fadeInUp 0.8s ease-out`,
            }}
          >
            {slides[currentSlide].title}
          </h1>
          <p
            className="text-xl sm:text-2xl mb-8 transition-opacity duration-500 ease-in-out delay-200"
            style={{
              opacity: 1,
              animation: `fadeInUp 0.8s 0.2s ease-out both`,
            }}
          >
            {slides[currentSlide].subtitle}
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 mb-12 transition-opacity duration-500 ease-in-out delay-400"
            style={{
              opacity: 1,
              animation: `fadeInUp 0.8s 0.4s ease-out both`,
            }}
          >
            <Button variant="gold" size="xl">
              Explore Properties
            </Button>
            <Button variant="gold-outline" size="xl">
              Contact an Agent <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className="w-full max-w-4xl px-4 sm:px-0 transition-opacity duration-500 ease-in-out delay-600"
          style={{
            opacity: 1,
            animation: `fadeInUp 0.8s 0.6s ease-out both`,
          }}
        >
          {/* <PropertySearchBar /> */}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-amber-500"
                : "w-2 bg-white/60 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
