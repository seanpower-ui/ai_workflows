# ai_workflows

## Dev

- **`npm run dev`** — Webpack dev server (default; avoids a Turbopack-only console warning when the dev overlay inspects `params` Promises).
- **`npm run dev:turbo`** — Turbopack if you want faster HMR and can tolerate that noise until Next.js fixes it.

## Private packages (`@jllt`)

Set **`JFROG_NPM_TOKEN`** to your Artifactory npm token. npm reads it via `.npmrc` (`${JFROG_NPM_TOKEN}`).

- **Local:** export it in your shell (or use direnv), then run `npm install`.
- **Vercel:** Project → Settings → Environment Variables → add `JFROG_NPM_TOKEN` for Production (and Preview if needed). Redeploy.
