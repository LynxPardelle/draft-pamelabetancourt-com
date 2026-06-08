# Pamela Betancourt Draft Repo Memory

This repository is Pamela Betancourt's standalone Zoolanding draft repo. It contains the public draft configuration and public assets needed for her site; it does not contain the shared Angular app. Pamela can edit and publish this draft without write access to `zoolandingpage`.

Sources checked for these instructions:

- `README.md`
- `.github/workflows/guard-pr-source.yml`
- `.github/workflows/deploy-test.yml`
- `.github/workflows/deploy-production.yml`
- `draft-repo.config.json`
- `site-config.json`
- Zoolanding hub docs: `Codex.md`, `docs/DEVELOPER_ONBOARDING.md`, `docs/03-development-guide.md`, `docs/11-draft-lifecycle.md`, `ai-notes/notes/secure-draft-release-workflow.md`

## Repositories

- Draft repo: `https://github.com/LynxPardelle/draft-pamelabetancourt-com.git`
- Public app repo used for local preview: `https://github.com/LynxPardelle/zoolandingpage.git`
- Draft domain: `pamelabetancourt.com`
- Local app mount path: `zoolandingpage/drafts/pamelabetancourt.com`
- Managed production alias in current `site-config.json`: `pamelabetancourt.zoolandingpage.com.mx`
- Managed test alias verified in prior QA: `test.pamelabetancourt.zoolandingpage.com.mx`
- Shared test preview URL: `https://test.zoolandingpage.com.mx/?draftDomain=pamelabetancourt.com&debugWorkspace=false`

Do not require Pamela to have write access to `zoolandingpage`. She only needs to clone the public app repo locally so the Angular app can serve this draft from `drafts/pamelabetancourt.com`.

## First Local Setup

Install Git and Node.js first. The draft deploy workflows use `actions/setup-node@v5` with `node-version: '22'`, so Node 22 is the safest local default for this repo family.

Clone the public app:

```powershell
git clone https://github.com/LynxPardelle/zoolandingpage.git
cd zoolandingpage
npm install
```

Clone Pamela's draft into the exact local path the app expects:

```powershell
New-Item -ItemType Directory -Force .\drafts
git clone https://github.com/LynxPardelle/draft-pamelabetancourt-com.git .\drafts\pamelabetancourt.com
cd .\drafts\pamelabetancourt.com
git checkout dev
git pull --ff-only
```

Start the app from the `zoolandingpage` root:

```powershell
cd ..\..
npm start
```

Open the local draft with explicit query params:

```text
http://127.0.0.1:4200/?draftDomain=pamelabetancourt.com&draftPageId=home&debugWorkspace=false
```

Useful local routes:

- Home: `http://127.0.0.1:4200/?draftDomain=pamelabetancourt.com&draftPageId=home&debugWorkspace=false`
- Servicios: `http://127.0.0.1:4200/servicios?draftDomain=pamelabetancourt.com&debugWorkspace=false`
- Acerca de mí: `http://127.0.0.1:4200/acerca-de-mi?draftDomain=pamelabetancourt.com&debugWorkspace=false`
- Contacto: `http://127.0.0.1:4200/contact?draftDomain=pamelabetancourt.com&debugWorkspace=false`

Always include `draftDomain=pamelabetancourt.com` on localhost so Codex and the browser preview load Pamela's draft instead of fallback behavior.

## What Pamela And Codex Should Edit

Work in this draft repo on branch `dev`.

Safe draft files to edit:

- `site-config.json`: routes, shared site metadata, SEO defaults, theme, navigation, analytics-safe settings.
- Domain files: `components.json`, `variables.json`, `angora-combos.json`, `i18n/es.json`, `i18n/en.json`.
- Page folders: `home/`, `servicios/`, `acerca-de-mi/`, `contact/`, `not-found/`, and `default/`.
- Page `i18n/*.json`: normal copy changes.
- Page `components.json`: layout and section content.
- Page `variables.json` and `angora-combos.json`: page-specific styling tokens/classes.

