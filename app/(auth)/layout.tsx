import "@mantine/core/styles.css";

import { Container, Flex, Title } from "@mantine/core";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container w="100%" h="100vh">
      <Flex
        direction="column"
        gap="md"
        justify="center"
        align="center"
        h="100%"
      >
        <Title>Todo List</Title>
        {children}
      </Flex>
    </Container>
  );
}
