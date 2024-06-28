import React from "react";
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconBrowserCheck, IconMapPin } from "@tabler/icons-react";
import classes from "@/app/components/Home/Service.module.scss";

const mockdata = [
  {
    title: "Calculated Weather",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconSun,
  },
  {
    title: "Online Bookings",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconBrowserCheck,
  },
  {
    title: "Safety Team",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconMapPin,
  },
];
const Service: React.FC = () => {
  const theme = useMantineTheme;
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        color={`var(--mantine-color-yellow-5)`}
        stroke={2}
        // color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg">
      <Title order={3} className={classes.title} ta="center" mt="sm">
        Our Services
      </Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Service;
