import { editTodo } from "@/backend/update";
import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import { TodoTableRow, TodoTableUpdate } from "@/utils/types";
import {
  Button,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  opened: boolean;
  onClose: () => void;
  setTodoList: Dispatch<SetStateAction<TodoTableRow[]>>;
  selectedTodo: TodoTableRow;
};

export default function EditTodo({
  opened,
  onClose,
  setTodoList,
  selectedTodo,
}: Props) {
  const supabase = createSupabaseBrowserClient();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoTableUpdate>({ defaultValues: selectedTodo });

  const handleEditTodo = async (data: TodoTableUpdate) => {
    try {
      setIsLoading(true);
      await editTodo(supabase, {
        ...data,
      });

      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.todo_id === data.todo_id) {
            return {
              ...todo,
              todo_title: `${data.todo_title}`,
              todo_description: data.todo_description ?? null,
            };
          } else {
            return todo;
          }
        })
      );
      notifications.show({
        message: "Todo updated.",
        color: "green",
      });
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Edit todo failed.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Todo Form"
      centered
      opened={opened}
      onClose={onClose}
      pos="relative"
    >
      <LoadingOverlay visible={isLoading} />
      <form onSubmit={handleSubmit(handleEditTodo)}>
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
            Save Changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
