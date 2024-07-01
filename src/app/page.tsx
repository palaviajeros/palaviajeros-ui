import { Title, Text, Image, Container, Flex } from "@mantine/core";
import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header";

export default function Home() {
  return (
    <Container>
      <Header />
      <Flex wrap="wrap" gap="lg">
        <div>
          <Title order={1}>{textContents.title}</Title>
          <Text>{textContents.text}</Text>
        </div>
        <Image
          radius="md"
          h={500}
          w="auto"
          fit="contain"
          src="/samples/ex-home-image.jpg"
        />
      </Flex>
      <Services />
    </Container>
  );
}
