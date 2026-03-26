import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const linkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().int().default(1000),
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()).default([]),
    client: z.string().nullable().default(null),
    period: z.string().nullable().default(null),
    overview: z.string().nullable().default(null),
    problem: z.string().nullable().default(null),
    role: z.array(z.string()).default([]),
    architecture: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().nullable().default(null),
        }),
      )
      .default([]),
    results: z
      .array(
        z.object({
          title: z.string(),
          detail: z.string(),
        }),
      )
      .default([]),
    lessonsLearned: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
  }),
});

const press = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/press" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    order: z.number().int().default(1000),
    title: z.string(),
    summary: z.string(),
    type: z.enum(["article", "media", "interview", "podcast", "speaking"]),
    publication: z.string().nullable().default(null),
    date: z.string().nullable().default(null),
    event: z.string().nullable().default(null),
    details: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/writing" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    order: z.number().int().default(1000),
    title: z.string(),
    summary: z.string(),
    format: z.enum(["article", "essay", "newsletter", "talk-notes"]),
    publishedAt: z.string().nullable().default(null),
    readTimeMinutes: z.number().int().positive().nullable().default(null),
    topics: z.array(z.string()).default([]),
    outlet: z.string().nullable().default(null),
    sections: z
      .array(
        z.object({
          heading: z.string().nullable().default(null),
          body: z.string(),
        }),
      )
      .default([]),
    links: z.array(linkSchema).default([]),
  }),
});

const mentorship = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/mentorship" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    order: z.number().int().default(1000),
    area: z.enum(["mentorship", "leadership", "volunteering", "awards", "community", "speaking"]),
    title: z.string(),
    organization: z.string().nullable().default(null),
    year: z.string().nullable().default(null),
    summary: z.string(),
    details: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
  }),
});

const travel = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/travel" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    country: z.string(),
    city: z.string().nullable().default(null),
    year: z.string().nullable().default(null),
    notes: z.string().nullable().default(null),
    highlights: z.array(z.string()).default([]),
    photos: z.array(z.string()).default([]),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/books" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    title: z.string(),
    author: z.string().nullable().default(null),
    status: z.enum(["read", "reading", "wishlist"]),
    yearFinished: z.string().nullable().default(null),
    notes: z.string().nullable().default(null),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/photos" }),
  schema: z.object({
    slug: z.string(),
    published: z.boolean().default(false),
    src: z.string(),
    alt: z.string(),
    caption: z.string().nullable().default(null),
    category: z.enum(["about", "life", "travel", "hobby"]),
    takenOn: z.string().nullable().default(null),
    location: z.string().nullable().default(null),
  }),
});

export const collections = {
  projects,
  press,
  writing,
  mentorship,
  travel,
  books,
  photos,
};
