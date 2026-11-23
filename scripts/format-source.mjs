import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
execFileSync(process.execPath, [fileURLToPath(new URL('../node_modules/prettier/bin/prettier.cjs', import.meta.url)), '--write', 'src', 'tests', 'index.html'], { stdio: 'inherit' });
