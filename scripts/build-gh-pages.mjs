import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(scriptsDir, "..");
const dist = join(rootDir, "dist");

const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? pkg.name;
const base = `/${repoName}/`;

execSync(`pnpm exec vite build --base=${JSON.stringify(base)}`, {
  stdio: "inherit",
  cwd: rootDir,
  shell: true,
});

const indexHtml = join(dist, "index.html");
if (!existsSync(indexHtml)) {
  console.error("Ожидался dist/index.html после сборки.");
  process.exit(1);
}
copyFileSync(indexHtml, join(dist, "404.html"));
console.log(`Сборка для GitHub Pages: base=${base}, добавлен 404.html для SPA.`);
