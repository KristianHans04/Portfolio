import type { APIRoute } from "astro";

import { getPressEntries, getProjects, getWritingEntries } from "@/lib/content/loaders";
import { seoData } from "@/lib/site-data";

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
}

const STATIC_ROUTES: SitemapEntry[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/about", priority: "0.9", changefreq: "monthly" },
  { loc: "/work", priority: "0.9", changefreq: "weekly" },
  { loc: "/impact", priority: "0.8", changefreq: "monthly" },
  { loc: "/press", priority: "0.8", changefreq: "monthly" },
  { loc: "/life", priority: "0.6", changefreq: "monthly" },
  { loc: "/now", priority: "0.7", changefreq: "weekly" },
  { loc: "/contact", priority: "0.7", changefreq: "yearly" },
];

function resolveSiteUrl(): string {
  if (!seoData.siteUrl.startsWith("TODO:")) {
    return seoData.siteUrl;
  }
  return "https://kristianhans.com";
}

export const GET: APIRoute = () => {
  const siteUrl = resolveSiteUrl();
  const now = new Date().toISOString();

  const dynamicRoutes: SitemapEntry[] = [
    ...getProjects().map((item) => ({
      loc: `/work/${item.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...getPressEntries().map((item) => ({
      loc: `/press/${item.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
    ...getWritingEntries().map((item) => ({
      loc: `/writing/${item.slug}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
  ];

  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${new URL(route.loc, siteUrl).toString()}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
