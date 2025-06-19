import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField } from "sanity";

export const propertyType = {
  name: "property",
  title: "Property",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "bed",
      title: "Bed",
      type: "number",
    }),
    defineField({
      name: "bath",
      title: "Bath",
      type: "number",
    }),
    defineField({
      name: "size",
      title: "Size (sq ft)",
      type: "number",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "propertyCategory" },
        }),
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
  ],
};
