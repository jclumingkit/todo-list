"use client";

import { deleteTodo } from "@/backend/delete";
import { getCurrentUser, getUserTodoList } from "@/backend/get";
import AddTodo from "@/components/Todo/AddTodo";
import EditTodo from "@/components/Todo/EditTodo";
import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import { TodoTableRow } from "@/utils/types";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Todo() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [todoList, setTodoList] = useState<TodoTableRow[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoTableRow | null>(null);
  const [openEditTodo, setOpenEditTodo] = useState(false);

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(supabase, todoId);
      const updatedTodoList = todoList.filter(
        (todo) => todo.todo_id !== todoId
      );
      setTodoList(updatedTodoList);
      notifications.show({
        message: "Todo deleted.",
        color: "green",
      });
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Failed to delete todo.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const user = await getCurrentUser(supabase);

        if (user) {
          setUser(user);

          const userTodoList = await getUserTodoList(supabase, user.id);
          setTodoList(userTodoList);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        notifications.show({
          message: "Failed to fetch initial data.",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [supabase]);

  return (
    <Container mt="sm">
      <Skeleton visible={isLoading} mb="md">
        <Title order={5}>{`Welcome, ${user?.email}`}</Title>
      </Skeleton>
      <Skeleton h={200} visible={isLoading}>
        <Paper mt="md" p="lg" withBorder>
          <Group mb="md" justify="space-between">
            <Title order={6}>Your Todos</Title>
            <Button onClick={() => setOpenAddTodo(true)}>Add Todo</Button>
          </Group>

          <Stack>
            {todoList.map((todo) => (
              <Paper key={todo.todo_id} p="md" withBorder>
                <Flex wrap="wrap" justify="space-between">
                  <Box style={{ flex: 1 }}>
                    <Title order={6}>{todo.todo_title}</Title>
                    {todo.todo_description && (
                      <Text
                        maw={{ base: 280, sm: 480, lg: 600 }}
                        style={{ overflowWrap: "break-word" }}
                      >
                        {todo.todo_description}
                      </Text>
                    )}
                  </Box>
                  <Group>
                    <Button
                      color="red"
                      variant="outline"
                      onClick={() => handleDeleteTodo(todo.todo_id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="green"
                      onClick={() => {
                        setSelectedTodo(todo);
                        setOpenEditTodo(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Group>
                </Flex>
              </Paper>
            ))}
          </Stack>
        </Paper>
        {user && (
          <AddTodo
            user={user}
            opened={openAddTodo}
            onClose={() => setOpenAddTodo(false)}
            setTodoList={setTodoList}
          />
        )}
        {selectedTodo && (
          <EditTodo
            opened={openEditTodo}
            onClose={() => {
              setOpenEditTodo(false);
              setSelectedTodo(null);
            }}
            selectedTodo={selectedTodo}
            setTodoList={setTodoList}
          />
        )}
      </Skeleton>
    </Container>
  );
}
