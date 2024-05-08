import { Database } from "@/utils/database";
import { TodoTableUpdate } from "@/utils/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function editTodo(
  supabase: SupabaseClient<Database>,
  params: TodoTableUpdate
) {
  const { data, error } = await supabase
    .from("todo_table")
    .update(params)
    .eq("todo_id", `${params.todo_id}`);

  if (error) throw error;
}
