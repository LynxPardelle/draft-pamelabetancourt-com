# Pamela Betancourt Draft Agent Guide

<!-- zoolanding-hub-routing:start -->
## Zoolanding Knowledge Router

Read only the row needed for the current task, then inspect the local executable configuration or workflow that owns the behavior.

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

Use this file as the repository entrypoint for agents and contributors.

## Read order

1. Read [README.md](README.md) for ownership, canonical identity, Pamela-specific product constraints, validation, and shared hub links.
2. Read [draft-repo.config.json](draft-repo.config.json), [site-config.json](site-config.json), and only the affected page JSON before changing draft behavior.
3. Read [.github/workflows/](.github/workflows/) for the actual promotion and deployment gates.
4. Read [changelog/README.md](changelog/README.md) only when historical implementation or verification evidence matters.

`Codex.md` is a compatibility pointer with durable Pamela-specific decisions; it is not required after this file.

## Shared contracts

- Hub start page: https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/README.md
- Draft lifecycle: https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md
- Public assets and upload grants: https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/12-public-assets-and-file-uploads.md
- Fleet ownership: https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/repository-map.md
- Draft registry: https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/drafts-registry.json

The hub owns shared application, authoring, upload, and publication contracts. This repository owns only Pamela's public draft JSON and public assets.

## Pamela-specific constraints

- The registry proves the canonical domain `pamelabetancourt.com` but currently contains no alias fields for this draft. Local alias declarations in `site-config.json` are not registry proof; never infer, add, remove, publish, or describe an alias as approved without explicit verification.
- Preserve the current positioning: the Sprint de Redes offer and free strategic diagnosis for Instagram/Facebook remain available as configured. Do not rewrite claims, offer scope, CTA hierarchy, tracking, or SEO copy unless the task explicitly requests content changes.
- Preserve the intentionally public WhatsApp CTA behavior and the existing `/contact` Google Form as the secondary contact path. Do not copy contact values into notes or change numbers, messages, form URLs, routes, endpoints, or analytics events incidentally.
- Keep changes inside this draft. App source, shared styles, hub tools, DNS, auth, and backend services require a separately approved task in their owning repositories.

## Public safety

- Treat this repository as public. Never commit secrets, upload grants, signed URLs, `.env*`, `.zlp/`, private source documents, CVs, identity material, raw research, local databases, logs, customer data, or agent state.
- Public contact details are allowed only where they are intentionally client-facing in the existing draft. Review public-safety findings; do not suppress or generalize them.
- Keep `ai_notes/`, `findings/`, `errors-reports/`, `.superpowers/`, `devonly/`, `logs/`, `reports/`, and `Output/` local and ignored.
- Upload assets only through the hub grant workflow. Keep grants local and commit only the returned stable public asset URL.

## Development and release

- Create feature branches from current `dev`. Normal work targets `dev`; later promotion uses separate `dev -> test -> main` pull requests.
- `dev` does not deploy. Merges into `test` deploy test; merges into `main` deploy production. Preserve OIDC, environment variables, authoring endpoint, and merge-source guards.
- Do not merge, deploy, change domains or aliases, upload private assets, or modify repository settings without authorization for that operation.
- Before PR, run JSON parsing, `node --check tools/deploy-draft.mjs`, `node --test tools/guard-pr-source-contract.test.mjs`, `actionlint -no-color`, Gitleaks, and the hub public-safety audit with history enabled. Audit, fix, and repeat final gates three times.
- Payload, copy, route, style, script, or asset changes also require desktop/mobile browser QA on every affected route. Documentation-only changes require link, workflow, JSON, and public-safety validation without visual QA.

Keep current rules here and in README/config. Put dated evidence in `changelog/`, not here or in `Codex.md`.
