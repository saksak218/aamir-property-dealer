import Contact from "@/components/home/Contact";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";

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
