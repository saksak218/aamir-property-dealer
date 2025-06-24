import Hero from "@/components/home/Hero";
import PropertiesWrapper from "@/components/home/PropertyWrapper";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import MainLayout from "@/components/layout/MainLayout";

export const metadata = {
  title: "Aamir Property Dealer",
  description: "A leading property dealer in Pakistan and Abroad",
};

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <PropertiesWrapper />
      <Services />
      <Stats />
      <Testimonials />
      <Team />
      {/* <Contact /> */}
    </MainLayout>
  );
}
