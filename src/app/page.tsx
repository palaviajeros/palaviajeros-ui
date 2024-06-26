import { Title, Text, Image, Container, Flex } from "@mantine/core";
import classes from "@/app/Home.module.scss";

export default function Home() {
  const textContents = {
    title: "Buckle up!",
    text: "Prepare for an adventure like never before! The Palaviajeros team is preparing amazing itineraries for you. For now, fasten your seatbelts as we taxi through the runway. ;)",
  };

  return (
    <Container className={classes.container}>
      <Flex wrap="wrap" gap="lg">
        <div className={classes.contents}>
          <Title className={classes.title} order={1}>
            {textContents.title}
          </Title>
          <Text className={classes.text}>{textContents.text}</Text>
        </div>
        <Image
          className={classes.image}
          radius="md"
          h={500}
          w="auto"
          fit="contain"
          src="/ex-home-image.jpg"
        />
      </Flex>
    </Container>
  );
}
