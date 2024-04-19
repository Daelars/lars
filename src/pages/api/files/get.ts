// Import the readDirectory function
import type { APIRoute } from "astro";
import { readDirectory } from "../../lib/utils/readDirectory"; // Adjust the import path as necessary

export const get: APIRoute = async ({ request }) => {
  // Use the FILE_DIR environment variable or a default path
  const directoryPath = process.env.FILE_DIR || "./default/path/to/markdown"; // Adjust the default path as necessary

  try {
    // Call readDirectory asynchronously if it's designed to return a Promise
    const files = await readDirectory(directoryPath);

    // Return the files as JSON
    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle any errors that occur during directory reading or file processing
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
