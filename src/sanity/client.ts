import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "pfij2x8i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
