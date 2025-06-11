// "use client";

// import { useState } from "react";
// import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
// import { Button } from "@/components/ui/button-custom";
// import { motion } from "motion/react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//     // Reset form
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//     });
//     // Show success message (in a real app you would manage this state)
//     alert("Your message has been sent. We'll get back to you soon!");
//   };

//   return (
//     <section className="fixed inset-0 min-h-screen">
//       <div className="backdrop-blur-sm min-h-screen">
//         <div>Hello</div>
//       </div>
//     </section>

//     // <section
//     //   id="contact"
//     //   className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24"
//     // >
//     //   <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
//     //     <div className="mb-12 text-center">
//     //       <h2 className="mb-4 font-bold text-3xl md:text-4xl">
//     //         <span className="inline-block relative">
//     //           Contact Us
//     //           <span className="-bottom-2 left-1/2 absolute bg-amber-500 rounded w-12 h-1 -translate-x-1/2 transform"></span>
//     //         </span>
//     //       </h2>
//     //       <p className="mx-auto max-w-2xl text-muted-foreground">
//     //         Have questions or need assistance? Our team is here to help. Reach
//     //         out to us through any of the following channels.
//     //       </p>
//     //     </div>

//     //     <div className="gap-8 md:gap-12 grid grid-cols-1 lg:grid-cols-2">
//     //       <motion.div
//     //         initial={{ opacity: 0, x: -20 }}
//     //         whileInView={{ opacity: 1, x: 0 }}
//     //         transition={{ duration: 0.5 }}
//     //         viewport={{ once: true }}
//     //       >
//     //         <div className="bg-card shadow-md p-6 md:p-8 border border-border rounded-lg h-full">
//     //           <h3 className="mb-6 font-semibold text-2xl">Get in Touch</h3>

//     //           <div className="space-y-6">
//     //             <div className="flex items-start">
//     //               <div className="bg-amber-100 dark:bg-amber-900/30 mr-4 p-3 rounded-full text-amber-600 dark:text-amber-400">
//     //                 <MapPin className="w-6 h-6" />
//     //               </div>
//     //               <div>
//     //                 <h4 className="mb-1 font-semibold">Our Location</h4>
//     //                 <p className="text-muted-foreground">
//     //                   123 Property Lane, Luxury Heights, Islamabad, Pakistan
//     //                 </p>
//     //               </div>
//     //             </div>

//     //             <div className="flex items-start">
//     //               <div className="bg-amber-100 dark:bg-amber-900/30 mr-4 p-3 rounded-full text-amber-600 dark:text-amber-400">
//     //                 <Phone className="w-6 h-6" />
//     //               </div>
//     //               <div>
//     //                 <h4 className="mb-1 font-semibold">Phone Number</h4>
//     //                 <p className="text-muted-foreground">+92 300 1234567</p>
//     //                 <p className="text-muted-foreground">+92 51 2345678</p>
//     //               </div>
//     //             </div>

//     //             <div className="flex items-start">
//     //               <div className="bg-amber-100 dark:bg-amber-900/30 mr-4 p-3 rounded-full text-amber-600 dark:text-amber-400">
//     //                 <Mail className="w-6 h-6" />
//     //               </div>
//     //               <div>
//     //                 <h4 className="mb-1 font-semibold">Email Address</h4>
//     //                 <p className="text-muted-foreground">
//     //                   info@aamirproperty.com
//     //                 </p>
//     //                 <p className="text-muted-foreground">
//     //                   sales@aamirproperty.com
//     //                 </p>
//     //               </div>
//     //             </div>

