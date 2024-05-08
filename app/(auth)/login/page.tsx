"use client";

import RedirectButton from "@/components/RedirectButton";
import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import { LoginFormType } from "@/utils/types";
import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormType>();

  const handleLoginUser = async (data: LoginFormType) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw error;

      router.push("/todo");
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Login failed.",
        color: "red",
      });
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(handleLoginUser)}>
        <Paper p="xl" withBorder>
          <Stack w={360} gap="lg">
            <Title order={4}>Login to your account</Title>
            <TextInput
              {...register("email", { required: "Email is required" })}
              label="Email"
              placeholder="Email address"
              error={errors.email?.message}
              withAsterisk
            />
            <PasswordInput
              {...register("password", { required: "Password is required" })}
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
              withAsterisk
            />
            <Button type="submit" size="md">
              Log In
            </Button>
            <RedirectButton
              href="/signup"
              label="Don't have an account? Sign up here"
              buttonProps={{ variant: "outline" }}
            />
          </Stack>
        </Paper>
      </form>
    </Center>
  );
}
