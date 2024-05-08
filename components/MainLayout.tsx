"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import {
  AppShell,
  Button,
  Flex,
  Group,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const handleLogoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.push("/login");
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Failed to logout.",
        color: "red",
      });
    }
  };

  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Flex h="100%" px="md" align="center" justify="space-between">
          <Group>
            <Title order={5}>Todo List</Title>
            <Button
              size="xs"
              variant="default"
              onClick={() => toggleColorScheme()}
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </Button>
          </Group>
          <Button onClick={() => handleLogoutUser()} variant="subtle">
            Logout
          </Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
