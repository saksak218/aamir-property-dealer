"use client";

import Link from "next/link";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
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

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 py-10 sm:py-16 text-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="gap-8 sm:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Building className="w-8 h-8 text-amber-500" />
              <span
                className={`${playfair.className} ml-3 font-bold text-xl sm:text-2xl text-white`}
              >
                Aamir Property Dealer
              </span>
            </div>
            <p className="mb-6 max-w-xs text-slate-300 text-sm sm:text-base leading-relaxed">
              Helping you find your dream property for over 45 years. Trusted by
              thousands of satisfied customers.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-slate-300 hover:text-amber-500 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 sm:w-6 h-5 sm:h-6" />
              </Link>
              <Link
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-slate-300 hover:text-amber-500 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 sm:w-6 h-5 sm:h-6" />
              </Link>
              <Link
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-slate-300 hover:text-amber-500 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 sm:w-6 h-5 sm:h-6" />
              </Link>
            </div>
          </div>
          <div className="animate-fade-in">
            <h3
              className={`${playfair.className} mb-4 font-semibold text-lg sm:text-xl text-white`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="properties"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                  onClick={handleSectionNav("properties")}
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="services"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                  onClick={handleSectionNav("services")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="about"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                  onClick={handleSectionNav("about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in">
            <h3
              className={`${playfair.className} mb-4 font-semibold text-lg sm:text-xl text-white`}
            >
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
              <li className="flex items-center">
                <span className="mr-2 text-amber-500">✔️</span> Trusted Real
                Estate Agency
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-amber-500">✔️</span> 45+ Years of
                Experience
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-amber-500">✔️</span> Personalized
                Service
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-amber-500">✔️</span> Verified
                Property Listings
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-amber-500">✔️</span> Excellent
                Customer Support
              </li>
            </ul>
          </div>
          <div className="animate-fade-in">
            <h3
              className={`${playfair.className} mb-4 font-semibold text-lg sm:text-xl text-white`}
            >
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-amber-500" />
                <span className="text-slate-300">
                  Ghouse al Azam road, near High court, Multan, Pakistan
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-amber-500" />
                <span className="text-slate-300">
                  Sh. no. 20, ground floor, boulevard mall, pearl city society,
                  askari bypass road, Multan, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 mr-3 w-5 h-5 text-amber-500" />
                <a
                  href="tel:+923005019850"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                >
                  +92 300 5019850
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 mr-3 w-5 h-5 text-amber-500" />
                <a
                  href="mailto:yasir@aamirpropertydealer.com"
                  className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                >
                  yasir@aamirpropertydealer.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-8 border-slate-800 border-t text-slate-300 text-sm text-center">
          <p className={`${playfair.className}`}>
            © {currentYear} Aamir Property Dealer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
