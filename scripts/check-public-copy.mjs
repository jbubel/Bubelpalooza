import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const roots = ["app", "components"];
const extensions = new Set([".tsx", ".ts"]);
const blockedPhrases = [
  "acceptance criteria",
  "current rendering",
  "fulfillment details",
  "payment will turn on",
  "purchase touchpoint",
  "the layout should",
  "the site should",
  "this implementation",
  "this requirement",
  "this wizard",
];

function getFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return getFiles(fullPath);
    }

    return extensions.has(path.extname(fullPath)) ? [fullPath] : [];
  });
}

function getQuotedText(content) {
  const matches = content.matchAll(/(["'`])((?:(?!\1)[^\\]|\\.)*)\1/gms);

  return Array.from(matches, (match) => match[2].replaceAll(/\s+/g, " "));
}

const findings = roots
  .flatMap(getFiles)
  .flatMap((filePath) => {
    const content = readFileSync(filePath, "utf8");
    const quotedText = getQuotedText(content);

    return quotedText.flatMap((text) =>
      blockedPhrases
        .filter((phrase) => text.toLowerCase().includes(phrase))
        .map((phrase) => ({ filePath, phrase, text })),
    );
  });

if (findings.length > 0) {
  console.error("Public copy check found implementation-facing language:");

  for (const finding of findings) {
    console.error(`- ${finding.filePath}: "${finding.phrase}" in "${finding.text}"`);
  }

  process.exit(1);
}

console.log("Public copy check passed.");
