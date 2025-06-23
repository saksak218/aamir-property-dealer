"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Building,
  Info,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import logo from "../../../public/images/logo/logo-1.png";
import Banner from "./Banner";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import ContactModal from "../common/ContactModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 10) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = () => {
    setIsModal(false);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="mr-1 w-4 h-4" /> },
    {
      name: "Properties",
      href: "#properties",
      icon: <Building className="mr-1 w-4 h-4" />,
    },
    { name: "About", href: "#about", icon: <Info className="mr-1 w-4 h-4" /> },
    {
      name: "Blog",
      href: "/blog",
      icon: <Calendar className="mr-1 w-4 h-4" />,
    },
    // {
    //   name: "Contact",
    //   href: "#contact",
    //   icon: <Phone className="mr-1 w-4 h-4" />,
    // },
  ];

  return (
    <header
      className={cn(
        " fixed top-0 right-0 left-0 z-30 transition-all duration-300",
        // isScrolled
        // ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-900/90"
        // :
        "bg-transparent   backdrop-blur-2xl"
      )}
    >
      <Banner />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-12">
                {<Image className="rounded-md" src={logo} alt="Logo" />}
              </div>
              {/* <Building className="w-8 h-8 text-primary" />
              <span className="ml-2 font-bold text-foreground text-xl tracking-tight">
                Aamir Property Dealer
              </span> */}
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center font-medium hover:text-foreground text-sm transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <SignedOut>
              <SignInButton>
                <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md text-white transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-white transition-colors cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-secondary/80 p-2 rounded-full text-gray-600 text-secondary-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex">
            <button
              onClick={toggleMenu}
              className="hover:bg-secondary p-2 rounded-md text-foreground transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="space-y-1 mx-auto px-4 pt-2 pb-3 container">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center hover:bg-secondary px-3 py-2 rounded-md font-medium text-base transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                setIsModal(!isModal);
              }}
              className="flex items-center hover:bg-secondary p-2 px-3 py-2 rounded-md w-full font-medium text-base transition-colors"
            >
              <Calendar className="mr-2 w-4 h-4" />
              Get in touch
            </button>

            <div className="">
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setIsOpen(false);
                }}
                className="flex items-center hover:bg-secondary p-2 px-3 py-2 rounded-md w-full font-medium text-base transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 w-4 h-4" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 w-4 h-4" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {isModal && <ContactModal modalRef={modalRef} onClick={handleClick} />}
    </header>
  );
};

export default Header;
