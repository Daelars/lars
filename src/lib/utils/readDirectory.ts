// src/lib/utils/readDirectory.ts
import { Astro } from "astro";

export async function getMarkdownFiles() {
  const fileDir = process.env.FILE_DIR; // Adjust this path to where your markdown files are stored
  const files = await Astro.glob(`${fileDir}/**/*.md`);

  const fileData = files.map((file) => ({
    name: file.name,
    path: file.path,
    // You can add more metadata extraction logic here
  }));

  return fileData;
}
