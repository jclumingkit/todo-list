"use client";

import { Center, Paper, Text, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import validator from "validator";

const SignUpSuccess = () => {
  const router = useRouter();
  const params = useSearchParams();

  const hasConfirmationId = validator.isUUID(
    `${params.get("confirmationId")}`,
    4
  );

  if (!hasConfirmationId) {
    router.push("/login");
  }

  return (
    <Center>
      <Paper maw={420} p="xl" withBorder>
        <Title ta="center">Sign Up Successful</Title>
        <Text ta="center">
          We have sent you an email confirmation. Please check your inbox and
          follow the instructions.
        </Text>
      </Paper>
    </Center>
  );
};

export default function SuccessPage() {
  return (
    <Suspense>
      <SignUpSuccess />
    </Suspense>
  );
}
