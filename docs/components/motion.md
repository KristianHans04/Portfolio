# Motion Components

React components that provide animations and interactivity. These are hydrated on the client using Astro's `client:visible` or `client:load` directives.

## CounterUp

**File:** `src/components/motion/CounterUp.tsx`

Animates a number from 0 to a target value when scrolled into view. Used for stats displays on the homepage and work page.

**Props:** `target` (number), `className` (string), `label` (string)

## ScrollParallax

**File:** `src/components/motion/ScrollParallax.tsx`

Wraps child content with a subtle vertical parallax effect on scroll. Used on the homepage featured project cards.

**Props:** `offset` (number, pixels of parallax movement)

## InteractiveCard

**File:** `src/components/motion/InteractiveCard.tsx`

Adds a 3D tilt effect on mouse hover. The card rotates slightly toward the cursor position.

## MediaModal

**File:** `src/components/motion/MediaModal.tsx`

A full-screen modal overlay for embedding external content in an iframe. Uses React's `createPortal` to render directly on `document.body`, avoiding overflow clipping from parent containers.

Features:
- Iframe embed with loading state
- "Open in new tab" button
- Escape key and backdrop click to close
- Spring animation on open and close
- Portal rendering for correct stacking above all page content

Used on the press listing and detail pages to preview articles and broadcasts without leaving the site.

## RevealText

**File:** `src/components/motion/RevealText.tsx`

Animates text appearing with a fade and upward slide when scrolled into view.

## StaggeredReveal

**File:** `src/components/motion/StaggeredReveal.tsx`

Animates a list of children appearing one after another with staggered timing.

## MagneticButton

**File:** `src/components/motion/MagneticButton.tsx`

A button that subtly follows the cursor when hovered, creating a magnetic pull effect.

## HeroInteractive

**File:** `src/components/motion/HeroInteractive.tsx`

Interactive effects for the hero section.

## ParallaxPhotoStrip

**File:** `src/components/motion/ParallaxPhotoStrip.tsx`

A horizontal strip of photos with parallax scrolling.

## StickyScrollReveal

**File:** `src/components/motion/StickyScrollReveal.tsx`

Content that reveals progressively as the user scrolls through a sticky section.

## TextMarquee

**File:** `src/components/motion/TextMarquee.tsx`

Horizontally scrolling text in a marquee pattern.

## General Notes

All motion components check for `prefers-reduced-motion` and disable animations accordingly. The `useReducedMotion` hook from the Motion library handles this automatically.

Components are only hydrated when needed (`client:visible` loads the component when it enters the viewport), keeping the initial page load fast.
