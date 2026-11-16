# Project memory

## Product intent & audience

- Mibi: a personality discovery web app built with React + Vite.
- Core surfaces: homepage hero, 16 personality type cards, 40-question assessment, result details, and an Ask Mibi “coming soon” placeholder.
- The 40 questions are an original reflection tool, not a clinically validated instrument; claims should stay modest.

## Brand personality & voice

- Warm, gentle, encouraging; organic and approachable rather than clinical.

## Visual design & UX direction

- Exact Mibi palette: warm cream `#FAF8F5`, peach `#F5DCD4`, sage `#B7CBB9`, lavender `#DCD6EC`, deep slate `#343B43`.
- Soft organic waves, generous whitespace, rounded cards.
- Uses supplied Mibi mascot images from the Stitch design package.
- Design source of truth: `stitch_mibi_personality_discovery 2/` folder (design specs + reference pages + mascot images).
- Target: fully responsive; keyboard accessible; working mobile menu and button behavior.

## Decisions, constraints & rationale

- Do not redesign the visual language, swap the mascot, or replace working components with generic templates.
- Do not create a backend, authentication, database, Supabase, or connect an AI API; Ask Mibi stays a labeled placeholder.
- Preserve existing assessment navigation, localStorage persistence, answer selection, type filters, and result calculation.
- `npm run build` must succeed.
- Work in small, reviewable commits; prioritize matching supplied design over adding features.
- Critical current blocker: the GitHub import did not bring in the app code. Workspace currently contains only `README.md` (one line), an empty `package-lock.json` (no `package.json`), and the Stitch design folder. No `src/`, `main.jsx`, `data.js`, `style.css`, or `public/assets` exist yet, and it is not a git repo. Awaiting user decision: re-import the repo or build fresh from Stitch designs.

## Open questions & assumptions

- Awaiting user choice between re-importing the original repository versus rebuilding from Stitch designs.
- Assuming the intended app already has working assessment logic, localStorage persistence, type filters, and result calculation that must be preserved once the code is available.
- Assuming supplied Stitch reference pages define the exact layouts to match for hero, type cards, assessment, results, and Ask Mibi.