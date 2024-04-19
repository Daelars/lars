import { supabaseClient } from "../../../server/supabaseClient";
export const put = async (request: Request): Promise<Response> => {
  const { id, ...updateData } = await request.json(); // Extracting ID and update data from the request body

  const { data, error } = await supabaseClient
    .from("files")
    .update(updateData)
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
