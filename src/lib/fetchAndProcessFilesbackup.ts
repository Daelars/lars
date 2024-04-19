// import fs from "fs";
// import path from "path";
// import type { FileData, FileEssentials } from "../../types";
// import { extractMarkdownData } from "./extractMarkdownData";
// import { cleanFileName } from "./cleanFileName";

// const directory = import.meta.env.FILE_DIR;

// export async function fetchAndProcessFiles(): Promise<FileData[]> {
//   try {
//     const fileNames = fs.readdirSync(directory);
//     const processedFiles: FileData[] = [];

//     for (const fileName of fileNames) {
//       if (!fileName.endsWith(".md")) continue;

//       const cleanedFileName = cleanFileName(fileName);
//       const filePath = path.join(directory, cleanedFileName);
//       const fileContent = fs.readFileSync(filePath, "utf-8");

//       // Await and handle potential errors within the loop
//       try {
//         const fileData = await extractMarkdownData(fileContent);
//         fileData.name = cleanedFileName;
//         processedFiles.push(fileData);
//       } catch (error) {
//         console.error(`Error processing file ${fileName}:`, error);
//         // Consider more specific error handling here (e.g., skipping the file, adding a placeholder, etc.)
//       }
//     }

//     return processedFiles;
//   } catch (error) {
//     // Handle general errors with fetchAndProcessFiles
//     if (error instanceof Error) {
//       throw new Error(`Error processing Markdown files: ${error.message}`);
//     } else {
//       throw new Error("Unexpected error encountered during file processing.");
//     }
//   }
// }
