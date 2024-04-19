import { env } from "process";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { FileData, FileEssentials } from "../../types";

export async function extractMarkdownData(
  fileContent: string
): Promise<FileData> {
  try {
    const fileDir = env.FILE_DIR; // Get the FILE_DIR environment variable
    if (!fileDir) {
      throw new Error("FILE_DIR environment variable is not set.");
    }

    const processedContent = await remark()
      .use(remarkHtml)
      .process(fileContent);

    const content = processedContent.toString();

    return {
      name: "Untitled",
      type: "markdown",
      created_at: new Date(),
      content,
      // ... Metadata extraction (See Strategies Below)
    };
  } catch (error) {
    // Handle potential errors
    if (error instanceof Error) {
      console.error("Markdown processing error:", error.message);
      // Consider throwing a custom error for more tailored error handling
      throw new Error(`Error processing Markdown: ${error.message}`);
    } else {
      console.error("Unexpected error during Markdown processing:", error);
      throw new Error("Unexpected error during Markdown processing."); // Or rethrow the error
    }
  }
}
