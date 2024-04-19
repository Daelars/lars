// import { prismaClient } from "@/lib/prismaClient";
// import { supabaseClient } from "@/lib/supabaseClient";
// import * as dotenv from "dotenv";
// import fs from "fs";
// import matter from "gray-matter"; // For parsing Markdown
// import path from "path";
// // Example path for file extraction - adjust if necessary
// const directory = import.meta.env.FILE_DIR;
// const port = dotenv.config();

// async function fetchFiles() {
//   try {
//     // Read the names of the files in your directory
//     const fileNames = fs.readdirSync(directory);
//     return fileNames;
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     throw error;
//   }
// }
// export async function fetchAndLogFiles(directory: string) {
//   const fileNames = await fetchFiles();

//   // Log file names to the console
//   console.log("Fetched Files:", fileNames);

//   // Filter and process Markdown files
//   const markdownFiles = fileNames.filter((file) => file.endsWith(".md"));
//   await Promise.all(markdownFiles.map(processAndSaveFile));

//   // Create a JSON response
//   const fileData = fileNames.map((name) => ({ name }));
//   return {
//     message: "Markdown files processed and saved",
//     files: fileData,
//   };
// }

// async function processAndSaveFile(fileName: string) {
//   try {
//     const filePath = path.join(directory, fileName);
//     const fileContent = fs.readFileSync(filePath, "utf-8");

//     // Extract metadata and content with gray-matter
//     const { data, content } = matter(fileContent);

//     // Save to Supabase using Prisma
//     await prismaClient.files.create({
//       data: {
//         name: data.title || "Untitled",
//         type: "markdown", // Indicate it's a Markdown file
//         content,
//         // You can add the URL field here if needed
//       },
//     });
//   } catch (error) {
//     console.error("Error processing file:", fileName, error);
//   }
// }

// export async function fetchAndProcessMarkdown() {
//   const fileNames = await fetchFiles();

//   // Filter for .md files and process
//   const markdownFiles = fileNames.filter((file) => file.endsWith(".md"));
//   await Promise.all(markdownFiles.map(processAndSaveFile));

//   return { message: "Markdown files processed and saved" };
// }
