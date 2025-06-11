"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input"; // Adjust path as needed
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Enhanced validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+\d{1,15}$/,
      "Please enter a valid phone number in international format (e.g., +12025550123)"
    )
    .max(16, "Phone number must not exceed 16 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: FormData) {
    console.log("Form submitted:", values);
    alert("Form submitted successfully!");
  }

  return (
    <div className="bg-white mx-auto rounded-lg max-w-2xl">
      <div className="mb-8">
        <p className="text-gray-500">
          Provide your contact details for a callback
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 text-sm">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 text-sm">
                    Last Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 text-sm">
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="border-gray-300 focus:border-blue-500 rounded-md focus:ring-blue-500 h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700 text-sm">
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      placeholder="Enter phone number"
                      defaultCountry="US"
                      international
                      withCountryCallingCode
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-md w-full md:w-auto font-medium text-white transition-colors duration-200 cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