Ask Codex to keep changes scoped to this draft repo. Do not change app-level files such as `zoolandingpage/src/**`, `zoolandingpage/src/styles.scss`, or hub tooling unless Alec explicitly approves an app-platform change.

Current positioning to preserve:

- Pamela's site is centered on a free Instagram/Facebook strategic diagnosis.
- Primary CTAs can use Pamela's intentionally client-facing WhatsApp flow.
- The `/contact` route and Google Form remain available as a secondary path.

## Local Validation

Run these from the `zoolandingpage` app root after draft edits:

```powershell
node tools/config-draft-sync.mjs pack --domain=pamelabetancourt.com
npm run build
node tools/draft-smoke-check.mjs --local-base-url=http://127.0.0.1:4200 --domain=pamelabetancourt.com --include-live=false --timeout-ms=10000
```

Also inspect the affected routes manually in the browser on desktop and mobile viewports before asking to publish. Check for:

- visible text changes
- broken links or CTAs
- missing images
- console errors
- horizontal overflow on mobile
- unreadable contrast in light and dark theme if the edit changes colors

## Release Flow

The secure draft promotion path is:

1. Commit and push draft changes to `dev`.
2. Open a PR from `dev` to `test`.
3. Wait for the `guard` check to pass.
4. Merge the PR into `test`; the `Deploy test draft` workflow deploys the test environment.
5. Verify `https://test.pamelabetancourt.zoolandingpage.com.mx`.
6. Open a PR from `test` to `main`.
7. Wait for the `guard` check to pass.
8. Merge the PR into `main`; the `Deploy production draft` workflow deploys production.
9. Verify the production site separately after the production deploy finishes.

The branch rules are enforced by `.github/workflows/guard-pr-source.yml`:

- PRs into `test` must come from `dev`.
- PRs into `main` must come from `test`.

The deploy workflows also reject push-triggered deploys unless the merge source is correct:

- `test` deploys only from a merge commit whose second parent is on `origin/dev`.
- `main` deploys only from a merge commit whose second parent is on `origin/test`.

`dev` does not deploy. `test` deploys test only. `main` deploys production.

## Commands For Normal Work

From `zoolandingpage/drafts/pamelabetancourt.com`:

```powershell
git checkout dev
git pull --ff-only
git status --short
```

After edits:

```powershell
git status --short
git add Codex.md site-config.json components.json variables.json angora-combos.json i18n home servicios acerca-de-mi contact default not-found images
git commit -m "docs: update Pamela draft Codex workflow"
git push origin dev
```

Only stage files that actually changed. If Codex edits a different file, review it before staging.

Before PR, before merge to `test`, and before merge to `main`, run the public-safety audit from the `zoolandingpage` app root:

```powershell
node tools/draft-public-safety-audit.mjs --repo=drafts/pamelabetancourt.com --history=true
```

Resolve every blocking finding. Review findings such as public phone/WhatsApp/contact text are allowed only when they are intentionally client-facing.

## Security Rules

- Treat this repo as public.
- Do not commit secrets, tokens, API keys, signed URLs, `.env*`, local logs, PDFs/CVs, private keys, certificates, local databases, credential JSON, local agent state, `.codex/`, `.agents/`, `ai_notes/`, `findings/`, `errors-reports/`, `devonly/`, `logs/`, `reports/`, or `Output/`.
- Public contact details in draft content are allowed only when they are intentionally client-facing.
- Personal source files, CVs, private photos, identity documents, raw research, and private business notes stay local-only.
- Deployment uses GitHub OIDC to assume AWS IAM roles split by repo and environment. Do not add long-lived AWS access keys.
- If Codex needs an app-platform change, new deployment credential, DNS change, private asset upload, auth flow, or blog/admin feature, stop and ask Alec.

## When A Change Does Not Show Up

Keep the three states separate:

1. Local draft files in `drafts/pamelabetancourt.com`.
2. Test or production authoring state deployed by GitHub Actions.
3. Published runtime state served by the live app.

If localhost is wrong, check the local JSON and the preview URL. If test is wrong after merge, check the GitHub Actions deploy result and the test URL. If production is wrong after merge to `main`, check the production deploy result and the production runtime/site separately.
