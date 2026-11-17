# Mibi — Stitch-faithful frontend

This is a **frontend-only** implementation built directly from your original Google Stitch HTML exports. The UI markup, layout, colors, fonts, organic patterns and mascot artwork are preserved rather than reconstructed from screenshots.

## Run / Deploy

1. Install Node 20+; run `npm install` then `npm run dev`.
2. Open the local URL. `npm run build` produces the `dist/` folder for Cloudflare Pages / Netlify / static hosting.
3. On Cloudflare Pages, use build command `npm run build` and output directory `dist`.
4. Opening `index.html` from `file://` can block ES modules. Use a local server instead.

## Included

- Original Stitch homepage design with clickable 16 types and category filters.
- Original Stitch 40-question assessment design with 5-point responses, back/forward, keyboard navigation, automatic localStorage saves.
- Result page that calculates four-letter preference grouping and displays updated result type / dimension bars.
- Ask Mibi interface visually preserved, with AI deliberately **not connected**.
- Original Mibi soft-peach sprout mascot assets in four expressions.
- Original Stitch HTML, design markdown and screenshots retained in `design-reference/`.

## Important limitations

- The quiz uses **original illustrative questions** and simplistic preference scoring, not a validated psychometric instrument and not a clinical diagnosis.
- The original Stitch INFJ result page contains some fixed example prose and visual elements. The result title/code and summaries update, but other static prose and diagrams should be fully authored for each archetype before public launch.
- Login, multi-language translations, privacy policy, AI backend, server storage, and subscriptions are not implemented.
- To maintain exact Stitch appearance, the prototype uses the Stitch-exported **Tailwind CDN** and Google Fonts. Convert to a compiled CSS build before a high-traffic production launch; these resources require connectivity.
- Mibi's local quiz answers remain in the browser (localStorage); do not assume they are securely synced.

## Brand identity

- Cream `#FAF8F5`
- Soft peach `#F5DCD4`
- Peach accent `#E8AFA8`
- Sage `#B7CBB9`
- Lavender `#DCD6EC`
- Slate `#343B43`
- Original page typography includes Plus Jakarta Sans, DM Sans, DM Serif Display, Playfair Display and Nunito; font imports were supplemented so declared face names load correctly.

No AI API keys are included. Add your backend only after the visual and assessment frontend is approved.
