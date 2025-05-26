"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

import image1 from "../../../public/images/team/1.jpeg";
import image2 from "../../../public/images/team/2.jpeg";
import image3 from "../../../public/images/team/3.jpeg";
import image4 from "../../../public/images/team/4.jpeg";

const teamMembers = [
  {
    id: 1,
    name: "Aamir Khan",
    role: "CEO & Founder",
    image: image1,
    // image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    description:
      "With over 15 years in real estate, Aamir has built a reputation for integrity and excellence in property dealing.",
    contact: {
      email: "aamir@aamirproperty.com",
      phone: "+92 300 1234567",
    },
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "Sales Director",
    image: image2,
    // image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    description:
      "Sara specializes in luxury properties and has a keen eye for matching clients with their perfect homes.",
    contact: {
      email: "sara@aamirproperty.com",
      phone: "+92 300 7654321",
    },
  },
  {
    id: 3,
    name: "Omar Ali",
    role: "Property Consultant",
    image: image3,
    // image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    description:
      "Omar has extensive knowledge of commercial properties and helps businesses find ideal locations.",
    contact: {
      email: "omar@aamirproperty.com",
      phone: "+92 300 9876543",
    },
  },
  {
    id: 4,
    name: "Aisha Malik",
    role: "Marketing Manager",
    image: image4,
    // image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    description:
      "Aisha creates compelling marketing strategies to showcase properties and attract potential buyers.",
    contact: {
      email: "aisha@aamirproperty.com",
      phone: "+92 300 3456789",
    },
  },
];

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="relative inline-block">
              Meet Our Team
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-500 rounded"></span>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our experienced professionals are dedicated to helping you achieve
            your real estate goals with personalized service and expert
            guidance.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-amber-600 dark:text-amber-400 mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{member.contact.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{member.contact.phone}</span>
                  </div>
                </div>

                <div className="flex mt-4 space-x-3 pt-4 border-t border-border">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s Facebook`}
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
