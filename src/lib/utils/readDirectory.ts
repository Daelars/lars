import { Astro } from 'astro';

export async function get() {
    try {
      // Access your environment variable 
      const fileDir = '.' + process.env.FILE_DIR;  // Assumes `fetchContent` can handle relative paths
      const files = await Astro.glob(`${fileDir}/**/*`);
  
      // Filter for files only
      const fileData = files.filter(file => !file.isDirectory)
                           .map(file => ({ name: file.name, path: file.path }));
  
       return new Response(JSON.stringify(fileData));
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 }); // Error response
    }
  }
