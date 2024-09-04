import React from "react";
import { Title, Text, Image, Flex, Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Learn more about Palaviajeros",
};

interface ContentsProps {
  title: string;
  text: string;
  imageUrl: string;
  reverse: boolean;
}

const ContentBlock: React.FC<ContentsProps> = ({ title, text, imageUrl, reverse }) => {
  return (
    <Flex
      direction={reverse ? "row-reverse" : "row"}
      wrap={{ base: "wrap", lg: "unset" }}
      gap={50}
      justify="space-evenly"
      miw={300}
    >
      <Flex flex={1} direction="column" wrap="wrap">
        <Title order={2} size="h1" mb={10} ta={{ base: "center", lg: "start" }}>
          {title}
        </Title>
        <Text size="md">{text}</Text>
      </Flex>
      <Image flex={1} src={imageUrl} alt={title} w={{ base: "300", sm: "auto" }} fit="contain" h="100%" radius="md" />
    </Flex>
  );
};

const About: React.FC = () => {
  const contents = [
    {
      title: "Sample",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample1.jpg",
    },
    {
      title: "Sample",
      text: "This is a sample text that describes the content of the image below.This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample2.jpg",
    },
    {
      title: "Sample",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample3.jpg",
    },
    {
      title: "Sample",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample3.jpg",
    },
  ];
  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      <Title ta="center" mb={60}>
        About Us
      </Title>
      <Flex direction="column" gap={{ base: "50", lg: "100" }}>
        {contents.map((content, index) => (
          <ContentBlock
            key={index}
            title={content.title}
            text={content.text}
            imageUrl={content.imageUrl}
            reverse={index % 2 === 1}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default About;
