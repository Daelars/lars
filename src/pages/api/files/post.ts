import { supabaseClient } from "../../../server/supabaseClient";

export const post = async (request: Request): Promise<Response> => {
  const fileData = await request.json(); // Assuming the request body contains the file data

  const { data, error } = await supabaseClient.from("files").insert([fileData]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
