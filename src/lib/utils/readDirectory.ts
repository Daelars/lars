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
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = readDirectory(path.join(dirPath, file), arrayOfFiles);
    } else if (file.endsWith(".md")) {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      arrayOfFiles.push({
        name: file,
        content: fileContent,
        type: "markdown", // Assuming 'type' is a required property in FileData
        created_at: new Date(), // Assuming 'created_at' is a required property in FileData
      });
    }
  });

  return arrayOfFiles;
};

const logToSupabase = async (files: FileData[]) => {
  for (const file of files) {
    const { data, error } = await supabaseClient.from("YourTableName").insert([
      {
        name: file.name,
        //path: file.path,
        content: file.content,
      },
    ]);

    if (error) {
      console.error("Error logging to Supabase:", error);
    } else {
      console.log("Logged to Supabase:", data);
    }
  }
};

const markdownFiles = readDirectory(FILE_DIR);
logToSupabase(markdownFiles).then(() =>
  console.log("All files logged to Supabase.")
);
