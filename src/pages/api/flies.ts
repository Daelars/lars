import type { RequestHandler } from "astro";
import { supabaseClient } from "../../server/supabaseClient"; // Adjust the path as necessary

export const get: RequestHandler = async ({ request }) => {
  const { data, error } = await supabaseClient.from("files").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
