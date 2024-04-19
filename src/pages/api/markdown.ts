// src/pages/api/markdown.ts
import type { APIRoute } from 'astro';
import { fetchAndProcessFiles } from '../../lib/utils/fetchAndProcessFiles';

export const get: APIRoute = async () => {
  try {
    const processedFiles = await fetchAndProcessFiles();
    const response = { files: processedFiles };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } else {
      return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
    }
  }
};