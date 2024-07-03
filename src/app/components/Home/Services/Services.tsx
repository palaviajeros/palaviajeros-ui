import React, {FC} from "react";
import {Title, Text, Card, SimpleGrid, Container, rem, Flex} from "@mantine/core";
import {
    IconGauge,
    IconUser,
    IconCookie,
    IconProps
} from "@tabler/icons-react";
import classes from "@/app/components/Home/Services/Services.module.css";

interface ServicesCardContent {
    title: string;
    description: string;
    icon: FC<IconProps>;
}

const mockdata: ServicesCardContent[] = [
    {
        title: "Extreme performance",
        description:
            "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
        icon: IconGauge
    },
    {
        title: "Privacy focused",
        description:
            "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
        icon: IconUser
    },
    {
        title: "No third parties",
        description:
            "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
        icon: IconCookie
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
            <feature.icon style={{width: rem(50), height: rem(50)}} stroke={2}/>
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));
    return (
        <Flex mt={{base: "50px", lg: "70px"}} direction={"column"}>
            <Title order={2} className={classes.title} ta="center">
                Our Services
            </Title>
            <SimpleGrid cols={{base: 1, md: 3}} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Flex>
    );
};

export default Services;
