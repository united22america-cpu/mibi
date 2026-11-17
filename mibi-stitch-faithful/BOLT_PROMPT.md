# Paste into Bolt after importing THIS repository

This is Mibi, a personality and reflective learning web app, not a construction website.

The original Stitch HTML exports are implemented as a faithful Vite multi-page frontend: index.html, assessment.html, result.html, ask-mibi.html.

STRICT DESIGN REQUIREMENTS:
- Do not redesign or replace any HTML page with a generic template.
- Do not replace the exact Mibi mascot assets in assets/; these are the canonical originals.
- Preserve the Stitch layout, spacing, organic patterns, typography, color HEX values and responsive classes.
- Use the design-reference/ original Stitch exports and screenshots to assess visual fidelity.
- Preserve the existing 40-question quiz, localStorage and type filters.
- No AI chatbot API/backend, login or database yet; Ask Mibi remains a clearly labeled preview.

First run npm install and npm run build, then verify all four pages and fix only build/navigation or mobile responsiveness problems. Report any mismatches against the exact reference screenshots. If you propose converting the original HTML into React components, do that only after getting approval and demonstrating side-by-side visual fidelity. Do not rewrite the frontend from scratch.
