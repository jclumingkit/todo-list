import { Database } from "./database";

export type TodoTableRow = Database["public"]["Tables"]["todo_table"]["Row"];
export type TodoTableInsert =
  Database["public"]["Tables"]["todo_table"]["Insert"];
export type TodoTableUpdate =
  Database["public"]["Tables"]["todo_table"]["Update"];

export type LoginFormType = {
  email: string;
  password: string;
};

export type SignUpFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};