//     //             <div className="flex items-start">
//     //               <div className="bg-amber-100 dark:bg-amber-900/30 mr-4 p-3 rounded-full text-amber-600 dark:text-amber-400">
//     //                 <Clock className="w-6 h-6" />
//     //               </div>
//     //               <div>
//     //                 <h4 className="mb-1 font-semibold">Working Hours</h4>
//     //                 <p className="text-muted-foreground">
//     //                   Monday-Friday: 9:00 AM - 6:00 PM
//     //                 </p>
//     //                 <p className="text-muted-foreground">
//     //                   Saturday: 10:00 AM - 4:00 PM
//     //                 </p>
//     //                 <p className="text-muted-foreground">Sunday: Closed</p>
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <div className="mt-8">
//     //             <iframe
//     //               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212645.31508594748!2d72.93088185335023!3d33.61610338915445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1683298054709!5m2!1sen!2s"
//     //               width="100%"
//     //               height="250"
//     //               style={{ border: 0 }}
//     //               allowFullScreen
//     //               loading="lazy"
//     //               referrerPolicy="no-referrer-when-downgrade"
//     //               title="Google Maps"
//     //               className="rounded-lg"
//     //             ></iframe>
//     //           </div>
//     //         </div>
//     //       </motion.div>

//     //       <motion.div
//     //         initial={{ opacity: 0, x: 20 }}
//     //         whileInView={{ opacity: 1, x: 0 }}
//     //         transition={{ duration: 0.5 }}
//     //         viewport={{ once: true }}
//     //       >
//     //         <div className="bg-card shadow-md p-6 md:p-8 border border-border rounded-lg">
//     //           <h3 className="mb-6 font-semibold text-2xl">Send us a Message</h3>

//     //           <form onSubmit={handleSubmit} className="space-y-4">
//     //             <div>
//     //               <label
//     //                 htmlFor="name"
//     //                 className="block mb-1 font-medium text-sm"
//     //               >
//     //                 Full Name <span className="text-red-500">*</span>
//     //               </label>
//     //               <input
//     //                 type="text"
//     //                 id="name"
//     //                 name="name"
//     //                 value={formData.name}
//     //                 onChange={handleChange}
//     //                 className="bg-background px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
//     //                 required
//     //               />
//     //             </div>

//     //             <div>
//     //               <label
//     //                 htmlFor="email"
//     //                 className="block mb-1 font-medium text-sm"
//     //               >
//     //                 Email Address <span className="text-red-500">*</span>
//     //               </label>
//     //               <input
//     //                 type="email"
//     //                 id="email"
//     //                 name="email"
//     //                 value={formData.email}
//     //                 onChange={handleChange}
//     //                 className="bg-background px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
//     //                 required
//     //               />
//     //             </div>

//     //             <div>
//     //               <label
//     //                 htmlFor="phone"
//     //                 className="block mb-1 font-medium text-sm"
//     //               >
//     //                 Phone Number
//     //               </label>
//     //               <input
//     //                 type="tel"
//     //                 id="phone"
//     //                 name="phone"
//     //                 value={formData.phone}
//     //                 onChange={handleChange}
//     //                 className="bg-background px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
//     //               />
//     //             </div>

//     //             <div>
//     //               <label
//     //                 htmlFor="message"
//     //                 className="block mb-1 font-medium text-sm"
//     //               >
//     //                 Your Message <span className="text-red-500">*</span>
//     //               </label>
//     //               <textarea
//     //                 id="message"
//     //                 name="message"
//     //                 value={formData.message}
//     //                 onChange={handleChange}
//     //                 rows={5}
//     //                 className="bg-background px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
//     //                 required
//     //               ></textarea>
//     //             </div>

//     //             <Button
//     //               type="submit"
//     //               variant="gold"
//     //               size="lg"
//     //               className="w-full"
//     //             >
//     //               <Send className="mr-2 w-4 h-4" /> Send Message
//     //             </Button>
//     //           </form>

//     //           <p className="mt-4 text-muted-foreground text-sm">
//     //             By submitting this form, you agree to our privacy policy and
//     //             terms of service.
//     //           </p>
//     //         </div>
//     //       </motion.div>
//     //     </div>
//     //   </div>
//     // </section>
//   );
// };

// export default Contact;
