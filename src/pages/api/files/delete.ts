import { supabaseClient } from "../../../server/supabaseClient";
export const del = async (request: Request): Promise<Response> => {
  const { id } = await request.json(); // Assuming the request body contains the ID of the file to delete

  const { data, error } = await supabaseClient
    .from("files")
    .delete()
    .match({ id }); // Assuming 'id' is the unique identifier

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
