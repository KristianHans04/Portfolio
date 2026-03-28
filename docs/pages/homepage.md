# Homepage

**Route:** `/`
**File:** `src/pages/index.astro`

## Sections

### Hero

The hero section contains:

- **Role label** with an accent line
- **Morph headline** that transitions between four sentences using a blur-crossfade animation. The sentences are defined in the inline `<script>` at the bottom of the file. An invisible "sizer" span reserves vertical space so the absolute-positioned morph text does not overlap content below.
- **Supporting text** from `siteData.heroIntro`
- **CTA buttons** linking to Work, About, and Contact
- **Location and email** from `siteData`
- **Profile photo** with a grayscale-to-color hover effect
- **EPL-style stats overlay** on the photo showing project count, countries, impact, and stack size

On mobile, the photo appears above the text content (CSS `order` property). On desktop, text is on the left (columns 1-7) and the photo is on the right (columns 8-12).

### Navigate

A bento-style grid of cards linking to Work, Impact, Press, and Life. Each card has an icon, title, description, and arrow.

### Featured Work

Displays the top three projects by order. Each project card shows its logo (or a fallback letter), title, summary, category pills, and a "View project" link. Uses `ScrollParallax` for subtle scroll animation.

### Stack and Biography

A two-column layout showing the top 12 technologies on the left and a short biography with credential highlights on the right.

### Stats Counter

Animated counters for total projects, impact entries, countries, and technologies. Uses the `CounterUp` React component which animates from 0 to the target number when scrolled into view.

### Call to Action

A closing section with contact and about links, plus three credential highlight statements in glass cards.

## Data Sources

- `siteData` from `src/data/site.json`
- `getProjects()`, `getImpactEntries()`, `getTravelEntries()`, `getPhotoEntries()` from content loaders
- Profile photo from the photo collection (category "about")
