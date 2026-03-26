import { z } from "zod";

import {
  bookEntrySchema,
  impactEntrySchema,
  photoEntrySchema,
  pressEntrySchema,
  projectSchema,
  travelEntrySchema,
  writingEntrySchema,
  type BookEntry,
  type ImpactEntry,
  type PhotoEntry,
  type PressEntry,
  type Project,
  type TravelEntry,
  type WritingEntry,
} from "./schemas";

type JsonModuleMap = Record<string, { default: unknown }>;

const byOrderThenTitle = <T extends { order?: number; title?: string }>(a: T, b: T) => {
  const orderA = a.order ?? 1000;
  const orderB = b.order ?? 1000;
  if (orderA !== orderB) {
    return orderA - orderB;
  }
  return (a.title ?? "").localeCompare(b.title ?? "");
};

const byTitle = <T extends { title?: string; country?: string; slug?: string }>(a: T, b: T) => {
  return (a.title ?? a.country ?? a.slug ?? "").localeCompare(b.title ?? b.country ?? b.slug ?? "");
};

function loadCollection<T>(
  modules: JsonModuleMap,
  schema: z.ZodType<T>,
  collectionName: string,
): T[] {
  return Object.entries(modules).map(([path, mod]) => {
    const parsed = schema.safeParse(mod.default);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(`Invalid ${collectionName} file "${path}". ${issues}`);
    }
    return parsed.data;
  });
}

const rawProjects = import.meta.glob("../../content/projects/*.json", { eager: true }) as JsonModuleMap;
const rawPress = import.meta.glob("../../content/press/*.json", { eager: true }) as JsonModuleMap;
const rawWriting = import.meta.glob("../../content/writing/*.json", { eager: true }) as JsonModuleMap;
const rawImpact = import.meta.glob("../../content/mentorship/*.json", { eager: true }) as JsonModuleMap;
const rawTravel = import.meta.glob("../../content/travel/*.json", { eager: true }) as JsonModuleMap;
const rawBooks = import.meta.glob("../../content/books/*.json", { eager: true }) as JsonModuleMap;
const rawPhotos = import.meta.glob("../../content/photos/*.json", { eager: true }) as JsonModuleMap;

const projects = loadCollection(rawProjects, projectSchema, "project").sort(byOrderThenTitle);
const pressEntries = loadCollection(rawPress, pressEntrySchema, "press").sort(byOrderThenTitle);
const writingEntries = loadCollection(rawWriting, writingEntrySchema, "writing").sort(byOrderThenTitle);
const impactEntries = loadCollection(rawImpact, impactEntrySchema, "impact").sort(byOrderThenTitle);
const travelEntries = loadCollection(rawTravel, travelEntrySchema, "travel").sort(byTitle);
const bookEntries = loadCollection(rawBooks, bookEntrySchema, "book").sort(byTitle);
const photoEntries = loadCollection(rawPhotos, photoEntrySchema, "photo").sort(byTitle);

export function getProjects(options: { includeDrafts?: boolean } = {}): Project[] {
  if (options.includeDrafts) {
    return [...projects];
  }
  return projects.filter((item) => item.published);
}

export function getPressEntries(options: { includeDrafts?: boolean } = {}): PressEntry[] {
  if (options.includeDrafts) {
    return [...pressEntries];
  }
  return pressEntries.filter((item) => item.published);
}

export function getWritingEntries(options: { includeDrafts?: boolean } = {}): WritingEntry[] {
  if (options.includeDrafts) {
    return [...writingEntries];
  }
  return writingEntries.filter((item) => item.published);
}

export function getImpactEntries(options: { includeDrafts?: boolean } = {}): ImpactEntry[] {
  if (options.includeDrafts) {
    return [...impactEntries];
  }
  return impactEntries.filter((item) => item.published);
}

export function getTravelEntries(options: { includeDrafts?: boolean } = {}): TravelEntry[] {
  if (options.includeDrafts) {
    return [...travelEntries];
  }
  return travelEntries.filter((item) => item.published);
}

export function getBookEntries(options: { includeDrafts?: boolean } = {}): BookEntry[] {
  if (options.includeDrafts) {
    return [...bookEntries];
  }
  return bookEntries.filter((item) => item.published);
}

export function getPhotoEntries(options: { includeDrafts?: boolean } = {}): PhotoEntry[] {
  if (options.includeDrafts) {
    return [...photoEntries];
  }
  return photoEntries.filter((item) => item.published);
}
