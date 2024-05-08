import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/createSupabaseServerClient";

export async function withAuthUser() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  } else {
    redirect("/todo");
  }
}
