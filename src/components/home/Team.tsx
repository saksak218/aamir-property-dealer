"use client";

import Image from "next/image";
import { motion } from "motion/react";
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
    name: "Ahmed Raza",
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            <span className="inline-block relative">
              Meet Our Team
              <span className="-bottom-2 left-1/2 absolute bg-amber-500 rounded w-12 h-1 -translate-x-1/2 transform"></span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our experienced professionals are dedicated to helping you achieve
            your real estate goals with personalized service and expert
            guidance.
          </p>
        </div>

        <motion.div
          className="gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
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
              className="bg-card shadow-md hover:shadow-xl border border-border rounded-lg overflow-hidden transition-shadow"
            >
              <div className="relative w-full h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-center object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="mb-3 text-amber-600 dark:text-amber-400">
                  {member.role}
                </p>
                <p className="mb-4 text-muted-foreground text-sm">
                  {member.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 w-4 h-4 text-muted-foreground" />
                    <span>{member.contact.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 w-4 h-4 text-muted-foreground" />
                    <span>{member.contact.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 pt-4 border-t border-border">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s Facebook`}
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
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
