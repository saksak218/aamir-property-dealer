"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { cn } from "@/lib/utils";
import Image from "next/image";

import slide1 from "../../../public/images/slider/1.jpeg";
import slide2 from "../../../public/images/slider/2.jpeg";
import slide3 from "../../../public/images/slider/3.jpeg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      image: slide1,
      title: "Find Your Dream Home",
      subtitle: "Discover premium properties in prime locations",
    },
    {
      image: slide2,
      title: "Luxury Living Spaces",
      subtitle: "Experience comfort and elegance in every corner",
    },
    {
      image: slide3,
      title: "Premium Real Estate",
      subtitle: "Invest in properties with exceptional value",
    },
  ];

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Helper to scroll to section without hash in URL
  const handleSectionNav = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      window.sessionStorage.setItem("scrollToSection", sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 h-full text-white text-center">
        <div className="mx-auto pt-20 max-w-4xl">
          <h1
            className="mb-6 font-bold text-4xl sm:text-5xl md:text-6xl transition-opacity duration-500 ease-in-out"
            style={{
              opacity: 1,
              animation: `fadeInUp 0.8s ease-out`,
            }}
          >
            {slides[currentSlide].title}
          </h1>
          <p
            className="mb-8 text-xl sm:text-2xl transition-opacity duration-500 ease-in-out delay-200"
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
            <Button
              onClick={handleSectionNav("properties")}
              className="cursor-pointer"
              variant="gold"
              size="xl"
            >
              Explore Properties
            </Button>
            {/* <div className="bg-red-900/40 hover:bg-white/20 rounded-lg transition-colors"> */}
            <Button
              className="relative text-shadow-amber-300 text-shadow-xs text-amber-500 cursor-pointer"
              variant="gold-outline"
              size="xl"
            >
              <Link href="https://wa.me/923005019850" target="_blank">
                <span className="absolute inset-0"></span>
              </Link>
              Contact Agent <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            {/* </div> */}
          </div>
        </div>

        <div
          className="px-4 sm:px-0 w-full max-w-4xl transition-opacity duration-500 ease-in-out delay-600"
          style={{
            opacity: 1,
            animation: `fadeInUp 0.8s 0.6s ease-out both`,
          }}
        >
          {/* <PropertySearchBar /> */}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="bottom-6 left-1/2 absolute flex space-x-2 -translate-x-1/2 transform">
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
