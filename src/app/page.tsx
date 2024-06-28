import { Title, Text, Image, Container, Flex, Space } from "@mantine/core";
import classes from "@/app/Home.module.scss";
import Service from "./components/Home/Service";

export default function Home() {
  const textContents = {
    title: "Buckle up!",
    text: "Prepare for an adventure like never before! The Palaviajeros team is preparing amazing itineraries for you. For now, fasten your seatbelts as we taxi through the runway. ;)",
  };

  return (
    <Container className={classes.container}>
      <Flex className={classes.hero} gap="sm">
        <Flex direction="column" className={classes.contents}>
          <Title className={classes.title} order={1}>
            {textContents.title}
          </Title>
          <Text className={classes.text} mt={40}>
            {textContents.text}
          </Text>
        </Flex>
        <Image
          className={classes.image}
          src="/samples/ex-home-image.jpg"
          width={400}
          height={500}
        />
      </Flex>
      <Space h={50} />
      <Service />
    </Container>
  );
}
