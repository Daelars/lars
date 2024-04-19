import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { supabaseClient } from "../../server/supabaseClient"; // Adjust the import path as necessary
import type { FileData, FileEssentials } from "../../types"; // Adjust the import path as necessary

dotenv.config();

const FILE_DIR = process.env.FILE_DIR;

if (!FILE_DIR) {
  console.error("FILE_DIR environment variable is not set.");
  process.exit(1);
}

const readDirectory = (
  dirPath: string,
  arrayOfFiles: FileData[] = []
): FileData[] => {
  console.log(`Reading directory: ${dirPath}`); // Verify directory path
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    console.log(`Processing file/directory: ${fullPath}`); // Check each file or directory processed

    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`Entering subdirectory: ${fullPath}`); // Check when entering a subdirectory
      arrayOfFiles = readDirectory(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      console.log(`Reading markdown file: ${fullPath}`); // Confirm markdown files are being read
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      arrayOfFiles.push({
        name: file,
        content: fileContent,
        type: "markdown", // Assuming 'type' is a required property in FileData
        created_at: new Date(), // Assuming 'created_at' is a required property in FileData
        // Ensure all required properties are included
      });
    }
  });

  return arrayOfFiles;
};

const logToSupabase = async (files: FileData[]) => {
  console.log(`Logging ${files.length} files to Supabase`); // Check the number of files being logged

  for (const file of files) {
    console.log(`Logging file to Supabase: ${file.name}`); // Verify each file being logged
    const { data, error } = await supabaseClient.from("files").insert([file]);

    if (error) {
      console.error("Error logging to Supabase:", error.message); // Catch and log any errors
    } else {
      console.log("Logged to Supabase:", data); // Confirm successful logging
    }
  }
};

const markdownFiles = readDirectory(FILE_DIR);
logToSupabase(markdownFiles).then(() =>
  console.log("All files logged to Supabase.")
);
