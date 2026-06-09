import { defineCollection, z } from "astro:content";

// ---- Shared fields used by both blog and projects collections ----

const sharedFields = {
  title: z.string(),
  titleEn: z.string().optional(),
  description: z.string(),
  descriptionEn: z.string().optional(),
  date: z.date(),
  updated: z.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  image: z.string().optional(), // relative to public/images/
  lang: z.enum(["zh", "en", "mixed"]).default("zh"),
};

// ---- Blog collection ----

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    ...sharedFields,
    category: z
      .enum(["essay", "tutorial", "reflection", "log"])
      .default("essay"),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

// ---- Projects collection ----

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    ...sharedFields,
    category: z.enum(["web", "ml", "design", "cli", "other"]).default("web"),
    projectUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    techStack: z.array(z.string()).default([]),
    year: z.number().optional(),
    status: z.enum(["done", "wip", "archived"]).default("done"),
  }),
});

// ---- Export ----

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
