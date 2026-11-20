import { copyFileSync, mkdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, 'entry.png');

if (!existsSync(imagePath)) {
  process.stderr.write(`Error: entry.png not found at ${imagePath}\n`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const dest = join(outputDir, 'entry.png');
copyFileSync(imagePath, dest);

const srcSize = statSync(imagePath).size;
const destSize = statSync(dest).size;
if (destSize !== srcSize) {
  process.stderr.write(
    `Error: copy size mismatch — source ${srcSize} bytes, destination ${destSize} bytes\n`,
  );
  process.exit(1);
}

const hash = createHash('sha256')
  .update(readFileSync(dest))
  .digest('hex');
console.log(`Copied entry.png → ${dest} (${destSize} bytes, sha256 ${hash})`);
