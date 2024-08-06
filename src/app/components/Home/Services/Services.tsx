import React, { FC } from "react";
import { Title, Text, Card, rem, Flex, Indicator } from "@mantine/core";
import {
  IconProps,
  IconFileCheck,
  IconShieldCheck,
  IconInfoHexagon,
  IconDog,
  IconBox
} from "@tabler/icons-react";
import classes from "@/app/components/Home/Services/Services.module.scss";

interface ServicesCardContent {
  title: string;
  description: string;
  icon: FC<IconProps>;
  new: Boolean;
}

const mockdata: ServicesCardContent[] = [
  {
    title: "Visa Application Services",
    description:
      "PalaViajeros can assist you in navigating through tourist visa application processes. We will work with you to compile and submit all the necessary requirements and follow-up on the processing as needed to ensure that everything is in order. Furthermore, our team is updated with the latest immigration laws, policies, and changes. Our services are both efficient and cost-effective!",
    icon: IconFileCheck,
    new: false
  },
  {
    title: "Travel Insurance",
    description:
      "Some countries require insurance as standard part of a visa application. It is also a wise choice to get travel insurance in cases of unintended emergency. PalaViajeros will look for the best deals on insurance around the world giving you the best insurance coverage that suits your budget.",
    icon: IconShieldCheck,
    new: false
  },
  {
    title: "Flight / Tours / Hotel Consulting",
    description:
      "Want to plan the best trip for yourself, a honeymoon for you and your partner, a family trip for you and 10+ other people? Reach out to us and we will help you plan the best vacation of your life. Fill out the form below and tell us what you are looking for. If you can also tell us what your budget it, that will really be helpful! Overall, we want you to have the best experience wherever you go!",
    icon: IconInfoHexagon,
    new: false
  },
  {
    title: "Traveling with Pet",
    description: "Offering soon",
    icon: IconDog,
    new: true
  },
  {
    title: "Balikbayan Box Service",
    description: "Offering soon",
    icon: IconBox,
    new: true
  }
];

const Services: React.FC = () => {
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Indicator
        disabled={!feature.new}
        label="New"
        color="red"
        size={20}
      ></Indicator>
      <feature.icon style={{ width: rem(40), height: rem(40) }} stroke={2} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Flex direction="column">
      <Title order={2} className={classes.title} ta="center">
        Our Services
      </Title>
      <Flex
        wrap="wrap"
        gap="lg"
        justify="center"
        mt={50}
        direction={{
          base: "column",
          md: "row"
        }}
      >
        {features}
      </Flex>
    </Flex>
  );
};

export default Services;
