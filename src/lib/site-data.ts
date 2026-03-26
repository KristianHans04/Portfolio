import navigationRaw from "@/data/navigation.json";
import seoRaw from "@/data/seo.json";
import siteRaw from "@/data/site.json";
import socialsRaw from "@/data/socials.json";

import {
  navigationDataSchema,
  seoDataSchema,
  siteDataSchema,
  socialsDataSchema,
  type NavigationData,
  type SeoData,
  type SiteData,
  type SocialsData,
} from "@/lib/content/schemas";

export const siteData: SiteData = siteDataSchema.parse(siteRaw);
export const navigationData: NavigationData = navigationDataSchema.parse(navigationRaw);
export const seoData: SeoData = seoDataSchema.parse(seoRaw);
export const socialsData: SocialsData = socialsDataSchema.parse(socialsRaw);
