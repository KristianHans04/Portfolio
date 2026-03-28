# Site Data

The `src/data/site.json` file contains the core identity and biographical information used across the entire site.

## Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Full display name |
| `role` | Yes | Professional title shown in the header and hero |
| `location` | No | City and country |
| `email` | No | Contact email address |
| `tagline` | Yes | Statement used in the footer |
| `positioningStatement` | Yes | Primary headline statement |
| `heroIntro` | Yes | Supporting text below the hero headline |
| `shortBio` | Yes | Concise biography for the homepage |
| `longBio` | No | Extended biography for the about page |
| `credentialHighlights` | No | Array of short credential statements for the homepage CTA section |
| `currentFocus` | No | Array of current priorities |
| `capabilities` | No | Array of technical capabilities |
| `values` | No | Array of professional values |
| `workingStyle` | No | Array of working style descriptions |
| `endorsements` | No | Array of endorsement objects (each with `name`, `role`, `quote`) |
| `hobbies` | No | Array of hobbies and interests |
| `personalHighlights` | No | Array of notable personal achievements |
| `contactExpectations` | No | Array of contact form context statements |
| `timeline` | No | Array of career timeline entries (each with `title`, `organization`, `period`, `summary`) |
| `now` | No | Current focus object with `summary`, `updatedAt`, and `items` array |

## Where Site Data Appears

- **Header**: `name` and `role`
- **Homepage hero**: `role`, `positioningStatement`, `heroIntro`, `location`, `email`
- **Homepage biography section**: `shortBio`
- **Homepage CTA**: `credentialHighlights`
- **About page**: `longBio`, `timeline`, `values`, `workingStyle`, `endorsements`
- **Contact page**: `contactExpectations`
- **Footer**: `tagline`, `email`

## Editing

Edit `src/data/site.json` directly. Changes take effect on the next build or immediately in dev mode. All fields are validated against the schema in `src/lib/content/schemas.ts`.
