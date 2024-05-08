import { Database } from "@/utils/database";
import { SupabaseClient } from "@supabase/supabase-js";

export async function deleteTodo(
  supabase: SupabaseClient<Database>,
  todoId: string
) {
  const { data, error } = await supabase
    .from("todo_table")
    .delete()
    .eq("todo_id", todoId);
  if (error) throw error;
  return data;
}
