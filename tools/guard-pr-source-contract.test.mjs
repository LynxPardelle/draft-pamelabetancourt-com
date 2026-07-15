import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { collectJsonFiles } from './deploy-draft.mjs';
import { isLocalOnlyDraftDirectoryName } from './lib/server-descriptor-kinds.mjs';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

test('pull request refs enter Bash through environment variables', async () => {
  const workflow = await readFile(new URL('../.github/workflows/guard-pr-source.yml', import.meta.url), 'utf8');

  assert.match(workflow, /BASE_REF: \$\{\{ github\.base_ref \}\}/);
  assert.match(workflow, /HEAD_REF: \$\{\{ github\.head_ref \}\}/);
  assert.match(workflow, /base="\$BASE_REF"/);
  assert.match(workflow, /head="\$HEAD_REF"/);
  assert.doesNotMatch(workflow, /base="\$\{\{/);
  assert.doesNotMatch(workflow, /head="\$\{\{/);
});

test('deploy package excludes local config while collecting tracked draft JSON', async () => {
  const files = await collectJsonFiles(repoRoot, 'pamelabetancourt.com');
  const tracked = execFileSync('git', ['ls-files', '*.json'], { cwd: repoRoot, encoding: 'utf8' })
    .trim()
    .split(/\r?\n/)
    .filter(file => file && file !== 'draft-repo.config.json' && !isLocalOnlyDraftDirectoryName(file.split('/')[0]));

  assert.equal(files.length, tracked.length);
  assert.ok(files.every(file => file.path.startsWith('pamelabetancourt.com/')));
});
