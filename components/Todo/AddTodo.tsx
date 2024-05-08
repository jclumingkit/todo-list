import { addTodo } from "@/backend/post";
import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import { TodoTableInsert, TodoTableRow } from "@/utils/types";
import {
  Button,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  opened: boolean;
  onClose: () => void;
  setTodoList: Dispatch<SetStateAction<TodoTableRow[]>>;
  user: User;
};

export default function AddTodo({ opened, onClose, setTodoList, user }: Props) {
  const supabase = createSupabaseBrowserClient();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoTableInsert>();

  const handleAddTodo = async (data: TodoTableInsert) => {
    try {
      setIsLoading(true);
      const newTodo = await addTodo(supabase, {
        ...data,
        todo_user_id: user.id,
      });

      if (newTodo) {
        setTodoList((prev) => [...prev, newTodo]);
      }
      notifications.show({
        message: "Todo added.",
        color: "green",
      });
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Create todo failed.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Todo Form"
      centered
      opened={opened}
      onClose={onClose}
      pos="relative"
    >
      <LoadingOverlay visible={isLoading} />
      <form onSubmit={handleSubmit(handleAddTodo)}>
        <Stack>
          <TextInput
            {...register("todo_title", { required: "Title is required" })}
            label="Title"
            placeholder="Finish laundry"
            error={errors.todo_title?.message}
          />
          <Textarea
            {...register("todo_description")}
            label="Description"
            placeholder="Use X detergent this time."
            error={errors.todo_description?.message}
          />
          <Button type="submit" fullWidth>
            Add Todo
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
