import { z } from "zod";

export const contentLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const projectGalleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().nullable().default(null),
});

export const projectResultSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().int().default(1000),
  title: z.string().min(1),
  summary: z.string().min(1),
  categories: z.array(z.string().min(1)).default([]),
  client: z.string().nullable().default(null),
  period: z.string().nullable().default(null),
  overview: z.string().nullable().default(null),
  problem: z.string().nullable().default(null),
  role: z.array(z.string().min(1)).default([]),
  architecture: z.array(z.string().min(1)).default([]),
  stack: z.array(z.string().min(1)).default([]),
  gallery: z.array(projectGalleryImageSchema).default([]),
  results: z.array(projectResultSchema).default([]),
  lessonsLearned: z.array(z.string().min(1)).default([]),
  links: z.array(contentLinkSchema).default([]),
});

export const pressTypeSchema = z.enum([
  "article",
  "media",
  "interview",
  "podcast",
  "speaking",
]);

export const pressEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  order: z.number().int().default(1000),
  title: z.string().min(1),
  summary: z.string().min(1),
  type: pressTypeSchema,
  publication: z.string().nullable().default(null),
  date: z.string().nullable().default(null),
  event: z.string().nullable().default(null),
  image: z.string().nullable().default(null),
  details: z.array(z.string().min(1)).default([]),
  links: z.array(contentLinkSchema).default([]),
});

export const writingFormatSchema = z.enum([
  "article",
  "essay",
  "newsletter",
  "talk-notes",
]);

export const writingSectionSchema = z.object({
  heading: z.string().nullable().default(null),
  body: z.string().min(1),
});

export const writingEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  order: z.number().int().default(1000),
  title: z.string().min(1),
  summary: z.string().min(1),
  format: writingFormatSchema,
  publishedAt: z.string().nullable().default(null),
  readTimeMinutes: z.number().int().positive().nullable().default(null),
  topics: z.array(z.string().min(1)).default([]),
  outlet: z.string().nullable().default(null),
  sections: z.array(writingSectionSchema).default([]),
  links: z.array(contentLinkSchema).default([]),
});

export const impactAreaSchema = z.enum([
  "mentorship",
  "leadership",
  "volunteering",
  "awards",
  "community",
  "speaking",
]);

export const impactEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  order: z.number().int().default(1000),
  area: impactAreaSchema,
  title: z.string().min(1),
  organization: z.string().nullable().default(null),
  year: z.string().nullable().default(null),
  summary: z.string().min(1),
  image: z.string().nullable().default(null),
  details: z.array(z.string().min(1)).default([]),
  links: z.array(contentLinkSchema).default([]),
});

export const travelEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  country: z.string().min(1),
  city: z.string().nullable().default(null),
  year: z.string().nullable().default(null),
  notes: z.string().nullable().default(null),
  highlights: z.array(z.string().min(1)).default([]),
  photos: z.array(z.string().min(1)).default([]),
});

export const bookStatusSchema = z.enum(["read", "reading", "wishlist"]);

export const bookEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  title: z.string().min(1),
  author: z.string().nullable().default(null),
  status: bookStatusSchema,
  yearFinished: z.string().nullable().default(null),
  notes: z.string().nullable().default(null),
});

export const photoCategorySchema = z.enum(["about", "life", "travel", "hobby"]);

export const photoEntrySchema = z.object({
  slug: z.string().min(1),
  published: z.boolean().default(false),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().nullable().default(null),
  category: photoCategorySchema,
  takenOn: z.string().nullable().default(null),
  location: z.string().nullable().default(null),
});

export const timelineItemSchema = z.object({
  title: z.string().min(1),
  organization: z.string().nullable().default(null),
  period: z.string().nullable().default(null),
  summary: z.string().nullable().default(null),
});

export const nowItemSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  linkLabel: z.string().nullable().default(null),
  linkUrl: z.string().url().nullable().default(null),
});

export const endorsementSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  quote: z.string().min(1),
});

export const siteDataSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().nullable().default(null),
  email: z.string().email().nullable().default(null),
  tagline: z.string().min(1),
  positioningStatement: z.string().min(1),
  heroIntro: z.string().min(1),
  shortBio: z.string().min(1),
  longBio: z.string().nullable().default(null),
  credentialHighlights: z.array(z.string().min(1)).default([]),
  currentFocus: z.array(z.string().min(1)).default([]),
  capabilities: z.array(z.string().min(1)).default([]),
  values: z.array(z.string().min(1)).default([]),
  workingStyle: z.array(z.string().min(1)).default([]),
  endorsements: z.array(endorsementSchema).default([]),
  hobbies: z.array(z.string().min(1)).default([]),
  personalHighlights: z.array(z.string().min(1)).default([]),
  contactExpectations: z.array(z.string().min(1)).default([]),
  timeline: z.array(timelineItemSchema).default([]),
  now: z.object({
    summary: z.string().nullable().default(null),
    updatedAt: z.string().nullable().default(null),
    items: z.array(nowItemSchema).default([]),
  }),
});

export const navigationLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const navigationSectionSchema = z.object({
  title: z.string().min(1),
  links: z.array(navigationLinkSchema).default([]),
});

export const navigationDataSchema = z.object({
  main: z.array(navigationLinkSchema).default([]),
  footer: z.array(navigationSectionSchema).default([]),
});

export const seoDataSchema = z.object({
  defaultTitle: z.string().min(1),
  titleTemplate: z.string().min(1),
  defaultDescription: z.string().min(1),
  defaultOgImage: z.string().min(1),
  twitterCard: z.string().min(1),
  siteUrl: z.string().min(1),
});

export const socialItemSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  handle: z.string().nullable().default(null),
});

export const socialsDataSchema = z.object({
  items: z.array(socialItemSchema).default([]),
});

export type Project = z.infer<typeof projectSchema>;
export type PressEntry = z.infer<typeof pressEntrySchema>;
export type WritingEntry = z.infer<typeof writingEntrySchema>;
export type ImpactEntry = z.infer<typeof impactEntrySchema>;
export type TravelEntry = z.infer<typeof travelEntrySchema>;
export type BookEntry = z.infer<typeof bookEntrySchema>;
export type PhotoEntry = z.infer<typeof photoEntrySchema>;
export type SiteData = z.infer<typeof siteDataSchema>;
export type NavigationData = z.infer<typeof navigationDataSchema>;
export type SeoData = z.infer<typeof seoDataSchema>;
export type SocialsData = z.infer<typeof socialsDataSchema>;
