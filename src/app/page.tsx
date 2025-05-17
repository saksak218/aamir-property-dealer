import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Team from "@/components/home/Team";
import Stats from "@/components/home/Stats";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Services />
      <Stats />
      <Testimonials />
      <Team />
      <Contact />
    </>
  );
}
