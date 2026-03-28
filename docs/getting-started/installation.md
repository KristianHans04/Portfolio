# Prerequisites and Installation

## Requirements

- Node.js 20 or later
- npm 10 or later
- Git

## Installation

Clone the repository and install dependencies:

```
git clone <repository-url>
cd portfolio
npm install
```

## Running the Development Server

```
npm run dev
```

This starts the Astro development server, typically at `http://localhost:4321`. The terminal output shows the exact port if 4321 is occupied.

## Building for Production

```
npm run build
```

The static output is written to the `dist/` directory.

## Previewing the Production Build

```
npm run preview
```

Serves the `dist/` directory locally so you can verify the production build before deploying.

## Type Checking

```
npm run check
```

Runs the Astro type checker across the entire project.

## Next Steps

- [Development Workflow](development.md) for day-to-day commands
- [Project Structure](project-structure.md) for a map of the codebase
