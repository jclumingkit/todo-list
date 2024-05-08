"use client";

import RedirectButton from "@/components/RedirectButton";
import { createSupabaseBrowserClient } from "@/utils/supabase/createSupabaseBrowserClient";
import { SignUpFormType } from "@/utils/types";
import {
  Button,
  Center,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormType>();

  const handleSignUpUser = async (data: SignUpFormType) => {
    try {
      setIsLoading(true);

      const { data: newUser, error } = await supabase.auth.signUp(data);

      if (error) throw error;

      router.push(`/signup/success?confirmationId=${newUser.user?.id}`);
    } catch (error) {
      console.log(error);
      notifications.show({
        message: "Sign up failed.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(handleSignUpUser)}>
        <Paper p="xl" withBorder pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Stack w={360} gap="lg">
            <Title order={4}>Create an account</Title>
            <TextInput
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  validator.isEmail(value) || "Email is invalid.",
              })}
              label="Email"
              placeholder="Email address"
              error={errors.email?.message}
              withAsterisk
            />
            <PasswordInput
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
              withAsterisk
            />
            <PasswordInput
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: 6,
                validate: (value, formValues) =>
                  value === formValues.password ||
                  "Your password does not match.",
              })}
              label="Confirm Password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
              withAsterisk
            />
            <Button type="submit" size="md">
              Sign Up
            </Button>
            <RedirectButton
              href="/login"
              label="Already have an account? Login here"
              buttonProps={{ variant: "outline" }}
            />
          </Stack>
        </Paper>
      </form>
    </Center>
  );
}
