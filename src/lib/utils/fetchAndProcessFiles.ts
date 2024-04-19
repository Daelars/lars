// fetchAndProcessFiles.ts (likely in an API route or called from one)
import type { FileData } from "@/types"; // Assuming your FileData type definition
import type { APIRoute, AstroGlobal } from "astro";
import { cleanFileName } from "./cleanFileName";
import { extractMarkdownData } from "./extractMarkdownData";

export async function fetchAndProcessFiles(request: APIRoute): Promise<FileData[]> {
  try {
    // Fetch Markdown files directly
    const files = await AstroGlobal.glob('.' + process.env.FILE_DIR + '/**/*.md');

    // Process each markdown file
    const processedFiles: FileData[] = await Promise.all(files.map(async (file) => {
      const cleanedFileName = cleanFileName(file.name); 
      const fileContent = await file.content;

      try {
        const fileData = await extractMarkdownData(fileContent); 
        fileData.name = cleanedFileName;
        return fileData; // Return processed file data
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        throw error;  // Re-throw for potential handling at the route level
      }
    }));

    return processedFiles;
  } catch (error) {
    console.error(`Error processing Markdown files:`, error);
    throw error; // Re-throw error to allow handling on the API route level
  }
}













// Fetch files --> insert to supabase --> fetch supabase table ---> display each file on html