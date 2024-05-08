import { withAuthUser } from "@/utils/pageProtection";
import { Container } from "@mantine/core";

export default async function Home() {
  await withAuthUser();
  return <Container>Todo List</Container>;
}
