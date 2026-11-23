# Meet Mibi — live personalized AI consultation (Cloudflare Pages)

This is an **overlay patch** for the existing Mibi website, not a full site replacement. It preserves the original fonts, mascot, navigation, core layout and theme colors. Do not replace/delete the other Mibi pages or assets.

## Included files

```
ask-mibi.html                  # upgraded consultation page
assets/mibi-chat.js           # multilingual chat UI and personalization
assets/mibi-consult.css       # small additions to original design
functions/api/chat.js         # secure server-side AI endpoint on Cloudflare Pages
```

## What works

- Live chat with the OpenAI Responses API (when Cloudflare backend is deployed and configured)
- Consultations customized by topic, optionally chosen personality type, support style, personal goal and nickname
- Multilingual interface and model responses: English, Indonesian, Hindi, Filipino, Burmese, Thai, Vietnamese, Russian, Portuguese and Spanish
- Brief action-plan generation with a copy action
- Optional personality type handoff from the assessment page
- Opt-in AI processing notice, no browser-local transcript retention, no client-side API key
- Per-IP daily request quota via Workers KV (basic safeguard, not an abuse-proof hard limit)

## Deployment to your **existing** Cloudflare Pages repository

1. In your GitHub repo for meetmibi, add/replace only the files listed above. Keep `index.html`, `assessment.html`, other pages and all `assets/mibi-*.png` mascot files intact.
2. In Cloudflare Dashboard → **Workers & Pages** → your **Pages** project → **Settings** → **Variables and Secrets**, add an encrypted **secret** with the name `OPENAI_API_KEY`. Use your own API project key. NEVER put it in HTML or JavaScript in the `/assets` directory.
3. In Cloudflare Dashboard → **Workers & Pages** → **KV**, create a namespace (e.g. `mibi-chat-limits`). Under your Pages project → **Settings** → **Bindings**, add a **KV namespace** binding named `MIBI_LIMITS` pointing to the namespace.
4. Optional: set environment variable `MIBI_MODEL` to a supported Responses API model ID (default: `gpt-5.4-mini`). Optional `MIBI_DAILY_LIMIT` defaults to `30` requests per IP per day (plan generation counts as a request).
5. Redeploy with **Git integration** or `wrangler pages deploy` from the source project. Cloudflare Pages functions are **not** deployed by a simple static ZIP upload in the dashboard. Ensure the root `/functions` folder is included in the deployment project, not inside the static assets root.
6. Check `https://YOUR-MIBI-DOMAIN/api/chat` in the browser. It should return `{"ready":true,...}` after the key and KV binding have been configured.
7. Open `https://YOUR-MIBI-DOMAIN/ask-mibi.html`. Tick the consent option and ask a question. Check the answer changes with topic, chosen language and personality type. Then test **Prepare my next steps** and **Copy my plan**.

### Optional: pass a personality-test result into consultation

From the assessment results page, after a type is calculated:

```javascript
// Example: if result.type === 'ENFP'
localStorage.setItem('mibi-personality-type', result.type);
// Direct result handoff also works:
window.location.href = './ask-mibi.html?type=' + encodeURIComponent(result.type);
```

Only a valid type code is read. Never store private consultation notes in localStorage. If you do not want persistence across visits, use the `?type=ENFP` URL option instead.

## Critical production safeguards

- KV daily quotas are **best-effort** (KV is eventually consistent). Before running paid public traffic, add Cloudflare WAF / Turnstile, authentication, monitoring, and account-level OpenAI API budget alerts / spending limits.
- The consultation is for **nonclinical self-reflection**, not diagnosis or therapy. Avoid introducing a real booking or human-provider claim until an actual booking process exists.
- Messages and voluntarily supplied profile fields are sent to OpenAI to generate a response; there is no database in this patch. Data processing by the AI provider still applies. Update your privacy policy before public use, especially for children and other vulnerable visitors.
- Test the 10 languages with native-language readers and conduct safety/red-team checks, including crisis scenarios, before launch.
- The included frontend doesn't store a transcript in localStorage. It clears when the page reloads or the visitor selects New chat. Your infrastructure and API provider may still have their own logs/retention rules.
- Do not provide the API key in a public GitHub issue, screenshot, or chat message.

## Troubleshooting

- **AI setup required:** Missing API key and/or KV binding, incorrect project, missing deployment, or opening the page from local files instead of the deployed Pages site.
- **Function gives 404:** Make sure `/functions/api/chat.js` was deployed as part of the Pages source project via Git or Wrangler (not static upload).
- **AI provider unavailable:** Review Cloudflare Functions logs and verify your OpenAI project billing, model access, and API key.
- **Too many requests:** The daily rate limit has been reached; change `MIBI_DAILY_LIMIT` only after reviewing costs.

Official documentation:
- https://developers.cloudflare.com/pages/functions/get-started/
- https://developers.cloudflare.com/pages/functions/bindings/
- https://developers.openai.com/api/reference/resources/responses/methods/create
