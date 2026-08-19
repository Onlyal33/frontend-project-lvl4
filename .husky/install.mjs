import { existsSync } from 'node:fs';

if (process.env.CI || process.env.HUSKY === '0' || !existsSync('.git')) {
  process.exit(0);
}

const { default: install } = await import('husky');
const result = install();

if (result) {
  throw new Error(`Husky install failed: ${result}`);
}
