import supabase from "./supabase";

interface Filter {
  field: string;
  value: string;
}

interface AgendaParams {
  filter?: Filter | null;
}

export async function getAgenda({ filter }: AgendaParams) {
  let query = supabase.from("conferenceAgenda").select("*");

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Agenda could not be loaded");
  }

  return data;
}
