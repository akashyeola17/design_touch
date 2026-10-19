import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "hostinger-static");
const publicPath = path.join(projectRoot, "public");
const assetsPath = path.join(projectRoot, "assets");
const viewsPath = path.join(projectRoot, "views");

fs.rmSync(outputPath, { recursive: true, force: true });
fs.mkdirSync(outputPath, { recursive: true });

fs.cpSync(publicPath, outputPath, { recursive: true });
fs.cpSync(assetsPath, path.join(outputPath, "assets"), { recursive: true });

for (const [source, destination] of [
  ["homePage.html", "index.html"],
  ["about.html", "about.html"],
  ["services.html", "services.html"],
  ["projects.html", "projects.html"],
  ["not-found.html", "not-found.html"],
]) {
  fs.copyFileSync(path.join(viewsPath, source), path.join(outputPath, destination));
}

fs.writeFileSync(
  path.join(outputPath, ".htaccess"),
  [
    "DirectoryIndex index.html",
    "ErrorDocument 404 /not-found.html",
    "RewriteEngine On",
    "RewriteRule ^(about|services|projects)/$ /$1 [R=301,L]",
    "RewriteRule ^about/?$ about.html [L]",
    "RewriteRule ^services/?$ services.html [L]",
    "RewriteRule ^projects/?$ projects.html [L]",
    "RewriteRule ^(index|home|homePage)\\.html$ / [R=301,L]",
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Static Hostinger site generated at ${outputPath}`);
