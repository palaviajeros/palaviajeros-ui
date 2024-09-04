import React from "react";
import { Title, Text, Image, Space, Flex, Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Learn more about Palaviajeros",
};

interface ContentsProps {
  title: string;
  text: React.ReactNode;
  imageUrl: string;
  reverse: boolean;
}

const ContentBlock: React.FC<ContentsProps> = ({ title, text, imageUrl, reverse }) => {
  return (
    <Flex direction={{ base: "column", md: reverse ? "row-reverse" : "row" }} wrap={{ base: "wrap", lg: "unset" }} gap={20}>
      <Flex flex={1} direction="column" wrap="wrap">
        <Title order={2} size="h1" mb={10} ta={{ base: "center", md: "start" }}>
          {title}
        </Title>
        <Text size="md" ta={{ base: "center", md: "start" }}>
          {text}
        </Text>
      </Flex>
      <Image flex={1} src={imageUrl} alt={title} w="100%" fit="contain" h="100%" radius="md" />
    </Flex>
  );
};

const About: React.FC = () => {
  const contents = [
    {
      title: "Travel brings us closer",
      text: (
        <>
          Palaviajeros started in 2024 but founders (and friends) have been traveling for almost a decade. Palaviajeros is a compilation of
          travel expertise and experiences from backpacking to luxury resorts, from budget to full-service airlines, from self-guided to
          personalized tours. Our mission is make travel as comfortable as possible to all kinds of travelers.
        </>
      ),
      imageUrl: "/samples/sample1.jpg",
    },
    {
      title: "Experience is key",
      text: (
        <>
          All tours are curated by our master traveler, Victor. Victor, half-American half-Filipino, currently resides in Barcelona but has
          lives in different parts of the worlds and has been traveling for over 20 years looking for best destinations and tours around the
          world to date. He has visited 57 countries, still considers himself a novice, but specializes in lavish tours.
          <Space h="md" />
          Booking at Palaviajeros, you’ll get direct contact to Victor and his myriad experience in traveling the world.
        </>
      ),
      imageUrl: "/samples/sample2.jpg",
    },
    {
      title: "Experiences, not checkbox",
      text: (
        <>
          These days, travel is not just about ticking a checkbox…experiences count more. Sure, everyone’s been to Singapore, New York or
          even London. But do you want to hike the mountains of Machu Picchu, each paella by the beaches of Costa Brava, experience the
          exotic nightlife of Bangkok or witness lion hunting a gazelle in the planes of Africa? With Palaviajeros, we’ll help you plan the
          best itinerary based on your likes, personality and of course budget.
        </>
      ),
      imageUrl: "/samples/sample3.jpg",
    },
    {
      title: "Disconnect to connect",
      text: (
        <>
          In the age of tiktok, we are so consumed by what we see on social media where the measure of us enjoying life is by seeing how
          much time we’re spending offline. Yet we still need to post online to feel connected.
          <Space h="md" /> Experience life with Palaviajeros! Check our our Instagram, facebook and tiktok to see our latest offer. Check
          new destinations and promotional offers on our social media accounts."
        </>
      ),
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
          <ContentBlock key={index} title={content.title} text={content.text} imageUrl={content.imageUrl} reverse={index % 2 === 0} />
        ))}
      </Flex>
    </Container>
  );
};

export default About;
