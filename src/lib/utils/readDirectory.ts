// src/lib/utils/readDirectory.ts
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

export function getMarkdownFiles() {
  const fileDir = process.env.FILE_DIR; // Ensure this is set in your .env file
  if (!fileDir) {
    console.error("FILE_DIR is not set in .env file.");
    return [];
  }

  try {
    const files = fs.readdirSync(fileDir);
    return files.map((file) => ({
      name: file,
      path: path.join(fileDir, file),
    }));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}
