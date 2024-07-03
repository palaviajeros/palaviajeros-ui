import {Button, Container, Flex, Group, Text, TextInput, Title} from "@mantine/core";
import classes from "./Subscribe.module.scss";
import React from "react";


const Subscribe = () => {
    return (
        <Flex
            direction={"column"}
            mt={"xl"}
            justify={"center"} className={classes.container}
            gap={"xl"}
        >
            <Title
                ta={"center"}
                className={classes.title}
            >
                Subscribe to get updates from your fellow Palaviajeros!
            </Title>
            <Group justify="center" mt="md">
                <TextInput
                    size="xl"
                    radius="md"
                    inputSize="35" visibleFrom={"xl"}>

                </TextInput>
                <TextInput
                    size="md"
                    radius="md"
                    inputSize="35" hiddenFrom={"xl"}>

                </TextInput>
                <Button size="xl" radius="md" visibleFrom={"xl"}>Contact Us</Button>
                <Button size="md" radius="md" hiddenFrom={"xl"}>Contact Us</Button>
            </Group>
        </Flex>
    );
}

export default Subscribe;