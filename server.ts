import express, { Express } from "express";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 3000;

// Option 1: Type assertion
const directory: string = process.env.FILE_DIR!;
app.use(express.static(directory));

// Option 2: Null check
const envDirectory = process.env.FILE_DIR;
if (envDirectory) {
  app.use(express.static(envDirectory));
} else {
  console.error("FILE_DIR environment variable is not set.");
  // You can handle the case where the environment variable is not set here
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
