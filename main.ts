import { copyFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(scriptDir, 'entry.png');

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const dest = join(outputDir, 'entry.png');
copyFileSync(imagePath, dest);

const size = statSync(dest).size;
console.log(`Copied entry.png → ${dest} (${size} bytes)`);
