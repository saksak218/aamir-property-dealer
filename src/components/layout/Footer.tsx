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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 py-12 text-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6" />
              <span className="ml-2 font-bold text-lg">
                Aamir Property Dealer
              </span>
            </div>
            <p className="mb-4 max-w-xs text-slate-400">
              Helping you find your dream property for over 45 years. Trusted by
              thousands of satisfied customers.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#properties"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Residential
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Plots & Land
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex items-center h-[1lh]]">
                  <MapPin className="mt-0.5 mr-2 w-4 h-4 text-slate-400" />
                </span>
                <span className="text-slate-400">
                  Ghouse al Azam road, near High court, Multan, Pakistan
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center h-[1lh]]">
                  <MapPin className="mt-0.5 mr-2 w-4 h-4 text-slate-400" />
                </span>
                <span className="text-slate-400">
                  Sh. no. 20, ground floor, boulevard mall, pearl city society,
                  askari bypass road, Multan, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 w-5 h-5 text-slate-400" />
                <span className="text-slate-400">+92 300 5019850</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 w-5 h-5 text-slate-400" />
                <span className="text-slate-400">info@aamirproperty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-slate-800 border-t text-slate-400 text-sm text-center">
          <p>
            &copy; {currentYear} Aamir Property Dealer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
