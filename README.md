# Draft: pamelabetancourt.com

<!-- zoolanding-hub-routing:start -->
## Zoolanding Knowledge Router

Shared procedures are routed through the Zoolandingpage hub. Start with [AGENTS.md](AGENTS.md) and open only the document needed for the current task.

| Task | Read |
| --- | --- |
| Edit draft content or routes | Local `site-config.json`, page JSON, and task-specific local docs |
| Create or bootstrap a draft | [ai-notes/how-to/create-secure-draft-repo.md](https://github.com/LynxPardelle/zoolandingpage/blob/main/ai-notes/how-to/create-secure-draft-repo.md) |
| Promote, deploy, or configure branches | [Hub lifecycle guide and local `.github/workflows/`](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md) |
| Upload public assets | [docs/12-public-assets-and-file-uploads.md](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/12-public-assets-and-file-uploads.md) |
| Configure domains or aliases | [docs/13-managed-alias-front-door.md](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/13-managed-alias-front-door.md) |
| Work across repositories | [docs/repository-map.md](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/repository-map.md) |

Critical repository-specific safety, deployment, and rollback rules remain local.
<!-- zoolanding-hub-routing:end -->

Public Zoolanding draft source for `pamelabetancourt.com`.

## Start here

| Task | Source |
| --- | --- |
| Safety, Pamela-specific constraints, and closeout | [AGENTS.md](AGENTS.md) |
| Canonical identity and release configuration | [draft-repo.config.json](draft-repo.config.json) and [site-config.json](site-config.json) |
| Routes, content, CTA behavior, SEO, and assets | `site-config.json`, root JSON, and the matching page folder |
| Deployment implementation | [.github/workflows/](.github/workflows/) and [tools/deploy-draft.mjs](tools/deploy-draft.mjs) |
| Historical evidence | [changelog/README.md](changelog/README.md) |

Shared workflows remain canonical in the Zoolandingpage hub:

- [Draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md)
- [Public assets and upload grants](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/12-public-assets-and-file-uploads.md)
- [Fleet ownership](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/repository-map.md)
- [Draft registry](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/drafts-registry.json)

## Ownership and identity

The current hub registry proves the canonical domain `pamelabetancourt.com`, repository identity, and local mount `drafts/pamelabetancourt.com`. It does not contain alias fields for Pamela. `site-config.json` contains draft-local alias declarations, but they are not independent registry proof; do not infer or change alias ownership without explicit verification.

This repository owns only Pamela's public draft package. Shared Angular source, styles, authoring tools, infrastructure, DNS, and backend services belong to their owning repositories.

## Public product contract

- Current content offers the Sprint de Redes and a free Instagram/Facebook strategic diagnosis.
- Existing WhatsApp CTA values are intentionally client-facing and remain in draft JSON; avoid duplicating them in notes.
- `/contact` keeps the existing embedded Google Form as the secondary contact path.
- Preserve current copy, claims, routes, tracking events, endpoints, public assets, and SEO unless the task explicitly changes them.

## Validation and release

Work starts from `dev`. Later promotion uses separate `dev -> test -> main` pull requests; `dev` does not deploy.

For every PR, parse all JSON and run:

```powershell
node --check tools/deploy-draft.mjs
node --test tools/guard-pr-source-contract.test.mjs
actionlint -no-color
```

From a current Zoolandingpage hub checkout, also run the history-enabled public-safety audit. Payload or rendered changes additionally require the hub package/build/smoke commands and desktop/mobile browser QA from the [draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md).

Asset grants, `.env*`, `.zlp/`, private source material, investigation folders, logs, and agent state remain local and ignored. Commit only reviewed public draft files and stable public asset URLs.
