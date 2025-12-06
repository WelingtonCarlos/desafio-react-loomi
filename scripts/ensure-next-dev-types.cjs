/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "..", ".next", "dev", "types");
const targetFile = path.join(targetDir, "cache-life.d.ts");

fs.mkdirSync(targetDir, { recursive: true });

if (!fs.existsSync(targetFile)) {
  const contents = `declare module "next/cache-life" {
  export function cacheLife(...args: unknown[]): void;
}
`;

  fs.writeFileSync(targetFile, contents);
}
