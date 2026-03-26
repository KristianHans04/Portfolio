import type { APIRoute } from "astro";

import { getPressEntries, getProjects, getWritingEntries } from "@/lib/content/loaders";
import { seoData } from "@/lib/site-data";

const STATIC_ROUTES = [
  "/",
  "/work",
  "/about",
  "/impact",
  "/press",
  "/life",
  "/now",
  "/contact",
];

function resolveSiteUrl(): string {
  if (!seoData.siteUrl.startsWith("TODO:")) {
    return seoData.siteUrl;
  }
  return "https://example.com";
}

export const GET: APIRoute = () => {
  const siteUrl = resolveSiteUrl();
  const now = new Date().toISOString();

  const dynamicRoutes = [
    ...getProjects().map((item) => `/work/${item.slug}`),
    ...getPressEntries().map((item) => `/press/${item.slug}`),
    ...getWritingEntries().map((item) => `/writing/${item.slug}`),
  ];

  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${new URL(route, siteUrl).toString()}</loc>
    <lastmod>${now}</lastmod>
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
