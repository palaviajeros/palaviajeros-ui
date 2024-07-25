import React from "react";
import { Title, Text, Image, Space, Flex, Box } from "@mantine/core";
// import { title } from "process";
import classes from "@/app/about/about.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Learn more about Palaviajeros",
};

interface ContentsProps {
  title: string;
  text: string;
  imageUrl: string;
  reverse: boolean; //to reverse the flex direction
}

const ContentBlock: React.FC<ContentsProps> = ({
  title,
  text,
  imageUrl,
  reverse,
}) => {
  return (
    <Flex
      direction={reverse ? "row-reverse" : "row"}
      wrap={{ base: "wrap", lg: "unset" }}
      gap="md"
      justify="space-evenly"
      miw={300}
    >
      <Flex flex={1} direction="column" wrap="wrap" p={10}>
        <Title order={3} mb={10}>
          {title}
        </Title>
        <Text size="md">{text}</Text>
      </Flex>
      <Image
        flex={1}
        src={imageUrl}
        alt={title}
        w={{ base: "300", sm: "auto" }}
        fit="contain"
        h="100%"
        radius="xs"
      />
    </Flex>
  );
};

const About: React.FC = () => {
  const contents = [
    {
      title: "sample 1",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample1.jpg",
    },
    {
      title: "sample 2",
      text: "This is a sample text that describes the content of the image below.This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample2.jpg",
    },
    {
      title: "sample 3",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample3.jpg",
    },
    {
      title: "sample 4",
      text: "This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.This is a sample text that describes the content of the image below. This is a sample text that describes the content of the image below.",
      imageUrl: "/samples/sample3.jpg",
    },
  ];
  return (
    <>
      <Title ta="center" mb={80}>
        About Us
      </Title>
      <Flex direction="column" gap="xl">
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
    </>
  );
};

export default About;
