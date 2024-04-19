import React, { useEffect, useState } from "react";

interface FileData {
  id: number; // BigInt likely translates to number
  name?: string; // Optional string
  type?: string; // Optional string
  content?: string; // Optional string
  url?: string; // Optional string
  created_at?: Date;
}

function FileList() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/process-markdown"); // Your API route
        if (!response.ok) {
          throw new Error("Fetch failed!");
        }

        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>List of Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
