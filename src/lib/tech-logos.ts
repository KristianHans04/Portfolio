/**
 * Maps technology names to their devicon/simple-icons CDN logo URLs.
 * Uses https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ as primary source.
 */
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const techLogoMap: Record<string, string> = {
  // Languages
  "TypeScript": `${DEVICON_BASE}/typescript/typescript-original.svg`,
  "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "Python": `${DEVICON_BASE}/python/python-original.svg`,
  "Java": `${DEVICON_BASE}/java/java-original.svg`,
  "Rust": `${DEVICON_BASE}/rust/rust-original.svg`,
  "Go": `${DEVICON_BASE}/go/go-original.svg`,
  "HTML": `${DEVICON_BASE}/html5/html5-original.svg`,
  "CSS": `${DEVICON_BASE}/css3/css3-original.svg`,
  "Dart": `${DEVICON_BASE}/dart/dart-original.svg`,

  // Frontend Frameworks
  "React": `${DEVICON_BASE}/react/react-original.svg`,
  "React 19": `${DEVICON_BASE}/react/react-original.svg`,
  "React Native": `${DEVICON_BASE}/react/react-original.svg`,
  "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  "Next.js 14": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  "Astro": `${DEVICON_BASE}/astro/astro-original.svg`,
  "Vue.js": `${DEVICON_BASE}/vuejs/vuejs-original.svg`,
  "Angular": `${DEVICON_BASE}/angularjs/angularjs-original.svg`,
  "Svelte": `${DEVICON_BASE}/svelte/svelte-original.svg`,
  "Flutter": `${DEVICON_BASE}/flutter/flutter-original.svg`,

  // CSS / Styling
  "Tailwind CSS": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "Tailwind CSS v4": `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
  "Material UI": `${DEVICON_BASE}/materialui/materialui-original.svg`,
  "Sass": `${DEVICON_BASE}/sass/sass-original.svg`,
  "Chakra UI": `https://img.icons8.com/color/48/chakra-ui.png`,

  // Backend Frameworks
  "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Express": `${DEVICON_BASE}/express/express-original.svg`,
  "Express 5": `${DEVICON_BASE}/express/express-original.svg`,
  "Express.js": `${DEVICON_BASE}/express/express-original.svg`,
  "Django": `${DEVICON_BASE}/django/django-plain.svg`,
  "Flask": `${DEVICON_BASE}/flask/flask-original.svg`,
  "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  "Spring Boot": `${DEVICON_BASE}/spring/spring-original.svg`,

  // Databases
  "PostgreSQL": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  "MongoDB": `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  "MySQL": `${DEVICON_BASE}/mysql/mysql-original.svg`,
  "Redis": `${DEVICON_BASE}/redis/redis-original.svg`,
  "SQLite": `${DEVICON_BASE}/sqlite/sqlite-original.svg`,
  "Firebase": `${DEVICON_BASE}/firebase/firebase-original.svg`,
  "Firestore": `${DEVICON_BASE}/firebase/firebase-original.svg`,
  "Supabase": `${DEVICON_BASE}/supabase/supabase-original.svg`,
  "Prisma": `${DEVICON_BASE}/prisma/prisma-original.svg`,
  "Drizzle ORM": `https://orm.drizzle.team/favicon.svg`,

  // Cloud / DevOps
  "Docker": `${DEVICON_BASE}/docker/docker-original.svg`,
  "AWS": `${DEVICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  "Google Cloud": `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
  "Vercel": `${DEVICON_BASE}/vercel/vercel-original.svg`,
  "Cloudflare": `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`,
  "Cloudflare Pages": `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`,
  "Cloudflare Workers": `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`,
  "Netlify": `${DEVICON_BASE}/netlify/netlify-original.svg`,
  "GitHub Actions": `${DEVICON_BASE}/github/github-original.svg`,
  "Git": `${DEVICON_BASE}/git/git-original.svg`,
  "Nginx": `${DEVICON_BASE}/nginx/nginx-original.svg`,
  "Linux": `${DEVICON_BASE}/linux/linux-original.svg`,
  "Render": `https://cdn.simpleicons.org/render/46E3B7`,

  // Tools & Libraries
  "Vite": `${DEVICON_BASE}/vitejs/vitejs-original.svg`,
  "Webpack": `${DEVICON_BASE}/webpack/webpack-original.svg`,
  "Jest": `${DEVICON_BASE}/jest/jest-plain.svg`,
  "Cypress": `${DEVICON_BASE}/cypressio/cypressio-original.svg`,
  "Playwright": `${DEVICON_BASE}/playwright/playwright-original.svg`,
  "Storybook": `${DEVICON_BASE}/storybook/storybook-original.svg`,
  "Figma": `${DEVICON_BASE}/figma/figma-original.svg`,
  "GraphQL": `${DEVICON_BASE}/graphql/graphql-plain.svg`,
  "Sentry": `${DEVICON_BASE}/sentry/sentry-original.svg`,
  "Stripe": `https://cdn.simpleicons.org/stripe/635BFF`,
  "Paystack": `https://cdn.simpleicons.org/paystack/00C3F7`,

  // Scraping & Data
  "Puppeteer": `https://cdn.simpleicons.org/puppeteer/40B5A4`,
  "Puppeteer Stealth": `https://cdn.simpleicons.org/puppeteer/40B5A4`,
  "Cheerio": `https://cheerio.js.org/img/orange-c.svg`,
  "Beautiful Soup": `${DEVICON_BASE}/python/python-original.svg`,
  "Scrapy": `https://cdn.simpleicons.org/scrapy/60A839`,

  // Real-time
  "Socket.io": `${DEVICON_BASE}/socketio/socketio-original.svg`,
  "WebSocket": `https://cdn.simpleicons.org/websocket/010101`,

  // AI/ML
  "OpenAI API": `https://cdn.simpleicons.org/openai/412991`,
  "OpenAI": `https://cdn.simpleicons.org/openai/412991`,
  "TensorFlow": `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,

  // Auth
  "JWT": `https://cdn.simpleicons.org/jsonwebtokens/000000`,
  "Clerk": `https://cdn.simpleicons.org/clerk/6C47FF`,
  "Auth0": `https://cdn.simpleicons.org/auth0/EB5424`,

  // CMS / Content
  "Sanity CMS": `${DEVICON_BASE}/sanity/sanity-original.svg`,
  "Contentful": `https://cdn.simpleicons.org/contentful/2478CC`,
  "WordPress": `${DEVICON_BASE}/wordpress/wordpress-original.svg`,

  // Misc
  "Zustand": `https://raw.githubusercontent.com/pmndrs/zustand/main/bear.jpg`,
  "Framer Motion": `https://cdn.simpleicons.org/framer/0055FF`,
  "Motion": `https://cdn.simpleicons.org/framer/0055FF`,
  "Chart.js": `https://www.chartjs.org/img/chartjs-logo.svg`,
  "D3.js": `${DEVICON_BASE}/d3js/d3js-original.svg`,
  "Twilio": `https://cdn.simpleicons.org/twilio/F22F46`,
  "Node-cron": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "JSDOM": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "EJS": `https://cdn.simpleicons.org/ejs/B4CA65`,
  "Handlebars": `${DEVICON_BASE}/handlebars/handlebars-original.svg`,
  "Resend": `https://cdn.simpleicons.org/resend/000000`,
  "PDFKit": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Multer": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
};

export function getTechLogo(techName: string): string | undefined {
  return techLogoMap[techName];
}

export function getAllTechLogos(stack: string[]): Array<{ name: string; logo?: string }> {
  return stack.map((name) => ({
    name,
    logo: techLogoMap[name],
  }));
}
