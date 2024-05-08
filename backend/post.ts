import { TodoTableInsert } from "@/utils/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function addTodo(
  supabase: SupabaseClient,
  params: TodoTableInsert
) {
  const { data, error } = await supabase
    .from("todo_table")
    .insert(params)
    .select("*")
    .maybeSingle();
  if (error) throw error;
  return data;
}
