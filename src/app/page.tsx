import { Title, Text, Image, Container, Flex } from "@mantine/core";
import Services from "./components/Home/Services/Services";

export default function Home() {
  const textContents = {
    title: "Buckle up!",
    text: "Prepare for an adventure like never before! The Palaviajeros team is preparing amazing itineraries for you. For now, fasten your seatbelts as we taxi through the runway. ;)",
  };

  return (
    <Container>
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
