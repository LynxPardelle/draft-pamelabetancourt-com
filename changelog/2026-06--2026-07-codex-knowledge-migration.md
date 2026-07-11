# 2026-06 through 2026-07 CT — Codex knowledge migration

This entry preserves relevant evidence removed from the former 195-line `Codex.md`. Current behavior is owned by README, JSON, tools, and workflows.

## Baseline

- `AGENTS.md` and `changelog/` did not exist.
- `README.md` was 633 bytes and 7 lines.
- `Codex.md` was 9,095 bytes and 195 lines; README plus Codex totaled 9,728 bytes.
- Forty-two JSON files and three workflows defined the draft and release behavior.

## Pilot result

- `Codex.md` is 1,101 bytes, an 87.9% reduction.
- The default path is 7,294 bytes (`AGENTS.md` at 4,246 plus README at 3,048), 25.0% smaller than the previous README plus Codex path.

## Migrated evidence

- 2026-06-07 CT: the former Codex guide centralized local setup, validation, safety, and promotion instructions. Shared procedures now link to the hub instead of being duplicated here.
- 2026-06-24 CT: `dev` added the grant-based public asset workflow and expanded ignore rules for `.zlp/`, grant, and token files. Those safety rules remain current through the hub asset guide and `.gitignore`.
- The former guide described a dedicated test alias as verified, while the current hub registry contains no alias fields and `site-config.json` declares different draft-local alias values. No alias is treated as registry-verified by this migration.
- Pamela-specific product constraints remain current: preserve the configured Sprint de Redes/free diagnosis positioning, intentionally public WhatsApp CTA behavior, and the `/contact` embedded form unless a content task explicitly changes them.

No copy, CTA value, contact value, form endpoint, alias, route, JSON payload, or public asset changed in this migration.
