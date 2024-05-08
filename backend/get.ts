import { Database } from "@/utils/database";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getCurrentUser(supabase: SupabaseClient<Database>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserTodoList(
  supabase: SupabaseClient<Database>,
  userId: string
) {
  const { data, error } = await supabase
    .from("todo_table")
    .select("*")
    .eq("todo_user_id", userId);
  if (error) throw error;
  return data;
}
