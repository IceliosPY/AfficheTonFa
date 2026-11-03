import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { validateGraph } from '../packages/shared-types/src/validation.ts';

const directory = resolve('apps/web/public/data/v1/graphs');
const files = (await readdir(directory)).filter(file => file.endsWith('.json') && file !== 'index.json');
let failed = false;
for (const file of files) {
  const result = validateGraph(JSON.parse(await readFile(resolve(directory, file), 'utf8')));
  if (!result.success) {
    failed = true; console.error(`${file}:`); for (const issue of result.issues) console.error(`  ${issue.path}: ${issue.message}`);
  } else console.log(`✓ ${file} (${result.data.nodes.length} nœuds, ${result.data.edges.length} relations)`);
}
if (failed) process.exitCode = 1;
