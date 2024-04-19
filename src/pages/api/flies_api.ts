// src/pages/api/files.ts
import { supabaseClient } from "../../server/supabaseClient";

export const get = async (request: Request): Promise<Response> => {
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
