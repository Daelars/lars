/**
 * Cleans a filename for processing.
 *
 * @param fileName - The original filename.
 * @returns {string} - The cleaned filename.
 */
export function cleanFileName(fileName: string): string {
  // Remove the '.md' extension
  const nameWithoutExtension = fileName.replace(/\.md$/, "");

  // Replace spaces with underscores
  return nameWithoutExtension.replace(/\s+/g, "_");
}
